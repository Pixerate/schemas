# @pixerate/schemas

A public, open-source TypeScript and Zod validation schemas package associated with Pixerate and Slopmachine. It contains unified schemas and validation models to ensure absolute API and schema stability across private and public downstream systems.

## Key Features

- **Standard Validation Schemas**: Validation schemas for all core capabilities including image/video payloads, job queues, fidelity states, etc.
- **Unified Aspect Ratios**: Declares the comprehensive 10-option `AspectRatio` union (`1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`) and the video aspect ratios.
- **Lightweight & Dependency-Free**: Relies only on `zod`. Perfect for browser environments, SDKs, and server-side runtimes alike.

## Structure

```
src/
└── index.ts  # Unified exports for all Zod schemas & TypeScript types
```

## Exported Types & Schemas

### 1. Fidelity
- **Schema**: `FidelitySchema`
- **Type**: `Fidelity` (`"outline" | "blocked" | "shaded" | "polished"`)

### 2. Aspect Ratio
- **Schema**: `AspectRatioSchema`
- **Type**: `AspectRatio` (10 core orientations supported by current image/video generation models)

### 3. Video Aspect Ratio
- **Schema**: `VideoAspectRatioSchema`
- **Type**: `VideoAspectRatio` (`"9:16" | "16:9"`)

### 4. Service Client
- **Schema**: `ServiceClientSchema`
- **Type**: `ServiceClient` (`"pixerate" | "slopmachine" | "social" | "surrealui" | "surreal-ui" | "unknown"`)

### 5. Generation & Transformation Payloads
- **Image Generation**: `ImageGenerationPayload` (`ImageGenerationSchema`)
- **Image Transformation**: `ImageTransformationPayload` (`ImageTransformationSchema`)
- **Video Analysis**: `VideoAnalysisPayload` (`VideoAnalysisSchema`)
- **Queue / Media Jobs**: `QueueJob` (`QueueJobSchema`, includes optional `client: ServiceClient`)

---

## Getting Started

### Installation

Install via npm once published to your registry:
```bash
npm install @pixerate/schemas
```

For local development inside monorepos, use standard symlinks or `file:` package.json paths:
```json
"dependencies": {
  "@pixerate/schemas": "file:../pixerate-schemas"
}
```

### Build Instructions

Build output compiles to standard ESM target via `tsup`:
```bash
# Install dependencies
npm install

# Build compiled ESM and declaration files
npm run build
```

The compiled bundles and types will reside in the `dist/` directory.

## Contributing & Releases

This repository mandates [Changesets](https://github.com/changesets/changesets) for tracking versioning and generating changelogs.

### Creating a Changeset

When submitting a pull request that introduces changes, generate a changeset:

```bash
npm run changeset
```

1. Select the bump type (`patch`, `minor`, or `major`).
2. Provide a summary message describing the changes.
3. Commit the generated `.changeset/*.md` file with your pull request.

If a PR does not require a release bump (e.g. CI adjustments or documentation fixes), generate an empty changeset:

```bash
npx changeset --empty
```

