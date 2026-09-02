# @pixerate/schemas

## 1.10.0

### Minor Changes

- 1a3b898: Add schemas and types for subtitles, audio visualizers, ken burns effects, audio ducking, loudness normalization, silence trimming, media probing, vector tracing, perceptual hashing, and enhanced document options.
- 1a3b898: Add schemas and types for realtime collaboration, operational transformation, presence tracking, and AI agent behavior telemetry:
  - Add `PresenceColorSchema`, `PresenceStatusSchema` (including agent lifecycle statuses: `planning`, `thinking`, `executing_tool`, `waiting_for_input`, `waiting_for_agent`, `streaming`, `paused`, `error`), and `ActorTypeSchema` (`human`, `agent`, `system`)
  - Add `AgentActorMetadataSchema` and extend `PresenceUserSchema`
  - Add `ViewportTransformSchema`, `CursorPositionSchema`, and `PresenceStateSchema`
  - Add `ViewingIndicatorSchema`, `TypingIndicatorSchema`, and `FieldPresenceSchema`
  - Add record locking schemas: `RecordLockSchema`, `LockClaimRequestSchema`, `LockReleaseRequestSchema`, `LockHeartbeatRequestSchema`
  - Add `ActivityEventSchema`, `ActivityActorSchema`, and `ActivityActionTypeSchema` (including agent actions: `agent:thought`, `agent:plan_updated`, `agent:tool_start`, `agent:tool_end`, `agent:approval_requested`, `agent:approval_resolved`, `agent:error`)
  - Add operational transformation and CRDT schemas: `OTTextOpSchema`, `OTJsonOpSchema`, `OTOperationSchema`, `OTRevisionSchema`, `CRDTSnapshotSchema`

## 1.9.0

### Minor Changes

- 223501a: Add schemas and types for subtitles, audio visualizers, ken burns effects, audio ducking, loudness normalization, silence trimming, media probing, vector tracing, perceptual hashing, and enhanced document options.

## 1.8.0

### Minor Changes

- 0fa9fff: Add advanced image compositing schemas: PerspectiveWarp, DisplacementMap, ArcDistort, AutoFitCaption, AnimatedGifComposite, and ImagePipeline.
