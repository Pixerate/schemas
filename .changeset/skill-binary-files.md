---
"@pixerate/schemas": minor
---

Skills can hold binary files such as reference pictures. `skillContentHashInput` now takes a binary file as `{ path, sha256 }` (its bytes' sha256) and adds it as `path NUL sha256:<hex> NUL`; text files are unchanged, so a skill with no binary files hashes exactly as before and recorded `contentHash`es stay valid (`SKILL_CONTENT_HASH_FORMAT` is 2). Text and binary are told apart by extension: `skillFileEncoding`, `skillFileMediaType`, `SKILL_TEXT_FILE_EXTENSIONS`, `SKILL_BINARY_FILE_EXTENSIONS` (png, jpg, jpeg, webp, gif, avif, pdf, woff, woff2, ttf, otf). `SkillFile` gains an optional `encoding`. Passing a binary path with text content now throws.
