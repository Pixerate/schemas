---
'@pixerate/schemas': minor
---

Add a `@pixerate/schemas/realtime` entry point, mark the package side-effect free, and add optional `off()` to `IRealtimeChannel`.

- The realtime collaboration contracts (presence, cursors, indicators, record locks, activity, OT/CRDT, channels, grid events) now live in `src/realtime.ts`. `@pixerate/schemas` re-exports them unchanged, so the root entry's exports are identical.
- Importing them from `@pixerate/schemas/realtime` bundles about 5 KB instead of about 53 KB (minified, zod excluded), because client bundles no longer pull in every other schema. `@pixerate/realtime` will import from it.
- `"sideEffects": false` lets bundlers drop entry points an app doesn't use.
- `IRealtimeChannel.off?(type, filter, callback?)` removes listeners. It's optional, so existing adapters still compile. It matches the interface `@pixerate/realtime-core` has used since 1.7.
