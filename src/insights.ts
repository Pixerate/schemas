import { z } from "zod";
import { validateNoPii } from "./analytics.js";

/**
 * Insights & Session Analytics Schemas (@pixerate/schemas/insights)
 *
 * Shared contracts for @pixerate/piggyback and consumer dashboards (SlopStats).
 * Kept separate from analytics.ts (which enforces GA4 param/length limits),
 * while reusing its PII guards.
 */

// Named `InsightsActorType` because `ActorTypeSchema` in ./realtime.ts already means
// "human" | "agent" | "system"; a shared name would be dropped from json-schema/ and
// would clash in the root re-export.
export const InsightsActorTypeSchema = z.enum(["human", "agent"]);
export type InsightsActorType = z.infer<typeof InsightsActorTypeSchema>;

export const UserCohortSchema = z.enum(["new", "returning"]);
export type UserCohort = z.infer<typeof UserCohortSchema>;

export const InsightsActorSchema = z.object({
  type: InsightsActorTypeSchema,
  id_hash: z.string().min(1)
});
export type InsightsActor = z.infer<typeof InsightsActorSchema>;

export const SignalTypeSchema = z.enum([
  "hesitation",
  "loop",
  "rage_click",
  "error",
  "backtrack",
  "abandon_flow",
  "dead_end",
  "goal_mismatch"
]);
export type SignalType = z.infer<typeof SignalTypeSchema>;

export const InteractionOutcomeSchema = z.enum([
  "navigated",
  "mutated",
  "no_op",
  "errored",
  "dismissed",
  "unknown"
]);
export type InteractionOutcome = z.infer<typeof InteractionOutcomeSchema>;

export const InteractionTargetSchema = z.object({
  role: z.string().min(1),
  name: z.string().optional(),
  pbId: z.string().optional()
});
export type InteractionTarget = z.infer<typeof InteractionTargetSchema>;

export type MilestonePropValue = string | number | boolean;

export const MilestonePayloadSchema = z.object({
  name: z
    .string()
    .regex(/^[a-z0-9_]+(\.[a-z0-9_]+)*$/)
    .max(64),
  props: z
    .record(
      z.string().regex(/^[a-z0-9_]{1,32}$/),
      z.union([z.string().max(64), z.number(), z.boolean()])
    )
    .refine((props) => Object.keys(props).length <= 10, {
      message: "Milestone props allow at most 10 keys"
    })
    .optional()
});
export type MilestonePayload = z.infer<typeof MilestonePayloadSchema>;

export const InteractionEventSchema = z.object({
  session_id: z.string().min(1),
  actor: InsightsActorSchema,
  ts: z.string().min(1),
  screen: z.string().min(1),
  action: z.enum(["click", "submit", "navigate", "input_blur", "error", "custom", "milestone"]),
  target: InteractionTargetSchema.optional(),
  milestone: MilestonePayloadSchema.optional(),
  outcome: InteractionOutcomeSchema.default("unknown"),
  state_ref: z.string().optional(),
  flow: z.string().optional()
});
export type InteractionEvent = z.infer<typeof InteractionEventSchema>;

export const VisibleElementSchema = z.object({
  role: z.string().min(1),
  name: z.string().optional()
});
export type VisibleElement = z.infer<typeof VisibleElementSchema>;

export const StateSnapshotSchema = z.object({
  state_ref: z.string().min(1),
  ts: z.string().min(1).optional(),
  screen: z.string().min(1),
  flags: z.array(z.string()).default([]),
  visible: z.array(VisibleElementSchema).default([]),
  errors: z.array(z.string()).default([])
});
export type StateSnapshot = z.infer<typeof StateSnapshotSchema>;

export const SignalSchema = z.object({
  session_id: z.string().min(1),
  type: SignalTypeSchema,
  screen: z.string().min(1),
  ts: z.string().min(1).optional(),
  duration_ms: z.number().nonnegative().optional(),
  count: z.number().int().positive().optional(),
  flow: z.string().optional(),
  detail: z.string().optional()
});
export type Signal = z.infer<typeof SignalSchema>;

export const SessionContextSchema = z.object({
  userCohort: UserCohortSchema.optional(),
  accountAgeDays: z.number().nonnegative().optional(),
  rolePreference: z.string().optional(),
  statedGoal: z.string().optional(),
  activeFlows: z.array(z.string()).optional(),
  plan: z.string().optional(),
  teamIdHash: z.string().optional()
});
export type SessionContext = z.infer<typeof SessionContextSchema>;

export const BaseIngestBatchSchema = z.object({
  session_id: z.string().min(1),
  product: z.string().min(1),
  actor: InsightsActorSchema,
  context: SessionContextSchema.optional(),
  events: z.array(InteractionEventSchema).default([]),
  snapshots: z.array(StateSnapshotSchema).default([]),
  signals: z.array(SignalSchema).default([]),
  ended: z.boolean().default(false),
  sent_at: z.string().min(1).optional()
});

export const IngestBatchSchema = BaseIngestBatchSchema.superRefine((batch, ctx) => {
  validateNoPii(batch, [], ctx, {
    target: ["name"],
    visible: ["name"],
    milestone: ["name"]
  });
  batch.events.forEach((event, index) => {
    if (event.action === "milestone" && !event.milestone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Milestone events must include a milestone payload",
        path: ["events", index, "milestone"]
      });
    }
  });
});
export type IngestBatch = z.infer<typeof BaseIngestBatchSchema>;

export const SessionOutcomeSchema = z.enum([
  "activated",
  "progressed",
  "abandoned",
  "errored",
  "bounced",
  "unknown"
]);
export type SessionOutcome = z.infer<typeof SessionOutcomeSchema>;

export const FrictionPointSchema = z.object({
  screen: z.string().min(1),
  type: SignalTypeSchema,
  description: z.string().optional(),
  flow: z.string().optional()
});
export type FrictionPoint = z.infer<typeof FrictionPointSchema>;

export const ProbeAnswerSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});
export type ProbeAnswer = z.infer<typeof ProbeAnswerSchema>;

export const FlowMatcherSchema = z.object({
  milestone: z.string().min(1).optional(),
  screen: z.string().min(1).optional()
});
export type FlowMatcher = z.infer<typeof FlowMatcherSchema>;

export const FlowStepSpecSchema = z.object({
  id: z.string().min(1),
  milestone: z.string().min(1).optional(),
  screen: z.string().min(1).optional(),
  optional: z.boolean().optional()
});
export type FlowStepSpec = z.infer<typeof FlowStepSpecSchema>;

export const FlowExitSpecSchema = z.object({
  milestone: z.string().min(1)
});
export type FlowExitSpec = z.infer<typeof FlowExitSpecSchema>;

export const FlowSpecSchema = z.object({
  id: z.string().min(1),
  version: z.number().int().positive(),
  intent: z.string().min(1),
  entry: FlowMatcherSchema,
  steps: z.array(FlowStepSpecSchema),
  success: FlowMatcherSchema,
  exits: z.record(z.string(), FlowExitSpecSchema).optional(),
  expectedDurationSec: z.number().positive().optional(),
  notes: z.string().optional()
});
export type FlowSpec = z.infer<typeof FlowSpecSchema>;

export const FlowProgressResultSchema = z.enum([
  "succeeded",
  "exited",
  "abandoned",
  "in_progress"
]);
export type FlowProgressResult = z.infer<typeof FlowProgressResultSchema>;

export const FlowProgressSchema = z.object({
  flow_id: z.string().min(1),
  flow_version: z.number().int().positive(),
  entered: z.boolean(),
  steps_completed: z.array(z.string()).default([]),
  furthest_step: z.string().optional(),
  result: FlowProgressResultSchema,
  exit: z.string().optional(),
  duration_ms: z.number().nonnegative().optional()
});
export type FlowProgress = z.infer<typeof FlowProgressSchema>;

export const SessionSummarySchema = z.object({
  session_id: z.string().min(1),
  product: z.string().min(1),
  actor_type: InsightsActorTypeSchema,
  actor_id_hash: z.string().min(1),
  user_cohort: UserCohortSchema.default("returning"),
  role_preference: z.string().optional(),
  stated_goal: z.string().optional(),
  outcome: SessionOutcomeSchema,
  narrative: z.string().min(1),
  friction_points: z.array(FrictionPointSchema).default([]),
  probe_answers: z.array(ProbeAnswerSchema).default([]),
  flow_progress: z.array(FlowProgressSchema).optional(),
  confidence: z.number().min(0).max(1),
  started_at: z.string().min(1).optional(),
  ended_at: z.string().min(1).optional(),
  event_count: z.number().int().nonnegative().default(0),
  signal_count: z.number().int().nonnegative().default(0)
});
export type SessionSummary = z.infer<typeof SessionSummarySchema>;

export const FindingSeveritySchema = z.enum(["low", "medium", "high", "critical"]);
export type FindingSeverity = z.infer<typeof FindingSeveritySchema>;

export const FindingStatusSchema = z.enum(["open", "acknowledged", "resolved", "dismissed"]);
export type FindingStatus = z.infer<typeof FindingStatusSchema>;

export const FindingUserSegmentSchema = z.enum(["new", "returning", "all"]);
export type FindingUserSegment = z.infer<typeof FindingUserSegmentSchema>;

export const FindingSchema = z.object({
  id: z.string().min(1),
  product: z.string().min(1),
  title: z.string().min(1),
  cohort: z.string().min(1),
  user_segment: FindingUserSegmentSchema.default("all"),
  affected_share: z.number().min(0).max(1),
  evidence: z.array(z.string().min(1)).min(1),
  severity: FindingSeveritySchema,
  suggested_fix: z.string().min(1),
  status: FindingStatusSchema.default("open"),
  flow_id: z.string().min(1).optional(),
  created_at: z.string().min(1).optional(),
  updated_at: z.string().min(1).optional()
});
export type Finding = z.infer<typeof FindingSchema>;

// --- Opportunities ---
// Weekly, ranked, evidence-backed problems worth fixing, synthesized per product from findings
// and session summaries (piggyback's `OpportunitySynthesizer`). Aggregated only: no raw sessions,
// no actor ids. `example_narratives` are copied from session summaries, which are already redacted.

export const OpportunityStatusSchema = z.enum(["open", "drafted", "accepted", "rejected", "resolved"]);
export type OpportunityStatus = z.infer<typeof OpportunityStatusSchema>;

/** A drop between two steps of a flow, as shares (0–1) of sessions that entered the flow. */
export const OpportunityFunnelDropSchema = z.object({
  flow_id: z.string().min(1),
  /** The flow spec's version, as text. */
  flow_version: z.string().optional(),
  /** The step people drop out at. */
  step: z.string().min(1),
  /** Share of entered sessions that reached the step before. */
  before: z.number().min(0).max(1),
  /** Share of entered sessions that completed this step. */
  after: z.number().min(0).max(1)
});
export type OpportunityFunnelDrop = z.infer<typeof OpportunityFunnelDropSchema>;

/** The week's measurements behind an opportunity. */
export const OpportunityMetricsSchema = z.object({
  sessions_affected: z.number().int().min(0),
  /** Share (0–1) of the week's sessions affected. */
  share_of_sessions: z.number().min(0).max(1),
  /** Change against the previous week, as a fraction (`0.35` is 35% more). */
  trend_vs_prev_week: z.number().optional(),
  funnel_drop: OpportunityFunnelDropSchema.optional()
});
export type OpportunityMetrics = z.infer<typeof OpportunityMetricsSchema>;

/** The parts of an opportunity's score, each 0–1. */
export const OpportunityScorePartsSchema = z.object({
  reach: z.number().min(0).max(1),
  severity: z.number().min(0).max(1),
  trend: z.number().min(0).max(1)
});
export type OpportunityScoreParts = z.infer<typeof OpportunityScorePartsSchema>;

export const OpportunitySchema = z.object({
  /** Stable across weeks: a hash of `product` and the problem key, so re-runs update the same record. */
  id: z.string().min(1),
  product: z.string().min(1),
  title: z.string().min(1),
  /** What goes wrong, as Markdown (two to five sentences). */
  problem: z.string().min(1),
  /** Markdown. */
  suggested_direction: z.string().optional(),
  metrics: OpportunityMetricsSchema,
  /** 0–1: reach, severity and trend together. Higher is more worth fixing. */
  score: z.number().min(0).max(1),
  score_parts: OpportunityScorePartsSchema,
  /** Normalized route templates (e.g. `/silo/:id/bucket`). */
  screens: z.array(z.string().min(1)).default([]),
  flow_id: z.string().min(1).optional(),
  /** Ids of existing findings that support it. */
  finding_ids: z.array(z.string().min(1)).default([]),
  /** At most three, word for word from (already redacted) session summaries. */
  example_narratives: z.array(z.string()).max(3).default([]),
  status: OpportunityStatusSchema.default("open"),
  /** The task system's id for it (e.g. an Uchiage task). */
  external_ref: z.string().optional(),
  status_reason: z.string().optional(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
  /** ISO week, e.g. `2026-W48`. */
  week: z.string().regex(/^\d{4}-W\d{2}$/)
});
export type Opportunity = z.infer<typeof OpportunitySchema>;

/** Body of a status update sent to a host's opportunities route (`PATCH`). */
export const OpportunityStatusUpdateSchema = z.object({
  id: z.string().min(1),
  status: OpportunityStatusSchema,
  external_ref: z.string().optional(),
  reason: z.string().optional()
});
export type OpportunityStatusUpdate = z.infer<typeof OpportunityStatusUpdateSchema>;
