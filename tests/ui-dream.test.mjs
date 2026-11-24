import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  UI_DREAM_MAX_FRAMES,
  UiDreamMediumSchema,
  UiDreamRequestSchema,
  UiDreamFrameSchema,
  UiDreamClipSchema,
  UiDreamResultSchema,
  UiDreamBoxSchema,
  UiDreamMotionSchema,
  UiDreamAnalysisSchema,
  UiDreamComparisonSchema,
  UiComponentGroupSchema,
  LookResultSchema
} from "../dist/genui.js";
import { JazzUiDreamMediumSchema, JazzUiDreamGroupSchema } from "../dist/jazz.js";
import * as rootExports from "../dist/index.js";

const target = { platform: "svelte", viewport: { width: 390, height: 844 } };
const stillsRequest = {
  brief: "A combobox for picking a country",
  target,
  medium: "stills",
  frames: [
    { id: "default", state: "default" },
    { id: "open", state: "open", note: "the list open with five countries" }
  ],
  componentTypeIds: ["combobox"],
  aesthetic: { skillId: "minimalist" },
  prompt: "Draw a combobox in two states.",
  teamId: "team-1"
};
const png = "data:image/png;base64,iVBORw0KGgo=";

const analysis = {
  version: 1,
  dreamId: "dream-1",
  model: "a-vision-model",
  brief: "A combobox for picking a country",
  viewport: { width: 390, height: 844 },
  elements: [
    { id: "root", label: "field", boxes: [{ frameId: "default", x: 0.1, y: 0.1, w: 0.8, h: 0.08 }], layout: { direction: "column", gap: "tight" } },
    { id: "list", parentId: "root", label: "country list", boxes: [{ frameId: "open", x: 0.1, y: 0.18, w: 0.8, h: 0.4 }] }
  ],
  components: [
    { id: "c1", elementIds: ["root"], componentTypeId: "combobox", match: "catalog", confidence: 0.9, props: { placeholder: "Country" }, provenance: "requested" },
    { id: "c2", elementIds: ["list"], componentTypeId: "listbox", match: "close", confidence: 0.6, inventedText: ["Narnia"], provenance: "implied" }
  ],
  states: [
    { id: "s-default", name: "default", frameIds: ["default"], values: [{ componentId: "c1", field: "open", value: false }] },
    { id: "s-open", name: "open", frameIds: ["open"], values: [{ componentId: "c1", field: "open", value: true }] }
  ],
  transitions: [
    {
      id: "t1",
      from: "s-default",
      to: "s-open",
      trigger: { kind: "click", componentId: "c1" },
      event: "open",
      motion: { kind: "expand", duration: "short", easing: "standard", reducedMotion: "fade" },
      evidence: { frameIds: ["default", "open"] },
      confidence: 0.8
    }
  ],
  a11y: { keyboard: { ArrowDown: "open" }, focusOrder: ["c1"] },
  conflicts: [{ ruleId: "no-shadows", text: "The dream gives the list a drop shadow" }],
  dropped: [{ what: "a flag next to each country", reason: "embellishment" }]
};

describe("UI dream request", () => {
  it("parses a stills request and fills in the themes", () => {
    const request = UiDreamRequestSchema.parse(stillsRequest);
    assert.deepEqual(request.target.themes, ["light"]);
    assert.equal(request.clip, undefined);
  });

  it("parses a clip request whose clip runs between two of its frames", () => {
    const request = UiDreamRequestSchema.parse({
      ...stillsRequest,
      medium: "clip",
      clip: { fromFrame: "default", toFrame: "open", interaction: "tap the field", durationSeconds: 4 }
    });
    assert.equal(request.clip.durationSeconds, 4);
  });

  it("rejects bad requests", () => {
    const bad = [
      { ...stillsRequest, frames: [] },
      { ...stillsRequest, frames: Array.from({ length: UI_DREAM_MAX_FRAMES + 1 }, (_, i) => ({ id: `f${i}`, state: "default" })) },
      { ...stillsRequest, frames: [{ id: "a", state: "default" }, { id: "a", state: "hover" }] },
      { ...stillsRequest, medium: "clip" },
      { ...stillsRequest, clip: { fromFrame: "default", toFrame: "open", interaction: "tap", durationSeconds: 4 } },
      { ...stillsRequest, medium: "clip", clip: { fromFrame: "default", toFrame: "missing", interaction: "tap", durationSeconds: 4 } },
      { ...stillsRequest, medium: "clip", clip: { fromFrame: "open", toFrame: "open", interaction: "tap", durationSeconds: 4 } },
      { ...stillsRequest, medium: "clip", clip: { fromFrame: "default", toFrame: "open", interaction: "tap", durationSeconds: 3 } },
      { ...stillsRequest, medium: "clip", clip: { fromFrame: "default", toFrame: "open", interaction: "tap", durationSeconds: 9 } },
      { ...stillsRequest, target: { ...target, platform: "flash" } },
      { ...stillsRequest, prompt: "" },
      { ...stillsRequest, brief: "" },
      { ...stillsRequest, extra: true, medium: "video" }
    ];
    for (const request of bad) assert.equal(UiDreamRequestSchema.safeParse(request).success, false, JSON.stringify(request).slice(0, 200));
  });
});

describe("UI dream result", () => {
  const frame = { id: "default", state: "default", ref: "dreams/dream-1/default.png", width: 1264, height: 2736 };
  const clip = {
    ref: "gs://bucket/dreams/dream-1/clip.mp4",
    mimeType: "video/mp4",
    durationMs: 4000,
    width: 720,
    height: 1280,
    keyframes: [{ id: "k0", state: "default", ref: "dreams/dream-1/k0.png", width: 720, height: 1280, atMs: 0 }]
  };
  const result = { id: "dream-1", medium: "stills", frames: [frame], model: "an-image-model", createdAt: "2026-11-24T12:00:00.000Z", latencyMs: 17500 };

  it("parses stills and clips, with refs or image data URLs for frames", () => {
    assert.equal(UiDreamResultSchema.parse(result).frames[0].width, 1264);
    assert.equal(UiDreamResultSchema.parse({ ...result, medium: "clip", clip, fuel: { charged: 12, balance: 30 } }).clip.keyframes.length, 1);
    assert.equal(UiDreamFrameSchema.safeParse({ ...frame, ref: png }).success, true);
    assert.equal(UiDreamFrameSchema.safeParse({ ...frame, ref: "https://cdn.example.com/a.webp" }).success, true);
    assert.deepEqual(UiDreamClipSchema.parse({ ...clip, keyframes: undefined }).keyframes, []);
  });

  it("rejects clips as data URLs, other data URLs, and mismatched media", () => {
    assert.equal(UiDreamClipSchema.safeParse({ ...clip, ref: "data:video/mp4;base64,AAAA" }).success, false);
    assert.equal(UiDreamClipSchema.safeParse({ ...clip, mimeType: "image/png" }).success, false);
    assert.equal(UiDreamClipSchema.safeParse({ ...clip, keyframes: [{ ...clip.keyframes[0], atMs: undefined }] }).success, false);
    assert.equal(UiDreamClipSchema.safeParse({ ...clip, keyframes: [{ ...clip.keyframes[0], atMs: 5000 }] }).success, false);
    assert.equal(UiDreamFrameSchema.safeParse({ ...frame, ref: "data:text/html;base64,AAAA" }).success, false);
    assert.equal(UiDreamResultSchema.safeParse({ ...result, medium: "clip" }).success, false);
    assert.equal(UiDreamResultSchema.safeParse({ ...result, clip }).success, false);
    assert.equal(UiDreamResultSchema.safeParse({ ...result, frames: [] }).success, false);
    assert.equal(UiDreamResultSchema.safeParse({ ...result, createdAt: "today" }).success, false);
  });
});

describe("UI dream analysis", () => {
  it("parses a grounded analysis and fills in defaults", () => {
    const parsed = UiDreamAnalysisSchema.parse(analysis);
    assert.equal(parsed.components[1].match, "close");
    const empty = UiDreamAnalysisSchema.parse({ version: 1, dreamId: "d", model: "m", brief: "b", viewport: { width: 1, height: 1 } });
    for (const key of ["elements", "components", "states", "transitions", "conflicts", "dropped"]) assert.deepEqual(empty[key], []);
  });

  it("keeps boxes as fractions inside their frame", () => {
    assert.equal(UiDreamBoxSchema.safeParse({ frameId: "f", x: 0, y: 0, w: 1, h: 1 }).success, true);
    assert.equal(UiDreamBoxSchema.safeParse({ frameId: "f", x: 0.5, y: 0, w: 0.6, h: 0.1 }).success, false);
    assert.equal(UiDreamBoxSchema.safeParse({ frameId: "f", x: 120, y: 40, w: 300, h: 48 }).success, false);
  });

  it("names motion durations and easings instead of giving ms or CSS", () => {
    assert.equal(UiDreamMotionSchema.safeParse({ kind: "fade", duration: "medium-long", easing: "emphasized" }).success, true);
    for (const duration of ["200ms", "0.2s", "200"]) assert.equal(UiDreamMotionSchema.safeParse({ kind: "fade", duration }).success, false, duration);
    assert.equal(UiDreamMotionSchema.safeParse({ kind: "fade", easing: "cubic-bezier(.2,0,0,1)" }).success, false);
    assert.equal(UiDreamMotionSchema.safeParse({ kind: "wobble" }).success, false);
  });

  it("rejects references to things that aren't in the analysis", () => {
    const broken = [
      { ...analysis, elements: [analysis.elements[0], analysis.elements[0]] },
      { ...analysis, elements: [analysis.elements[0], { ...analysis.elements[1], parentId: "nope" }] },
      { ...analysis, components: [{ ...analysis.components[0], elementIds: ["nope"] }] },
      { ...analysis, states: [{ ...analysis.states[0], values: [{ componentId: "nope", field: "open", value: true }] }, analysis.states[1]] },
      { ...analysis, transitions: [{ ...analysis.transitions[0], to: "s-nope" }] },
      { ...analysis, transitions: [{ ...analysis.transitions[0], trigger: { kind: "click", componentId: "nope" } }] },
      { ...analysis, a11y: { keyboard: {}, focusOrder: ["nope"] } },
      { ...analysis, states: [{ ...analysis.states[0], clipSpanMs: [900, 100] }, analysis.states[1]] },
      { ...analysis, components: [{ ...analysis.components[0], confidence: 1.5 }] },
      { ...analysis, components: [{ ...analysis.components[0], provenance: "guessed" }] },
      { ...analysis, version: 2 }
    ];
    for (const value of broken) assert.equal(UiDreamAnalysisSchema.safeParse(value).success, false);
  });
});

describe("UI dream comparison", () => {
  it("rides on LookResult.dream", () => {
    const dream = UiDreamComparisonSchema.parse({
      dreamId: "dream-1",
      pairs: [{ frameId: "open", picture: 0, state: "open", componentsPresent: ["c1"], missing: ["c2"], layoutMatch: 0.7 }],
      score: 0.6,
      findings: [{ text: "The country list is missing", severity: "fail", referenceId: "dream:open", picture: 0 }]
    });
    assert.deepEqual(dream.pairs[0].extra, []);
    const look = LookResultSchema.parse({ dream });
    assert.equal(look.dream.score, 0.6);
    assert.equal(LookResultSchema.parse({}).dream, undefined);
    assert.equal(UiDreamComparisonSchema.safeParse({ score: 1.2 }).success, false);
  });
});

describe("UI dream contracts across modules", () => {
  it("keeps the jazz enums in step with genui", () => {
    assert.deepEqual(JazzUiDreamMediumSchema.options, UiDreamMediumSchema.options);
    assert.deepEqual(JazzUiDreamGroupSchema.options, UiComponentGroupSchema.options);
  });

  it("re-exports the UI dream schemas from the root", () => {
    for (const schema of [UiDreamRequestSchema, UiDreamResultSchema, UiDreamAnalysisSchema, UiDreamComparisonSchema]) {
      assert.ok(Object.values(rootExports).includes(schema));
    }
  });
});
