import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ElicitationRequestSchema,
  ElicitationResponseSchema,
  ElicitationOptionSchema,
  ElicitationBatchSchema,
  ElicitationBatchResponseSchema,
  ELICITATION_MIN_OPTIONS,
  ELICITATION_MAX_OPTIONS,
  ELICITATION_MAX_BATCH_QUESTIONS
} from "../dist/genui.js";
import * as rootExports from "../dist/index.js";

const option = (id, extra = {}) => ({ id, label: `Option ${id}`, ...extra });
const request = (overrides = {}) => ({
  id: "q1",
  question: "Which auth method?",
  type: "single_select",
  options: [option("a", { isRecommended: true }), option("b")],
  ...overrides
});

describe("Structured Elicitation Schemas", () => {
  it("re-exports the elicitation schemas from root index", () => {
    assert.equal(rootExports.ElicitationRequestSchema, ElicitationRequestSchema);
    assert.equal(rootExports.ElicitationBatchSchema, ElicitationBatchSchema);
    assert.equal(rootExports.ElicitationBatchResponseSchema, ElicitationBatchResponseSchema);
    assert.equal(ELICITATION_MIN_OPTIONS, 2);
    assert.equal(ELICITATION_MAX_OPTIONS, 4);
    assert.equal(ELICITATION_MAX_BATCH_QUESTIONS, 4);
  });

  it("accepts an existing single-question payload unchanged", () => {
    const payload = request({ contextRationale: "Needed for login", allowCustomResponse: true });
    assert.deepEqual(ElicitationRequestSchema.parse(payload), payload);
  });

  it("requires 2-4 options for choice questions", () => {
    for (const type of ["single_select", "multi_select", "rank_priorities"]) {
      assert.throws(() => ElicitationRequestSchema.parse(request({ type, options: [option("a")] })), /2 to 4 options/);
      assert.throws(() =>
        ElicitationRequestSchema.parse(request({ type, options: ["a", "b", "c", "d", "e"].map((id) => option(id)) }))
      );
      assert.ok(ElicitationRequestSchema.safeParse(request({ type, options: ["a", "b", "c", "d"].map((id) => option(id)) })).success);
    }
  });

  it("allows free_form questions without options", () => {
    assert.ok(ElicitationRequestSchema.safeParse(request({ type: "free_form", options: [] })).success);
  });

  it("accepts a header of up to 12 characters", () => {
    assert.ok(ElicitationRequestSchema.safeParse(request({ header: "Auth method" })).success);
    assert.ok(ElicitationRequestSchema.safeParse(request({ header: "123456789012" })).success);
    assert.equal(ElicitationRequestSchema.safeParse(request({ header: "1234567890123" })).success, false);
  });

  it("allows option previews only on single_select questions", () => {
    const options = [option("a", { preview: "const x = 1;" }), option("b")];
    assert.equal(ElicitationOptionSchema.parse(options[0]).preview, "const x = 1;");
    assert.ok(ElicitationRequestSchema.safeParse(request({ options })).success);
    const result = ElicitationRequestSchema.safeParse(request({ type: "multi_select", options }));
    assert.equal(result.success, false);
    assert.deepEqual(result.error.issues[0].path, ["options", 0, "preview"]);
  });

  it("leaves ElicitationResponseSchema unchanged", () => {
    const payload = { requestId: "q1", selectedOptionIds: ["a"], customText: "x", rankings: ["a", "b"] };
    assert.deepEqual(ElicitationResponseSchema.parse(payload), payload);
  });

  it("validates a batch of 1-4 questions with unique ids", () => {
    const q = (id) => request({ id });
    assert.ok(ElicitationBatchSchema.safeParse({ id: "b1", questions: [q("q1")] }).success);
    assert.ok(ElicitationBatchSchema.safeParse({ id: "b1", questions: ["q1", "q2", "q3", "q4"].map(q) }).success);
    assert.equal(ElicitationBatchSchema.safeParse({ id: "b1", questions: [] }).success, false);
    assert.equal(ElicitationBatchSchema.safeParse({ id: "b1", questions: ["q1", "q2", "q3", "q4", "q5"].map(q) }).success, false);
    const dup = ElicitationBatchSchema.safeParse({ id: "b1", questions: [q("q1"), q("q1")] });
    assert.equal(dup.success, false);
    assert.match(dup.error.issues[0].message, /Duplicate question id "q1"/);
  });

  it("applies per-question rules inside a batch", () => {
    const bad = request({ id: "q2", options: [option("a")] });
    assert.equal(ElicitationBatchSchema.safeParse({ id: "b1", questions: [request(), bad] }).success, false);
  });

  it("validates a batch response with unique requestIds", () => {
    const r = (requestId) => ({ requestId, selectedOptionIds: ["a"] });
    assert.ok(ElicitationBatchResponseSchema.safeParse({ batchId: "b1", responses: [r("q1"), r("q2")] }).success);
    assert.equal(ElicitationBatchResponseSchema.safeParse({ batchId: "b1", responses: [] }).success, false);
    assert.equal(ElicitationBatchResponseSchema.safeParse({ batchId: "b1", responses: [r("q1"), r("q1")] }).success, false);
  });
});
