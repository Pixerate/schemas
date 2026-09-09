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
