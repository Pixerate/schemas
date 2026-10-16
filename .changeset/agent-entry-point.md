---
"@pixerate/schemas": minor
---

Add the `@pixerate/schemas/agent` entry point for agent runtime contracts: agent tools, environments, configs and interactions, plus website crawling and caching. They moved from `src/index.ts` to `src/agent.ts` and are still re-exported from the root entry, so existing imports are unchanged. `@pixerate/agent-core` should import from `@pixerate/schemas/agent`.
