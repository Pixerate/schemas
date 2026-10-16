---
'@pixerate/schemas': minor
---

Add `@pixerate/schemas/jobs` entry point exporting unified AI queue job schemas and discriminated union.

- Defines schemas for queue payloads: `PromptToImageSchema`, `BasicImageSchema`, `BasicVariantSchema`, `BasicIterationSchema`, `CombineImagePromptsSchema`, `ApplyEditsSchema`, `GenerateElementSchema`, `CreatePropertiesSchema`, `CreateLayersSchema`, `ImageToGenerationSchema`, `VideoToGenerationSchema`, `CreateIdeasSchema`, `PromptToVideoSchema`, and `EmptyParamsSchema`.
- Exports `JobSchemaMap`, `JobType`, `QueueJobSchema` (discriminated union on `process`), and `QueueJob`.
- Omits deprecated and unsupported processes (`create_depthmap`, `update_missing_depthmaps`, `populate_subcategory`).
- Re-exports all job schemas and types from the root `@pixerate/schemas` entry point as well as `@pixerate/schemas/jobs`.
