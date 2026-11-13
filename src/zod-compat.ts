import { z } from "zod";

/**
 * Helpers that give the same runtime behaviour under zod 3 and zod 4, so consumers can run either.
 * Types (and the exported JSON Schema) come from the zod 3 build; under zod 3 these are exactly
 * `z.record(key, value)` and `.default({})`.
 */

type MaybeZod4 = { partialRecord?: (key: unknown, value: unknown) => unknown };

/**
 * A record keyed by an enum where any subset of keys may be present. zod 4 made `z.record(enum, …)`
 * exhaustive (every key required) and added `z.partialRecord` for zod 3's behaviour.
 */
export function partialRecord<K extends z.ZodEnum<[string, ...string[]]>, V extends z.ZodTypeAny>(
  key: K,
  value: V
): z.ZodRecord<K, V> {
  const zod4 = z as unknown as MaybeZod4;
  if (typeof zod4.partialRecord === "function") {
    return zod4.partialRecord(key, value) as z.ZodRecord<K, V>;
  }
  return z.record(key, value);
}

/**
 * `.default({})` for an object whose fields have their own defaults. zod 3 parses the default value,
 * filling those fields; zod 4 returns the default as-is (`{}`) and needs `.prefault({})` instead.
 */
export function emptyObjectDefault<T extends z.ZodTypeAny>(schema: T): z.ZodDefault<T> {
  const zod4 = schema as unknown as { prefault?: (value: unknown) => unknown; _zod?: unknown };
  if (zod4._zod && typeof zod4.prefault === "function") {
    return zod4.prefault({}) as z.ZodDefault<T>;
  }
  return schema.default({} as z.util.noUndefined<z.input<T>>);
}
