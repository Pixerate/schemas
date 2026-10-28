# @pixerate/schemas

## 1.43.1

### Patch Changes

- fb76ead: Pin zod ^3.23.8 for full compatibility with Zod 3 consumers and type ScoringRule optionPoints explicitly with string key and number value.

## 1.43.0

### Minor Changes

- 9acfc88: feat(genui): add ChartBlock fields (unit, valueFormat, yLabel, stacked, theme color tokens), SVG validation checks (accessible, reducedMotion), and ComponentSynthesis validation result fields

## 1.42.0

### Minor Changes

- 0f7178e: Add canonical `AnalyticsEventSchema`, `AnalyticsEventNameSchema`, `AnalyticsItemTypeSchema`, and `AnalyticsUserPropertiesSchema` to `@pixerate/schemas/analytics` and root exports for cross-app product analytics with GA4 limits and PII guards.

## 1.41.0

### Minor Changes

- d91e43a: Replace `defaultValue: z.any()` on `BaseFormControlSchema` (and so `FormControlSchema` and `TechnicalFormSchema`) with `FormDefaultValueSchema`: a string, number, boolean or string array. `z.any()` became `{}` in the JSON Schema in three places, and Vertex rejects `TechnicalFormSchema` with HTTP 400 when `generateStructured` sends it (`structuredOutputs: true`, the ai-core 6.5 default). `TechnicalFormSchema` now has no unconstrained subschema. Stored forms with other default shapes still parse: `normalizeFormDefaultValue` (also exported) drops nulls, turns array items into strings, and JSON-encodes objects. The `FormControl` type's `defaultValue` changes from `any` to `FormDefaultValue`.

## 1.40.0

### Minor Changes

- c33d637: Add `ApiKeyOwnerTypeSchema`, `ApiKeyStatusSchema`, `ApiKeySchema`, `PublicApiKeySchema`, and `CreateApiKeyInputSchema` to `@pixerate/schemas/agent` and root exports.

## 1.39.0

### Minor Changes

- 9cf534f: Replace `config: z.any()` on `FormHandoffActionSchema` and `FormValidatorSchema` with `FormConfigSchema`, a flat record of string, number or boolean values. `z.any()` became an unconstrained `{}` in the JSON Schema, which stalled Gemini constrained decoding for `TechnicalFormSchema` once `generateStructured` sends the schema (`structuredOutputs: true`). Stored forms with older config shapes still parse: `normalizeFormConfig` (also exported) drops nulls, JSON-encodes nested values, and wraps a non-object config as `{ value }`.

## 1.38.0

### Minor Changes

- 2928dc1: Structured elicitation (`@pixerate/schemas/genui`):
  
  - **Stricter validation:** `ElicitationRequestSchema` now requires 2–4 options for `single_select`, `multi_select` and `rank_priorities` questions (`ELICITATION_MIN_OPTIONS` / `ELICITATION_MAX_OPTIONS`). Option ids must also be unique within a question. `free_form` questions may still have no options. `@pixerate/genui-core` already enforces both rules in `validateElicitationRequest`, but a request with 0–1 or 5+ choice options, or with duplicate option ids, that used to parse will now be rejected. `ElicitationRequestSchema` is now a refined schema (`ZodEffects`), so `.shape` / `.extend()` are no longer available on it.
  - New optional `header` on requests: a short chip label, at most 12 characters (`ELICITATION_HEADER_MAX_LENGTH`).
  - New optional `preview` on options: content shown while the option is focused, such as a code snippet or a mockup. It is only valid on `single_select` questions. `ElicitationOptionSchema` is now `FormChoiceSchema` extended with `preview`; `FormChoiceSchema` itself is unchanged.
  - New `ElicitationBatchSchema` (1–4 questions with unique ids, `ELICITATION_MAX_BATCH_QUESTIONS`) and `ElicitationBatchResponseSchema` (1–4 responses with unique `requestId`s). The single-question schemas keep working as before.
  - Recommendations still use the existing `isRecommended` flag on options.
  
  `ElicitationResponseSchema` is unchanged.

## 1.37.0

### Minor Changes

- eb417ac: Add "prompt-driven" to SvgStyleArchetypeSchema to allow unconstrained visual styling in SVG generation
- 7267e90: Add agent workspace entry, change tracking diff, and human-in-the-loop approval contracts.

## 1.36.0

### Minor Changes

- eb417ac: Add "prompt-driven" to SvgStyleArchetypeSchema to allow unconstrained visual styling in SVG generation

## 1.35.0

### Minor Changes

- 394f599: Add schemas and contracts for SVG and animated SVG generation, kinetic blueprints, and visual QA audits

## 1.34.0

### Minor Changes

- d9ed800: Add `ServiceAccountSchema`, `CreateServiceAccountInputSchema`, `ApiKeyLookupSchema`, `ActiveAgentTaskSchema`, and `AgentDirectoryEntrySchema` to `@pixerate/schemas/agent` and root exports.

## 1.33.0

### Minor Changes

- 7e80a35: Generative UI (`@pixerate/schemas/genui`):
  - New `FormChoiceSchema` (`id`, `label`, `description`, `isRecommended`).
  - `FormQuestionSchema` gains `choices` (choices with stable ids), `allowCustom` and a `rank` question type. `options` is unchanged.
  - New structured elicitation contracts: `ElicitationQuestionTypeSchema`, `ElicitationOptionSchema` (the same schema as `FormChoiceSchema`), `ElicitationRequestSchema` and `ElicitationResponseSchema`. They match `@pixerate/genui-core`'s existing types exactly, so genui-core can import them instead of defining its own.
  
  Agent runtime (`@pixerate/schemas/agent`): `WebsiteCrawlScopeSchema` gains `urlMatchPattern`, `urlExcludePattern` and `maxPageBytes` (default 5 MB), which `@pixerate/agent-core` already supports.
  
  All changes are additive.

## 1.32.0

### Minor Changes

- 889ff70: Add the `@pixerate/schemas/agent` entry point for agent runtime contracts: agent tools, environments, configs and interactions, plus website crawling and caching. They moved from `src/index.ts` to `src/agent.ts` and are still re-exported from the root entry, so existing imports are unchanged. `@pixerate/agent-core` should import from `@pixerate/schemas/agent`.

## 1.31.0

### Minor Changes

- aa038cc: Add `@pixerate/schemas/jobs` entry point exporting unified AI queue job schemas and discriminated union.
  
  - Defines schemas for queue payloads: `PromptToImageSchema`, `BasicImageSchema`, `BasicVariantSchema`, `BasicIterationSchema`, `CombineImagePromptsSchema`, `ApplyEditsSchema`, `GenerateElementSchema`, `CreatePropertiesSchema`, `CreateLayersSchema`, `ImageToGenerationSchema`, `VideoToGenerationSchema`, `CreateIdeasSchema`, `PromptToVideoSchema`, and `EmptyParamsSchema`.
  - Exports `JobSchemaMap`, `JobType`, `QueueJobSchema` (discriminated union on `process`), and `QueueJob`.
  - Omits deprecated and unsupported processes (`create_depthmap`, `update_missing_depthmaps`, `populate_subcategory`).
  - Re-exports all job schemas and types from the root `@pixerate/schemas` entry point as well as `@pixerate/schemas/jobs`.

## 1.30.0

### Minor Changes

- 0a71f76: Add the `@pixerate/schemas/media` entry point for media processing contracts:
  - text overlays and watermarks
  - transcoding
  - video and image compositing
  - audio mixing
  - subtitles and visualizers
  - Ken Burns motion
  - ducking and normalization
  - media probing
  - vector tracing and perceptual hashing
  - document generation
  
  Shared basics (aspect ratios, resolutions, frame and attachment inputs) move to an internal `src/common.ts`. Everything is still re-exported from the root entry, so existing imports are unchanged. `@pixerate/media-core` and client bundles should import from `@pixerate/schemas/media`.

## 1.29.0

### Minor Changes

- b25699e: Add the `@pixerate/schemas/genui` entry point for generative UI contracts: multi-platform components, design tokens, UI component generation, generative forms and ephemeral interactive UI blocks. The schemas moved from `src/index.ts` to `src/genui.ts` and are still re-exported from the root entry, so existing imports are unchanged. Client bundles (and `@pixerate/genui-core`) should import from `@pixerate/schemas/genui` so they don't pull in every schema.

## 1.28.0

### Minor Changes

- a9cf71a: Add `SocialPostMetricsSchema`, `SocialPostVisibilitySchema` and `SocialMetricFieldSchema` for reading engagement back from published social posts, and an optional `metrics` field on `SocialProviderCapabilitiesSchema` listing which counters a provider can read.

## 1.27.0

### Minor Changes

- 4e17615: Add a `@pixerate/schemas/realtime` entry point, mark the package side-effect free, and add optional `off()` to `IRealtimeChannel`.
  
  - The realtime collaboration contracts (presence, cursors, indicators, record locks, activity, OT/CRDT, channels, grid events) now live in `src/realtime.ts`. `@pixerate/schemas` re-exports them unchanged, so the root entry's exports are identical.
  - Importing them from `@pixerate/schemas/realtime` bundles about 5 KB instead of about 53 KB (minified, zod excluded), because client bundles no longer pull in every other schema. `@pixerate/realtime` will import from it.
  - `"sideEffects": false` lets bundlers drop entry points an app doesn't use.
  - `IRealtimeChannel.off?(type, filter, callback?)` removes listeners. It's optional, so existing adapters still compile. It matches the interface `@pixerate/realtime-core` has used since 1.7.

## 1.26.0

### Minor Changes

- 37d3504: Add optional scheduling fields to `NotificationDeliveryRecordSchema` (`recipientId`, `attempts`, `lastAttemptAt`, `nextAttemptAt`, `deferredReason`) and a new `NotificationDeferredReasonSchema` (`retry` | `quiet_hours` | `digest`). These let `@pixerate/notifications` queue retries, hold emails during quiet hours, and batch email digests. All fields are optional, so existing records stay valid.

## 1.25.0

### Minor Changes

- 501f207: Add optional `mainImageWidth`, `mainImageHeight`, `squareImageWidth` and `squareImageHeight` (positive integers) to `MetaConfigSchema` so metadata builders can emit accurate `og:image:width` / `og:image:height` instead of assuming 1200×630 / 400×400.

## 1.24.0

### Minor Changes

- ec35d89: Add `SocialProviderCapabilitiesSchema` / `SocialProviderCapabilities` and `SocialTextLengthUnitSchema` so social providers (e.g. `@pixerate/circus`) can declare their text limits, supported media, tag support, replies and URL behaviour. Add optional `altText` to `SocialPostPayloadSchema`.

## 1.23.0

### Minor Changes

- 42ee270: Recategorize audio mixing, ducking, and visualizer schemas under dedicated audio schemas, separate video compositing into distinct text and graphic/image composite schemas, and clean up VideoPipelineSchema.

## 1.22.0

### Minor Changes

- 4a4fa51: Add FormBlockSchema, FormQuestionSchema, and built-in ephemeral languages for interactive form and clarification blocks

## 1.21.0

### Minor Changes

- 5145c9b: Add ProposalsBlockSchema and ProposalItemSchema for ephemeral UI task proposals

## 1.20.0

### Minor Changes

- 49938d1: Add Stripe subscription and billing lifecycle fields to TeamSchema and OrganizationSchema

## 1.19.0

### Minor Changes

- e65d32f: Add position, padding, scale, opacity, width, and height to VideoOverlayOptionsSchema and ImageOverlayOptionsSchema.
  Add Ephemeral Interactive UI Blocks (stats, callout, actions, chart, tree, node diagram, orgchart).
  Add Audio Diarization schemas.
  Add Website Crawling and Caching schemas.
  Add Social Media Publishing (Circus) schemas.
  Add Marketing, SEO, UTM, and LLMS/GEO schemas.
  Add Realtime Channel, Grid, and OT collaboration types and schemas.
  Use input types for function options schemas to support partial inputs with defaults.

## 1.18.0

### Minor Changes

- ab4b43f: Add examples and suggestions fields to FormControl and BaseFormControlSchema

## 1.17.1

### Patch Changes

- 8b6a50e: Prevent recursive schema warnings and generation failures in \`FormControlSchema\` by extracting non-recursive \`BaseFormControlSchema\` for repeater controls.

## 1.17.0

### Minor Changes

- 647bccc: Add `uchiage` client to `ServiceClientSchema` enum (formerly `operative`).

## 1.16.0

### Minor Changes

- 7f45d01: Add optional `lowCost` flag to `VideoGenerationSchema` and `SocialVideoGenerationSchema`.

## 1.15.0

### Minor Changes

- 01de124: Add comprehensive notification, email message, user preference, and task unread summary schemas and types

## 1.14.0

### Minor Changes

- a10318a: Add schemas and TypeScript types for AuthUser, UserProfile, Organization, OrgMember, Team, TeamMember, Invite, WaitlistEntry, and FuelTransaction

## 1.13.0

### Minor Changes

- e3c6953: Add component dependency schemas (`InternalComponentDependencySchema`, `ExternalPackageDependencySchema`, `ComponentDependencySchema`) and add dependencies field to `ComponentPackageSchema` and synthesis schemas.

## 1.12.0

### Minor Changes

- 910b0cf: Add 360p/360P to VideoResolutionSchema and add resolution, task, and previousInteractionId to VideoModificationSchema.

## 1.11.0

### Minor Changes

- a8a3fc8: Add VideoAttachmentSchema and add image, images, and attachments fields to VideoGenerationSchema

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
