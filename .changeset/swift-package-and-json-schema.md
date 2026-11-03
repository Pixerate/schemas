---
"@pixerate/schemas": minor
---

JSON Schema export and generated Swift package (`PixerateSchemas`).

- **JSON Schema Export**: Added `scripts/export-json-schema.mjs` and npm script `npm run export:json-schema` exporting all schemas to `json-schema/` with `json-schema/index.json`. Included in npm package via `files` and exported via `exports` under `./json-schema/*`. Also added `./common` export.
- **Swift Package**: Added root `Package.swift` and SwiftPM target `PixerateSchemas` in `swift/Sources/PixerateSchemas/` with strongly typed `Codable` models for `Common`, `Jazz`, and `Agent` contracts, generated via `scripts/gen-swift.mjs`. Includes runtime `JSONValue` enum and memberwise / decoding initializers with schema defaults.
- **Verification & CI**: Added tests for JSON Schema exports, Ajv / Zod parity, and Swift round-trip serialization tests in `PixerateSchemasTests`. Added Swift CI job and automatic `swift-v<version>` tag push on release.
