import { z } from "zod";

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

export const JazzTargetKindSchema = z.enum(["node", "edge", "layer", "text", "cell", "other"]);
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
  tempo: z
    .object({
      /** Quiet time (ms) that ends a phrase. */
      idleMs: z.number().int().min(200).max(60_000).default(1500),
      /** Least time (ms) between two riffs. */
      minGapMs: z.number().int().min(0).max(600_000).default(8000)
    })
    .default({}),
  budget: z
    .object({
      maxRiffsPerMinute: z.number().int().min(0).max(60).default(3),
      /** Most riffs waiting for the user at once. */
      maxPending: z.number().int().min(0).max(20).default(3),
      /** Pause (ms) after the user dismisses a riff. */
      cooldownAfterRejectMs: z.number().int().min(0).max(3_600_000).default(30_000)
    })
    .default({}),
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
