---
"@pixerate/schemas": minor
---

Add UI dream contracts (#89). `@pixerate/schemas/genui` gains `UiDreamRequest` and `UiDreamResult` (the `ui_dream` endpoint's bodies: stills, and an optional clip between two of them that is always a ref), `UiDreamAnalysis` (version 1: layout elements with 0–1 boxes, components mapped to the catalog with provenance, states, transitions with named motion, a11y, conflicts and dropped items) and `UiDreamComparison`, now an optional `LookResult.dream`. `@pixerate/schemas/jazz` gains `JazzUiDream` (with `JazzUiDreamMedium` and `JazzUiDreamGroup`, also in Swift), and `JazzDreamDropReason` gains `dismissed`. All additive.
