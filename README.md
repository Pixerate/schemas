# @pixerate/schemas

A public, open-source TypeScript and Zod validation schemas package associated with Pixerate and Slopmachine. It contains unified schemas and validation models to ensure absolute API and schema stability across private and public downstream systems.

## Key Features

- **Standard Validation Schemas**: Validation schemas for all core capabilities including image/video payloads, job queues, fidelity states, etc.
- **Unified Aspect Ratios**: Declares the comprehensive 10-option `AspectRatio` union (`1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`) and the video aspect ratios.
- **Lightweight & Dependency-Free**: Relies only on `zod`. Perfect for browser environments, SDKs, and server-side runtimes alike.

## Structure

```
src/
├── index.ts     # Unified exports for all Zod schemas & TypeScript types
├── common.ts    # Shared basics (aspect ratios, resolutions, frame/attachment inputs); internal, re-exported by the root
├── realtime.ts  # Realtime collaboration contracts (also `@pixerate/schemas/realtime`)
├── genui.ts     # Generative UI contracts (also `@pixerate/schemas/genui`)
├── media.ts     # Media processing contracts (also `@pixerate/schemas/media`)
├── agent.ts     # Agent runtime contracts: interactions, website crawling & caching (also `@pixerate/schemas/agent`)
├── jobs.ts      # Queue job contracts (also `@pixerate/schemas/jobs`)
├── analytics.ts # Canonical product analytics schemas & PII guards (also `@pixerate/schemas/analytics`)
└── jazz.ts      # An agent working alongside the user: observations, phrases, riffs, feedback, policy, product proposals (also `@pixerate/schemas/jazz`)
```

The root entry re-exports every grouped module, so `import { FormBlockSchema } from "@pixerate/schemas"` keeps working. Client bundles should import from the narrower entry point (`@pixerate/schemas/agent`, `@pixerate/schemas/analytics`, `@pixerate/schemas/genui`, `@pixerate/schemas/jazz`, `@pixerate/schemas/jobs`, `@pixerate/schemas/media`, `@pixerate/schemas/realtime`) so they don't pull in every schema.

## Exported Types & Schemas

### 1. Fidelity
- **Schema**: `FidelitySchema`
- **Type**: `Fidelity` (`"outline" | "blocked" | "shaded" | "polished"`)

### 2. Aspect Ratio
- **Schema**: `AspectRatioSchema`
- **Type**: `AspectRatio` (10 core orientations supported by current image/video generation models)

### 3. Video Aspect Ratio
- **Schema**: `VideoAspectRatioSchema`
- **Type**: `VideoAspectRatio` (`"9:16" | "16:9"`)

### 4. Service Client
- **Schema**: `ServiceClientSchema`
- **Type**: `ServiceClient` (`"pixerate" | "slopmachine" | "social" | "surrealui" | "surreal-ui" | "unknown"`)

### 5. Generation & Transformation Payloads
- **Image Generation**: `ImageGenerationPayload` (`ImageGenerationSchema`)
- **Image Transformation**: `ImageTransformationPayload` (`ImageTransformationSchema`)
- **Video Analysis**: `VideoAnalysisPayload` (`VideoAnalysisSchema`)
- **Queue / Media Jobs**: `QueueJob` (`QueueJobSchema`, includes optional `client: ServiceClient`)

### 6. Structured Elicitation (`@pixerate/schemas/genui`)
- **Single question**: `ElicitationRequest` (`ElicitationRequestSchema`) answered by `ElicitationResponse` (`ElicitationResponseSchema`).
  - `single_select`, `multi_select` and `rank_priorities` questions offer 2–4 options with unique ids; `free_form` questions may have none.
  - Optional `header`: a short chip label, at most 12 characters.
  - Options (`ElicitationOption`) are `FormChoice`s. Mark the recommended one with `isRecommended` and list it first. Hosts add their own "Other" entry when `allowCustomResponse` is set.
  - Optional option `preview` (a code snippet or mockup shown while the option is focused), only on `single_select` questions.
- **Batch**: `ElicitationBatch` (`ElicitationBatchSchema`, 1–4 questions with unique ids) answered by `ElicitationBatchResponse` (`ElicitationBatchResponseSchema`, one response per question, unique `requestId`s).

### 7. Product Analytics (`@pixerate/schemas/analytics`)
- **Canonical Event Schema**: `AnalyticsEvent` (`AnalyticsEventSchema`), a discriminated union on `name` with typed `params` per event.
- **Event Names**: `AnalyticsEventName` (`AnalyticsEventNameSchema`):
  - **Acquire**: `sign_up`, `login`, `join_waitlist`, `waitlist_approved`, `onboarded`
  - **Onboard**: `tutorial_begin`, `onboarding_step`, `onboarding_milestone`, `tutorial_complete`
  - **Activate**: `create_item`, `generate`, `run_agent`, `save_version`
  - **Engage**: `publish`, `share`, `submit_feedback`, `page_view`
  - **Expand**: `invite_member`, `join_team`
  - **Monetise**: `begin_checkout`, `purchase`
- **Core Item Types**: `AnalyticsItemType` (`AnalyticsItemTypeSchema`):
  - **Slop Machine**: `silo`, `bucket`, `pipeline`, `template`
  - **Pixerate**: `exploration`, `composition`, `fusion`, `edit`, `board`, `pitch`, `deliverable`
  - **Uchiage**: `organization`, `project`, `task`, `agent`, `workflow`
- **User Properties**: `AnalyticsUserProperties` (`AnalyticsUserPropertiesSchema`):
  - Shape: `{ app: ServiceClient, plan?, role_preference?, waitlist_status?, team_id_hash?, org_id_hash? }`
- **Strict Constraints & PII Guard**:
  - **GA4 Limits**: Event names and param names $\le 40$ chars; param string values $\le 100$ chars; at most 25 params per event; user property names $\le 24$ chars, values $\le 36$ chars.
  - **No PII**: Rejects keys such as `email`, `name`, `phone`, and string values looking like email addresses.
  - **Hashed IDs**: Rejects unhashed `team_id` or `org_id` keys in favor of `team_id_hash` and `org_id_hash`.

### 8. Jazz: an agent alongside the user (`@pixerate/schemas/jazz`)
Contracts for `@pixerate/jazz`, which watches what a user does in an editor and offers small contributions that complement it.
- **Origin**: `JazzOrigin` (`JazzOriginSchema`): `user` or `agent:<id>`, as `@pixerate/editor` history records who made a change.
- **Observing**: `JazzObservation` (one action: `add`, `remove`, `edit`, `select`, `undo`, `redo`, `revert`, with its `targets`, `origin` and `inGesture`) grouped into a `JazzPhrase` (a burst of activity that ended in a pause).
- **Policy**: `JazzPolicy` (`JazzPolicySchema.parse({})` gives every default): `autonomy` (`off`, `suggest` (default), `assist`), `tempo` (`idleMs`, `minGapMs`), `budget` (`maxRiffsPerMinute`, `maxPending`, `cooldownAfterRejectMs`), `allowEditUserContent` (default `false`: riffs only add), `strategies`.
- **Riffs**: `JazzRiff`: a contribution with `strategy`, `intent` (`add`, `annotate`, `connect`, `vary`, `suggest`), `title`, `rationale`, `confidence` (0–1), `targets`, `toolCalls` (`JazzToolCall`: an exposed tool name and JSON `arguments`), `mode`, `proposalId`, `status` and an optional `idempotencyKey`. `JazzRiffSummary` is the slice a model sees.
- **Feedback**: `JazzFeedback`: the `verdict` (`accepted`, `rejected`, `edited`, `ignored`, `withdrawn`), who gave it and an optional reason.
- **Context**: `JazzContext`: what a model gets to decide on a riff: recent phrases, selection, a document summary, recent riffs, the policy and the skill names that apply.
- **Product proposals** (jazz on a repository): `JazzDomain` (an area of the product: `paths`, `docs`, `skills`, `labels`), `JazzCapabilityIndex` (what a domain has `built` and `planned`, each a `JazzCapability` with `refs` and optional `agentTools`), `JazzEvidence` (a citation: `repo`, `issue`, `plan`, `web`, `metric`, or `absence` for a search that found nothing) and `JazzProposalDraft` (a written-up proposal: `kind`, `title`, `why`, `today`, `problemSpace`, `proposal`, `effort`, `risk`, `doneWhen`, `evidence`). Targets gain the kinds `domain`, `issue`, `pull-request`, `file` and `capability`.
- **Text lead (Swash writing partner)**: `JazzTextLeadRequest` (`JazzTextLeadRequestSchema` / `TextLeadRequestSchema`) and `JazzTextLeadResponse` (`JazzTextLeadResponseSchema` / `TextLeadResponseSchema`) for `POST /api/agent/text-lead`.
  - **Request**: `paragraph` (raw Markdown up to `JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS`, with code, math and tables replaced by placeholders), optional `before` / `after` surrounding context (up to `JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS`, with the same exclusions), `flavor` (`commonmark`, `gfm`, `slack`), `voices` (`JazzTextVoiceState`: active voices with `kept` / `undone` counts per voice and per rule in `JazzTextVoiceStats`), and optional `teamId`.
  - **Response**: `genre` (`prose`, `notes`, `chat`, `poem`, `list`, `technical`, `heading`), `palette` (`JazzTextVoice`: which voices should play next and at what `strength` 0–1, with optional `disabledRules`), `suggestions` (`JazzTextSuggestion`: at most 4 structural suggestions of kind `list`, `heading`, `math`, `title`, `alert` or `quote`, each anchored to a half-open `JazzTextRange` in **UTF-16 code-unit offsets** into `paragraph`, the unit `NSString` and AppKit use, with `replacement` and `why`), `why` (one-line rationale) and optional `fuelBalance`.
  - **Privacy rule**: Requests never carry code, math, tables or text outside the `before` / `paragraph` / `after` context window.
- `JazzToolCall.arguments` is a recursive JSON value: these contracts are for storage and transport, not for Gemini structured outputs (see GOTCHAS).

---

## Getting Started

### Installation

Install via npm once published to your registry:
```bash
npm install @pixerate/schemas
```

For local development inside monorepos, use standard symlinks or `file:` package.json paths:
```json
"dependencies": {
  "@pixerate/schemas": "file:../pixerate-schemas"
}
```

### Build Instructions

Build output compiles to standard ESM target via `tsup`:
```bash
# Install dependencies
npm install

# Build compiled ESM and declaration files
npm run build
```

The compiled bundles and types will reside in the `dist/` directory.

## Contributing & Releases

This repository mandates [Changesets](https://github.com/changesets/changesets) for tracking versioning and generating changelogs.

### Creating a Changeset

When submitting a pull request that introduces changes, generate a changeset:

```bash
npm run changeset
```

1. Select the bump type (`patch`, `minor`, or `major`).
2. Provide a summary message describing the changes.
3. Commit the generated `.changeset/*.md` file with your pull request.

If a PR does not require a release bump (e.g. CI adjustments or documentation fixes), generate an empty changeset:

```bash
npx changeset --empty
```

