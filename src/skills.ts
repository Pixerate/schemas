import { z } from "zod";

/**
 * Agent skills: one contract for every package that loads, checks, stores or ships skills
 * (agent-core's `AgentSkill`, editor's house-style skills, Flair's packaged skills, Surreal UI's
 * aesthetics). A skill is a folder: a `SKILL.md` whose frontmatter is the manifest below, an
 * optional profile file for its kind (`aesthetic.json`, `brand.json`, …) and supporting files.
 *
 * This module describes the files. Parsing, storage, layering and prompt delivery stay in the
 * packages that use them.
 *
 * Also available as the `@pixerate/schemas/skills` entry point.
 */

const SKILL_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const SHA256 = /^[a-f0-9]{64}$/;

export const SkillIdSchema = z
  .string()
  .regex(SKILL_ID, "A skill id is lowercase words joined by hyphens, e.g. 'ink-editorial'")
  .describe("The skill's id: its folder name, lowercase words joined by hyphens");
export type SkillId = z.infer<typeof SkillIdSchema>;

/** What a file in a skill is for. */
export const SkillFileRoleSchema = z
  .enum(["instructions", "profile", "reference", "example", "kit", "check", "other"])
  .describe(
    "instructions: SKILL.md and files it points a model to; profile: the kind's typed profile; reference: pictures or documents to aim for; example: worked examples; kit: code a page or component may use; check: a check that can be run"
  );
export type SkillFileRole = z.infer<typeof SkillFileRoleSchema>;

export const SkillFileSchema = z.object({
  path: z.string().min(1).describe("Path inside the skill folder, with '/' separators and no '..'"),
  role: SkillFileRoleSchema,
  mediaType: z.string().optional().describe("Media type, e.g. 'text/markdown', 'application/json', 'image/png'"),
  size: z.number().int().nonnegative().optional().describe("Size in bytes"),
  note: z.string().optional().describe("What to take from this file (for references: what the picture shows that matters)")
});
export type SkillFile = z.infer<typeof SkillFileSchema>;

/**
 * The manifest: `SKILL.md`'s frontmatter plus the skill's id. Frontmatter fields map one-to-one;
 * `id` is the folder name, which loaders fill in (frontmatter may also give it). `name` and
 * `description` are the fields agent-core, editor and Flair already write; everything else is
 * optional, so existing skills stay valid.
 */
export const SkillManifestSchema = z.object({
  id: SkillIdSchema.describe("The skill's id: its folder name (loaders fill it in when frontmatter leaves it out)"),
  name: z.string().min(1).describe("Display name"),
  description: z.string().min(1).describe("When to use this skill, in a sentence or two (shown in catalogs and to models)"),
  version: z.string().regex(SEMVER, "version is semver, e.g. '1.2.0'").default("0.1.0"),
  kind: z
    .string()
    .min(1)
    .default("skill")
    .describe("The skill's kind (see SkillKindSchema). Built-in kinds: 'rule', 'skill', 'style', 'ui-aesthetic'"),
  extends: z
    .string()
    .optional()
    .describe("Another skill this one builds on: its id, optionally pinned as 'id@1.2.0'"),
  tags: z.array(z.string()).default([]),
  metadata: z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .optional()
    .describe("Free-form frontmatter metadata a package reads, e.g. editor's { kind: 'workflow', reference: '…' }"),
  files: z.array(SkillFileSchema).default([]).describe("Files in the skill, SKILL.md included"),
  contentHash: z
    .string()
    .regex(SHA256)
    .optional()
    .describe("sha256 (hex) of skillContentHashInput(files with their contents); changes whenever any file does")
});
export type SkillManifest = z.infer<typeof SkillManifestSchema>;
export type SkillManifestInput = z.input<typeof SkillManifestSchema>;

/** How a kind's profile combines across `extends` and layers. */
export const SkillMergeSchema = z
  .enum(["replace", "deep", "none"])
  .describe("replace: the nearer profile wins whole; deep: objects merge key by key, arrays are replaced; none: extending or overriding is not allowed");
export type SkillMerge = z.infer<typeof SkillMergeSchema>;

export const SkillKindSchema = z.object({
  id: z.string().min(1),
  description: z.string().optional(),
  profileFile: z.string().optional().describe("The profile's file name in the skill folder, e.g. 'aesthetic.json'"),
  profileSchema: z
    .string()
    .optional()
    .describe("Where the profile's JSON Schema lives, e.g. '@pixerate/schemas/json-schema/genui/UiAestheticProfile.json'"),
  profileVersion: z.number().int().positive().optional().describe("The profile version this kind writes; older profiles are migrated"),
  merge: SkillMergeSchema.default("replace")
});
export type SkillKind = z.infer<typeof SkillKindSchema>;

/** The kinds every package can expect to see. Packages may register more. */
export const BUILT_IN_SKILL_KINDS: readonly SkillKind[] = [
  { id: "rule", description: "Instructions applied to every turn", merge: "none" },
  { id: "skill", description: "Instructions a model loads when a task needs them", merge: "none" },
  { id: "style", description: "A house style (editor): brand and per-domain profiles", profileFile: "brand.json", merge: "deep" },
  {
    id: "ui-aesthetic",
    description: "A look for UI components: rules, colour roles, motion, shape, references and checks",
    profileFile: "aesthetic.json",
    profileSchema: "@pixerate/schemas/json-schema/genui/UiAestheticProfile.json",
    profileVersion: 1,
    merge: "deep"
  }
];

/** Where a skill comes from. Nearer layers override farther ones (user over workspace over org over builtin). */
export const SkillLayerSchema = z.enum(["builtin", "org", "workspace", "user"]);
export type SkillLayer = z.infer<typeof SkillLayerSchema>;

/** App state about a skill, kept apart from its files. */
export const SkillStateSchema = z.object({
  id: SkillIdSchema,
  enabled: z.boolean().default(true),
  layer: SkillLayerSchema.optional(),
  updatedAt: z.string().optional().describe("ISO timestamp")
});
export type SkillState = z.infer<typeof SkillStateSchema>;

/** The manifest of a `.skill` bundle (a zip of the skill folder plus `bundle.json`). */
export const SkillBundleManifestSchema = z.object({
  format: z.literal(1).describe("Bundle format version"),
  skill: SkillManifestSchema,
  files: z
    .array(
      z.object({
        path: z.string().min(1),
        size: z.number().int().nonnegative(),
        sha256: z.string().regex(SHA256)
      })
    )
    .describe("Every file in the zip except bundle.json; installers refuse anything not listed, or that doesn't match"),
  contentHash: z.string().regex(SHA256)
});
export type SkillBundleManifest = z.infer<typeof SkillBundleManifestSchema>;

/**
 * The text a skill's `contentHash` is the sha256 of: each file as `path`, a NUL, its content,
 * a NUL, sorted by path (code-point order). Hashing is left to the caller, so this module
 * stays dependency-free in every runtime.
 */
export function skillContentHashInput(files: ReadonlyArray<{ path: string; content: string }>): string {
  return [...files]
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
    .map((f) => `${f.path}\u0000${f.content}\u0000`)
    .join("");
}
