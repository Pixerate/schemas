import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  JazzOriginSchema,
  JazzJsonValueSchema,
  JazzObservationSchema,
  JazzPhraseSchema,
  JazzPolicySchema,
  JazzToolCallSchema,
  JazzRiffSchema,
  JazzFeedbackSchema,
  JazzRiffSummarySchema,
  JazzContextSchema,
  JazzTargetSchema,
  JazzEvidenceSchema,
  JazzDomainSchema,
  JazzUsageOpportunitySchema,
  JazzUsageReportStatusSchema,
  JazzCapabilitySchema,
  JazzCapabilityIndexSchema,
  JazzProposalDraftSchema,
  JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS,
  JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS,
  JAZZ_DREAM_MAX_ELEMENT_CHARS,
  JAZZ_DREAM_MAX_PROMPT_CHARS,
  JazzDreamImageSchema,
  JazzDreamElementSchema,
  JazzDreamRequestSchema,
  JazzDreamResponseSchema,
  JazzDreamDropReasonSchema,
  JazzDreamSchema,
  JazzTextFlavorSchema,
  JazzTextVoiceIdSchema,
  JazzTextVoiceStatsSchema,
  JazzTextVoiceStateSchema,
  JazzTextLeadRequestSchema,
  JazzTextGenreSchema,
  JazzTextVoiceSchema,
  JazzTextRangeSchema,
  JazzTextSuggestionKindSchema,
  JazzTextSuggestionSchema,
  JazzTextLeadResponseSchema,
  TextLeadRequestSchema,
  TextLeadResponseSchema,
  JAZZ_TEXT_MAX_REPLACED_CHARS,
  JAZZ_TEXT_ON_DEVICE_EDIT_KINDS,
  JAZZ_TEXT_SERVER_ONLY_FIELDS,
  JazzTextTierSchema,
  JazzTextRuleStatsSchema,
  JazzTextObservationKindSchema,
  JazzTextObservationWhereSchema,
  JazzTextObservationSchema,
  JazzTextFeedbackVerdictSchema,
  JazzTextFeedbackItemSchema,
  JazzTextLeadV2RequestSchema,
  JazzTextEditKindSchema,
  JazzTextEditSchema,
  JazzTextLeadV2ResponseSchema,
  JazzTextFeedbackRequestSchema,
  JazzTextFeedbackResponseSchema
} from "../dist/jazz.js";
import * as rootExports from "../dist/index.js";

const at = "2026-11-03T12:00:00.000Z";

const observation = {
  id: "obs_1",
  at,
  surface: "canvas",
  origin: "user",
  action: "add",
  targets: [{ id: "hero", type: "image", label: "Hero" }],
  summary: "Added image node \"Hero\""
};

const riff = {
  id: "riff_1",
  sessionId: "s_1",
  origin: "agent:pixie",
  surface: "canvas",
  strategy: "annotate",
  intent: "annotate",
  title: "Caption for the hero image",
  rationale: "Images on this board have captions.",
  confidence: 0.7,
  targets: ["hero"],
  toolCalls: [{ name: "canvas__propose_nodes", arguments: { title: "Caption", nodes: [{ nearNodeId: "hero", side: "bottom", data: { label: "Caption" } }] } }],
  mode: "suggest",
  proposalId: "proposal-1",
  status: "proposed",
  createdAt: at
};

describe("Jazz schemas", () => {
  it("re-exports every schema from the root index", () => {
    for (const schema of [JazzOriginSchema, JazzObservationSchema, JazzPhraseSchema, JazzPolicySchema, JazzRiffSchema, JazzFeedbackSchema, JazzContextSchema]) {
      assert.ok(Object.values(rootExports).includes(schema));
    }
  });

  it("accepts user and agent origins only", () => {
    assert.equal(JazzOriginSchema.parse("user"), "user");
    assert.equal(JazzOriginSchema.parse("agent:pixie"), "agent:pixie");
    for (const bad of ["agent:", "pixie", "User", ""]) assert.equal(JazzOriginSchema.safeParse(bad).success, false);
  });

  it("parses an observation with defaults", () => {
    const parsed = JazzObservationSchema.parse(observation);
    assert.equal(parsed.inGesture, false);
    assert.equal(parsed.targets[0].kind, "node");
    assert.equal(JazzObservationSchema.safeParse({ ...observation, action: "paint" }).success, false);
    assert.equal(JazzObservationSchema.safeParse({ ...observation, at: "yesterday" }).success, false);
  });

  it("needs at least one observation in a phrase", () => {
    const phrase = { id: "ph_1", surface: "canvas", startedAt: at, endedAt: at, observations: [observation] };
    assert.equal(JazzPhraseSchema.parse(phrase).observations.length, 1);
    assert.equal(JazzPhraseSchema.safeParse({ ...phrase, observations: [] }).success, false);
  });

  it("fills a whole policy from nothing and bounds its numbers", () => {
    assert.deepEqual(JazzPolicySchema.parse({}), {
      autonomy: "suggest",
      tempo: { idleMs: 1500, minGapMs: 8000 },
      budget: { maxRiffsPerMinute: 3, maxPending: 3, cooldownAfterRejectMs: 30000 },
      allowEditUserContent: false
    });
    assert.equal(JazzPolicySchema.parse({ tempo: { idleMs: 500 } }).tempo.minGapMs, 8000);
    assert.equal(JazzPolicySchema.safeParse({ tempo: { idleMs: 50 } }).success, false);
    assert.equal(JazzPolicySchema.safeParse({ autonomy: "auto" }).success, false);
  });

  it("takes JSON tool arguments and refuses functions", () => {
    assert.deepEqual(JazzToolCallSchema.parse({ name: "x" }).arguments, {});
    assert.equal(JazzJsonValueSchema.safeParse({ a: [1, "b", null, { c: true }] }).success, true);
    assert.equal(JazzToolCallSchema.safeParse({ name: "x", arguments: { f: () => 1 } }).success, false);
  });

  it("parses a riff and refuses bad confidence, titles and statuses", () => {
    const parsed = JazzRiffSchema.parse(riff);
    assert.equal(parsed.toolCalls[0].arguments.nodes[0].nearNodeId, "hero");
    assert.equal(JazzRiffSchema.safeParse({ ...riff, confidence: 1.5 }).success, false);
    assert.equal(JazzRiffSchema.safeParse({ ...riff, title: "x".repeat(81) }).success, false);
    assert.equal(JazzRiffSchema.safeParse({ ...riff, status: "pending" }).success, false);
    assert.equal(JazzRiffSchema.safeParse({ ...riff, origin: "pixie" }).success, false);
    assert.deepEqual(JazzRiffSummarySchema.parse(riff), { id: "riff_1", strategy: "annotate", intent: "annotate", title: "Caption for the hero image", targets: ["hero"], status: "proposed" });
  });

  it("parses feedback", () => {
    const feedback = { riffId: "riff_1", verdict: "edited", at, by: "user", editedFields: ["data"] };
    assert.deepEqual(JazzFeedbackSchema.parse(feedback), feedback);
    assert.equal(JazzFeedbackSchema.safeParse({ ...feedback, verdict: "liked" }).success, false);
  });

  it("builds a context with defaults", () => {
    const context = JazzContextSchema.parse({
      sessionId: "s_1",
      agent: { id: "pixie", name: "Pixie" },
      surface: "canvas",
      phrases: [{ id: "ph_1", surface: "canvas", startedAt: at, endedAt: at, observations: [observation] }],
      riffs: [JazzRiffSummarySchema.parse(riff)],
      policy: {}
    });
    assert.deepEqual(context.selection, []);
    assert.deepEqual(context.skills, []);
    assert.equal(context.policy.autonomy, "suggest");
    assert.equal(JazzContextSchema.safeParse({ ...context, phrases: Array(21).fill(context.phrases[0]) }).success, false);
  });
});

describe("jazz product-proposal contracts", () => {
  const absence = { kind: "absence", ref: "pattern fill", scope: "packages/core/src/vector" };
  const draft = {
    domain: "vector",
    kind: "new-capability",
    title: "Vector: pattern fills and strokes with seamless tiles",
    why: "Surface-pattern designers fill shapes with a live repeating tile.",
    today: "`VectorPaint` has no pattern paint.",
    proposal: "A `pattern` paint in any fill or stroke layer.",
    effort: "M",
    evidence: [absence, { kind: "web", ref: "Figma: patterns", url: "https://help.figma.com/hc/en-us/articles/31616030150167" }]
  };

  it("targets repository items", () => {
    for (const kind of ["domain", "issue", "pull-request", "file", "capability"]) {
      assert.equal(JazzTargetSchema.parse({ id: `${kind}:x`, kind }).kind, kind);
    }
    assert.equal(JazzTargetSchema.safeParse({ id: "x", kind: "repo" }).success, false);
  });

  it("parses evidence", () => {
    assert.deepEqual(JazzEvidenceSchema.parse(absence), absence);
    assert.equal(JazzEvidenceSchema.safeParse({ kind: "web", ref: "x", url: "not a url" }).success, false);
    assert.equal(JazzEvidenceSchema.safeParse({ kind: "rumour", ref: "x" }).success, false);
    assert.equal(JazzEvidenceSchema.safeParse({ kind: "repo", ref: "" }).success, false);
  });

  it("parses a domain with defaults and refuses bad ids", () => {
    const domain = JazzDomainSchema.parse({ id: "image-editor", name: "Image editor", paths: ["packages/core/src/image-editor"] });
    assert.deepEqual(domain, { id: "image-editor", name: "Image editor", paths: ["packages/core/src/image-editor"], docs: [], skills: [], labels: [], routes: [] });
    assert.equal(JazzDomainSchema.safeParse({ ...domain, id: "Image Editor" }).success, false);
    assert.equal(JazzDomainSchema.safeParse({ ...domain, paths: [] }).success, false);
    assert.deepEqual(JazzDomainSchema.parse({ ...domain, routes: ["/silo/:id/bucket"] }).routes, ["/silo/:id/bucket"]);
  });

  it("parses a usage opportunity and the usage-friction kind", () => {
    const opportunity = JazzUsageOpportunitySchema.parse({
      id: "opp-1",
      title: "People abandon bucket upload",
      problem: "Most sessions that open the upload dialog leave without uploading.",
      metrics: { sessionsAffected: 42, shareOfSessions: 0.18, trendVsPrevWeek: 0.35, funnelDrop: { flowId: "upload", step: "choose-file", before: 0.8, after: 0.41 } },
      score: 0.62
    });
    assert.deepEqual(opportunity.screens, []);
    assert.equal(JazzUsageOpportunitySchema.safeParse({ ...opportunity, score: 1.2 }).success, false);
    assert.equal(JazzUsageOpportunitySchema.safeParse({ ...opportunity, metrics: { sessionsAffected: 1, shareOfSessions: 2 } }).success, false);
    assert.equal(JazzProposalDraftSchema.safeParse({ ...draft, kind: "usage-friction" }).success, true);
    assert.deepEqual(JazzUsageReportStatusSchema.options, ["drafted", "accepted", "rejected"]);
  });

  it("parses a capability index", () => {
    const index = JazzCapabilityIndexSchema.parse({
      domain: "vector",
      builtAt: at,
      revision: "abc123",
      built: [{ name: "Gradient fills", refs: [{ kind: "repo", ref: "packages/core/src/vector/types.ts:171" }], agentTools: ["vector.setGradient"] }],
      planned: [{ name: "Recolour artwork", refs: [{ kind: "issue", ref: "issue#573" }] }]
    });
    assert.equal(index.built[0].agentTools[0], "vector.setGradient");
    assert.equal(index.planned[0].agentTools, undefined);
    assert.deepEqual(JazzCapabilitySchema.parse({ name: "Footnotes", refs: [{ kind: "repo", ref: "footnotes.ts" }], agentTools: [] }).agentTools, []);
    assert.equal(JazzCapabilitySchema.safeParse({ name: "No refs", refs: [] }).success, false);
  });

  it("parses a proposal draft", () => {
    assert.deepEqual(JazzProposalDraftSchema.parse(draft), draft);
    assert.equal(JazzProposalDraftSchema.safeParse({ ...draft, evidence: [] }).success, false);
    assert.equal(JazzProposalDraftSchema.safeParse({ ...draft, kind: "refactor" }).success, false);
    assert.equal(JazzProposalDraftSchema.safeParse({ ...draft, title: "x".repeat(121) }).success, false);
  });

  it("is re-exported from the root", () => {
    for (const name of ["JazzEvidenceSchema", "JazzDomainSchema", "JazzCapabilityIndexSchema", "JazzProposalDraftSchema", "JazzProposalKindSchema"]) {
      assert.ok(rootExports[name], name);
    }
  });
});

describe("jazz text-lead contracts (Swash writing partner)", () => {
  it("parses a text-lead request with defaults and enforces context window bounds", () => {
    const parsed = JazzTextLeadRequestSchema.parse({
      paragraph: "we shipped the release yesterday and i think the notes need a tidy up"
    });
    assert.deepEqual(parsed, {
      paragraph: "we shipped the release yesterday and i think the notes need a tidy up",
      flavor: "gfm",
      voices: []
    });

    const full = JazzTextLeadRequestSchema.parse({
      paragraph: "first item\nsecond item\nthird item",
      before: "# Release Notes",
      after: "See `[code]` and `[math]` for details.",
      flavor: "slack",
      voices: [
        {
          voice: "punctuate",
          strength: 0.8,
          kept: 12,
          undone: 2,
          rules: {
            "sentence-case": { kept: 8, undone: 0 },
            "clause-comma": { kept: 4, undone: 2 }
          }
        },
        {
          voice: "chat"
        }
      ],
      teamId: "team_swash"
    });
    assert.equal(full.voices[0].rules["clause-comma"].undone, 2);
    assert.equal(full.voices[1].strength, 1);
    assert.equal(full.voices[1].kept, 0);
    assert.deepEqual(full.voices[1].rules, {});

    assert.equal(JazzTextLeadRequestSchema.safeParse({ paragraph: "" }).success, false);
    assert.equal(JazzTextLeadRequestSchema.safeParse({ paragraph: "x".repeat(JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS + 1) }).success, false);
    assert.equal(JazzTextLeadRequestSchema.safeParse({ paragraph: "ok", before: "x".repeat(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS + 1) }).success, false);
    assert.equal(JazzTextLeadRequestSchema.safeParse({ paragraph: "ok", after: "x".repeat(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS + 1) }).success, false);
    assert.equal(JazzTextLeadRequestSchema.safeParse({ paragraph: "ok", flavor: "asciidoc" }).success, false);
    assert.equal(JazzTextVoiceStateSchema.safeParse({ voice: "punctuate", strength: 1.5 }).success, false);
    assert.equal(JazzTextVoiceStatsSchema.safeParse({ kept: -1, undone: 0 }).success, false);
  });

  it("parses a text-lead response with UTF-16 ranges, palette and suggestions", () => {
    const paragraph = "Note: emojis like 🎨 take 2 UTF-16 units before x^2 + y^2.";
    const mathExpr = "x^2 + y^2";
    const start = paragraph.indexOf(mathExpr);
    const end = start + mathExpr.length;
    // 🎨 is a surrogate pair (2 UTF-16 code units), so UTF-16 offset into `paragraph` matches JS indexOf/slice and NSString.
    assert.equal(paragraph.slice(start, end), mathExpr);

    const response = JazzTextLeadResponseSchema.parse({
      genre: "technical",
      palette: [
        { voice: "punctuate", strength: 1, disabledRules: ["clause-comma"] },
        { voice: "smart-typography", strength: 0 }
      ],
      suggestions: [
        {
          kind: "math",
          range: { start, end },
          replacement: "$x^2 + y^2$",
          why: "Wrap the equation in inline math."
        }
      ],
      why: "Technical note: keeping punctuation crisp and suggesting inline math.",
      fuelBalance: 199
    });
    assert.equal(response.genre, "technical");
    assert.equal(response.suggestions[0].range.start, start);
    assert.equal(response.suggestions[0].range.end, end);
    assert.equal(response.fuelBalance, 199);

    // Defaults suggestions to []
    const minimal = JazzTextLeadResponseSchema.parse({
      genre: "poem",
      palette: [{ voice: "punctuate", strength: 0 }],
      why: "Poem: holding back auto-punctuation so line breaks and casing stay yours."
    });
    assert.deepEqual(minimal.suggestions, []);

    assert.equal(JazzTextLeadResponseSchema.safeParse({ ...response, genre: "novel" }).success, false);
    assert.equal(JazzTextSuggestionSchema.safeParse({ kind: "math", range: { start: -1, end: 5 }, replacement: "$x$", why: "math" }).success, false);
    assert.equal(JazzTextSuggestionSchema.safeParse({ kind: "unknown", range: { start: 0, end: 1 }, replacement: "x", why: "y" }).success, false);
  });

  it("re-exports text-lead schemas and aliases from the root", () => {
    assert.equal(TextLeadRequestSchema, JazzTextLeadRequestSchema);
    assert.equal(TextLeadResponseSchema, JazzTextLeadResponseSchema);
    for (const schema of [
      JazzTextFlavorSchema,
      JazzTextVoiceIdSchema,
      JazzTextVoiceStatsSchema,
      JazzTextVoiceStateSchema,
      JazzTextLeadRequestSchema,
      JazzTextGenreSchema,
      JazzTextVoiceSchema,
      JazzTextRangeSchema,
      JazzTextSuggestionKindSchema,
      JazzTextSuggestionSchema,
      JazzTextLeadResponseSchema,
      TextLeadRequestSchema,
      TextLeadResponseSchema
    ]) {
      assert.ok(Object.values(rootExports).includes(schema));
    }
  });

  it("validates a dream request and response", () => {
    const png = "data:image/png;base64,iVBORw0KGgo=";
    const jpeg = "data:image/jpeg;base64,/9j/4AAQ";

    const request = JazzDreamRequestSchema.parse({ image: png, prompt: "Imagine where this painting could go next.", teamId: "team-1" });
    assert.equal(request.image, png);
    assert.equal(JazzDreamRequestSchema.safeParse({ image: png, prompt: "" }).success, false);
    assert.equal(JazzDreamRequestSchema.safeParse({ image: png, prompt: "x".repeat(JAZZ_DREAM_MAX_PROMPT_CHARS + 1) }).success, false);
    // Only image data URLs: no remote URLs, no other media types.
    for (const image of ["https://example.com/a.png", "data:text/html;base64,AAAA", "data:image/svg+xml;base64,AAAA", ""]) {
      assert.equal(JazzDreamImageSchema.safeParse(image).success, false, image);
    }
    for (const image of [png, jpeg, "data:image/webp;base64,UklGRg=="]) {
      assert.equal(JazzDreamImageSchema.safeParse(image).success, true, image);
    }

    const response = JazzDreamResponseSchema.parse({ image: jpeg, model: "an-image-model", fuelBalance: 41 });
    assert.equal(response.model, "an-image-model");
    assert.deepEqual(JazzDreamResponseSchema.parse({ image: jpeg }), { image: jpeg });
    assert.equal(JazzDreamResponseSchema.safeParse({ image: "nope" }).success, false);
  });

  it("validates a kept dream and fills in its defaults", () => {
    const image = "data:image/png;base64,iVBORw0KGgo=";
    const fresh = JazzDreamSchema.parse({ id: "dream-1", image, createdAt: "2026-11-16T12:00:00.000Z" });
    assert.equal(fresh.strokesSince, 0);
    assert.deepEqual(fresh.drawn, []);

    const used = JazzDreamSchema.parse({ id: "dream-1", image, model: "an-image-model", createdAt: "2026-11-16T12:00:00.000Z", strokesSince: 7, drawn: ["the sun", "two birds"] });
    assert.deepEqual(used.drawn, ["the sun", "two birds"]);

    assert.equal(JazzDreamSchema.safeParse({ ...used, strokesSince: -1 }).success, false);
    assert.equal(JazzDreamSchema.safeParse({ ...used, drawn: [""] }).success, false);
    assert.equal(JazzDreamElementSchema.safeParse("x".repeat(JAZZ_DREAM_MAX_ELEMENT_CHARS + 1)).success, false);
    assert.equal(JazzDreamSchema.safeParse({ ...used, createdAt: "yesterday" }).success, false);

    assert.deepEqual(JazzDreamDropReasonSchema.options, ["used-up", "stale", "undone"]);
    assert.equal(JazzDreamDropReasonSchema.safeParse("bored").success, false);
  });

  it("re-exports the dream schemas from the root", () => {
    for (const schema of [JazzDreamImageSchema, JazzDreamElementSchema, JazzDreamRequestSchema, JazzDreamResponseSchema, JazzDreamDropReasonSchema, JazzDreamSchema]) {
      assert.ok(Object.values(rootExports).includes(schema));
    }
  });
});

describe("jazz text-lead v2 contracts (observations in, suggested edits out)", () => {
  it("parses a minimal request with defaults", () => {
    assert.deepEqual(JazzTextLeadV2RequestSchema.parse({ paragraph: "teh notes" }), {
      paragraph: "teh notes",
      flavor: "gfm",
      observations: [],
      rules: {},
      feedback: [],
      tier: "server"
    });
  });

  it("parses observations, per-rule counts and batched feedback", () => {
    const request = JazzTextLeadV2RequestSchema.parse({
      paragraph: "I think teh release notes need a tidy up",
      before: "# Release",
      flavor: "commonmark",
      observations: [
        { kind: "typed", range: { start: 8, end: 11 } },
        { kind: "pasted", where: "before", range: { start: 2, end: 9 }, removed: 0 },
        { kind: "deleted", range: { start: 20, end: 20 }, removed: 6 },
        { kind: "deleted", where: "elsewhere", removed: 40 },
        { kind: "fix-applied", range: { start: 0, end: 1 }, rule: "i-capital", replaced: "i", at: "2026-11-17T10:00:00.000Z" },
        { kind: "fix-undone", range: { start: 40, end: 40 }, rule: "end-stop" }
      ],
      rules: { "i-capital": { kept: 3 }, "end-stop": { kept: 1, undone: 2 } },
      feedback: [{ editId: "edit_9", verdict: "dismissed" }],
      tier: "on-device",
      teamId: "team-swash"
    });
    assert.equal(request.observations[0].where, "paragraph");
    assert.equal(request.observations[3].range, undefined);
    assert.deepEqual(request.rules["i-capital"], { kept: 3, undone: 0 });
    assert.equal(request.feedback[0].tier, "server");
    assert.equal(request.tier, "on-device");

    // Same window bounds as v1.
    assert.equal(JazzTextLeadV2RequestSchema.safeParse({ paragraph: "" }).success, false);
    assert.equal(JazzTextLeadV2RequestSchema.safeParse({ paragraph: "x".repeat(JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS + 1) }).success, false);
    assert.equal(JazzTextLeadV2RequestSchema.safeParse({ paragraph: "ok", after: "x".repeat(JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS + 1) }).success, false);
    assert.equal(JazzTextLeadV2RequestSchema.safeParse({ paragraph: "ok", tier: "cloud" }).success, false);
    // Text rules are not "voices".
    assert.equal("voices" in JazzTextLeadV2RequestSchema.shape, false);
    assert.equal(JazzTextObservationSchema.safeParse({ kind: "moved" }).success, false);
    assert.equal(JazzTextObservationSchema.safeParse({ kind: "fix-applied", replaced: "x".repeat(JAZZ_TEXT_MAX_REPLACED_CHARS + 1) }).success, false);
    assert.equal(JazzTextRuleStatsSchema.safeParse({ kept: -1 }).success, false);
    assert.equal(JazzTextObservationKindSchema.options.length, 6);
    assert.deepEqual(JazzTextObservationWhereSchema.options, ["paragraph", "before", "after", "elsewhere"]);
  });

  it("parses suggested edits with UTF-16 ranges, replacements and structural actions", () => {
    const paragraph = "🎨 I think teh notes need a tidy up";
    const start = paragraph.indexOf("teh");
    // 🎨 is two UTF-16 code units, so offsets match JS slice and NSString.
    assert.equal(start, 11);
    const response = JazzTextLeadV2ResponseSchema.parse({
      tier: "server",
      genre: "notes",
      edits: [
        { id: "edit_1", kind: "spelling", range: { start, end: start + 3 }, replacement: "the", confidence: 0.98, why: "Spelling.", mode: "assist" },
        { id: "edit_2", kind: "house-style", range: { start: 27, end: 35 }, replacement: "tidy-up", confidence: 0.7, why: "House style hyphenates the noun.", rule: "tidy-up" },
        { id: "edit_3", kind: "structure", range: { start: 0, end: 0 }, action: "title", replacement: "# Notes\n\n", confidence: 0.5, why: "Add a title." },
        { id: "edit_4", kind: "structure", range: { start: 0, end: 35 }, action: "list", confidence: 0.4, why: "Read as a list." }
      ],
      holdBack: ["end-stop"],
      why: "Short notes: fix spelling, hold back full stops.",
      fuelBalance: 120
    });
    assert.equal(paragraph.slice(response.edits[0].range.start, response.edits[0].range.end), "teh");
    assert.equal(response.edits[1].mode, "suggest");
    assert.equal(response.edits[3].replacement, undefined);

    const base = { id: "e", kind: "spelling", range: { start: 0, end: 1 }, replacement: "x", confidence: 0.5, why: "y" };
    assert.equal(JazzTextEditSchema.safeParse(base).success, true);
    assert.equal(JazzTextEditSchema.safeParse({ ...base, replacement: "" }).success, true, "empty replacement deletes");
    assert.equal(JazzTextEditSchema.safeParse({ ...base, replacement: undefined }).success, false, "needs replacement or action");
    assert.equal(JazzTextEditSchema.safeParse({ ...base, range: { start: 4, end: 2 } }).success, false, "end before start");
    assert.equal(JazzTextEditSchema.safeParse({ ...base, confidence: 1.2 }).success, false);
    assert.equal(JazzTextEditSchema.safeParse({ ...base, kind: "voice" }).success, false);
    assert.equal(JazzTextEditSchema.safeParse({ ...base, mode: "auto" }).success, false);
    assert.equal(JazzTextEditSchema.safeParse({ ...base, id: "" }).success, false);
  });

  it("parses an on-device answer without the server-only fields", () => {
    const onDevice = JazzTextLeadV2ResponseSchema.parse({
      tier: "on-device",
      genre: "prose",
      edits: [{ id: "d1", kind: "wrong-word", range: { start: 0, end: 5 }, replacement: "their", confidence: 0.8, why: "Wrong word." }]
    });
    for (const field of JAZZ_TEXT_SERVER_ONLY_FIELDS) {
      assert.equal(onDevice[field], undefined, field);
      assert.ok(JazzTextLeadV2ResponseSchema.shape[field].isOptional(), `${field} is optional`);
    }
    for (const edit of onDevice.edits) assert.ok(JAZZ_TEXT_ON_DEVICE_EDIT_KINDS.includes(edit.kind));
    assert.deepEqual([...JAZZ_TEXT_ON_DEVICE_EDIT_KINDS].sort(), ["spelling", "structure", "wrong-word"]);
    assert.deepEqual(JazzTextLeadV2ResponseSchema.parse({ tier: "server", genre: "poem" }).edits, []);
    assert.equal(JazzTextLeadV2ResponseSchema.safeParse({ genre: "poem" }).success, false, "tier is required");
    assert.deepEqual(JazzTextTierSchema.options, ["server", "on-device"]);
  });

  it("parses the feedback call", () => {
    const request = JazzTextFeedbackRequestSchema.parse({
      items: [
        { editId: "edit_1", verdict: "accepted" },
        { editId: "edit_2", verdict: "edited", at: "2026-11-17T10:00:05.000Z" },
        { editId: "d1", verdict: "undone", tier: "on-device" }
      ]
    });
    assert.equal(request.items[0].tier, "server");
    assert.deepEqual(JazzTextFeedbackVerdictSchema.options, ["accepted", "edited", "dismissed", "ignored", "undone"]);
    assert.equal(JazzTextFeedbackRequestSchema.safeParse({ items: [] }).success, false);
    assert.equal(JazzTextFeedbackItemSchema.safeParse({ editId: "e", verdict: "rejected" }).success, false);
    assert.deepEqual(JazzTextFeedbackResponseSchema.parse({ recorded: 3 }), { recorded: 3 });
    assert.equal(JazzTextFeedbackResponseSchema.safeParse({ recorded: -1 }).success, false);
  });

  it("is re-exported from the root", () => {
    for (const schema of [
      JazzTextTierSchema,
      JazzTextRuleStatsSchema,
      JazzTextObservationSchema,
      JazzTextFeedbackItemSchema,
      JazzTextLeadV2RequestSchema,
      JazzTextEditKindSchema,
      JazzTextEditSchema,
      JazzTextLeadV2ResponseSchema,
      JazzTextFeedbackRequestSchema,
      JazzTextFeedbackResponseSchema
    ]) {
      assert.ok(Object.values(rootExports).includes(schema));
    }
  });
});
