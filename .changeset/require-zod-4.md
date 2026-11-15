---
"@pixerate/schemas": major
---

Require zod 4 (`^4.6.6`) and drop zod 3 support. The type declarations were still generated with zod 3,
so under zod 4 an enum type such as `TeamRole` resolved to the array's methods and properties, and
`Record<TeamRole, …>` stopped compiling in consumers. The schemas are now written and typed against
zod 4, which also removes zod 3.25.76 (GHSA-mrhx-c7xc-m3w5, no zod 3 fix) from consumer installs.

Consumers must install zod 4 and use zod 4 APIs wherever they compose these schemas with their own
(`z.record` needs a key schema; `.default({})` on an object with nested defaults is now `.prefault({})`).
Runtime parsing and the published `json-schema/` output are unchanged.
