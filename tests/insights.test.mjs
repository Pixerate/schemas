import test from "node:test";
import assert from "node:assert/strict";
import {
  IngestBatchSchema,
  SessionSummarySchema,
  FindingSchema
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
