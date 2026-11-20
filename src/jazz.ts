import { z } from "zod";
import { emptyObjectDefault } from "./zod-compat.js";

/**
 * Jazz contracts: an agent working alongside a user in an editor. Jazz watches what the user
 * does (observations, grouped into phrases at each pause), decides when to contribute, and
 * offers riffs (small contributions the user accepts or dismisses), learning from the feedback.
 * The engine is `@pixerate/jazz`; the editor side (history origin, change feeds, canvas
 * proposals) is `@pixerate/editor`.
 *
 * Also available as the `@pixerate/schemas/jazz` entry point, which client bundles should
 * prefer: it doesn't pull in the rest of the schemas.
 */

/** Who made a change: the person at the keyboard (`user`) or an agent (`agent:<id>`), as `@pixerate/editor` history records it. */
export const JazzOriginSchema = z.string().regex(/^(user|agent:.+)$/, "Origin is `user` or `agent:<id>`");
export type JazzOrigin = z.infer<typeof JazzOriginSchema>;

/** A JSON value, for tool-call arguments. */
export type JazzJsonValue = string | number | boolean | null | JazzJsonValue[] | { [key: string]: JazzJsonValue };
export const JazzJsonValueSchema: z.ZodType<JazzJsonValue> = z.lazy(() =>
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(JazzJsonValueSchema), z.record(z.string(), JazzJsonValueSchema)])
);

const IsoDateTimeSchema = z.string().datetime({ offset: true });

// --- Observing the user ---

/**
 * Editors use `node` to `cell`. Product proposals (jazz on a repository) use `domain` (an area of the
 * product), `issue`, `pull-request`, `file` and `capability` (an entry in a capability index).
 */
export const JazzTargetKindSchema = z.enum(["node", "edge", "layer", "text", "cell", "domain", "issue", "pull-request", "file", "capability", "other"]);
export type JazzTargetKind = z.infer<typeof JazzTargetKindSchema>;

/** Something an action touched: a node, edge, layer, text range, cell... */
export const JazzTargetSchema = z.object({
  id: z.string().min(1),
  kind: JazzTargetKindSchema.default("node"),
  /** The node or layer type as the editor knows it (e.g. `image`, `box`). */
  type: z.string().optional(),
  /** Its visible label or text, trimmed. */
  label: z.string().max(200).optional()
});
export type JazzTarget = z.infer<typeof JazzTargetSchema>;

export const JazzActionSchema = z.enum(["add", "remove", "edit", "select", "undo", "redo", "revert"]);
export type JazzAction = z.infer<typeof JazzActionSchema>;

/** One thing that happened in an editor, normalized from a change feed. */
export const JazzObservationSchema = z.object({
  id: z.string().min(1),
  at: IsoDateTimeSchema,
  /** The editor surface it happened on (e.g. `canvas`, `vector`, `doc-1`). */
  surface: z.string().min(1),
  origin: JazzOriginSchema,
  action: JazzActionSchema,
  targets: z.array(JazzTargetSchema).max(200),
  /** For `edit`: the fields that changed (`position`, `data`, `style`...). */
  fields: z.array(z.string()).max(50).optional(),
  /** A drag or resize is still in progress: more of the same gesture will follow. */
  inGesture: z.boolean().default(false),
  /** A one-line description for a model, e.g. "Added image node \"Hero\" below \"Title\"". */
  summary: z.string().max(280).optional()
});
export type JazzObservation = z.infer<typeof JazzObservationSchema>;

/** A burst of user activity that ended in a pause: the unit jazz responds to. */
export const JazzPhraseSchema = z.object({
  id: z.string().min(1),
  surface: z.string().min(1),
  startedAt: IsoDateTimeSchema,
  endedAt: IsoDateTimeSchema,
  observations: z.array(JazzObservationSchema).min(1).max(200),
  summary: z.string().max(1000).optional()
});
export type JazzPhrase = z.infer<typeof JazzPhraseSchema>;

// --- Policy ---

/**
 * - `off`: watch only.
 * - `suggest`: offer riffs as proposals (ghosts) the user accepts or dismisses. The default.
 * - `assist`: also apply small, reversible riffs directly, each its own undo step made by the agent.
 */
export const JazzAutonomySchema = z.enum(["off", "suggest", "assist"]);
export type JazzAutonomy = z.infer<typeof JazzAutonomySchema>;

export const JazzPolicySchema = z.object({
  autonomy: JazzAutonomySchema.default("suggest"),
  tempo: emptyObjectDefault(
    z.object({
      /** Quiet time (ms) that ends a phrase. */
      idleMs: z.number().int().min(200).max(60_000).default(1500),
      /** Least time (ms) between two riffs. */
      minGapMs: z.number().int().min(0).max(600_000).default(8000)
    })
  ),
  budget: emptyObjectDefault(
    z.object({
      maxRiffsPerMinute: z.number().int().min(0).max(60).default(3),
      /** Most riffs waiting for the user at once. */
      maxPending: z.number().int().min(0).max(20).default(3),
      /** Pause (ms) after the user dismisses a riff. */
      cooldownAfterRejectMs: z.number().int().min(0).max(3_600_000).default(30_000)
    })
  ),
  /** Riffs may change or remove what the user made (only with `assist`). Default: they only add. */
  allowEditUserContent: z.boolean().default(false),
  /** Strategies to run (e.g. `continue-series`, `annotate`, `connect`); all when absent. */
  strategies: z.array(z.string().min(1)).max(50).optional()
});
export type JazzPolicy = z.infer<typeof JazzPolicySchema>;
export type JazzPolicyInput = z.input<typeof JazzPolicySchema>;

// --- Riffs ---

/** A tool call a riff makes (or proposes), by its exposed name in the editor's tool registry. */
export const JazzToolCallSchema = z.object({
  name: z.string().min(1),
  arguments: z.record(z.string(), JazzJsonValueSchema).default({})
});
export type JazzToolCall = z.infer<typeof JazzToolCallSchema>;

export const JazzRiffIntentSchema = z.enum(["add", "annotate", "connect", "vary", "suggest"]);
export type JazzRiffIntent = z.infer<typeof JazzRiffIntentSchema>;

/**
 * - `proposed`: waiting for the user. `applied`: made directly (`assist`).
 * - `accepted` / `rejected` / `edited`: the user's answer (`edited`: accepted, then changed).
 * - `ignored`: left until it expired. `withdrawn`: the agent took it back (it no longer fits).
 */
export const JazzRiffStatusSchema = z.enum(["proposed", "applied", "accepted", "rejected", "edited", "ignored", "withdrawn"]);
export type JazzRiffStatus = z.infer<typeof JazzRiffStatusSchema>;

/** A contribution jazz offers in response to a phrase. */
export const JazzRiffSchema = z.object({
  id: z.string().min(1),
  sessionId: z.string().min(1),
  /** The agent offering it. */
  origin: JazzOriginSchema,
  surface: z.string().min(1),
  /** The strategy that produced it (e.g. `continue-series`). */
  strategy: z.string().min(1),
  intent: JazzRiffIntentSchema,
  /** What it adds, in a few words; also the undo step's name. */
  title: z.string().min(1).max(80),
  /** Why it fits what the user is doing, in a sentence. */
  rationale: z.string().max(280).optional(),
  confidence: z.number().min(0).max(1),
  /** Ids of the user's items it builds on; it goes stale when they change. */
  targets: z.array(z.string().min(1)).max(50).default([]),
  /** The phrase it responds to. */
  phraseId: z.string().optional(),
  toolCalls: z.array(JazzToolCallSchema).max(20).default([]),
  mode: z.enum(["suggest", "assist"]),
  /** The editor proposal showing it (`propose_nodes`' `proposalId`), in `suggest` mode. */
  proposalId: z.string().optional(),
  status: JazzRiffStatusSchema,
  /** For side effects that cost money or can't be undone (e.g. generation). */
  idempotencyKey: z.string().min(1).optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema.optional()
});
export type JazzRiff = z.infer<typeof JazzRiffSchema>;

export const JazzVerdictSchema = z.enum(["accepted", "rejected", "edited", "ignored", "withdrawn"]);
export type JazzVerdict = z.infer<typeof JazzVerdictSchema>;

/** What became of a riff, for learning what the user wants. */
export const JazzFeedbackSchema = z.object({
  riffId: z.string().min(1),
  verdict: JazzVerdictSchema,
  at: IsoDateTimeSchema,
  /** Who answered: the user, or the agent for `withdrawn`. */
  by: JazzOriginSchema,
  /** The user's words, when they gave a reason. */
  reason: z.string().max(280).optional(),
  /** For `edited`: the fields the user changed after accepting. */
  editedFields: z.array(z.string()).max(50).optional()
});
export type JazzFeedback = z.infer<typeof JazzFeedbackSchema>;

// --- Context ---

/** A riff as the model sees it in context: enough to avoid repeating or contradicting it. */
export const JazzRiffSummarySchema = JazzRiffSchema.pick({ id: true, strategy: true, intent: true, title: true, targets: true, status: true });
export type JazzRiffSummary = z.infer<typeof JazzRiffSummarySchema>;

/** What a model gets to decide on a riff. */
export const JazzContextSchema = z.object({
  sessionId: z.string().min(1),
  agent: z.object({ id: z.string().min(1), name: z.string().optional() }),
  surface: z.string().min(1),
  /** Latest phrase last. */
  phrases: z.array(JazzPhraseSchema).max(20),
  /** Ids selected now. */
  selection: z.array(z.string()).max(500).default([]),
  /** A compact description of the document (e.g. the canvas nodes, labels and layout). */
  documentSummary: z.string().max(16_000).optional(),
  /** Riffs still waiting and recent answers, so the model doesn't repeat itself. */
  riffs: z.array(JazzRiffSummarySchema).max(50).default([]),
  policy: JazzPolicySchema,
  /** Names of the agent skills that apply (e.g. `pixerate-canvas`). */
  skills: z.array(z.string()).max(20).default([])
});
export type JazzContext = z.infer<typeof JazzContextSchema>;

// --- Product proposals ---
// Jazz on a repository instead of an editor: it indexes what a product does and plans, researches
// the problem space, and proposes the capabilities that are missing as issues people triage.

/**
 * - `repo`: a file or line on the default branch (`path` or `path:line`).
 * - `issue`: an issue or pull request (`issue#123`).
 * - `plan`: an item in a plan, roadmap or follow-ups doc (`path:line`).
 * - `web`: a source from problem-space research (`ref` is its title, `url` the page).
 * - `metric`: a value from a metrics digest (`api.p95`), or a usage measurement behind a
 *   `usage-friction` proposal (`ref` is the usage opportunity's id, `quote` the measurement).
 * - `absence`: a search that found nothing, so a gap claim can be checked again later. `ref` is the
 *   query and `scope` where it looked.
 */
export const JazzEvidenceKindSchema = z.enum(["repo", "issue", "plan", "web", "metric", "absence"]);
export type JazzEvidenceKind = z.infer<typeof JazzEvidenceKindSchema>;

/** One citation behind a claim. */
export const JazzEvidenceSchema = z.object({
  kind: JazzEvidenceKindSchema,
  ref: z.string().min(1).max(500),
  url: z.string().url().optional(),
  /** The words that support the claim, trimmed. */
  quote: z.string().max(500).optional(),
  /** For `absence`: where the search looked (paths, `issues`, `plans`). */
  scope: z.string().max(300).optional()
});
export type JazzEvidence = z.infer<typeof JazzEvidenceSchema>;

/** An area of a product (an editor, a service, a feature family), as the host maps its repository. */
export const JazzDomainSchema = z.object({
  /** Stable slug, e.g. `image-editor`. Targets refer to it as `domain:<id>`. */
  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/, "Domain ids are lowercase slugs").max(64),
  name: z.string().min(1).max(80),
  /** Source paths (prefixes) whose changes belong to this domain. */
  paths: z.array(z.string().min(1)).min(1).max(50),
  /** Docs that describe it: guides, plans, roadmaps, follow-ups. */
  docs: z.array(z.string().min(1)).max(50).default([]),
  /** Agent skill files whose tool tables list what agents can do here. */
  skills: z.array(z.string().min(1)).max(50).default([]),
  /** Issue labels that put an issue in this domain. */
  labels: z.array(z.string().min(1)).max(20).default([]),
  /**
   * Route-template prefixes of the screens that belong to this domain (e.g. `/silo/:id/bucket`), so
   * a usage opportunity about a screen maps to it. The longest matching prefix wins.
   */
  routes: z.array(z.string().min(1).max(200)).max(50).default([])
});
export type JazzDomain = z.infer<typeof JazzDomainSchema>;
export type JazzDomainInput = z.input<typeof JazzDomainSchema>;

/** One thing a domain can do (`built`) or is going to (`planned`). */
export const JazzCapabilitySchema = z.object({
  name: z.string().min(1).max(200),
  summary: z.string().max(500).optional(),
  /** Where it is built, documented or planned. */
  refs: z.array(JazzEvidenceSchema).min(1).max(10),
  /**
   * Agent tools that reach it. An empty list means the index found none (an agent-path gap);
   * absent means unknown.
   */
  agentTools: z.array(z.string().min(1)).max(50).optional()
});
export type JazzCapability = z.infer<typeof JazzCapabilitySchema>;

/** What a domain does and plans, the starting point for proposing what's missing. */
export const JazzCapabilityIndexSchema = z.object({
  domain: z.string().min(1).max(64),
  builtAt: IsoDateTimeSchema,
  /** The default branch's commit when it was built. */
  revision: z.string().max(100).optional(),
  built: z.array(JazzCapabilitySchema).max(500),
  planned: z.array(JazzCapabilitySchema).max(500)
});
export type JazzCapabilityIndex = z.infer<typeof JazzCapabilityIndexSchema>;

/**
 * - `new-capability`: something practitioners rely on that the domain lacks.
 * - `follow-up`: the next step after work that just landed.
 * - `interop`: import, export or round trips with the tools people already use.
 * - `agent-path`: a capability agents can't reach.
 * - `usage-friction`: where real users struggle, from an aggregated usage opportunity.
 */
export const JazzProposalKindSchema = z.enum(["new-capability", "follow-up", "interop", "agent-path", "usage-friction"]);
export type JazzProposalKind = z.infer<typeof JazzProposalKindSchema>;

/** A written-up proposal, ready to stage as an issue. Sections are Markdown. */
export const JazzProposalDraftSchema = z.object({
  domain: z.string().min(1).max(64),
  kind: JazzProposalKindSchema,
  /** The issue title, e.g. "Vector: pattern fills and strokes with seamless tiles". */
  title: z.string().min(1).max(120),
  /** Who benefits and what they can do with it. */
  why: z.string().min(1).max(4000),
  /** What exists today, with file refs and the searches that found nothing. */
  today: z.string().min(1).max(4000),
  /** What practitioners do and what the leading tools offer, with sources. */
  problemSpace: z.string().max(4000).optional(),
  /** The scope. */
  proposal: z.string().min(1).max(6000),
  /** T-shirt size, e.g. `M` or `M–L`. */
  effort: z.string().min(1).max(20),
  risk: z.string().max(1000).optional(),
  /** The repository's own definition of done. */
  doneWhen: z.string().max(2000).optional(),
  /** Every claim's citation. At least one `absence` entry backs the gap. */
  evidence: z.array(JazzEvidenceSchema).min(1).max(50)
});
export type JazzProposalDraft = z.infer<typeof JazzProposalDraftSchema>;

// --- Usage opportunities ---
// What a host's usage source (e.g. piggyback's opportunities endpoint) tells jazz about where real
// users struggle. Aggregated only: no sessions, no user ids. The host maps its own records to this
// shape, so jazz depends on no particular analytics product.

/** A drop between two steps of a flow: the share of sessions that reached each. */
export const JazzUsageFunnelDropSchema = z.object({
  flowId: z.string().min(1).max(200),
  /** The flow spec's version, as text. */
  flowVersion: z.string().max(50).optional(),
  /** The step where people drop out. */
  step: z.string().min(1).max(200),
  /** Share (0–1) of sessions that reached the step before. */
  before: z.number().min(0).max(1),
  /** Share (0–1) that went on past it. */
  after: z.number().min(0).max(1)
});
export type JazzUsageFunnelDrop = z.infer<typeof JazzUsageFunnelDropSchema>;

/** The measurements behind a usage opportunity, for one week. */
export const JazzUsageMetricsSchema = z.object({
  sessionsAffected: z.number().int().min(0),
  /** Share (0–1) of the week's sessions affected. */
  shareOfSessions: z.number().min(0).max(1),
  /** Change against the week before, as a fraction (`0.35` is 35% more). */
  trendVsPrevWeek: z.number().optional(),
  funnelDrop: JazzUsageFunnelDropSchema.optional()
});
export type JazzUsageMetrics = z.infer<typeof JazzUsageMetricsSchema>;

/** A ranked, evidence-backed problem real users have, as a host's usage source reports it. */
export const JazzUsageOpportunitySchema = z.object({
  /** Stable across weeks, so the source can update it rather than add another. */
  id: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  /** What goes wrong, as Markdown (two to five sentences). */
  problem: z.string().min(1).max(4000),
  suggestedDirection: z.string().max(4000).optional(),
  metrics: JazzUsageMetricsSchema,
  /** 0–1: reach, severity and trend together. Higher is more worth fixing. */
  score: z.number().min(0).max(1),
  /** Normalized route templates where it happens (e.g. `/silo/:id/bucket`). */
  screens: z.array(z.string().min(1).max(500)).max(50).default([]),
  flowId: z.string().max(200).optional()
});
export type JazzUsageOpportunity = z.infer<typeof JazzUsageOpportunitySchema>;
export type JazzUsageOpportunityInput = z.input<typeof JazzUsageOpportunitySchema>;

/** What jazz reports back about an opportunity: a draft was filed, then accepted or rejected. */
export const JazzUsageReportStatusSchema = z.enum(["drafted", "accepted", "rejected"]);
export type JazzUsageReportStatus = z.infer<typeof JazzUsageReportStatusSchema>;

// --- Text lead (Swash writing partner) ---
// v1, superseded by text lead v2 below (Pixerate/schemas#87); kept until Swash moves over.
// A bandleader turn on pause for the Markdown writing partner (`POST /api/agent/text-lead`),
// the text counterpart of `PaintLeadResponse`.
//
// Privacy rule: requests carry only the current paragraph and a small surrounding window
// (`before` / `after`), never the whole document, and never raw code, math or tables
// (the client replaces those spans with placeholders before calling the server).

/** Maximum UTF-16 code units allowed in `JazzTextLeadRequest.paragraph`. */
export const JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS = 4000;

/** Maximum UTF-16 code units allowed in `JazzTextLeadRequest.before` or `after`. */
export const JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS = 2000;

/** Markdown dialect of the document being written. */
export const JazzTextFlavorSchema = z.enum(["commonmark", "gfm", "slack"]);
export type JazzTextFlavor = z.infer<typeof JazzTextFlavorSchema>;

/**
 * A local writing-partner voice:
 * - `punctuate`: sentence case, `.?!`, contractions, `i` → `I`, clause commas, proper nouns;
 * - `smart-typography`: curly quotes and dashes in prose;
 * - `chat`: a light touch for conversational / Slack messages.
 */
export const JazzTextVoiceIdSchema = z.enum(["punctuate", "smart-typography", "chat"]);
export type JazzTextVoiceId = z.infer<typeof JazzTextVoiceIdSchema>;

/** Kept and undone edit counts for a writing-partner voice or rule (like `PaintDuetVoiceStats`). */
export const JazzTextVoiceStatsSchema = z.object({
  /** Edits made by this voice or rule that the writer kept. */
  kept: z.number().int().min(0).default(0),
  /** Edits made by this voice or rule that the writer undid or typed over. */
  undone: z.number().int().min(0).default(0)
});
export type JazzTextVoiceStats = z.infer<typeof JazzTextVoiceStatsSchema>;

/** A voice currently playing in the local text duet, with its kept/undone counts per voice and per rule. */
export const JazzTextVoiceStateSchema = z.object({
  voice: JazzTextVoiceIdSchema,
  /** Current strength (0 = off, 1 = full) before this bandleader turn. */
  strength: z.number().min(0).max(1).default(1),
  /** Edits made by this voice that the writer kept. */
  kept: z.number().int().min(0).default(0),
  /** Edits made by this voice that the writer undid or typed over. */
  undone: z.number().int().min(0).default(0),
  /** Kept and undone counts keyed by rule id (e.g. `sentence-case`, `end-stop`, `clause-comma`, `smart-quotes`). */
  rules: z.record(z.string(), JazzTextVoiceStatsSchema).default({})
});
export type JazzTextVoiceState = z.infer<typeof JazzTextVoiceStateSchema>;
export type JazzTextVoiceStateInput = z.input<typeof JazzTextVoiceStateSchema>;

/**
 * Request body for `POST /api/agent/text-lead` (v1).
 *
 * @deprecated Use `JazzTextLeadV2RequestSchema`.
 *
 * Privacy rule: carries only the paragraph at the caret and a small `before` / `after` window,
 * never text outside the context window, and never raw code, math or tables (all replaced with placeholders).
 */
export const JazzTextLeadRequestSchema = z.object({
  /** The paragraph being written, as raw Markdown, with code, math and tables replaced by placeholders. */
  paragraph: z.string().min(1).max(JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS),
  /** A little surrounding context before `paragraph` (e.g. the previous heading and paragraph), with the same exclusions. */
  before: z.string().max(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS).optional(),
  /** A little surrounding context after `paragraph`, with the same exclusions. */
  after: z.string().max(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS).optional(),
  /** Markdown flavour (`commonmark`, `gfm` or `slack`). */
  flavor: JazzTextFlavorSchema.default("gfm"),
  /** The voices currently playing, with kept/undone counts per voice and per rule. */
  voices: z.array(JazzTextVoiceStateSchema).max(10).default([]),
  /** Optional team id to bill fuel against when the caller belongs to the team. */
  teamId: z.string().min(1).max(128).optional()
});
export type JazzTextLeadRequest = z.infer<typeof JazzTextLeadRequestSchema>;
export type JazzTextLeadRequestInput = z.input<typeof JazzTextLeadRequestSchema>;

/** Genre of the paragraph as read by the bandleader. */
export const JazzTextGenreSchema = z.enum(["prose", "notes", "chat", "poem", "list", "technical", "heading"]);
export type JazzTextGenre = z.infer<typeof JazzTextGenreSchema>;

/** A voice in the bandleader's palette and how strongly it should play next. */
export const JazzTextVoiceSchema = z.object({
  voice: JazzTextVoiceIdSchema,
  /** How strongly this voice should play next: 0 turns it off (e.g. no auto-punctuation for a poem), 0.3 is a light touch, 1 is full. */
  strength: z.number().min(0).max(1).default(1),
  /** Specific rules within this voice to hold back for this genre or writer (e.g. `end-stop`, `clause-comma`). */
  disabledRules: z.array(z.string().min(1).max(64)).max(20).optional()
});
export type JazzTextVoice = z.infer<typeof JazzTextVoiceSchema>;

/**
 * A half-open range `[start, end)` in UTF-16 code-unit offsets into `paragraph`,
 * the unit `NSString`, AppKit and JavaScript strings use.
 */
export const JazzTextRangeSchema = z.object({
  /** Start offset in UTF-16 code units from the beginning of `paragraph` (0-based, inclusive). */
  start: z.number().int().min(0),
  /** End offset in UTF-16 code units from the beginning of `paragraph` (`end >= start`, exclusive). */
  end: z.number().int().min(0)
});
export type JazzTextRange = z.infer<typeof JazzTextRangeSchema>;

/** Kind of structural Markdown suggestion offered on pause. */
export const JazzTextSuggestionKindSchema = z.enum(["list", "heading", "math", "title", "alert", "quote"]);
export type JazzTextSuggestionKind = z.infer<typeof JazzTextSuggestionKindSchema>;

/**
 * A structural Markdown suggestion anchored to a UTF-16 range in the request's `paragraph`
 * (turn lines into a list, make a line a heading, wrap an expression in `$…$`, add a title, etc.).
 * Shown as an inline prompt to accept or dismiss, never applied silently.
 */
export const JazzTextSuggestionSchema = z.object({
  kind: JazzTextSuggestionKindSchema,
  /** Range in UTF-16 code-unit offsets into `paragraph` that `replacement` replaces (`0..0` to insert a title at the start). */
  range: JazzTextRangeSchema,
  /** Replacement Markdown for `paragraph.slice(range.start, range.end)`. */
  replacement: z.string().min(1).max(JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS),
  /** Short rationale shown in the inline prompt. */
  why: z.string().min(1).max(200)
});
export type JazzTextSuggestion = z.infer<typeof JazzTextSuggestionSchema>;

/**
 * Response from `POST /api/agent/text-lead` (v1, the text equivalent of `PaintLeadResponse`).
 *
 * @deprecated Use `JazzTextLeadV2ResponseSchema`.
 */
export const JazzTextLeadResponseSchema = z.object({
  /** Detected genre of the paragraph (`prose`, `notes`, `chat`, `poem`, `list`, `technical`, `heading`). */
  genre: JazzTextGenreSchema,
  /** Which voices should play next and how strongly. */
  palette: z.array(JazzTextVoiceSchema).max(6),
  /** At most a few structural suggestions anchored to UTF-16 ranges in `paragraph`. */
  suggestions: z.array(JazzTextSuggestionSchema).max(4).default([]),
  /** One-line rationale from the bandleader, as in `PaintLeadResponse`. */
  why: z.string().max(280),
  /** Remaining fuel balance after the bandleader turn, when metered. */
  fuelBalance: z.number().int().optional()
});
export type JazzTextLeadResponse = z.infer<typeof JazzTextLeadResponseSchema>;
export type JazzTextLeadResponseInput = z.input<typeof JazzTextLeadResponseSchema>;

export const TextLeadRequestSchema = JazzTextLeadRequestSchema;
export type TextLeadRequest = JazzTextLeadRequest;
export const TextLeadResponseSchema = JazzTextLeadResponseSchema;
export type TextLeadResponse = JazzTextLeadResponse;

// --- Text lead v2 (Swash writing partner, jazz on the server) ---
// Jazz runs on the Pixerate server for Swash (Pixerate/jazz#30). The open client sends what happened
// since the last turn (observations, not a summary of its local state) and gets suggested edits
// back, as jazz does on the canvas. It then reports what the writer did with each suggestion
// (`POST /api/agent/text-feedback`, or batched in the next request) so the server can learn.
// Strategies, learning and house style stay on the server. See Pixerate/schemas#87.
//
// Privacy rule (as for v1, restated for the new fields): a request carries only the paragraph at
// the caret and a small `before` / `after` window, never the whole document, and never raw code,
// math or tables (the client replaces those spans with placeholders first). Observations carry
// positions and lengths, not text: a change outside the window is reported only as `elsewhere`,
// pasted or deleted text is never sent, and `replaced` (the few characters a local fix changed) is
// sent only when it sat inside the window and outside any placeholder. Feedback carries ids and
// verdicts only.
//
// Tiers: the same types serve the server tier and the on-device tier (Pixerate/Swash#102). An
// on-device answer fills in only `tier`, `genre` and edits whose `kind` is in
// `JAZZ_TEXT_ON_DEVICE_EDIT_KINDS` (spelling and wrong-word fixes, simple structure hints). Fields
// described as "Server-only" (listed in `JAZZ_TEXT_SERVER_ONLY_FIELDS`) are optional so an
// on-device answer parses; clients must work without them.
//
// Text rules are "rules", never "voices": jazz reserves "voice" for paint.

/** Who answers a text-lead turn: jazz on the Pixerate server, or the on-device model. */
export const JazzTextTierSchema = z.enum(["server", "on-device"]);
export type JazzTextTier = z.infer<typeof JazzTextTierSchema>;

/** Kept and undone counts for one local rule (e.g. `sentence-case`, `end-stop`, `smart-quotes`). */
export const JazzTextRuleStatsSchema = z.object({
  /** Edits made by this rule that the writer kept. */
  kept: z.number().int().min(0).default(0),
  /** Edits made by this rule that the writer undid or typed over. */
  undone: z.number().int().min(0).default(0)
});
export type JazzTextRuleStats = z.infer<typeof JazzTextRuleStatsSchema>;
export type JazzTextRuleStatsInput = z.input<typeof JazzTextRuleStatsSchema>;

/**
 * What happened since the last turn:
 * - `typed` / `pasted` / `deleted`: the writer's own edits;
 * - `fix-applied`: a local rule changed the text at once;
 * - `fix-accepted`: the writer accepted a local fix that was offered;
 * - `fix-undone`: the writer undid or typed over a local fix.
 */
export const JazzTextObservationKindSchema = z.enum(["typed", "pasted", "deleted", "fix-applied", "fix-accepted", "fix-undone"]);
export type JazzTextObservationKind = z.infer<typeof JazzTextObservationKindSchema>;

/**
 * Where a change happened: in the request's `paragraph`, `before` or `after` (with a `range` into
 * that string), or `elsewhere` in the document (no range, no text).
 */
export const JazzTextObservationWhereSchema = z.enum(["paragraph", "before", "after", "elsewhere"]);
export type JazzTextObservationWhere = z.infer<typeof JazzTextObservationWhereSchema>;

/** Maximum UTF-16 code units in `JazzTextObservation.replaced`. */
export const JAZZ_TEXT_MAX_REPLACED_CHARS = 200;

/** One change since the last turn, as positions and lengths (see the privacy rule above). */
export const JazzTextObservationSchema = z.object({
  kind: JazzTextObservationKindSchema,
  where: JazzTextObservationWhereSchema.default("paragraph"),
  /**
   * Where the change is now, in UTF-16 offsets into the string `where` names (absent for
   * `elsewhere`). Inserted or fixed text spans the range; a deletion is an empty range at the point
   * where the text was.
   */
  range: JazzTextRangeSchema.optional(),
  /** UTF-16 code units removed (for `deleted`, or text a paste or fix replaced). */
  removed: z.number().int().min(0).optional(),
  /** For local fixes: the rule id (e.g. `sentence-case`, `end-stop`). */
  rule: z.string().min(1).max(64).optional(),
  /** For local fixes inside the window: the text the fix replaced (e.g. `i` for `I`). Never pasted or deleted text. */
  replaced: z.string().max(JAZZ_TEXT_MAX_REPLACED_CHARS).optional(),
  at: IsoDateTimeSchema.optional()
});
export type JazzTextObservation = z.infer<typeof JazzTextObservationSchema>;
export type JazzTextObservationInput = z.input<typeof JazzTextObservationSchema>;

/**
 * What the writer did with a suggested edit:
 * - `accepted`: applied as offered (or kept, for one applied at once);
 * - `edited`: accepted, then changed;
 * - `dismissed`: turned down;
 * - `ignored`: left until it went stale;
 * - `undone`: applied (at once or on accept), then undone or typed over.
 */
export const JazzTextFeedbackVerdictSchema = z.enum(["accepted", "edited", "dismissed", "ignored", "undone"]);
export type JazzTextFeedbackVerdict = z.infer<typeof JazzTextFeedbackVerdictSchema>;

/** The writer's answer to one suggested edit, by its id. Carries no text. */
export const JazzTextFeedbackItemSchema = z.object({
  /** `JazzTextEdit.id`. */
  editId: z.string().min(1).max(128),
  verdict: JazzTextFeedbackVerdictSchema,
  /** The tier that made the edit. */
  tier: JazzTextTierSchema.default("server"),
  at: IsoDateTimeSchema.optional()
});
export type JazzTextFeedbackItem = z.infer<typeof JazzTextFeedbackItemSchema>;
export type JazzTextFeedbackItemInput = z.input<typeof JazzTextFeedbackItemSchema>;

/**
 * Request body for `POST /api/agent/text-lead` (v2): observations in.
 *
 * Privacy rule: see the section comment. Only `paragraph`, `before`, `after` and fix `replaced`
 * carry text, all from inside the context window with code, math and tables replaced by placeholders.
 */
export const JazzTextLeadV2RequestSchema = z.object({
  /** The paragraph being written, as raw Markdown, with code, math and tables replaced by placeholders. */
  paragraph: z.string().min(1).max(JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS),
  /** A little surrounding context before `paragraph` (e.g. the previous heading and paragraph), with the same exclusions. */
  before: z.string().max(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS).optional(),
  /** A little surrounding context after `paragraph`, with the same exclusions. */
  after: z.string().max(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS).optional(),
  flavor: JazzTextFlavorSchema.default("gfm"),
  /** What changed since the last turn, oldest first. */
  observations: z.array(JazzTextObservationSchema).max(100).default([]),
  /** The local tier's kept/undone counts, keyed by rule id. */
  rules: z.record(z.string(), JazzTextRuleStatsSchema).default({}),
  /** Answers to earlier suggested edits not yet sent to `POST /api/agent/text-feedback`. */
  feedback: z.array(JazzTextFeedbackItemSchema).max(100).default([]),
  /** Who is asked to answer, for telemetry and so the tiers' answers can be compared. */
  tier: JazzTextTierSchema.default("server"),
  /** Optional team id to bill fuel against when the caller belongs to the team. */
  teamId: z.string().min(1).max(128).optional()
});
export type JazzTextLeadV2Request = z.infer<typeof JazzTextLeadV2RequestSchema>;
export type JazzTextLeadV2RequestInput = z.input<typeof JazzTextLeadV2RequestSchema>;

/**
 * - `spelling`, `wrong-word`: fixes (on-device too);
 * - `house-style`, `tone`: server-only;
 * - `structure`: a structural `action` (simple hints on-device).
 */
export const JazzTextEditKindSchema = z.enum(["spelling", "wrong-word", "house-style", "tone", "structure"]);
export type JazzTextEditKind = z.infer<typeof JazzTextEditKindSchema>;

/** Edit kinds an on-device answer may contain (Pixerate/Swash#102). */
export const JAZZ_TEXT_ON_DEVICE_EDIT_KINDS = ["spelling", "wrong-word", "structure"] as const satisfies readonly JazzTextEditKind[];

/**
 * A suggested edit (a riff) anchored to a UTF-16 range in the request's `paragraph`. It carries a
 * `replacement`, a structural `action`, or both (then `replacement` is the exact Markdown and
 * `action` names it).
 */
export const JazzTextEditSchema = z
  .object({
    /** Unique per edit; feedback refers to it. */
    id: z.string().min(1).max(128),
    kind: JazzTextEditKindSchema,
    /** Range in UTF-16 code-unit offsets into `paragraph` that the edit changes (`0..0` to insert at the start). */
    range: JazzTextRangeSchema,
    /** Markdown that replaces `paragraph.slice(range.start, range.end)`; empty to delete. */
    replacement: z.string().max(JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS).optional(),
    /** The structural change (`list`, `heading`, `math`, `title`, `alert`, `quote`), for `kind: "structure"`. */
    action: JazzTextSuggestionKindSchema.optional(),
    confidence: z.number().min(0).max(1),
    /** Short rationale shown with the edit. */
    why: z.string().min(1).max(200),
    /**
     * `assist`: may be applied at once (its own undo step); `suggest`: must be offered.
     * The client may always downgrade `assist` to `suggest`.
     */
    mode: z.enum(["suggest", "assist"]).default("suggest"),
    /** The house-style or local rule behind it, so kept/undone counts can be kept per rule. */
    rule: z.string().min(1).max(64).optional()
  })
  .superRefine((edit, ctx) => {
    if (edit.range.end < edit.range.start) {
      ctx.addIssue({ code: "custom", path: ["range", "end"], message: "`end` must be at least `start`" });
    }
    if (edit.replacement === undefined && edit.action === undefined) {
      ctx.addIssue({ code: "custom", path: ["replacement"], message: "An edit needs a `replacement` or an `action`" });
    }
  });
export type JazzTextEdit = z.infer<typeof JazzTextEditSchema>;
export type JazzTextEditInput = z.input<typeof JazzTextEditSchema>;

/** Response from `POST /api/agent/text-lead` (v2): suggested edits out. */
export const JazzTextLeadV2ResponseSchema = z.object({
  /** Who answered. */
  tier: JazzTextTierSchema,
  /** Genre of the paragraph (`prose`, `notes`, `chat`, `poem`, `list`, `technical`, `heading`). */
  genre: JazzTextGenreSchema,
  /** Suggested edits, most useful first. */
  edits: z.array(JazzTextEditSchema).max(8).default([]),
  /** Server-only. Local rule ids to hold back for this genre or writer (e.g. `end-stop` for a poem). */
  holdBack: z.array(z.string().min(1).max(64)).max(20).optional().describe("Server-only. Local rule ids to hold back for this genre or writer."),
  /** Server-only. One-line rationale for the turn. */
  why: z.string().max(280).optional().describe("Server-only. One-line rationale for the turn."),
  /** Server-only. Remaining fuel balance after the turn, when metered. */
  fuelBalance: z.number().int().optional().describe("Server-only. Remaining fuel balance after the turn, when metered.")
});
export type JazzTextLeadV2Response = z.infer<typeof JazzTextLeadV2ResponseSchema>;
export type JazzTextLeadV2ResponseInput = z.input<typeof JazzTextLeadV2ResponseSchema>;

/** Response fields only the server tier fills in. Edits of kind `house-style` or `tone` are server-only too. */
export const JAZZ_TEXT_SERVER_ONLY_FIELDS = ["holdBack", "why", "fuelBalance"] as const satisfies readonly (keyof JazzTextLeadV2Response)[];

/** Request body for `POST /api/agent/text-feedback`. Free: it costs no fuel. */
export const JazzTextFeedbackRequestSchema = z.object({
  items: z.array(JazzTextFeedbackItemSchema).min(1).max(100),
  teamId: z.string().min(1).max(128).optional()
});
export type JazzTextFeedbackRequest = z.infer<typeof JazzTextFeedbackRequestSchema>;
export type JazzTextFeedbackRequestInput = z.input<typeof JazzTextFeedbackRequestSchema>;

/** Response from `POST /api/agent/text-feedback`. */
export const JazzTextFeedbackResponseSchema = z.object({
  /** Items recorded (unknown or repeated edit ids are skipped). */
  recorded: z.number().int().min(0)
});
export type JazzTextFeedbackResponse = z.infer<typeof JazzTextFeedbackResponseSchema>;

// --- Dream (paint duet) ---
// A dream is an image of where a painting could go, made by an image model from a capture of the
// canvas (`POST /api/agent/paint-dream`). It is reference material: at a later pause the bandleader
// may draw one thing from it as strokes (the *draw* step), and no dream pixel is ever painted or
// proposed. See Pixerate/jazz#31.
//
// Privacy rule: a dream request sends the user's painting to an image model, so a host dreams only
// when the user has turned dreaming on.

/** Maximum characters in a dream or capture data URL (about 6 MB of image). */
export const JAZZ_DREAM_MAX_IMAGE_CHARS = 8_000_000;

/** Maximum characters in the image model's prompt. */
export const JAZZ_DREAM_MAX_PROMPT_CHARS = 4000;

/** Maximum characters in the name of one thing drawn from a dream ("the sun", "two birds"). */
export const JAZZ_DREAM_MAX_ELEMENT_CHARS = 60;

/** A PNG, JPEG or WebP image as a base64 data URL: a capture of the canvas, or a dream of it. */
export const JazzDreamImageSchema = z
  .string()
  .max(JAZZ_DREAM_MAX_IMAGE_CHARS)
  .regex(/^data:image\/(?:png|jpeg|webp);base64,/);
export type JazzDreamImage = z.infer<typeof JazzDreamImageSchema>;

/** The name of one thing the bandleader drew from a dream. */
export const JazzDreamElementSchema = z.string().min(1).max(JAZZ_DREAM_MAX_ELEMENT_CHARS);
export type JazzDreamElement = z.infer<typeof JazzDreamElementSchema>;

/** Request body for `POST /api/agent/paint-dream`: what the image model dreams on. */
export const JazzDreamRequestSchema = z.object({
  /** A capture of the painting as it is now. */
  image: JazzDreamImageSchema,
  /** The image model's prompt (`buildPaintDreamPrompt` in `@pixerate/jazz/agent-core`). */
  prompt: z.string().min(1).max(JAZZ_DREAM_MAX_PROMPT_CHARS),
  /** Optional team id to bill fuel against when the caller belongs to the team. */
  teamId: z.string().min(1).max(128).optional()
});
export type JazzDreamRequest = z.infer<typeof JazzDreamRequestSchema>;

/** Response from `POST /api/agent/paint-dream`. */
export const JazzDreamResponseSchema = z.object({
  /** The dream: the painting with a little more in it. */
  image: JazzDreamImageSchema,
  /** The image model that made it. */
  model: z.string().min(1).max(128).optional(),
  /** Remaining fuel balance after dreaming, when metered. */
  fuelBalance: z.number().int().optional()
});
export type JazzDreamResponse = z.infer<typeof JazzDreamResponseSchema>;

/** Why a dream was dropped: everything useful was drawn from it, the painting moved on, or the painter undid what was drawn from it. */
export const JazzDreamDropReasonSchema = z.enum(["used-up", "stale", "undone"]);
export type JazzDreamDropReason = z.infer<typeof JazzDreamDropReasonSchema>;

/** A dream as jazz keeps it across pauses, until it is used up or the painting has moved on. */
export const JazzDreamSchema = z.object({
  id: z.string().min(1),
  /** The dream itself. Shown to the bandleader (and to the user, if the host chooses); never painted. */
  image: JazzDreamImageSchema,
  /** The image model that made it. */
  model: z.string().min(1).max(128).optional(),
  createdAt: IsoDateTimeSchema,
  /** The painter's strokes since the capture it was dreamt from. */
  strokesSince: z.number().int().min(0).default(0),
  /** What the bandleader's phrases took from it, oldest first. */
  drawn: z.array(JazzDreamElementSchema).max(20).default([])
});
export type JazzDream = z.infer<typeof JazzDreamSchema>;
export type JazzDreamInput = z.input<typeof JazzDreamSchema>;
