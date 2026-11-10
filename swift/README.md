# PixerateSchemas (Swift Package)

`PixerateSchemas` provides strongly typed Swift models (`Codable`, `Sendable`, `Equatable`) generated directly from `@pixerate/schemas` JSON Schema specifications.

## Requirements

- Swift 5.9+ / Xcode 15+
- Supported Platforms: macOS 13+, iOS 16+
- Zero external package dependencies (pure Foundation runtime)

## Installation (Swift Package Manager)

Add `PixerateSchemas` to your `Package.swift`:

```swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyClientApp",
    dependencies: [
        .package(url: "https://github.com/Pixerate/schemas.git", from: "1.45.0")
    ],
    targets: [
        .target(
            name: "MyClientApp",
            dependencies: [
                .product(name: "PixerateSchemas", package: "schemas")
            ]
        )
    ]
)
```

> **Note on Versioning**: The Swift package uses the same release tags as the npm package (`v1.45.0`). SwiftPM reads a `v`-prefixed semantic version tag as that version, so `from: "1.45.0"` resolves `v1.45.0`. SwiftPM ignores tags with any other prefix (such as `swift-v1.45.0`), so there are no Swift-only tags.

## Modules & Scope (v1)

`scripts/gen-swift.mjs` generates these modules from `json-schema/` (see `MODULES` in the script):

- **`Common`** (`Generated/Common.swift`): aspect ratios (`AspectRatio`, `VideoAspectRatio`), `VideoResolution`, `ServiceClient`, and media attachments (`VideoFrameImage`, `VideoAttachment`).
- **`Jazz`** (`Generated/Jazz.swift`): the canvas and writing-partner collaboration protocols: policies (`JazzPolicy`), observations (`JazzObservation`), phrases (`JazzPhrase`), riff proposals (`JazzRiff`), feedback and context (`JazzContext`), and Swash writing-partner text-lead turns (`JazzTextLeadRequest`, `JazzTextLeadResponse`, `JazzTextSuggestion`, `JazzTextRange` in UTF-16 `NSString` / AppKit offsets; requests never carry code, math, tables or text outside the context window).
- **`Agent`** (`Generated/Agent.swift`): agent tools (`AgentTool`), tasks (`ActiveAgentTask`), interactions and approvals, API keys and service accounts, and workspace file changes (`AgentFileChange`).

A schema used inside another one is the same Swift type in both places: `JazzContext.policy` is a `JazzPolicy` and `JazzPhrase.observations` is `[JazzObservation]`.

[`GENERATED.md`](./GENERATED.md) is written by the generator. It lists the modules that are JSON Schema only so far, any schema the generator skipped, and any field it could only type as `JSONValue`, with the reason. To add a module, add it to `MODULES` and run `npm run gen:swift`.

## Runtime & Usage

### 1. Decoding & Defaults

Models synthesize memberwise and decoding initializers that automatically apply schema default values when fields are absent from JSON:

```swift
import PixerateSchemas

// Decode an empty object into JazzPolicy with defaults:
// autonomy = .suggest, tempo = 1500ms idle, budget = 3 riffs/min
let json = "{}".data(using: .utf8)!
let policy = try JSONDecoder().decode(JazzPolicy.self, from: json)

print(policy.autonomy) // JazzAutonomy.suggest
print(policy.tempo.idleMs) // 1500
```

### 2. Arbitrary JSON Values (`JSONValue`)

Fields that accept any JSON (such as tool call arguments) use `JSONValue`, which can be written with literals:

```swift
let riff = JazzRiff(
    id: "riff-1",
    sessionId: "sess-abc",
    origin: "agent:assistant",
    surface: "canvas",
    strategy: "layout",
    intent: .suggest,
    title: "Align boxes",
    confidence: 0.95,
    toolCalls: [
        JazzToolCall(name: "align_nodes", arguments: ["ids": ["a", "b"], "axis": "x"])
    ],
    mode: .suggest,
    status: .proposed,
    createdAt: "2026-11-03T12:00:00.000Z"
)
```

### 3. Null and Missing Values

Swift uses one optional for both a missing key and `null`. A nullable field (`.nullable()` in Zod) that is `nil` is encoded as `null`; any other `nil` field is left out of the JSON. Defaults that Zod computes when parsing (such as `.default(() => new Date())`) are not in the JSON Schema, so those fields are optional in Swift.

### 4. Validation Note

In v1, Swift models guarantee structural and type safety at compile and decode time. Regex patterns, numerical ranges (`minimum`/`maximum`), and string length limits defined in Zod/JSON Schema are not evaluated at runtime in Swift. Full validation can be performed upstream via the JSON Schema files shipped in `json-schema/` or downstream via `@pixerate/schemas` in TypeScript.
