# PixerateSchemas (Swift Package)

`PixerateSchemas` provides strongly typed Swift models (`Codable`, `Sendable`, `Equatable`) generated directly from `@pixerate/schemas` JSON Schema specifications.

## Requirements

- Swift 5.9+ / Xcode 15+
- Supported Platforms: macOS 13+, iOS 16+, tvOS 16+, watchOS 9+
- Zero external package dependencies (pure Foundation runtime)

## Installation (Swift Package Manager)

Add `PixerateSchemas` to your `Package.swift`:

```swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyClientApp",
    dependencies: [
        .package(url: "https://github.com/Pixerate/schemas.git", from: "swift-v1.45.0")
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

> **Note on Versioning**: Swift Package Manager tags follow the format `swift-v<version>` (e.g. `swift-v1.45.0`) to avoid conflicting with root npm package releases.

## Modules & Scope (v1)

The following contract groups are currently generated in v1:

- **`Common`**: Common aspect ratios (`AspectRatio`), resolutions (`Resolution`, `ImageResolution`, `VideoResolution`), and media attachments (`VideoFrameImage`, `VideoAttachment`).
- **`Jazz`**: Realtime interactive canvas collaboration protocol — policies (`JazzPolicy`), observations (`JazzObservation`), riff proposals (`JazzRiff`), and context (`JazzContext`).
- **`Agent`**: Agent execution models — tools (`AgentTool`), tasks (`ActiveAgentTask`), API keys (`ApiKey`), and workspace file changes (`AgentFileChange`).

*Note*: Downstream media pipelines (`@pixerate/schemas/media`) and generative UI schemas (`@pixerate/schemas/genui`) remain available as JSON Schema in `json-schema/` and will be added to the Swift package in future iterations.

## Runtime & Usage

### 1. Decoding & Defaults

Models synthesize memberwise and decoding initializers that automatically apply schema default values when fields are absent from JSON:

```swift
import PixerateSchemas

// Decode an empty object into JazzPolicy with defaults:
// autonomy = .suggest, tempo = 1500ms idle, budget = 3 riffs/min
let json = "{}".data(using: .utf8)!
let policy = try JSONDecoder().decode(JazzPolicy.self, from: json)

print(policy.autonomy) // JazzPolicyAutonomy.suggest
print(policy.tempo.idleMs) // 1500
```

### 2. Arbitrary JSON Values (`JSONValue`)

Fields that accept dynamic or nested JSON (such as tool call arguments) use `JSONValue`:

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
    mode: .suggest,
    status: .proposed,
    createdAt: "2026-11-03T12:00:00.000Z"
)
```

### 3. Validation Note

In v1, Swift models guarantee structural and type safety at compile and decode time. Regex patterns, numerical ranges (`minimum`/`maximum`), and string length limits defined in Zod/JSON Schema are not evaluated at runtime in Swift. Full validation can be performed upstream via the JSON Schema files shipped in `json-schema/` or downstream via `@pixerate/schemas` in TypeScript.
