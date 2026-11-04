---
'@pixerate/schemas': minor
---

`AgentInteractionRequestSchema.agent` is now optional and has no default, so the schema no longer names a specific agent. A parsed request without `agent` now leaves it undefined, and the runtime picks its default.
