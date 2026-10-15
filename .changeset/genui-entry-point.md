---
"@pixerate/schemas": minor
---

Add the `@pixerate/schemas/genui` entry point for generative UI contracts: multi-platform components, design tokens, UI component generation, generative forms and ephemeral interactive UI blocks. The schemas moved from `src/index.ts` to `src/genui.ts` and are still re-exported from the root entry, so existing imports are unchanged. Client bundles (and `@pixerate/genui-core`) should import from `@pixerate/schemas/genui` so they don't pull in every schema.
