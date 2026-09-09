# Agent Guidelines

Guidelines and instructions for AI agents working in `@pixerate/schemas`.

---

## ⚠️ GOTCHAS.md: Check & Maintain

All agents working on this codebase must adhere to the following workflow regarding [GOTCHAS.md](file:///Users/jack/Development/pixerate-schemas/GOTCHAS.md):

### 1. Check Before Starting
- **Always consult [GOTCHAS.md](file:///Users/jack/Development/pixerate-schemas/GOTCHAS.md)** at the start of any task or investigation.
- Check for known issues, historical pitfalls, non-obvious quirks, and existing workarounds before implementing changes or debugging issues.

### 2. Maintain When You Encounter Issues
- **Keep [GOTCHAS.md](file:///Users/jack/Development/pixerate-schemas/GOTCHAS.md) up to date**: Whenever you run into an unexpected error, a subtle pitfall, a build/type issue, or a tooling quirk, document it immediately once solved.
- **Entry Structure**: Each entry in `GOTCHAS.md` should clearly state:
  - **Issue / Pitfall**: What happened, error message, or failure mode.
  - **Context / Cause**: Why it occurred and under what conditions.
  - **Solution / Workaround**: The concrete fix, command, or practice to avoid or resolve the issue.

---

## Repository Overview & Conventions

- **Purpose**: `@pixerate/schemas` provides unified TypeScript and Zod validation models for Pixerate and downstream services.
- **Source**: All schemas and types are exported from `src/index.ts`.
- **Build**: Run `npm run build` (`tsup` bundles ESM, CJS, and declaration files into `dist/`). Always verify the build passes cleanly after modifying schemas.
- **Changesets**: This repository enforces changesets in CI (`.github/workflows/ci.yml`).
  - Run `npm run changeset` for changes requiring a version bump.
  - Run `npx changeset --empty` for non-functional or documentation updates.
