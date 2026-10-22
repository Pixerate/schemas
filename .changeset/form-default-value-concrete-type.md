---
"@pixerate/schemas": minor
---

Replace `defaultValue: z.any()` on `BaseFormControlSchema` (and so `FormControlSchema` and `TechnicalFormSchema`) with `FormDefaultValueSchema`: a string, number, boolean or string array. `z.any()` became `{}` in the JSON Schema in three places, and Vertex rejects `TechnicalFormSchema` with HTTP 400 when `generateStructured` sends it (`structuredOutputs: true`, the ai-core 6.5 default). `TechnicalFormSchema` now has no unconstrained subschema. Stored forms with other default shapes still parse: `normalizeFormDefaultValue` (also exported) drops nulls, turns array items into strings, and JSON-encodes objects. The `FormControl` type's `defaultValue` changes from `any` to `FormDefaultValue`.
