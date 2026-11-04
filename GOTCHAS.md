# Gotchas & Pitfalls

A living document of known issues, pitfalls, quirks, and their solutions or workarounds.

> **Note for Agents**: Check this file before starting work on tasks. When you resolve a new issue, edge case, or tooling pitfall, add it here following the format below.

---

## Template for New Entries

```markdown
### [Brief summary of the issue or pitfall]

- **Issue / Pitfall**: What went wrong or what unexpected behavior occurred.
- **Context / Cause**: Why it happened or the conditions under which it triggers.
- **Solution / Workaround**: Step-by-step fix or preventive measure.
```

---

## Known Issues & Workarounds

### `npm run build` Fails in `genui.ts` With a Stale `node_modules`

- **Issue / Pitfall**: The d.ts build failed with `src/genui.ts(478,14): error TS2322: Type 'ZodObject<…>' is not assignable to type 'ZodType<FormControl, …>'` although `genui.ts` was unchanged.
- **Context / Cause**: The checkout had tsup 8.5.1 installed while `package.json` asks for `^9.0.0` (`npm ls` reports it `invalid`). The older tsup's declaration build trips over the recursive `FormControl` type.
- **Solution / Workaround**: Run `npm ci` after pulling, and check `npm ls tsup typescript zod` for `invalid` before chasing a type error the diff didn't touch.

### CI Fails on Pull Requests Due to Missing Changeset

- **Issue / Pitfall**: Pull request CI pipeline fails with `Missing Changeset: No changeset found in .changeset/`.
- **Context / Cause**: The CI workflow (`.github/workflows/ci.yml`) strictly requires at least one `.changeset/*.md` file (excluding `README.md`) on pull requests.
- **Solution / Workaround**:
  - For schema/feature/fix updates: Run `npm run changeset` and follow prompts to specify bump level (`patch`/`minor`/`major`) and description.
  - For docs/CI/non-release updates: Run `npx changeset --empty` to generate an empty changeset file that satisfies the CI check without triggering a package release.

### Build Verification After Schema Changes

- **Issue / Pitfall**: Downstream consumers or typecheck might fail if `dist/` is out of date or type declarations have subtle export issues.
- **Context / Cause**: Build output is generated into `dist/` via `tsup`.
- **Solution / Workaround**: Always run `npm run build` after editing `src/index.ts` to confirm there are no type generation or bundle errors.

### Release Tags Pointed at the Commit Before the Release

- **Issue / Pitfall**: Git tags such as `v1.23.0` pointed at the commit *before* the release commit, so `package.json` at the tag still showed the previous version (`1.22.0`). Installing `github:Pixerate/schemas#v1.23.0` produced a package that reported the wrong version. The npm packages were correct.
- **Context / Cause**: `release-and-publish.yml` ran `npx changeset publish`, which creates the git tags on the current `HEAD`, *before* committing the `changeset version` bump. The final `git push … || echo` also swallowed push failures, so a release could reach npm without its commit or tags reaching GitHub.
- **Solution / Workaround**: The workflow now runs version → build → **commit** → publish (tags land on the release commit) → `git push origin HEAD --follow-tags`, with no `|| echo`, so a failed push fails the job. Changesets creates annotated tags, which `--follow-tags` pushes. Tags created before this fix (≤ v1.23.0) are still off by one; consumers should install from npm (`@pixerate/schemas@^1.x`), not git tags.

### Importing One Schema Pulls In Every Schema

- **Issue / Pitfall**: Importing a single schema from `@pixerate/schemas` (e.g. `PresenceUserSchema`) adds about 53 KB of minified code to a client bundle.
- **Context / Cause**: Everything lived in one module, and top-level `z.object(...)` calls look like side effects to bundlers, so unused schemas in the same module can't be tree-shaken.
- **Solution / Workaround**: Group related schemas into their own module with its own tsup entry and `package.json` export (see `src/realtime.ts` → `@pixerate/schemas/realtime` `src/genui.ts` → `@pixerate/schemas/genui` and `src/media.ts` → `@pixerate/schemas/media`, `src/agent.ts` → `@pixerate/schemas/agent`), and re-export it from `src/index.ts` so the root entry is unchanged. The package is `"sideEffects": false`, so bundlers skip entry modules an app doesn't import. Note that the CJS build is not code-split: `dist/index.cjs` and `dist/realtime.cjs` each hold their own copy of the realtime schemas (likewise `dist/genui.cjs`). A grouped module must not import from `src/index.ts`, because the root re-exports it and that would create a cycle; move a schema used only by the group and the root into the grouped module (the root may import from it, as `index.ts` does with `TextOverlaySchema`), and move basics shared by several groups into `src/common.ts`. Before splitting, check references in both directions. A tsc check that every previously exported name still resolves from `dist/index.js` (`typeof R.X` for values, `R.X` for types) catches anything a key diff misses.

### Refining an Object Schema Removes `.shape` and `.extend()`

- **Issue / Pitfall**: After adding `.superRefine()` to a `z.object(...)` (as `ElicitationRequestSchema` does for its 2–4 option rule), calling `.shape`, `.extend()`, `.pick()` or `.omit()` on the exported schema fails to typecheck, and `FooSchema.extend({...})` in a downstream package breaks.
- **Context / Cause**: In Zod 3, `.refine()` / `.superRefine()` wrap the object in a `ZodEffects`, which doesn't have the object methods. The inferred type (`z.infer`) is unchanged, so the break only shows in code that composes the schema.
- **Solution / Workaround**: Before refining an exported object schema, search downstream repos for `.shape` / `.extend(` on it and call the change out in the changeset. Compose from the unrefined parts instead (e.g. `FormChoiceSchema.extend(...)` for options) and apply the refinement last. Refinements on array items still run when the refined schema is nested, as in `ElicitationBatchSchema.questions`.

### `z.any()` in a Generation Schema Stalls or Breaks Gemini Structured Outputs

- **Issue / Pitfall**: `generateStructured` with `TechnicalFormSchema` and `structuredOutputs: true` timed out (45s on gemini-3.8-flash, 90s on gemini-3.5-flash-lite) for `FormHandoffActionSchema`, and usually for `FormValidatorSchema`. Vertex accepted those schemas on their own. With the whole `TechnicalFormSchema`, Vertex rejects the request with HTTP 400 `INVALID_ARGUMENT` on both models, before and after the `config` fix (live test, 23 October 2026).
- **Context / Cause**: `z.any()` / `z.unknown()` convert to an empty JSON Schema (`{}`). The AI SDK passes it to Gemini as `responseJsonSchema`, leaving that slot unconstrained during constrained decoding.
- **Solution / Workaround**: Give every field in a schema used for generation a concrete type, such as `FormConfigSchema` (a record of string, number or boolean values) for free-form settings. To keep stored data parsing, coerce older shapes with `z.preprocess` (as `normalizeFormConfig` does). JSON Schema conversion still emits the inner type. `BaseFormControlSchema.defaultValue` uses `FormDefaultValueSchema` (string, number, boolean or string[]) with `normalizeFormDefaultValue`. `tests/form-default-value.test.mjs` fails if any `{}` subschema reappears in `TechnicalFormSchema`. If Vertex still returns 400, the remaining suspects are schema depth (17 levels), size (about 11.6 KB) and `type: [...]` arrays; the isolation test in the PR that added `FormDefaultValueSchema` separates them.

### `zod-to-json-schema` Copies Shared Schemas Inline Unless They Are Definitions

- **Issue / Pitfall**: Each exported JSON Schema carried its own inline copy of every schema it used, so generated Swift had one type per use: `JazzPhrase.observations` was `[JazzPhraseObservationsItem]` instead of `[JazzObservation]`, with 20 duplicate enums. Passing `name` together with a `definitions` map that contains the same schema also produced a definition that pointed only at itself (and a `RangeError` in Ajv for recursive schemas).
- **Context / Cause**: `zod-to-json-schema` only emits a `$ref` for schema objects listed in `definitions`, matched by object identity. With `name`, the root is added as a definition again and matches its own entry.
- **Solution / Workaround**: `scripts/export-json-schema.mjs` passes every exported schema as a definition and no `name`. The root then becomes `$ref: #/definitions/<Name>`, and every shared schema is a `$ref` to its own definition. Unreachable definitions are pruned per file. Where two names export the same schema object, the first name is the definition.

### `zod-to-json-schema` Points a Second Use at the First One's Location

- **Issue / Pitfall**: Code generation met refs like `#/definitions/JazzFeedback/properties/at` inside `JazzPhrase`, pointing into an unrelated definition (and pruning that definition would leave the ref dangling).
- **Context / Cause**: A schema object that is not exported (e.g. an internal `IsoDateTimeSchema`) but is used twice is written out at its first use; later uses point at that path.
- **Solution / Workaround**: The export replaces every `$ref` that points inside a definition with a copy of its target, so every `$ref` in `json-schema/` names a whole definition. `tests/json-schema.test.mjs` checks this.

### Dynamic Date / Timestamp Defaults Cause Non-Deterministic JSON Schema Exports

- **Issue / Pitfall**: Zod defaults such as `.default(() => new Date())` or `.default(() => Date.now())` are evaluated by `zod-to-json-schema`, so every export wrote a different timestamp. Replacing them with a fixed value published wrong defaults (a `createdAt` that defaults to 1970, a `positive()` field that defaults to 0).
- **Context / Cause**: Zod stores every default as a function, so a fixed default and a computed one look the same.
- **Solution / Workaround**: The export runs twice with `Date` frozen at two different times and removes every `default` that differs. Those fields have no default in JSON Schema and are optional in Swift.

### `npm run build` Rewrites `json-schema/`, So `--check` After a Build Proves Nothing

- **Issue / Pitfall**: CI ran `export:json-schema -- --check` after `npm run build` (and `npm ci` runs `prepare`, which builds). The check compared freshly written files with themselves and always passed.
- **Context / Cause**: The build ends with `export:json-schema` in write mode.
- **Solution / Workaround**: CI checks `git status --porcelain -- json-schema` after the build instead. Locally, run `npm run build` and commit any change under `json-schema/`, `swift/` and `tests/fixtures/swift/`.

### SwiftPM Ignores Prefixed Version Tags

- **Issue / Pitfall**: A `swift-v1.45.0` tag cannot be used with `.package(url:from:)`.
- **Context / Cause**: SwiftPM only treats `1.2.3` and `v1.2.3` tags as versions.
- **Solution / Workaround**: Swift consumers use the npm release tags (`v1.45.0`) with `from: "1.45.0"`. Do not add Swift-only tags.

### Swift Optionals Cannot Tell `null` From a Missing Key

- **Issue / Pitfall**: A field that is both `.nullable()` and `.optional()` decodes `null` and a missing key to the same `nil`.
- **Context / Cause**: `String?` has one empty state.
- **Solution / Workaround**: Generated `encode(to:)` writes a nullable field's `nil` as `null` (matching records written by TypeScript) and leaves other `nil` fields out. Where an API gives `null` and a missing key different meanings, make that explicit in the schema rather than relying on the difference.
