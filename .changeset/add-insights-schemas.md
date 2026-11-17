---
"@pixerate/schemas": minor
---

Add `@pixerate/schemas/insights` subpath with Session, Signal, IngestBatch, SessionSummary, and Finding contracts for `@pixerate/piggyback` and SlopStats. The insights schemas are also re-exported from the package root. The insights actor type is `InsightsActorTypeSchema` (`"human" | "agent"`), separate from realtime's `ActorTypeSchema`.
