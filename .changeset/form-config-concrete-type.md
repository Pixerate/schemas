---
"@pixerate/schemas": minor
---

Replace `config: z.any()` on `FormHandoffActionSchema` and `FormValidatorSchema` with `FormConfigSchema`, a flat record of string, number or boolean values. `z.any()` became an unconstrained `{}` in the JSON Schema, which stalled Gemini constrained decoding for `TechnicalFormSchema` once `generateStructured` sends the schema (`structuredOutputs: true`). Stored forms with older config shapes still parse: `normalizeFormConfig` (also exported) drops nulls, JSON-encodes nested values, and wraps a non-object config as `{ value }`.
