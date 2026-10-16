---
"@pixerate/schemas": minor
---

Generative UI (`@pixerate/schemas/genui`):
- New `FormChoiceSchema` (`id`, `label`, `description`, `isRecommended`).
- `FormQuestionSchema` gains `choices` (choices with stable ids), `allowCustom` and a `rank` question type. `options` is unchanged.
- New structured elicitation contracts: `ElicitationQuestionTypeSchema`, `ElicitationOptionSchema` (the same schema as `FormChoiceSchema`), `ElicitationRequestSchema` and `ElicitationResponseSchema`. They match `@pixerate/genui-core`'s existing types exactly, so genui-core can import them instead of defining its own.

Agent runtime (`@pixerate/schemas/agent`): `WebsiteCrawlScopeSchema` gains `urlMatchPattern`, `urlExcludePattern` and `maxPageBytes` (default 5 MB), which `@pixerate/agent-core` already supports.

All changes are additive.
