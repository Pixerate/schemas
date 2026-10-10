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
- **Solution / Workaround**: Group related schemas into their own module with its own tsup entry and `package.json` export (see `src/realtime.ts` → `@pixerate/schemas/realtime`), and re-export it from `src/index.ts` so the root entry is unchanged. The package is `"sideEffects": false`, so bundlers skip entry modules an app doesn't import. Note that the CJS build is not code-split: `dist/index.cjs` and `dist/realtime.cjs` each hold their own copy of the realtime schemas.

