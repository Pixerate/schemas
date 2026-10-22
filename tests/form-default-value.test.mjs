import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  BaseFormControlSchema,
  FormControlSchema,
  FormDefaultValueSchema,
  TechnicalFormSchema,
  normalizeFormDefaultValue
} from "../dist/genui.js";
import * as rootExports from "../dist/index.js";

const control = (overrides = {}) => ({ id: "c1", type: "text", label: "Name", ...overrides });
const form = (controls) => ({
  version: 1,
  stages: [{ id: "s1", title: "Stage", sections: [{ id: "sec1", title: "Section", controls }] }]
});

// Collects the paths of every unconstrained (`{}`) subschema.
const findEmptySchemas = (schema, path = "#", out = []) => {
  if (Array.isArray(schema)) {
    schema.forEach((child, i) => findEmptySchemas(child, `${path}/${i}`, out));
  } else if (schema && typeof schema === "object") {
    if (Object.keys(schema).length === 0) out.push(path);
    for (const [key, child] of Object.entries(schema)) {
      if (key === "default" || key === "enum" || key === "required") continue;
      findEmptySchemas(child, `${path}/${key}`, out);
    }
  }
  return out;
};

describe("Form control defaultValue", () => {
  it("re-exports the default value schema and normaliser from root index", () => {
    assert.equal(rootExports.FormDefaultValueSchema, FormDefaultValueSchema);
    assert.equal(rootExports.normalizeFormDefaultValue, normalizeFormDefaultValue);
  });

  it("accepts text, number, checkbox and multiselect defaults unchanged", () => {
    for (const defaultValue of ["Acme", 3, 0, true, false, ["a", "b"], []]) {
      assert.deepEqual(FormControlSchema.parse(control({ defaultValue })), control({ defaultValue }));
    }
  });

  it("keeps defaultValue optional", () => {
    assert.deepEqual(BaseFormControlSchema.parse(control()), control());
    assert.equal(BaseFormControlSchema.parse(control({ defaultValue: null })).defaultValue, undefined);
  });

  it("coerces older stored shapes instead of rejecting them", () => {
    const parse = (defaultValue) => BaseFormControlSchema.parse(control({ defaultValue })).defaultValue;
    assert.deepEqual(parse([1, true, null, "x"]), ["1", "true", "x"]);
    assert.deepEqual(parse([{ name: "Row 1" }]), ['{"name":"Row 1"}']);
    assert.equal(parse({ from: 1, to: 5 }), '{"from":1,"to":5}');
    assert.equal(parse(Number.POSITIVE_INFINITY), "Infinity");
  });

  it("normalises defaults on nested repeater controls", () => {
    const parsed = TechnicalFormSchema.parse(
      form([control({ type: "repeater", itemControls: [control({ id: "c2", defaultValue: { a: 1 } })] })])
    );
    assert.equal(parsed.stages[0].sections[0].controls[0].itemControls[0].defaultValue, '{"a":1}');
  });

  it("emits a bounded JSON Schema for defaultValue", () => {
    const json = zodToJsonSchema(BaseFormControlSchema, { $refStrategy: "none" });
    assert.deepEqual(json.properties.defaultValue, {
      anyOf: [
        { type: "string" },
        { type: "number" },
        { type: "boolean" },
        { type: "array", items: { type: "string" } }
      ]
    });
    assert.ok(!json.required.includes("defaultValue"));
  });

  it("leaves no unconstrained subschema anywhere in TechnicalFormSchema", () => {
    for (const $refStrategy of ["none", "root"]) {
      assert.deepEqual(findEmptySchemas(zodToJsonSchema(TechnicalFormSchema, { $refStrategy })), []);
    }
  });
});
