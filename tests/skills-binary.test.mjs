// Binary files in skills: the content-hash rule (format 2) and file types.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  SkillManifestSchema,
  SKILL_CONTENT_HASH_FORMAT,
  SKILL_TEXT_FILE_EXTENSIONS,
  SKILL_BINARY_FILE_EXTENSIONS,
  skillContentHashInput,
  skillFileEncoding,
  skillFileMediaType
} from "../dist/skills.js";

const sha = (data) => createHash("sha256").update(data).digest("hex");
const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);

describe("skill file types", () => {
  it("tells text from binary by extension, case-insensitively", () => {
    assert.equal(skillFileEncoding("SKILL.md"), "text");
    assert.equal(skillFileEncoding("references/logo.svg"), "text");
    assert.equal(skillFileEncoding("references/cards.PNG"), "binary");
    assert.equal(skillFileEncoding("fonts/a.woff2"), "binary");
    assert.equal(skillFileEncoding("tool.exe"), undefined);
    assert.equal(skillFileEncoding("README"), undefined);
    assert.equal(skillFileEncoding(".png"), undefined, "a dot file has no extension");
    assert.equal(skillFileMediaType("references/cards.png"), "image/png");
    assert.equal(skillFileMediaType("a.jpeg"), "image/jpeg");
  });

  it("keeps the two lists apart, each with a media type", () => {
    const text = new Set(SKILL_TEXT_FILE_EXTENSIONS);
    for (const ext of SKILL_BINARY_FILE_EXTENSIONS) assert.equal(text.has(ext), false, ext);
    for (const ext of [...SKILL_TEXT_FILE_EXTENSIONS, ...SKILL_BINARY_FILE_EXTENSIONS]) {
      assert.ok(skillFileMediaType(`x.${ext}`), ext);
    }
  });

  it("describes a file's encoding in the manifest", () => {
    const m = SkillManifestSchema.parse({
      id: "ink",
      name: "Ink",
      description: "d",
      files: [{ path: "references/cards.png", role: "reference", encoding: "binary", mediaType: "image/png", size: 12 }]
    });
    assert.equal(m.files[0].encoding, "binary");
    assert.equal(
      SkillManifestSchema.safeParse({ id: "ink", name: "Ink", description: "d", files: [{ path: "a", role: "other", encoding: "base64" }] }).success,
      false
    );
  });
});

describe("content hash, format 2", () => {
  const text = [
    { path: "SKILL.md", content: "---\nname: Ink\ndescription: d\n---\nBody\n" },
    { path: "aesthetic.json", content: "{}" }
  ];

  it("hashes a text-only skill exactly as format 1 did", () => {
    assert.equal(SKILL_CONTENT_HASH_FORMAT, 2);
    const format1 = "SKILL.md\u0000---\nname: Ink\ndescription: d\n---\nBody\n\u0000aesthetic.json\u0000{}\u0000";
    assert.equal(skillContentHashInput(text), format1);
    // A hash recorded under format 1 (e.g. on a UiAestheticRef) still matches.
    assert.equal(sha(skillContentHashInput([...text].reverse())), sha(format1));
  });

  it("adds a binary file as its path and its bytes' sha256, in path order", () => {
    const digest = sha(png);
    const input = skillContentHashInput([...text, { path: "references/cards.png", sha256: digest }]);
    assert.equal(
      input,
      "SKILL.md\u0000---\nname: Ink\ndescription: d\n---\nBody\n\u0000aesthetic.json\u0000{}\u0000" +
        `references/cards.png\u0000sha256:${digest}\u0000`
    );
    const changed = Uint8Array.from(png);
    changed[11] = 1;
    assert.notEqual(sha(input), sha(skillContentHashInput([...text, { path: "references/cards.png", sha256: sha(changed) }])));
    assert.notEqual(sha(input), sha(skillContentHashInput([...text, { path: "references/other.png", sha256: digest }])));
  });

  it("refuses a binary file given as text, or a text file given as a digest", () => {
    assert.throws(() => skillContentHashInput([{ path: "a.png", content: "png" }]), /binary file type/);
    assert.throws(() => skillContentHashInput([{ path: "a.md", sha256: sha("x") }]), /not a binary file type/);
    assert.throws(() => skillContentHashInput([{ path: "a.png", sha256: "ABC" }]), /64 lowercase hex/);
  });
});
