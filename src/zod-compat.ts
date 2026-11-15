import { z } from "zod";

/**
 * Helpers for the two zod 4 behaviours that differ from zod 3. The package is written against zod 4,
 * but the JSON Schema export bundles the same source with `zod` aliased to `zod/v3` (see
 * scripts/export-json-schema.mjs), so each helper falls back to the zod 3 equivalent at runtime.
 */

type Zod3Like = { record: (key: unknown, value: unknown) => unknown };

/**
 * A record keyed by an enum where any subset of keys may be present. zod 4 made `z.record(enum, …)`
 * exhaustive (every key required); `z.partialRecord` keeps zod 3's behaviour.
 */
export function partialRecord<K extends z.core.$ZodRecordKey, V extends z.core.SomeType>(
  key: K,
  value: V
): ReturnType<typeof z.partialRecord<K, V>> {
  if (typeof (z as { partialRecord?: unknown }).partialRecord === "function") {
    return z.partialRecord(key, value);
  }
  return (z as unknown as Zod3Like).record(key, value) as ReturnType<typeof z.partialRecord<K, V>>;
}

/**
 * Default for an object whose fields have their own defaults. zod 4's `.default({})` returns `{}`
 * as-is; `.prefault({})` parses it so the nested defaults fill, as zod 3's `.default({})` did.
 */
export function emptyObjectDefault<T extends z.ZodType>(schema: T): z.ZodPrefault<T> {
  const s = schema as unknown as { prefault?: (v: unknown) => unknown; default: (v: unknown) => unknown };
  if (typeof s.prefault === "function") return s.prefault({}) as z.ZodPrefault<T>;
  return s.default({}) as z.ZodPrefault<T>;
}
