---
"@pixerate/schemas": minor
---

Add the `@pixerate/schemas/media` entry point for media processing contracts:
- text overlays and watermarks
- transcoding
- video and image compositing
- audio mixing
- subtitles and visualizers
- Ken Burns motion
- ducking and normalization
- media probing
- vector tracing and perceptual hashing
- document generation

Shared basics (aspect ratios, resolutions, frame and attachment inputs) move to an internal `src/common.ts`. Everything is still re-exported from the root entry, so existing imports are unchanged. `@pixerate/media-core` and client bundles should import from `@pixerate/schemas/media`.
