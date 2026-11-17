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

export const InteractionEventSchema = z.object({
  session_id: z.string().min(1),
  actor: InsightsActorSchema,
  ts: z.string().min(1),
  screen: z.string().min(1),
  action: z.enum(["click", "submit", "navigate", "input_blur", "error", "custom"]),
  target: InteractionTargetSchema.optional(),
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
  validateNoPii(batch, [], ctx, { target: ["name"], visible: ["name"] });
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
  created_at: z.string().min(1).optional(),
  updated_at: z.string().min(1).optional()
});
export type Finding = z.infer<typeof FindingSchema>;
