import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  RelayHostRecordSchema,
  RelayCallRecordSchema,
  RelayResultRecordSchema
} from "../dist/realtime.js";
import * as root from "../dist/index.js";

describe("relay records", () => {
  it("accept hosts with app-defined info as JSON text", () => {
    const host = { id: "tab-1", ownerId: "usr_1", info: JSON.stringify({ tools: [] }), startedAt: 1, heartbeatAt: 2 };
    assert.deepEqual(RelayHostRecordSchema.parse(host), host);
    assert.equal(RelayHostRecordSchema.safeParse({ ...host, ownerId: "" }).success, false);
    assert.equal(RelayHostRecordSchema.safeParse({ id: "tab-1", info: "{}" }).success, false);
    // Application data is JSON text, never a raw object.
    assert.equal(RelayHostRecordSchema.safeParse({ ...host, info: { tools: [] } }).success, false);
  });

  it("accept calls with an optional caller and deadline", () => {
    assert.equal(RelayCallRecordSchema.safeParse({ id: "c1", payload: "{\"name\":\"x\"}", at: 1 }).success, true);
    assert.equal(
      RelayCallRecordSchema.safeParse({ id: "c1", payload: "null", at: 1, callerId: "key_1", deadline: 9 }).success,
      true
    );
    assert.equal(RelayCallRecordSchema.safeParse({ id: "", payload: "null", at: 1 }).success, false);
  });

  it("accept results that succeeded or failed", () => {
    assert.equal(RelayResultRecordSchema.safeParse({ id: "c1", ok: true, payload: "{\"a\":1}", at: 2 }).success, true);
    assert.equal(RelayResultRecordSchema.safeParse({ id: "c1", ok: false, error: "gone", at: 2 }).success, true);
    assert.equal(RelayResultRecordSchema.safeParse({ id: "c1", at: 2 }).success, false);
  });

  it("are exported from the root entry too", () => {
    assert.equal(root.RelayHostRecordSchema, RelayHostRecordSchema);
  });
});
