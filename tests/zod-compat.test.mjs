import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import { NotificationPreferencesSchema } from "../dist/index.js";
import { JazzPolicySchema } from "../dist/jazz.js";

// Runs against whichever zod is installed: zod 3 in the main CI step, zod 4 in the follow-up step.
const zodMajor = "_zod" in z.string() ? 4 : 3;

describe(`zod ${zodMajor} compatibility`, () => {
  it("keeps enum-keyed records partial (zod 4 makes z.record(enum, …) exhaustive)", () => {
    const parsed = NotificationPreferencesSchema.parse({ userId: "u1", channels: { mention: {} } });
    assert.deepEqual(Object.keys(parsed.channels), ["mention"]);
    assert.equal(parsed.channels.mention.email, true);
    assert.equal(NotificationPreferencesSchema.safeParse({ userId: "u1", channels: { nope: {} } }).success, false);
  });

  it("fills nested object defaults from an empty default (zod 4 needs .prefault)", () => {
    const policy = JazzPolicySchema.parse({});
    assert.deepEqual(policy.tempo, { idleMs: 1500, minGapMs: 8000 });
    assert.deepEqual(policy.budget, { maxRiffsPerMinute: 3, maxPending: 3, cooldownAfterRejectMs: 30_000 });
  });
});
