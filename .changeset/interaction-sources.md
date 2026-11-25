---
"@pixerate/schemas": minor
---

Add `AgentInteractionSourceSchema` (`{ url, title?, redirectUrl? }`) and an optional `sources` array on `AgentInteractionResultSchema` (Pixerate/agent-core#105). This lets an interaction's cited web pages travel on the result itself instead of in `metadata.sources`. The Swift types are regenerated.
