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
  JazzCapabilitySchema,
  JazzCapabilityIndexSchema,
  JazzProposalDraftSchema,
  JAZZ_TEXT_LEAD_MAX_PARAGRAPH_CHARS,
  JAZZ_TEXT_LEAD_MAX_CONTEXT_CHARS,
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
    assert.deepEqual(domain, { id: "image-editor", name: "Image editor", paths: ["packages/core/src/image-editor"], docs: [], skills: [], labels: [] });
    assert.equal(JazzDomainSchema.safeParse({ ...domain, id: "Image Editor" }).success, false);
    assert.equal(JazzDomainSchema.safeParse({ ...domain, paths: [] }).success, false);
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
});
