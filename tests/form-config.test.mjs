import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  FormConfigSchema,
  FormHandoffActionSchema,
  FormValidatorSchema,
  TechnicalFormSchema,
  normalizeFormConfig
} from "../dist/genui.js";
import * as rootExports from "../dist/index.js";

const form = (overrides = {}) => ({
  version: 1,
  stages: [
    {
      id: "s1",
      title: "Stage",
      sections: [{ id: "sec1", title: "Section", controls: [{ id: "c1", type: "text", label: "Name" }] }]
    }
  ],
  ...overrides
});

// Collects the paths of every unconstrained (`{}`) subschema.
const findEmptySchemas = (schema, path = "#", out = []) => {
  if (schema && typeof schema === "object" && !Array.isArray(schema)) {
    if (Object.keys(schema).length === 0) out.push(path);
    for (const [key, child] of Object.entries(schema)) {
      if (key === "default" || key === "enum" || key === "required") continue;
      findEmptySchemas(child, `${path}/${key}`, out);
    }
  } else if (Array.isArray(schema)) {
    schema.forEach((child, i) => findEmptySchemas(child, `${path}/${i}`, out));
  }
  return out;
};

describe("Form config schemas", () => {
  it("re-exports the config schema and normaliser from root index", () => {
    assert.equal(rootExports.FormConfigSchema, FormConfigSchema);
    assert.equal(rootExports.normalizeFormConfig, normalizeFormConfig);
  });

  it("accepts a flat config of scalars unchanged", () => {
    const action = { id: "h1", destination: "CRM", config: { url: "https://x", retries: 3, notify: true } };
    assert.deepEqual(FormHandoffActionSchema.parse(action), action);
    const validator = { id: "v1", type: "range", config: { min: 0, max: 10 } };
    assert.deepEqual(FormValidatorSchema.parse(validator), validator);
  });

  it("keeps config optional", () => {
    assert.deepEqual(FormHandoffActionSchema.parse({ id: "h1" }), { id: "h1" });
    assert.deepEqual(FormValidatorSchema.parse({ id: "v1" }), { id: "v1" });
  });

  it("coerces older stored config shapes instead of rejecting them", () => {
    const parsed = FormHandoffActionSchema.parse({
      id: "h1",
      config: { headers: { a: "b" }, tags: ["x", "y"], empty: null, n: 2 }
    });
    assert.deepEqual(parsed.config, { headers: '{"a":"b"}', tags: '["x","y"]', n: 2 });

    assert.equal(FormHandoffActionSchema.parse({ id: "h1", config: null }).config, undefined);
    assert.deepEqual(FormValidatorSchema.parse({ id: "v1", config: "strict" }).config, { value: "strict" });
    assert.deepEqual(FormValidatorSchema.parse({ id: "v1", config: [1, 2] }).config, { value: "[1,2]" });
  });

  it("parses a stored technical form with legacy config", () => {
    const parsed = TechnicalFormSchema.parse(
      form({
        validators: [{ id: "v1", config: { rule: { op: "gt", value: 1 } } }],
        handoffActions: [{ id: "h1", payloadFields: ["c1"], config: { target: "crm", mapping: { c1: "name" } } }]
      })
    );
    assert.deepEqual(parsed.validators[0].config, { rule: '{"op":"gt","value":1}' });
    assert.deepEqual(parsed.handoffActions[0].config, { target: "crm", mapping: '{"c1":"name"}' });
  });

  it("emits a bounded JSON Schema for config", () => {
    const json = zodToJsonSchema(FormHandoffActionSchema, { $refStrategy: "none" });
    assert.deepEqual(json.properties.config, {
      type: "object",
      additionalProperties: { type: ["string", "number", "boolean"] }
    });
    assert.ok(!(json.required ?? []).includes("config"));
  });

  it("leaves no config field unconstrained inside TechnicalFormSchema", () => {
    const json = zodToJsonSchema(TechnicalFormSchema, { $refStrategy: "none" });
    const empty = findEmptySchemas(json).filter((path) => path.endsWith("/config"));
    assert.deepEqual(empty, []);
  });
});
