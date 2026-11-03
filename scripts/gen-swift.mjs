import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const jsonSchemaDir = path.resolve(rootDir, 'json-schema');
const swiftGeneratedDir = path.resolve(rootDir, 'swift', 'Sources', 'PixerateSchemas', 'Generated');

const isCheck = process.argv.includes('--check');

// Reserved Swift keywords to escape or remap
const SWIFT_KEYWORDS = new Set([
  'associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate', 'func',
  'import', 'init', 'inout', 'internal', 'let', 'open', 'operator', 'private',
  'precedencegroup', 'protocol', 'public', 'rethrows', 'static', 'struct', 'subscript',
  'typealias', 'var', 'break', 'case', 'catch', 'continue', 'default', 'defer',
  'do', 'else', 'fallthrough', 'for', 'guard', 'if', 'in', 'repeat', 'return',
  'throw', 'switch', 'where', 'while', 'as', 'false', 'is', 'nil', 'self', 'Self',
  'super', 'true', 'try', 'throws', 'description'
]);

function toSwiftIdentifier(str) {
  // If it starts with numbers, prefix with 'r'
  if (/^[0-9]/.test(str)) {
    return 'r' + str.replace(/[:.-]/g, '_');
  }
  // Convert kebab-case or special chars to camelCase
  let formatted = str
    .replace(/[-_]([a-z0-9])/gi, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9_]/g, '_');
  if (SWIFT_KEYWORDS.has(formatted)) {
    return '`' + formatted + '`';
  }
  return formatted;
}

function toEnumCase(value) {
  // e.g. "1:1" -> "r1_1"
  if (/^[0-9]/.test(value)) {
    return 'r' + value.replace(/[:.-]/g, '_');
  }
  // "surreal-ui" -> "surrealUI"
  if (value.includes('-')) {
    return value.replace(/-([a-z0-9])/gi, (_, c) => c.toUpperCase());
  }
  // "code_execution" -> "codeExecution"
  if (value.includes('_')) {
    return value.replace(/_([a-z0-9])/gi, (_, c) => c.toUpperCase());
  }
  if (SWIFT_KEYWORDS.has(value)) {
    return '`' + value + '`';
  }
  return value;
}

function resolveJsonPointer(rootJson, ref) {
  if (!ref || typeof ref !== 'string' || !ref.startsWith('#/')) return null;
  const parts = ref.slice(2).split('/');
  let current = rootJson;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current;
}

function resolvePropertyType(prop, propName, parentName, auxiliaryTypes = [], rootDoc = null, declaredTypes = new Set(), knownEnums = new Set()) {
  if (!prop) return 'JSONValue';

  if (prop.$ref) {
    if (prop.$ref === '#/definitions/JazzJsonValue') {
      return 'JSONValue';
    }
    // If it is a pointer path like #/definitions/JazzPhrase/properties/startedAt
    if (prop.$ref.includes('/properties/') || prop.$ref.includes('/items/') || prop.$ref.includes('/anyOf/')) {
      const resolved = resolveJsonPointer(rootDoc, prop.$ref);
      if (resolved) {
        return resolvePropertyType(resolved, propName, parentName, auxiliaryTypes, rootDoc, declaredTypes, knownEnums);
      }
    }
    const refMatch = prop.$ref.match(/^#\/definitions\/([^\/]+)$/);
    if (refMatch) {
      const refName = refMatch[1];
      if (refName === 'JazzJsonValue') return 'JSONValue';
      return refName;
    }
    return 'JSONValue';
  }

  if (prop.type === 'string') {
    if (prop.enum && Array.isArray(prop.enum)) {
      // Inline enum
      const enumName = `${parentName}${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
      knownEnums.add(enumName);
      if (!declaredTypes.has(enumName)) {
        auxiliaryTypes.push(generateEnum(enumName, prop.enum, declaredTypes));
      }
      return enumName;
    }
    return 'String';
  }

  if (prop.type === 'integer') return 'Int';
  if (prop.type === 'number') return 'Double';
  if (prop.type === 'boolean') return 'Bool';

  if (prop.type === 'array') {
    const itemType = resolvePropertyType(prop.items, `${propName}Item`, parentName, auxiliaryTypes, rootDoc, declaredTypes, knownEnums);
    return `[${itemType}]`;
  }

  if (prop.type === 'object') {
    if (prop.additionalProperties) {
      if (typeof prop.additionalProperties === 'object') {
        const valType = resolvePropertyType(prop.additionalProperties, `${propName}Value`, parentName, auxiliaryTypes, rootDoc, declaredTypes, knownEnums);
        return `[String: ${valType}]`;
      }
      return '[String: JSONValue]';
    }
    if (prop.properties) {
      // Inline struct
      const subStructName = `${parentName}${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
      if (!declaredTypes.has(subStructName)) {
        auxiliaryTypes.push(generateStruct(subStructName, prop, rootDoc, declaredTypes, knownEnums));
      }
      return subStructName;
    }
    return '[String: JSONValue]';
  }

  if (prop.anyOf || prop.oneOf) {
    const variants = prop.anyOf || prop.oneOf;
    // Check if it's string enum
    if (variants.every(v => v.type === 'string')) {
      return 'String';
    }
    // Check if it contains null -> nullable
    const nonNull = variants.filter(v => v.type !== 'null');
    if (nonNull.length === 1) {
      return resolvePropertyType(nonNull[0], propName, parentName, auxiliaryTypes, rootDoc, declaredTypes, knownEnums);
    }
    return 'JSONValue';
  }

  return 'JSONValue';
}

function generateEnum(name, values, declaredTypes) {
  if (declaredTypes && declaredTypes.has(name)) {
    return '';
  }
  if (declaredTypes) declaredTypes.add(name);
  let code = `public enum ${name}: String, Codable, Sendable, CaseIterable {\n`;
  for (const val of values) {
    const caseName = toEnumCase(val);
    code += `    case ${caseName} = "${val}"\n`;
  }
  code += `}\n`;
  return code;
}

function generateStruct(name, schema, rootDoc, declaredTypes, knownEnums) {
  if (declaredTypes && declaredTypes.has(name)) {
    return '';
  }
  if (declaredTypes) declaredTypes.add(name);

  const properties = schema.properties || {};
  const requiredSet = new Set(schema.required || []);
  const auxTypes = [];

  const fields = [];
  const codingKeys = [];
  let needsCodingKeys = false;

  for (const [propName, propDef] of Object.entries(properties)) {
    const isRequired = requiredSet.has(propName);
    const hasDefault = propDef.default !== undefined;
    const baseType = resolvePropertyType(propDef, propName, name, auxTypes, rootDoc, declaredTypes, knownEnums);

    const isOptional = !isRequired && !hasDefault;
    const swiftType = isOptional ? `${baseType}?` : baseType;
    const swiftPropName = toSwiftIdentifier(propName);

    if (swiftPropName !== propName || swiftPropName.startsWith('`')) {
      needsCodingKeys = true;
    }
    codingKeys.push({ swift: swiftPropName, json: propName });

    let defaultValueStr = null;
    if (hasDefault) {
      const def = propDef.default;
      if (typeof def === 'string') {
        if (propDef.enum || (knownEnums && knownEnums.has(baseType))) {
          defaultValueStr = `.${toEnumCase(def)}`;
        } else {
          defaultValueStr = `"${def}"`;
        }
      } else if (typeof def === 'number') {
        defaultValueStr = `${def}`;
      } else if (typeof def === 'boolean') {
        defaultValueStr = `${def}`;
      } else if (Array.isArray(def)) {
        defaultValueStr = `[]`;
      } else if (typeof def === 'object' && def !== null) {
        if (baseType.startsWith('[String:')) {
          defaultValueStr = `[:]`;
        } else {
          defaultValueStr = `${baseType}()`;
        }
      }
    } else if (isOptional) {
      defaultValueStr = 'nil';
    }

    fields.push({
      name: propName,
      swiftName: swiftPropName,
      type: swiftType,
      baseType,
      isOptional,
      hasDefault,
      defaultValueStr
    });
  }

  let code = '';
  for (const aux of auxTypes) {
    if (aux) code += aux + '\n';
  }

  code += `public struct ${name}: Codable, Sendable, Equatable {\n`;

  // Property declarations
  for (const f of fields) {
    code += `    public var ${f.swiftName}: ${f.type}\n`;
  }

  // CodingKeys
  code += `\n    enum CodingKeys: String, CodingKey {\n`;
  for (const ck of codingKeys) {
    code += `        case ${ck.swift} = "${ck.json}"\n`;
  }
  code += `    }\n\n`;

  // Memberwise initializer
  const initParams = fields
    .map(f => {
      if (f.defaultValueStr !== null) {
        return `${f.swiftName}: ${f.type} = ${f.defaultValueStr}`;
      }
      return `${f.swiftName}: ${f.type}`;
    })
    .join(',\n        ');

  code += `    public init(\n        ${initParams}\n    ) {\n`;
  for (const f of fields) {
    code += `        self.${f.swiftName} = ${f.swiftName}\n`;
  }
  code += `    }\n\n`;

  // Decoder initializer (applies defaults)
  code += `    public init(from decoder: Decoder) throws {\n`;
  code += `        let container = try decoder.container(keyedBy: CodingKeys.self)\n`;
  for (const f of fields) {
    if (f.hasDefault && f.defaultValueStr !== null) {
      code += `        self.${f.swiftName} = try container.decodeIfPresent(${f.baseType}.self, forKey: .${f.swiftName}) ?? ${f.defaultValueStr}\n`;
    } else if (f.isOptional) {
      code += `        self.${f.swiftName} = try container.decodeIfPresent(${f.baseType}.self, forKey: .${f.swiftName})\n`;
    } else {
      code += `        self.${f.swiftName} = try container.decode(${f.baseType}.self, forKey: .${f.swiftName})\n`;
    }
  }
  code += `    }\n`;

  code += `}\n`;
  return code;
}

function generateCommon() {
  let code = `// Generated from @pixerate/schemas common contracts. Do not edit.\nimport Foundation\n\n`;

  const commonFiles = fs.readdirSync(path.resolve(jsonSchemaDir, 'common')).filter(f => f.endsWith('.json')).sort();
  const items = [];
  const declaredTypes = new Set(['VideoFrameImage', 'VideoAttachment']);
  const knownEnums = new Set();

  for (const f of commonFiles) {
    const schemaName = f.replace(/\.json$/, '');
    if (schemaName === 'VideoFrameImage' || schemaName === 'VideoAttachment') {
      // Handled in Runtime/Unions.swift
      continue;
    }
    const json = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'common', f), 'utf8'));
    const def = json.definitions?.[schemaName] || json;
    if (def.type === 'string' && Array.isArray(def.enum)) {
      knownEnums.add(schemaName);
    }
    items.push({ name: schemaName, def, json });
  }

  items.sort((a, b) => {
    const aIsEnum = a.def.type === 'string' && Array.isArray(a.def.enum);
    const bIsEnum = b.def.type === 'string' && Array.isArray(b.def.enum);
    if (aIsEnum && !bIsEnum) return -1;
    if (!aIsEnum && bIsEnum) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const item of items) {
    const { name, def, json } = item;
    if (def.type === 'string' && Array.isArray(def.enum)) {
      const enumCode = generateEnum(name, def.enum, declaredTypes);
      if (enumCode) code += enumCode + '\n';
    } else if (def.type === 'object') {
      const structCode = generateStruct(name, def, json, declaredTypes, knownEnums);
      if (structCode) code += structCode + '\n';
    }
  }
  return code;
}

function generateJazz() {
  let code = `// Generated from @pixerate/schemas jazz contracts. Do not edit.\nimport Foundation\n\n`;

  // Top level aliases
  code += `public typealias JazzOrigin = String\n`;
  code += `public typealias JazzJsonValue = JSONValue\n\n`;

  const jazzFiles = fs.readdirSync(path.resolve(jsonSchemaDir, 'jazz')).filter(f => f.endsWith('.json')).sort();

  const items = [];
  const declaredTypes = new Set(['JazzOrigin', 'JazzJsonValue']);
  const knownEnums = new Set();

  for (const f of jazzFiles) {
    const schemaName = f.replace(/\.json$/, '');
    if (schemaName === 'JazzOrigin' || schemaName === 'JazzJsonValue') continue;

    const json = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'jazz', f), 'utf8'));
    const def = json.definitions?.[schemaName] || json;
    if (def.type === 'string' && Array.isArray(def.enum)) {
      knownEnums.add(schemaName);
    }
    items.push({ name: schemaName, def, json });
  }

  // Sort so enums appear before structs
  items.sort((a, b) => {
    const aIsEnum = a.def.type === 'string' && Array.isArray(a.def.enum);
    const bIsEnum = b.def.type === 'string' && Array.isArray(b.def.enum);
    if (aIsEnum && !bIsEnum) return -1;
    if (!aIsEnum && bIsEnum) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const item of items) {
    const { name, def, json } = item;
    if (def.type === 'string' && Array.isArray(def.enum)) {
      const enumCode = generateEnum(name, def.enum, declaredTypes);
      if (enumCode) code += enumCode + '\n';
    } else if (def.type === 'object') {
      const structCode = generateStruct(name, def, json, declaredTypes, knownEnums);
      if (structCode) code += structCode + '\n';
    }
  }

  return code;
}

function generateAgent() {
  let code = `// Generated from @pixerate/schemas agent contracts. Do not edit.\nimport Foundation\n\n`;

  const agentFiles = fs.readdirSync(path.resolve(jsonSchemaDir, 'agent')).filter(f => f.endsWith('.json')).sort();

  const items = [];
  const declaredTypes = new Set();
  const knownEnums = new Set();

  for (const f of agentFiles) {
    const schemaName = f.replace(/\.json$/, '');
    const json = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'agent', f), 'utf8'));
    const def = json.definitions?.[schemaName] || json;
    if (def.type === 'string' && Array.isArray(def.enum)) {
      knownEnums.add(schemaName);
    }
    items.push({ name: schemaName, def, json });
  }

  // Enums first
  items.sort((a, b) => {
    const aIsEnum = a.def.type === 'string' && Array.isArray(a.def.enum);
    const bIsEnum = b.def.type === 'string' && Array.isArray(b.def.enum);
    if (aIsEnum && !bIsEnum) return -1;
    if (!aIsEnum && bIsEnum) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const item of items) {
    const { name, def, json } = item;
    if (def.type === 'string' && Array.isArray(def.enum)) {
      const enumCode = generateEnum(name, def.enum, declaredTypes);
      if (enumCode) code += enumCode + '\n';
    } else if (def.type === 'object') {
      const structCode = generateStruct(name, def, json, declaredTypes, knownEnums);
      if (structCode) code += structCode + '\n';
    }
  }

  return code;
}

async function main() {
  fs.mkdirSync(swiftGeneratedDir, { recursive: true });

  const modulesToGenerate = {
    'Common.swift': generateCommon(),
    'Jazz.swift': generateJazz(),
    'Agent.swift': generateAgent()
  };

  if (isCheck) {
    let hasDiff = false;
    for (const [filename, expectedContent] of Object.entries(modulesToGenerate)) {
      const fullPath = path.resolve(swiftGeneratedDir, filename);
      if (!fs.existsSync(fullPath)) {
        console.error(`Missing Swift file: ${filename}`);
        hasDiff = true;
      } else {
        const actualContent = fs.readFileSync(fullPath, 'utf8');
        if (actualContent !== expectedContent) {
          console.error(`Stale Swift file: ${filename}`);
          hasDiff = true;
        }
      }
    }
    if (hasDiff) {
      console.error('Generated Swift is stale. Run `npm run gen:swift` to re-generate.');
      process.exit(1);
    } else {
      console.log('Generated Swift check passed.');
      return;
    }
  }

  for (const [filename, content] of Object.entries(modulesToGenerate)) {
    const fullPath = path.resolve(swiftGeneratedDir, filename);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Wrote ${fullPath}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
