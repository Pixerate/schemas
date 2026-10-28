import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ChartThemeTokenSchema,
  ChartValueFormatSchema,
  ChartSeriesSchema,
  ChartBlockSchema,
  SvgValidationCheckSchema,
  ComponentSynthesisSchema
} from "../dist/genui.js";
import * as rootExports from "../dist/index.js";

describe("GenUI Hardening Schemas (Follow-up Plan)", () => {
  it("re-exports chart, svg validation and synthesis schemas from root index", () => {
    assert.equal(rootExports.ChartThemeTokenSchema, ChartThemeTokenSchema);
    assert.equal(rootExports.ChartValueFormatSchema, ChartValueFormatSchema);
    assert.equal(rootExports.ChartSeriesSchema, ChartSeriesSchema);
    assert.equal(rootExports.ChartBlockSchema, ChartBlockSchema);
    assert.equal(rootExports.SvgValidationCheckSchema, SvgValidationCheckSchema);
    assert.equal(rootExports.ComponentSynthesisSchema, ComponentSynthesisSchema);
  });

  it("validates ChartBlockSchema with new fields: unit, valueFormat, yLabel, stacked", () => {
    const validChart = {
      kind: "chart",
      chartType: "bar",
      title: "Monthly Revenue",
      unit: "USD",
      valueFormat: "currency",
      yLabel: "Revenue in Millions",
      stacked: true,
      categories: ["Jan", "Feb", "Mar"],
      series: [
        { name: "Product A", data: [100, 200, 300], color: "chart-1" },
        { name: "Product B", data: [50, 150, 250], color: "chart-2" }
      ]
    };
    const parsed = ChartBlockSchema.parse(validChart);
    assert.equal(parsed.unit, "USD");
    assert.equal(parsed.valueFormat, "currency");
    assert.equal(parsed.yLabel, "Revenue in Millions");
    assert.equal(parsed.stacked, true);
    assert.equal(parsed.series[0].color, "chart-1");
  });

  it("rejects invalid color outside theme tokens in ChartSeriesSchema", () => {
    const invalidSeries = {
      name: "Product A",
      data: [10, 20],
      color: "#ff0000"
    };
    assert.throws(() => ChartSeriesSchema.parse(invalidSeries));
  });

  it("rejects invalid valueFormat in ChartBlockSchema", () => {
    const invalidChart = {
      kind: "chart",
      chartType: "line",
      valueFormat: "invalid_format",
      series: [{ name: "S1", data: [1, 2] }]
    };
    assert.throws(() => ChartBlockSchema.parse(invalidChart));
  });

  it("validates SvgValidationCheckSchema with accessible and reducedMotion", () => {
    const defaultChecks = {
      selfContained: true,
      responsive: true,
      stackingOrderValid: true,
      transformIsolated: true,
      boundaryClamped: true,
      dualThemeVerified: true
    };
    const parsed = SvgValidationCheckSchema.parse(defaultChecks);
    assert.equal(parsed.accessible, true);
    assert.equal(parsed.reducedMotion, true);

    const explicitChecks = {
      ...defaultChecks,
      accessible: false,
      reducedMotion: false
    };
    const parsedExplicit = SvgValidationCheckSchema.parse(explicitChecks);
    assert.equal(parsedExplicit.accessible, false);
    assert.equal(parsedExplicit.reducedMotion, false);
  });

  it("validates ComponentSynthesisSchema with isValid, validationAttempts, validationError", () => {
    const payload = {
      title: "Button",
      description: "A button",
      tags: ["ui"],
      platforms: {
        svelte: "<button>Click</button>",
        react: "export const Button = () => <button>Click</button>;",
        webcomponent: "customElements.define('surreal-button', class extends HTMLElement {});"
      },
      docs: {
        usage: "import { Button } from './button'",
        props: []
      },
      isValid: true,
      validationAttempts: 2,
      validationError: undefined
    };
    const parsed = ComponentSynthesisSchema.parse(payload);
    assert.equal(parsed.isValid, true);
    assert.equal(parsed.validationAttempts, 2);
  });
});
