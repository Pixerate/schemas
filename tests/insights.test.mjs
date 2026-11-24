import test from "node:test";
import assert from "node:assert/strict";
import {
  IngestBatchSchema,
  SessionSummarySchema,
  FindingSchema,
  FlowSpecSchema,
  FlowProgressSchema,
  OpportunitySchema,
  OpportunityStatusUpdateSchema
} from "../dist/insights.js";

test("IngestBatchSchema accepts valid session batch without GA4 100-char limit", () => {
  const longNarrativeTarget = "A".repeat(250);
  const parsed = IngestBatchSchema.parse({
    session_id: "s_001",
    product: "slopmachine",
    actor: { type: "human", id_hash: "u_abcdef1234567890" },
    context: {
      userCohort: "new",
      accountAgeDays: 1,
      rolePreference: "creative",
      statedGoal: longNarrativeTarget
    },
    events: [
      {
        session_id: "s_001",
        actor: { type: "human", id_hash: "u_abcdef1234567890" },
        ts: "2026-11-17T13:00:00.000Z",
        screen: "/silo/123",
        action: "click",
        target: { role: "button", name: "Generate" },
        outcome: "navigated"
      }
    ],
    signals: [
      {
        session_id: "s_001",
        type: "hesitation",
        screen: "/silo/123",
        duration_ms: 45000
      }
    ],
    ended: false
  });
  assert.equal(parsed.session_id, "s_001");
  assert.equal(parsed.context?.userCohort, "new");
});

test("IngestBatchSchema rejects email PII in payload", () => {
  assert.throws(() => {
    IngestBatchSchema.parse({
      session_id: "s_002",
      product: "slopmachine",
      actor: { type: "human", id_hash: "u_123" },
      events: [
        {
          session_id: "s_002",
          actor: { type: "human", id_hash: "u_123" },
          ts: "2026-11-17T13:00:00.000Z",
          screen: "/account",
          action: "click",
          target: { role: "button", name: "alice@example.com" }
        }
      ]
    });
  }, /PII detected/);
});

test("SessionSummarySchema and FindingSchema validate cleanly", () => {
  const summary = SessionSummarySchema.parse({
    session_id: "s_001",
    product: "slopmachine",
    actor_type: "human",
    actor_id_hash: "u_abcdef1234567890",
    user_cohort: "returning",
    outcome: "abandoned",
    narrative: "User opened pipeline editor, hit a validation error twice, and left.",
    friction_points: [{ screen: "/silo/123", type: "error", description: "Missing variable" }],
    confidence: 0.82
  });
  assert.equal(summary.user_cohort, "returning");

  const finding = FindingSchema.parse({
    id: "f_001",
    product: "slopmachine",
    title: "Missing variable error blocks pipeline run",
    cohort: "returning_users",
    user_segment: "returning",
    affected_share: 0.25,
    evidence: ["s_001"],
    severity: "high",
    suggested_fix: "Highlight missing template variables inline before enabling Run."
  });
  assert.equal(finding.status, "open");
});

test("insights schemas are re-exported from the package root", async () => {
  const root = await import("../dist/index.js");
  assert.equal(root.IngestBatchSchema, IngestBatchSchema);
  assert.deepEqual(root.InsightsActorTypeSchema.options, ["human", "agent"]);
  // realtime's ActorTypeSchema keeps its own meaning
  assert.deepEqual(root.ActorTypeSchema.options, ["human", "agent", "system"]);
});

test("IngestBatchSchema accepts milestone events and rejects invalid milestone names", () => {
  const parsed = IngestBatchSchema.parse({
    session_id: "s_ms_1",
    product: "slopmachine",
    actor: { type: "human", id_hash: "u_123" },
    events: [
      {
        session_id: "s_ms_1",
        actor: { type: "human", id_hash: "u_123" },
        ts: "2026-11-19T12:00:00.000Z",
        screen: "/",
        action: "milestone",
        milestone: { name: "onboarding.step.role", props: { step: 2, skipped: false, role: "creative" } },
        outcome: "mutated"
      }
    ]
  });
  assert.equal(parsed.events[0].milestone?.name, "onboarding.step.role");

  assert.throws(() => {
    IngestBatchSchema.parse({
      session_id: "s_ms_2",
      product: "slopmachine",
      actor: { type: "human", id_hash: "u_123" },
      events: [
        {
          session_id: "s_ms_2",
          actor: { type: "human", id_hash: "u_123" },
          ts: "2026-11-19T12:00:00.000Z",
          screen: "/",
          action: "milestone",
          milestone: { name: "Invalid Name!" }
        }
      ]
    });
  });

  const milestoneBatch = (milestone) => ({
    session_id: "s_ms_3",
    product: "slopmachine",
    actor: { type: "human", id_hash: "u_123" },
    events: [
      {
        session_id: "s_ms_3",
        actor: { type: "human", id_hash: "u_123" },
        ts: "2026-11-19T12:00:00.000Z",
        screen: "/",
        action: "milestone",
        ...(milestone ? { milestone } : {})
      }
    ]
  });

  // A milestone event without its payload
  assert.throws(() => IngestBatchSchema.parse(milestoneBatch(undefined)), /milestone payload/);
  // More than 10 prop keys
  const tooMany = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [`k${i}`, i]));
  assert.throws(() => IngestBatchSchema.parse(milestoneBatch({ name: "a.b", props: tooMany })), /at most 10 keys/);
  // Prop keys must be short snake_case identifiers
  assert.throws(() => IngestBatchSchema.parse(milestoneBatch({ name: "a.b", props: { "Free Text Key": 1 } })));
});

test("FlowSpecSchema, flow_progress on SessionSummary, and flow_id on Finding validate cleanly", () => {
  const spec = FlowSpecSchema.parse({
    id: "onboarding",
    version: 1,
    intent: "Complete initial workspace setup",
    entry: { milestone: "onboarding.started" },
    steps: [
      { id: "identity", milestone: "onboarding.step.identity" },
      { id: "role", milestone: "onboarding.step.role" }
    ],
    success: { milestone: "onboarding.completed" },
    exits: { skipped: { milestone: "onboarding.skipped" } },
    expectedDurationSec: 120,
    notes: "Users may pause on role selection"
  });
  assert.equal(spec.version, 1);

  const progress = FlowProgressSchema.parse({
    flow_id: "onboarding",
    flow_version: 1,
    entered: true,
    steps_completed: ["identity", "role"],
    furthest_step: "role",
    result: "exited",
    exit: "skipped",
    duration_ms: 42000
  });
  assert.equal(progress.result, "exited");

  const summary = SessionSummarySchema.parse({
    session_id: "s_flow_1",
    product: "slopmachine",
    actor_type: "human",
    actor_id_hash: "u_1",
    outcome: "abandoned",
    narrative: "Exited onboarding at step 2.",
    flow_progress: [progress],
    confidence: 0.9
  });
  assert.equal(summary.flow_progress?.length, 1);

  const finding = FindingSchema.parse({
    id: "f_flow_1",
    product: "slopmachine",
    title: "Onboarding funnel (v1)",
    cohort: "all_users",
    affected_share: 0.4,
    evidence: ["s_flow_1"],
    severity: "medium",
    suggested_fix: "Clarify role step.",
    flow_id: "onboarding"
  });
  assert.equal(finding.flow_id, "onboarding");
});

test("OpportunitySchema applies defaults and enforces evidence limits", () => {
  const base = {
    id: "opp_slopmachine_1a2b3c4d",
    product: "slopmachine",
    title: "Reduce drop-off at workspace creation",
    problem: "Sessions abandon onboarding at the workspace step.",
    metrics: { sessions_affected: 12, share_of_sessions: 0.6 },
    score: 0.81,
    score_parts: { reach: 0.6, severity: 0.9, trend: 0.5 },
    created_at: "2026-11-23T00:00:00.000Z",
    updated_at: "2026-11-23T00:00:00.000Z",
    week: "2026-W48"
  };
  const opp = OpportunitySchema.parse(base);
  assert.equal(opp.status, "open");
  assert.deepEqual(opp.screens, []);
  assert.deepEqual(opp.example_narratives, []);

  assert.throws(() => OpportunitySchema.parse({ ...base, example_narratives: ["a", "b", "c", "d"] }));
  assert.throws(() => OpportunitySchema.parse({ ...base, score: 1.2 }));
  assert.throws(() => OpportunitySchema.parse({ ...base, week: "2026-48" }));

  assert.equal(OpportunityStatusUpdateSchema.parse({ id: "opp_1", status: "drafted" }).status, "drafted");
  assert.throws(() => OpportunityStatusUpdateSchema.parse({ id: "opp_1", status: "done" }));
});
