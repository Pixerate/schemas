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

// Ordered list of submodules to check first
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

async function main() {
  // Load all built modules
  const loadedModules = {};
  for (const mod of SUBMODULES) {
    const modPath = path.resolve(distDir, `${mod}.js`);
    if (!fs.existsSync(modPath)) {
      throw new Error(`Built module not found at ${modPath}. Run tsup build first.`);
    }
    loadedModules[mod] = await import(`file://${modPath}`);
  }

  const indexPath = path.resolve(distDir, 'index.js');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Built index not found at ${indexPath}. Run tsup build first.`);
  }
  loadedModules.index = await import(`file://${indexPath}`);

  // Build recursive definitions for zod-to-json-schema
  const definitions = {};
  if (loadedModules.jazz?.JazzJsonValueSchema) {
    definitions.JazzJsonValue = loadedModules.jazz.JazzJsonValueSchema;
  }
  if (loadedModules.genui?.TreeNodeSchema) {
    definitions.TreeNode = loadedModules.genui.TreeNodeSchema;
  }
  if (loadedModules.media?.SubtitleBurnOptionsSchema) {
    definitions.SubtitleBurnOptions = loadedModules.media.SubtitleBurnOptionsSchema;
  }
  if (loadedModules.media?.KenBurnsOptionsSchema) {
    definitions.KenBurnsOptions = loadedModules.media.KenBurnsOptionsSchema;
  }
  if (loadedModules.media?.VectorTraceOptionsSchema) {
    definitions.VectorTraceOptions = loadedModules.media.VectorTraceOptionsSchema;
  }

  // Map each schema to its origin module
  const seenSchemas = new Set();
  const schemaList = []; // { module, name, schema }

  for (const mod of SUBMODULES) {
    const exports = loadedModules[mod];
    for (const [key, value] of Object.entries(exports)) {
      if (!key.endsWith('Schema') || !value || typeof value.parse !== 'function') continue;
      if (seenSchemas.has(key)) continue;
      seenSchemas.add(key);
      schemaList.push({
        module: mod,
        name: key.replace(/Schema$/, ''),
        schema: value
      });
    }
  }

  // Any remaining schemas in index
  const indexExports = loadedModules.index;
  for (const [key, value] of Object.entries(indexExports)) {
    if (!key.endsWith('Schema') || !value || typeof value.parse !== 'function') continue;
    if (seenSchemas.has(key)) continue;
    seenSchemas.add(key);
    schemaList.push({
      module: 'index',
      name: key.replace(/Schema$/, ''),
      schema: value
    });
  }

  // Sort deterministically
  schemaList.sort((a, b) => {
    if (a.module !== b.module) return a.module.localeCompare(b.module);
    return a.name.localeCompare(b.name);
  });

  const generatedFiles = new Map(); // relativePath -> fileContent
  const indexEntries = [];

  for (const item of schemaList) {
    const { module: modName, name, schema } = item;
    const relFilePath = `${modName}/${name}.json`;
    indexEntries.push({
      module: modName,
      name,
      file: relFilePath
    });

    const schemaDefinitions = { ...definitions };
    delete schemaDefinitions[name];

    const rawJsonSchema = zodToJsonSchema(schema, {
      name,
      $refStrategy: 'root',
      definitions: schemaDefinitions
    });

    // Normalize dynamic defaults (e.g. .default(() => new Date()) or .default(() => Date.now())) so output is deterministic
    function normalizeDynamicDefaults(obj) {
      if (!obj || typeof obj !== 'object') return;
      for (const [k, val] of Object.entries(obj)) {
        if (k === 'default') {
          if (val instanceof Date || (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val))) {
            obj[k] = '1970-01-01T00:00:00.000Z';
          } else if (typeof val === 'number' && val > 1_000_000_000_000) {
            obj[k] = 0;
          }
        } else if (typeof val === 'object') {
          normalizeDynamicDefaults(val);
        }
      }
    }
    normalizeDynamicDefaults(rawJsonSchema);

    // Prune definitions that are neither the root definition nor transitively referenced
    if (rawJsonSchema.definitions) {
      function collectReferencedDefs(targetKey, currentObj, visited = new Set()) {
        if (!currentObj || typeof currentObj !== 'object') return;
        if (currentObj.$ref && typeof currentObj.$ref === 'string') {
          const match = currentObj.$ref.match(/^#\/definitions\/(.+)$/);
          if (match) {
            const refName = match[1];
            if (!visited.has(refName)) {
              visited.add(refName);
              if (rawJsonSchema.definitions[refName]) {
                collectReferencedDefs(refName, rawJsonSchema.definitions[refName], visited);
              }
            }
          }
        }
        for (const child of Object.values(currentObj)) {
          collectReferencedDefs(targetKey, child, visited);
        }
      }

      const neededDefs = new Set();
      if (rawJsonSchema.definitions[name]) {
        neededDefs.add(name);
        collectReferencedDefs(name, rawJsonSchema.definitions[name], neededDefs);
      }
      if (rawJsonSchema.$ref) {
        const match = rawJsonSchema.$ref.match(/^#\/definitions\/(.+)$/);
        if (match) {
          neededDefs.add(match[1]);
          if (rawJsonSchema.definitions[match[1]]) {
            collectReferencedDefs(match[1], rawJsonSchema.definitions[match[1]], neededDefs);
          }
        }
      }

      for (const defKey of Object.keys(rawJsonSchema.definitions)) {
        if (!neededDefs.has(defKey)) {
          delete rawJsonSchema.definitions[defKey];
        }
      }
    }

    const content = JSON.stringify(rawJsonSchema, null, 2) + '\n';
    generatedFiles.set(relFilePath, content);
  }

  // Sort index entries
  indexEntries.sort((a, b) => {
    if (a.module !== b.module) return a.module.localeCompare(b.module);
    return a.name.localeCompare(b.name);
  });

  const indexContent = JSON.stringify(indexEntries, null, 2) + '\n';
  generatedFiles.set('index.json', indexContent);

  if (isCheck) {
    let hasDiff = false;
    for (const [relPath, expectedContent] of generatedFiles.entries()) {
      const fullPath = path.resolve(jsonSchemaDir, relPath);
      if (!fs.existsSync(fullPath)) {
        console.error(`Missing JSON Schema file: ${relPath}`);
        hasDiff = true;
      } else {
        const actualContent = fs.readFileSync(fullPath, 'utf8');
        if (actualContent !== expectedContent) {
          console.error(`Stale JSON Schema file: ${relPath}`);
          hasDiff = true;
        }
      }
    }

    // Check for any extra unexpected files in jsonSchemaDir
    if (fs.existsSync(jsonSchemaDir)) {
      function scanDir(dir, base = '') {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const subRel = base ? `${base}/${entry.name}` : entry.name;
          if (entry.isDirectory()) {
            scanDir(path.resolve(dir, entry.name), subRel);
          } else if (entry.isFile() && entry.name.endsWith('.json')) {
            if (!generatedFiles.has(subRel)) {
              console.error(`Unexpected extra file in json-schema: ${subRel}`);
              hasDiff = true;
            }
          }
        }
      }
      scanDir(jsonSchemaDir);
    }

    if (hasDiff) {
      console.error('JSON Schema check failed: files are stale or out of sync. Run `npm run export:json-schema` to update.');
      process.exit(1);
    } else {
      console.log(`JSON Schema check passed (${generatedFiles.size} files verified).`);
      return;
    }
  }

  // Write mode
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
