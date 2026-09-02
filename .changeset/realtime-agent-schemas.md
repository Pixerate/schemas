---
"@pixerate/schemas": minor
---

Add schemas and types for realtime collaboration, operational transformation, presence tracking, and AI agent behavior telemetry:
- Add `PresenceColorSchema`, `PresenceStatusSchema` (including agent lifecycle statuses: `planning`, `thinking`, `executing_tool`, `waiting_for_input`, `waiting_for_agent`, `streaming`, `paused`, `error`), and `ActorTypeSchema` (`human`, `agent`, `system`)
- Add `AgentActorMetadataSchema` and extend `PresenceUserSchema`
- Add `ViewportTransformSchema`, `CursorPositionSchema`, and `PresenceStateSchema`
- Add `ViewingIndicatorSchema`, `TypingIndicatorSchema`, and `FieldPresenceSchema`
- Add record locking schemas: `RecordLockSchema`, `LockClaimRequestSchema`, `LockReleaseRequestSchema`, `LockHeartbeatRequestSchema`
- Add `ActivityEventSchema`, `ActivityActorSchema`, and `ActivityActionTypeSchema` (including agent actions: `agent:thought`, `agent:plan_updated`, `agent:tool_start`, `agent:tool_end`, `agent:approval_requested`, `agent:approval_resolved`, `agent:error`)
- Add operational transformation and CRDT schemas: `OTTextOpSchema`, `OTJsonOpSchema`, `OTOperationSchema`, `OTRevisionSchema`, `CRDTSnapshotSchema`
