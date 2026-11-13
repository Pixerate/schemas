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
  encoding: z
    .enum(["text", "binary"])
    .optional()
    .describe("text or binary, as skillFileEncoding(path) says; binary files (pictures, PDFs, fonts) enter the content hash by their sha256"),
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
    .describe("sha256 (hex) of skillContentHashInput(every file: text by content, binary by its sha256); changes whenever any file does")
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
 * File types a skill may hold, by extension. Text files are hashed by their content; binary files
 * (pictures, PDFs, fonts) by their bytes' sha256. Anything else is left out of a skill. A path's
 * extension alone decides which, so every package hashes the same folder the same way.
 */
export const SKILL_TEXT_FILE_EXTENSIONS = [
  "md", "markdown", "txt", "json", "jsonl", "yaml", "yml", "toml", "csv", "tsv", "xml",
  "html", "htm", "css", "svg", "js", "mjs", "cjs", "ts", "tsx", "jsx"
] as const;
export const SKILL_BINARY_FILE_EXTENSIONS = [
  "png", "jpg", "jpeg", "webp", "gif", "avif", "pdf", "woff", "woff2", "ttf", "otf"
] as const;

/** Media types for the file types above. */
export const SKILL_FILE_MEDIA_TYPES: Readonly<Record<string, string>> = {
  md: "text/markdown", markdown: "text/markdown", txt: "text/plain", json: "application/json",
  jsonl: "application/jsonl", yaml: "application/yaml", yml: "application/yaml", toml: "application/toml",
  csv: "text/csv", tsv: "text/tab-separated-values", xml: "application/xml", html: "text/html", htm: "text/html",
  css: "text/css", svg: "image/svg+xml", js: "text/javascript", mjs: "text/javascript", cjs: "text/javascript",
  ts: "text/typescript", tsx: "text/typescript", jsx: "text/javascript",
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif",
  avif: "image/avif", pdf: "application/pdf", woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf", otf: "font/otf"
};

export type SkillFileEncoding = "text" | "binary";

const extensionOf = (path: string): string => {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
};
const TEXT_EXTENSIONS: ReadonlySet<string> = new Set(SKILL_TEXT_FILE_EXTENSIONS);
const BINARY_EXTENSIONS: ReadonlySet<string> = new Set(SKILL_BINARY_FILE_EXTENSIONS);

/** Whether a skill file is text or binary, from its extension; `undefined` for a type skills don't hold. */
export function skillFileEncoding(path: string): SkillFileEncoding | undefined {
  const ext = extensionOf(path);
  if (TEXT_EXTENSIONS.has(ext)) return "text";
  if (BINARY_EXTENSIONS.has(ext)) return "binary";
  return undefined;
}

/** A skill file's media type from its extension, or `undefined`. */
export function skillFileMediaType(path: string): string | undefined {
  return SKILL_FILE_MEDIA_TYPES[extensionOf(path)];
}

/**
 * Which content-hash rule this package writes. Format 1 hashed text files only; format 2 adds
 * binary files as their sha256. A skill with no binary files hashes the same under both, so
 * format-1 hashes recorded anywhere (`UiAestheticRef.contentHash`, bundles) stay valid.
 */
export const SKILL_CONTENT_HASH_FORMAT = 2;

/** A file as it goes into the content hash: a text file with its content, or a binary file with its bytes' sha256 (hex). */
export type SkillContentHashFile =
  | { path: string; content: string; sha256?: undefined }
  | { path: string; sha256: string; content?: undefined };

/**
 * The text a skill's `contentHash` is the sha256 of. Files are sorted by path (code-point order)
 * and each adds:
 *
 * - a text file: `path`, a NUL, its content, a NUL (format 1, unchanged);
 * - a binary file: `path`, a NUL, `sha256:` and its bytes' sha256 in lowercase hex, a NUL.
 *
 * A file is binary when {@link skillFileEncoding} says so; pass its `sha256`, not its content.
 * Throws when a binary path is given content or a text path is given a sha256. Hashing is left to
 * the caller, so this module stays dependency-free in every runtime.
 */
export function skillContentHashInput(files: ReadonlyArray<SkillContentHashFile>): string {
  return [...files]
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
    .map((f) => {
      const binary = skillFileEncoding(f.path) === "binary";
      if (typeof f.sha256 === "string") {
        if (!binary) throw new Error(`"${f.path}" is not a binary file type; hash it by its content`);
        if (!SHA256.test(f.sha256)) throw new Error(`"${f.path}": sha256 must be 64 lowercase hex characters`);
        return `${f.path}\u0000sha256:${f.sha256}\u0000`;
      }
      if (binary) throw new Error(`"${f.path}" is a binary file type; pass its bytes' sha256, not its content`);
      return `${f.path}\u0000${f.content}\u0000`;
    })
    .join("");
}
