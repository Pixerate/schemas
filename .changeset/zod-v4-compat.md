---
"@pixerate/schemas": minor
---

Support zod 4 (≥ 4.6.6, which fixes GHSA-mrhx-c7xc-m3w5) alongside zod 3: the `zod` dependency is now `^3.23.8 || ^4.6.6`. Enum-keyed records (`platforms`, `harnesses`, `packages`, notification `channels`) stay partial under zod 4 via `z.partialRecord`, and `JazzPolicySchema`'s `tempo`/`budget` still fill their defaults from nothing (zod 4 `.prefault`). zod 3 behaviour and the exported JSON Schema are unchanged.
