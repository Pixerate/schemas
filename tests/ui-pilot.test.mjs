// Contracts for generated and synced UI: skills (#76), the ui-aesthetic kind (#77), component
// contracts and provider descriptors (#78), and the page contract and look results (#79).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  SkillManifestSchema,
  SkillKindSchema,
  SkillBundleManifestSchema,
  BUILT_IN_SKILL_KINDS,
  skillContentHashInput
} from "../dist/skills.js";
import {
  UiAestheticProfileSchema,
  ComponentVariantSchema,
  ComponentVersionSchema,
  ComponentPackageSchema,
  UIComponentTypeSchema,
  UiComponentContractSchema,
  UiDescriptorSchema,
  UIGenerationOptionsSchema,
  PageMessageSchema,
  PictureRequestSchema,
  LookResultSchema,
  lookStatus
} from "../dist/genui.js";
import * as root from "../dist/index.js";

const sha = (s) => createHash("sha256").update(s).digest("hex");
const fixture = (rel) => JSON.parse(readFileSync(new URL(`./fixtures/${rel}`, import.meta.url), "utf8"));

describe("skills (#76)", () => {
  it("is re-exported from the root", () => {
    assert.equal(root.SkillManifestSchema, SkillManifestSchema);
  });

  it("parses frontmatter as agent-core, editor and Flair write it, with the id from the folder", () => {
    const agentCore = { name: "Code Reviewer", description: "Checks code against Google TS guidelines" };
    const editor = {
      name: "pixerate-style-authoring",
      description: "The house-style workflow across Pixerate editors.",
      metadata: { kind: "workflow", reference: "pixerate-agent-tools" }
    };
    const flair = { name: "flair-use", description: "Use when writing app code with @pixerate/flair." };
    for (const [id, fm] of [["code-reviewer", agentCore], ["pixerate-style-authoring", editor], ["flair-use", flair]]) {
      const m = SkillManifestSchema.parse({ id, ...fm });
      assert.equal(m.id, id);
      assert.equal(m.kind, "skill");
      assert.equal(m.version, "0.1.0");
      assert.deepEqual(m.files, []);
    }
    assert.equal(SkillManifestSchema.parse({ id: "x", ...editor }).metadata.kind, "workflow");
  });

  it("refuses ids that are not folder-safe and versions that are not semver", () => {
    assert.equal(SkillManifestSchema.safeParse({ id: "Code Reviewer", name: "a", description: "b" }).success, false);
    assert.equal(SkillManifestSchema.safeParse({ id: "a", name: "a", description: "b", version: "1.2" }).success, false);
  });

  it("hashes the same files the same way in any order", () => {
    const files = [
      { path: "SKILL.md", content: "---\nname: ink\n---\n" },
      { path: "aesthetic.json", content: "{}" },
      { path: "references/a.png", content: "png" }
    ];
    const a = sha(skillContentHashInput(files));
    const b = sha(skillContentHashInput([...files].reverse()));
    assert.equal(a, b);
    assert.notEqual(a, sha(skillContentHashInput([{ ...files[0], content: "changed" }, files[1], files[2]])));
    assert.ok(SkillManifestSchema.parse({ id: "ink", name: "Ink", description: "d", contentHash: a }).contentHash);
  });

  it("defines the built-in kinds, ui-aesthetic among them", () => {
    for (const k of BUILT_IN_SKILL_KINDS) SkillKindSchema.parse(k);
    const ui = BUILT_IN_SKILL_KINDS.find((k) => k.id === "ui-aesthetic");
    assert.equal(ui.profileFile, "aesthetic.json");
  });

  it("validates a bundle manifest and refuses a bad hash", () => {
    const h = sha("x");
    const bundle = { format: 1, skill: { id: "ink", name: "Ink", description: "d" }, files: [{ path: "SKILL.md", size: 1, sha256: h }], contentHash: h };
    assert.equal(SkillBundleManifestSchema.safeParse(bundle).success, true);
    assert.equal(SkillBundleManifestSchema.safeParse({ ...bundle, contentHash: "nope" }).success, false);
  });
});

describe("ui-aesthetic (#77)", () => {
  const dir = new URL("./fixtures/ui-aesthetics/", import.meta.url);
  const names = readdirSync(dir).filter((f) => f.endsWith(".json"));

  it("has a built-in fixture for each of today's eight preset slugs, and each validates", () => {
    assert.deepEqual(
      names.map((n) => n.replace(".json", "")).sort(),
      ["claymorphism", "flat-design", "glassmorphism", "low-fi", "minimalist", "neubrutalism", "neumorphism", "skeuomorphism"]
    );
    for (const n of names) {
      const p = UiAestheticProfileSchema.parse(fixture(`ui-aesthetics/${n}`));
      assert.ok(p.rules.length > 0, n);
      assert.ok(p.roles.accent, n);
    }
  });

  it("keeps variants with only aestheticId parsing, and round-trips the new aesthetic ref", () => {
    const old = {
      id: "glass-action-button",
      componentTypeId: "button",
      name: "Glass Action Button",
      aestheticId: "glassmorphism",
      createdAt: "2026-11-13T00:00:00.000Z",
      updatedAt: "2026-11-13T00:00:00.000Z"
    };
    assert.equal(ComponentVariantSchema.parse(old).aesthetic, undefined);
    const withRef = { ...old, aesthetic: { skillId: "glassmorphism", version: "1.0.0" } };
    assert.deepEqual(ComponentVariantSchema.parse(withRef).aesthetic, withRef.aesthetic);
    assert.equal(UIGenerationOptionsSchema.parse({ prompt: "a button", aesthetic: { skillId: "ink" } }).aesthetic.skillId, "ink");
  });
});

describe("component contracts and descriptors (#78)", () => {
  const switchContract = {
    props: { type: "object", properties: { label: { type: "string" }, disabled: { type: "boolean" } } },
    state: [{ name: "checked", schema: { type: "boolean" }, event: "change" }],
    events: [{ name: "change", payload: { type: "object", properties: { checked: { type: "boolean" } } } }],
    a11y: { role: "switch", keyboard: { Space: "toggle", Enter: "toggle" }, labelFrom: "prop", reducedMotionAt: 1 },
    colorRoles: ["track-on", "track-off", "surface", "focus"],
    motion: true,
    sizing: { mode: "intrinsic", minWidth: 40, minHeight: 24 }
  };

  it("validates a shadcn switch type with its contract", () => {
    const type = UIComponentTypeSchema.parse({
      id: "switch",
      name: "Switch",
      description: "A control that allows the user to toggle between checked and not checked.",
      tags: ["form"],
      group: "baseline",
      contract: switchContract,
      createdAt: "2026-11-13T00:00:00.000Z",
      updatedAt: "2026-11-13T00:00:00.000Z"
    });
    assert.equal(type.contract.state[0].event, "change");
  });

  it("validates a Flair toggle descriptor that implements it", () => {
    const d = UiDescriptorSchema.parse({
      implements: "switch",
      contract: { state: switchContract.state, colorRoles: ["track-on", "track-off", "surface"] },
      platforms: ["react", "svelte", "webcomponent"],
      swiftReady: false,
      example: { checked: true, label: "Notifications" },
      contentHash: "a1b2"
    });
    assert.equal(d.implements, "switch");
    assert.equal(d.contract.a11y, undefined, "a descriptor may give only part of a contract");
  });

  it("validates an editor chart type as a data visual with an engine package", () => {
    UIComponentTypeSchema.parse({
      id: "sparkline",
      name: "Sparkline",
      description: "A small line chart without axes.",
      tags: ["chart"],
      group: "data-visual",
      fallback: "badge",
      contract: { props: { type: "object", properties: { values: { type: "array", items: { type: "number" } } } }, motion: true },
      createdAt: "2026-11-13T00:00:00.000Z",
      updatedAt: "2026-11-13T00:00:00.000Z"
    });
    const pkg = ComponentPackageSchema.parse({
      language: "react",
      code: "export function Sparkline() {}",
      docs: { usage: "<Sparkline values={[1,2,3]} />", props: [] },
      screenshot: "",
      themeSupport: "light-and-dark",
      tags: [],
      source: { provider: "editor", itemId: "chart:sparkline", version: "1.0.0", contentHash: "c0ffee" },
      runtime: "engine",
      screenshots: { light: "l.png", dark: "d.png" }
    });
    assert.equal(pkg.runtime, "engine");
  });

  it("parses old packages and versions unchanged, and versions accept new platform targets", () => {
    const oldPkg = { language: "svelte", code: "<div/>", docs: { usage: "", props: [] }, screenshot: "s.png", themeSupport: "default", tags: [] };
    const parsed = ComponentPackageSchema.parse(oldPkg);
    assert.equal(parsed.source, undefined);
    assert.equal(parsed.runtime, undefined);
    const version = {
      id: "switch-ink-v1.0.0",
      componentTypeId: "switch",
      variantId: "ink-switch",
      aestheticId: "ink",
      version: "1.0.0",
      changelogNote: "",
      createdBy: "test",
      createdAt: "2026-11-13T00:00:00.000Z",
      packages: { svelte: oldPkg, "html-page": { ...oldPkg, language: "react" } }
    };
    assert.ok(ComponentVersionSchema.parse(version).packages["html-page"]);
    assert.equal(ComponentVersionSchema.safeParse({ ...version, packages: { flutter: oldPkg } }).success, false);
  });

  it("defaults a contract's lists", () => {
    assert.deepEqual(UiComponentContractSchema.parse({}), { state: [], events: [], colorRoles: [], motion: false });
  });
});

describe("page contract and look results (#79)", () => {
  it("round-trips motion messages and refuses an unknown or out-of-range one", () => {
    for (const m of [
      { v: 1, type: "seek", p: 0.4 },
      { v: 1, type: "replay" },
      { v: 1, type: "theme", mode: "dark", tokens: { "--surface": "#000" } },
      { v: 1, type: "ready", marks: { pictureLayers: 2, controls: [], motion: { global: "diagramMotion", duration: 4600 } } }
    ]) {
      assert.deepEqual(PageMessageSchema.parse(JSON.parse(JSON.stringify(m))).type, m.type);
    }
    assert.equal(PageMessageSchema.safeParse({ v: 1, type: "seek", p: 2 }).success, false);
    assert.equal(PageMessageSchema.safeParse({ v: 1, type: "dance" }).success, false);
  });

  it("fills picture request defaults", () => {
    assert.deepEqual(PictureRequestSchema.parse({}), { widths: [1200], themes: ["light", "dark"], at: [1], scale: 1, format: "png" });
  });

  it("reports a failing contrast check tied to an aesthetic rule", () => {
    const r = LookResultSchema.parse({
      pictures: [{ ref: "a.png", width: 600, height: 400, theme: "dark" }],
      checks: [
        { id: "contrast", status: "fail", message: "Label is 2.9:1 on its surface", target: ".label", ruleId: "text-contrast", picture: 0 },
        { id: "hit-target", status: "pass", message: "40×24" }
      ],
      findings: [{ text: "Card shadow is blurred; the aesthetic asks for hard offsets", ruleId: "hard-shadows" }],
      aesthetic: { skillId: "neubrutalism" }
    });
    assert.equal(lookStatus(r), "fail");
    assert.equal(r.findings[0].severity, "warn");
    assert.equal(lookStatus({ checks: [], findings: [] }), "pass");
  });
});
