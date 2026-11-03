import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { zodToJsonSchema } from 'zod-to-json-schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const jsonSchemaDir = path.resolve(rootDir, 'json-schema');

const isCheck = process.argv.includes('--check');

// Ordered list of submodules. A schema exported by several modules belongs to the first one here.
const SUBMODULES = [
  'common',
  'realtime',
  'genui',
  'media',
  'agent',
  'jobs',
  'analytics',
  'jazz'
];

// Two different clocks for finding defaults computed at parse time (`.default(() => new Date())`).
const CLOCK_A = Date.UTC(2001, 0, 1);
const CLOCK_B = Date.UTC(2002, 0, 1);

async function loadSchemas() {
  const loadedModules = {};
  for (const mod of [...SUBMODULES, 'index']) {
    const modPath = path.resolve(distDir, `${mod}.js`);
    if (!fs.existsSync(modPath)) {
      throw new Error(`Built module not found at ${modPath}. Run tsup build first.`);
    }
    loadedModules[mod] = await import(`file://${modPath}`);
  }

  // Map each schema to its origin module (the root index only keeps what no submodule exports).
  const seenSchemas = new Set();
  const schemaList = []; // { module, name, schema }
  for (const mod of [...SUBMODULES, 'index']) {
    for (const [key, value] of Object.entries(loadedModules[mod])) {
      if (!key.endsWith('Schema') || !value || typeof value.parse !== 'function') continue;
      if (seenSchemas.has(key)) continue;
      seenSchemas.add(key);
      schemaList.push({ module: mod, name: key.replace(/Schema$/, ''), schema: value });
    }
  }

  schemaList.sort((a, b) => {
    if (a.module !== b.module) return a.module.localeCompare(b.module);
    return a.name.localeCompare(b.name);
  });
  return schemaList;
}

/** Runs `fn` with `Date` and `Date.now()` frozen at `ms`, so parse-time defaults are reproducible. */
function withClock(ms, fn) {
  const RealDate = globalThis.Date;
  class FixedDate extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [ms]));
    }
    static now() {
      return ms;
    }
  }
  globalThis.Date = FixedDate;
  try {
    return fn();
  } finally {
    globalThis.Date = RealDate;
  }
}

/** Name of the definition a `#/definitions/<Name>...` pointer starts in. */
function definitionName(ref) {
  const match = typeof ref === 'string' && ref.match(/^#\/definitions\/([^/]+)/);
  return match ? match[1] : null;
}

function resolvePointer(root, ref) {
  let current = root;
  for (const part of ref.slice(2).split('/')) {
    if (!current || typeof current !== 'object' || !(part in current)) return undefined;
    current = current[part];
  }
  return current;
}

/**
 * zod-to-json-schema points a second use of an unnamed schema at its first use, which can be inside
 * an unrelated definition (`#/definitions/JazzFeedback/properties/at`). Replace those pointers with
 * a copy of what they point to, so every `$ref` left names a whole definition.
 */
function inlineInnerPointers(node, root, depth = 0) {
  if (!node || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map((item) => inlineInnerPointers(item, root, depth));
  if (typeof node.$ref === 'string' && node.$ref.startsWith('#/definitions/') && node.$ref.split('/').length > 3) {
    if (depth > 50) throw new Error(`JSON pointer chain too deep at ${node.$ref}`);
    const target = resolvePointer(root, node.$ref);
    if (target === undefined) throw new Error(`Unresolved JSON pointer ${node.$ref}`);
    const { $ref, ...rest } = node;
    return { ...inlineInnerPointers(structuredClone(target), root, depth + 1), ...inlineInnerPointers(rest, root, depth) };
  }
  const out = {};
  for (const [key, value] of Object.entries(node)) out[key] = inlineInnerPointers(value, root, depth);
  return out;
}

/** Drops definitions the root does not reach. */
function pruneDefinitions(jsonSchema) {
  if (!jsonSchema.definitions) return;
  const needed = new Set();
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    const name = definitionName(node.$ref);
    if (name && !needed.has(name)) {
      needed.add(name);
      visit(jsonSchema.definitions[name]);
    }
    for (const [key, value] of Object.entries(node)) {
      if (node === jsonSchema && key === 'definitions') continue;
      visit(value);
    }
  };
  visit(jsonSchema);
  for (const key of Object.keys(jsonSchema.definitions)) {
    if (!needed.has(key)) delete jsonSchema.definitions[key];
  }
}

/** Removes every `default` that differs between two exports made at different clock times. */
function dropDynamicDefaults(a, b) {
  if (!a || typeof a !== 'object' || !b || typeof b !== 'object') return;
  for (const key of Object.keys(a)) {
    if (key === 'default' && JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
      delete a[key];
    } else {
      dropDynamicDefaults(a[key], b[key]);
    }
  }
}

function exportSchemas(schemaList, clock) {
  // Every exported schema is a definition, so a schema used inside another one becomes a `$ref` to
  // its own definition instead of an inline copy. Where two names export the same schema object,
  // the first name is the definition and the other one refers to it.
  const definitions = {};
  for (const { name, schema } of schemaList) {
    if (!(name in definitions)) definitions[name] = schema;
  }

  return withClock(clock, () =>
    schemaList.map(({ schema }) => {
      const raw = zodToJsonSchema(schema, { $refStrategy: 'root', definitions });
      const jsonSchema = inlineInnerPointers(raw, raw);
      pruneDefinitions(jsonSchema);
      return jsonSchema;
    })
  );
}

async function main() {
  const schemaList = await loadSchemas();
  const exported = exportSchemas(schemaList, CLOCK_A);
  const exportedLater = exportSchemas(schemaList, CLOCK_B);

  const generatedFiles = new Map(); // relativePath -> fileContent
  const indexEntries = [];

  schemaList.forEach(({ module: modName, name }, i) => {
    const relFilePath = `${modName}/${name}.json`;
    indexEntries.push({ module: modName, name, file: relFilePath });

    const jsonSchema = exported[i];
    dropDynamicDefaults(jsonSchema, exportedLater[i]);
    generatedFiles.set(relFilePath, JSON.stringify(jsonSchema, null, 2) + '\n');
  });

  generatedFiles.set('index.json', JSON.stringify(indexEntries, null, 2) + '\n');

  if (isCheck) {
    let hasDiff = false;
    for (const [relPath, expectedContent] of generatedFiles.entries()) {
      const fullPath = path.resolve(jsonSchemaDir, relPath);
      if (!fs.existsSync(fullPath)) {
        console.error(`Missing JSON Schema file: ${relPath}`);
        hasDiff = true;
      } else if (fs.readFileSync(fullPath, 'utf8') !== expectedContent) {
        console.error(`Stale JSON Schema file: ${relPath}`);
        hasDiff = true;
      }
    }

    // Check for any extra unexpected files in jsonSchemaDir
    if (fs.existsSync(jsonSchemaDir)) {
      function scanDir(dir, base = '') {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const subRel = base ? `${base}/${entry.name}` : entry.name;
          if (entry.isDirectory()) {
            scanDir(path.resolve(dir, entry.name), subRel);
          } else if (entry.isFile() && entry.name.endsWith('.json') && !generatedFiles.has(subRel)) {
            console.error(`Unexpected extra file in json-schema: ${subRel}`);
            hasDiff = true;
          }
        }
      }
      scanDir(jsonSchemaDir);
    }

    if (hasDiff) {
      console.error('JSON Schema check failed: files are stale or out of sync. Run `npm run export:json-schema` to update.');
      process.exit(1);
    }
    console.log(`JSON Schema check passed (${generatedFiles.size} files verified).`);
    return;
  }

  // Write mode: replace the directory so removed schemas do not leave files behind.
  fs.rmSync(jsonSchemaDir, { recursive: true, force: true });
  for (const [relPath, content] of generatedFiles.entries()) {
    const fullPath = path.resolve(jsonSchemaDir, relPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
  }

  console.log(`Exported ${generatedFiles.size} JSON Schema files to ${jsonSchemaDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
