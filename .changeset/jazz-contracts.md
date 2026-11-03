---
"@pixerate/schemas": minor
---

Add the `@pixerate/schemas/jazz` entry point: contracts for an agent that works alongside a user in an editor (`@pixerate/jazz`). `JazzOrigin` (`user` / `agent:<id>`), `JazzObservation` and `JazzPhrase` for what the user did, `JazzPolicy` (autonomy, tempo, budget; `parse({})` fills every default), `JazzRiff` and `JazzToolCall` for contributions, `JazzFeedback` for the user's answer, and `JazzContext` for what a model decides on. Everything is re-exported from the root entry; all changes are additive.
