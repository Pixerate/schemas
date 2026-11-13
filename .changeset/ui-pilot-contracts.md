---
"@pixerate/schemas": minor
---

Add contracts for skills and generated UI.

- New `@pixerate/schemas/skills` entry (also re-exported from the root and generated into Swift): `SkillManifest`, `SkillKind` with `BUILT_IN_SKILL_KINDS`, `SkillLayer`, `SkillState`, `SkillBundleManifest` and `skillContentHashInput` (#76).
- `genui`: the `ui-aesthetic` profile `UiAestheticProfile` and `UiAestheticRef`, recorded on `ComponentVariant`, `ComponentVersion` and `UIGenerationOptions`; `aestheticId` is now a deprecated mirror of `aesthetic.skillId` (#77).
- `genui`: `UiComponentContract`, `UiDescriptor`, `UiComponentGroup`, `UI_COLOR_ROLES`, `ComponentSource`, `ComponentRuntime`, `ComponentScreenshots` and `PlatformTarget`. `UIComponentType` gains `group`, `contract` and `fallback`; `ComponentPackage` gains `source`, `runtime` and `screenshots` (`screenshot` is deprecated); `ComponentVersion.packages` is keyed by `PlatformTarget`, a superset of `PlatformLanguage` (#78).
- `genui`: the page contract (`PageMotionInfo`, `PageMessage`, `PageMarks`, `PAGE_MARK_ATTRIBUTES`), `PictureRequest` and `LookResult` with `lookStatus` (#79).

All additions are optional, so existing records parse unchanged.
