---
"@pixerate/schemas": minor
---

Fallbacks for data visuals and paradigms (Pixerate/surreal-ui#38): `UiDescriptor.fallback` names the baseline type an item falls back to where it can't run (no WebGL or script, reduced motion), matching `UIComponentType.fallback`. `UiFallbackSchema` (`{ implements, props }`) is what a provider's runtime makes from the item's data, and `UiTablePropsSchema` (`caption`, `columns`, `rows`, `rowHeaders`) is the baseline `table`'s props, so providers can produce a table fallback without depending on a component library. JSON Schemas exported.
