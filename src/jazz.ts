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
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(JazzJsonValueSchema), z.record(JazzJsonValueSchema)])
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
  arguments: z.record(JazzJsonValueSchema).default({})
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
 * - `metric`: a value from a metrics digest (`api.p95`).
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
  labels: z.array(z.string().min(1)).max(20).default([])
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
 */
export const JazzProposalKindSchema = z.enum(["new-capability", "follow-up", "interop", "agent-path"]);
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

// --- Text lead (Swash writing partner) ---
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
  rules: z.record(JazzTextVoiceStatsSchema).default({})
});
export type JazzTextVoiceState = z.infer<typeof JazzTextVoiceStateSchema>;
export type JazzTextVoiceStateInput = z.input<typeof JazzTextVoiceStateSchema>;

/**
 * Request body for `POST /api/agent/text-lead`.
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

/** Response from `POST /api/agent/text-lead` (the text equivalent of `PaintLeadResponse`). */
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

