import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const jsonSchemaDir = path.resolve(rootDir, 'json-schema');
const swiftGeneratedDir = path.resolve(rootDir, 'swift', 'Sources', 'PixerateSchemas', 'Generated');
const reportPath = path.resolve(rootDir, 'swift', 'GENERATED.md');

const isCheck = process.argv.includes('--check');

// JSON Schema modules generated into Swift, one file each.
const MODULES = [
  { module: 'common', file: 'Common.swift' },
  { module: 'jazz', file: 'Jazz.swift' },
  { module: 'skills', file: 'Skills.swift' },
  { module: 'agent', file: 'Agent.swift' }
];

// Reserved Swift keywords to escape
const SWIFT_KEYWORDS = new Set([
  'associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate', 'func',
  'import', 'init', 'inout', 'internal', 'let', 'open', 'operator', 'private',
  'precedencegroup', 'protocol', 'public', 'rethrows', 'static', 'struct', 'subscript',
  'typealias', 'var', 'break', 'case', 'catch', 'continue', 'default', 'defer',
  'do', 'else', 'fallthrough', 'for', 'guard', 'if', 'in', 'repeat', 'return',
  'throw', 'switch', 'where', 'while', 'as', 'false', 'is', 'nil', 'self', 'Self',
  'super', 'true', 'try', 'throws', 'description'
]);

const ANY_JSON_TYPES = ['array', 'boolean', 'null', 'number', 'object', 'string'];

function escapeKeyword(name) {
  return SWIFT_KEYWORDS.has(name) ? '`' + name + '`' : name;
}

function toSwiftIdentifier(str) {
  // If it starts with numbers, prefix with 'r'
  if (/^[0-9]/.test(str)) {
    return 'r' + str.replace(/[^a-zA-Z0-9]/g, '_');
  }
  // Convert kebab-case or special chars to camelCase
  const formatted = str
    .replace(/[-_ ./]([a-z0-9])/gi, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9_]/g, '_');
  return escapeKeyword(formatted);
}

// "1:1" -> "r1_1", "surreal-ui" -> "surrealUi", "code_execution" -> "codeExecution"
const toEnumCase = toSwiftIdentifier;

function toTypeName(str) {
  const id = toSwiftIdentifier(str).replace(/`/g, '');
  return id.charAt(0).toUpperCase() + id.slice(1);
}

/** A Swift string literal for `value`. */
function swiftString(value) {
  let out = '"';
  for (const ch of value) {
    const code = ch.codePointAt(0);
    if (ch === '\\') out += '\\\\';
    else if (ch === '"') out += '\\"';
    else if (ch === '\n') out += '\\n';
    else if (ch === '\r') out += '\\r';
    else if (ch === '\t') out += '\\t';
    else if (code < 0x20 || code === 0x7f) out += `\\u{${code.toString(16)}}`;
    else out += ch;
  }
  return out + '"';
}

function docComment(text, indent = '') {
  if (!text) return '';
  return text.split('\n').map((line) => `${indent}/// ${line}`.trimEnd()).join('\n') + '\n';
}

function refName(ref) {
  const match = typeof ref === 'string' && ref.match(/^#\/definitions\/([^/]+)$/);
  if (!match) throw new Error(`Unsupported $ref ${ref}: the JSON Schema export should only emit whole-definition refs.`);
  return match[1];
}

/** Splits `null` out of a schema: `{ schema, nullable }`. */
function splitNullable(schema) {
  if (!schema || typeof schema !== 'object') return { schema, nullable: false };
  if (Array.isArray(schema.type) && schema.type.includes('null')) {
    const types = schema.type.filter((t) => t !== 'null');
    return { schema: { ...schema, type: types.length === 1 ? types[0] : types }, nullable: true };
  }
  const variants = schema.anyOf || schema.oneOf;
  if (variants && variants.some((v) => v.type === 'null' && Object.keys(v).length === 1)) {
    const rest = variants.filter((v) => !(v.type === 'null' && Object.keys(v).length === 1));
    const { anyOf, oneOf, ...outer } = schema;
    const inner = rest.length === 1 ? { ...outer, ...rest[0] } : { ...outer, anyOf: rest };
    return { schema: inner, nullable: true };
  }
  if (schema.nullable === true) {
    const { nullable, ...rest } = schema;
    return { schema: rest, nullable: true };
  }
  return { schema, nullable: false };
}

/** String literal values when every variant is a string literal (`enum` or `const`), else null. */
function literalStrings(schema) {
  if (schema.type === 'string' && Array.isArray(schema.enum)) return schema.enum;
  if (typeof schema.const === 'string') return [schema.const];
  const variants = schema.anyOf || schema.oneOf;
  if (!variants) return null;
  const values = [];
  for (const variant of variants) {
    const literal = literalStrings(variant);
    if (!literal) return null;
    values.push(...literal);
  }
  return [...new Set(values)];
}

function isAnyJson(schema) {
  const variants = schema.anyOf || schema.oneOf;
  if (!variants) return false;
  const types = new Set(variants.map((v) => v.type));
  return ANY_JSON_TYPES.every((t) => types.has(t));
}

class Generator {
  constructor() {
    this.index = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'index.json'), 'utf8'));
    this.generatedModules = new Set(MODULES.map((m) => m.module));
    this.schemas = new Map(); // name -> { module, def }
    for (const entry of this.index) {
      if (!this.generatedModules.has(entry.module)) continue;
      const json = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, entry.file), 'utf8'));
      this.schemas.set(entry.name, { module: entry.module, def: json.definitions?.[entry.name] ?? json });
    }
    this.declared = new Map(); // Swift type name -> what declared it
    this.enums = new Set();
    this.fallbacks = []; // { module, where, reason }
    this.skipped = []; // { module, name, reason }
    for (const [name, { def }] of this.schemas) {
      this.declared.set(name, `${name} (top level)`);
      if (literalStrings(def)) this.enums.add(name);
    }
  }

  claim(name, by) {
    if (this.declared.has(name)) {
      throw new Error(`Swift type name ${name} for ${by} is already used by ${this.declared.get(name)}. Name the inner schema in Zod and export it, so it becomes its own definition.`);
    }
    this.declared.set(name, by);
  }

  fallback(ctx, where, reason) {
    this.fallbacks.push({ module: ctx.module, where, reason });
    return 'JSONValue';
  }

  /** Swift type for a property schema, declaring inline types into `ctx.aux`. Returns `{ type, nullable }`. */
  propertyType(rawSchema, typeName, where, ctx) {
    const { schema, nullable } = splitNullable(rawSchema);
    return { type: this.baseType(schema, typeName, where, ctx), nullable };
  }

  baseType(schema, typeName, where, ctx) {
    if (!schema || typeof schema !== 'object' || Object.keys(schema).filter((k) => k !== 'description' && k !== 'default').length === 0) {
      return 'JSONValue'; // `{}` accepts any JSON value
    }
    if (schema.$ref) {
      const name = refName(schema.$ref);
      if (!this.schemas.has(name)) {
        const entry = this.index.find((e) => e.name === name);
        throw new Error(`${where} refers to ${name} from module ${entry?.module ?? '?'}, which is not generated into Swift. Add that module to MODULES in scripts/gen-swift.mjs.`);
      }
      return name;
    }
    const literals = literalStrings(schema);
    if (literals) {
      this.claim(typeName, where);
      this.enums.add(typeName);
      ctx.aux.push(this.enumCode(typeName, literals, schema.description));
      return typeName;
    }
    if (isAnyJson(schema)) return 'JSONValue';

    switch (schema.type) {
      case 'string':
        return 'String';
      case 'integer':
        return 'Int';
      case 'number':
        return 'Double';
      case 'boolean':
        return 'Bool';
      case 'array':
        return `[${this.propertyTypeName(schema.items, `${typeName}Item`, `${where}[]`, ctx)}]`;
      case 'object':
        if (schema.properties && Object.keys(schema.properties).length > 0) {
          this.claim(typeName, where);
          ctx.aux.push(this.structCode(typeName, schema, ctx));
          return typeName;
        }
        if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
          return `[String: ${this.propertyTypeName(schema.additionalProperties, `${typeName}Value`, `${where}{}`, ctx)}]`;
        }
        return '[String: JSONValue]';
    }

    const variants = schema.anyOf || schema.oneOf;
    if (variants && variants.every((v) => v.type === 'string')) return 'String';
    if (variants) return this.fallback(ctx, where, `union of ${variants.map((v) => v.type ?? (v.$ref ? refName(v.$ref) : '?')).join(' | ')}`);
    return this.fallback(ctx, where, `unsupported schema (${Object.keys(schema).join(', ')})`);
  }

  /** Element types: an optional element becomes `T?`. */
  propertyTypeName(schema, typeName, where, ctx) {
    if (!schema) return 'JSONValue';
    const { type, nullable } = this.propertyType(schema, typeName, where, ctx);
    return nullable ? `${type}?` : type;
  }

  defaultExpr(value, type, where) {
    if (this.enums.has(type)) {
      if (typeof value !== 'string') throw new Error(`${where}: default ${JSON.stringify(value)} is not a case of ${type}`);
      return `.${toEnumCase(value)}`;
    }
    if (type === 'String' && typeof value === 'string') return swiftString(value);
    if (type === 'Int' && Number.isInteger(value)) return String(value);
    if (type === 'Double' && typeof value === 'number') return String(value);
    if (type === 'Bool' && typeof value === 'boolean') return String(value);
    if (Array.isArray(value) && value.length === 0 && type.startsWith('[') && !type.startsWith('[String:')) return '[]';
    if (value && typeof value === 'object' && Object.keys(value).length === 0 && type.startsWith('[String:')) return '[:]';
    // Anything else (structs, non-empty arrays and dictionaries, JSONValue) decodes from its JSON.
    return `SchemaDefault.decode(${type}.self, json: ${swiftString(JSON.stringify(value))})`;
  }

  enumCode(name, values, description) {
    const cases = new Set();
    let code = docComment(description);
    code += `public enum ${name}: String, Codable, Sendable, CaseIterable {\n`;
    for (const value of values) {
      const caseName = toEnumCase(value);
      if (cases.has(caseName)) throw new Error(`Enum ${name} has two values that map to the Swift case ${caseName}`);
      cases.add(caseName);
      code += `    case ${caseName} = ${swiftString(value)}\n`;
    }
    return code + '}\n';
  }

  structCode(name, schema, ctx) {
    const required = new Set(schema.required || []);
    const fields = Object.entries(schema.properties || {}).map(([jsonName, prop]) => {
      const swiftName = toSwiftIdentifier(jsonName);
      const where = `${name}.${jsonName}`;
      const { type, nullable } = this.propertyType(prop, `${name}${toTypeName(jsonName)}`, where, ctx);
      const hasDefault = prop.default !== undefined;
      const isRequired = required.has(jsonName);
      // Optional in Swift when the key may be missing (no default) or the value may be null.
      const optional = nullable || (!isRequired && !hasDefault);
      let defaultValue = null;
      if (hasDefault && prop.default !== null) defaultValue = this.defaultExpr(prop.default, type, where);
      else if (optional) defaultValue = 'nil';
      return { jsonName, swiftName, type, optional, nullable, isRequired, hasDefault, defaultValue, description: prop.description };
    });

    let code = docComment(schema.description);
    code += `public struct ${name}: Codable, Sendable, Equatable {\n`;
    for (const f of fields) {
      code += docComment(f.description, '    ');
      code += `    public var ${f.swiftName}: ${f.type}${f.optional ? '?' : ''}\n`;
    }

    code += `\n    enum CodingKeys: String, CodingKey {\n`;
    for (const f of fields) code += `        case ${f.swiftName} = ${swiftString(f.jsonName)}\n`;
    code += `    }\n\n`;

    // Memberwise initializer
    const params = fields.map((f) => {
      const declared = `${f.swiftName}: ${f.type}${f.optional ? '?' : ''}`;
      return f.defaultValue !== null ? `${declared} = ${f.defaultValue}` : declared;
    });
    code += `    public init(\n        ${params.join(',\n        ')}\n    ) {\n`;
    for (const f of fields) code += `        self.${f.swiftName} = ${f.swiftName}\n`;
    code += `    }\n\n`;

    // Decoder initializer (applies defaults)
    code += `    public init(from decoder: Decoder) throws {\n`;
    code += `        let container = try decoder.container(keyedBy: CodingKeys.self)\n`;
    for (const f of fields) {
      const decodeIfPresent = `try container.decodeIfPresent(${f.type}.self, forKey: .${f.swiftName})`;
      if (f.hasDefault && f.defaultValue !== null && f.defaultValue !== 'nil') {
        code += `        self.${f.swiftName} = ${decodeIfPresent} ?? ${f.defaultValue}\n`;
      } else if (f.optional) {
        code += `        self.${f.swiftName} = ${decodeIfPresent}\n`;
      } else {
        code += `        self.${f.swiftName} = try container.decode(${f.type}.self, forKey: .${f.swiftName})\n`;
      }
    }
    code += `    }\n\n`;

    // Encoder: a nullable field that is nil is written as null (Swift cannot tell a missing key from
    // null, and records written by TypeScript keep the null); other nil values are left out.
    code += `    public func encode(to encoder: Encoder) throws {\n`;
    code += `        var container = encoder.container(keyedBy: CodingKeys.self)\n`;
    for (const f of fields) {
      const method = f.optional && !f.nullable ? 'encodeIfPresent' : 'encode';
      code += `        try container.${method}(${f.swiftName}, forKey: .${f.swiftName})\n`;
    }
    code += `    }\n`;

    return code + '}\n';
  }

  /** A string-or-object union: `.string(String)` or `.object(<Name>Data)`. */
  stringOrObjectCode(name, objectSchema, description, ctx) {
    const dataName = `${name}Data`;
    this.claim(dataName, `${name} object variant`);
    let code = this.structCode(dataName, objectSchema, ctx) + '\n';
    code += docComment(description ?? `A string, or a \`${dataName}\` object.`);
    code += `public enum ${name}: Codable, Sendable, Equatable {
    case string(String)
    case object(${dataName})

    public init(from decoder: Decoder) throws {
        if let container = try? decoder.singleValueContainer(), let string = try? container.decode(String.self) {
            self = .string(string)
            return
        }
        self = .object(try ${dataName}(from: decoder))
    }

    public func encode(to encoder: Encoder) throws {
        switch self {
        case .string(let string):
            var container = encoder.singleValueContainer()
            try container.encode(string)
        case .object(let data):
            try data.encode(to: encoder)
        }
    }
}
`;
    return code;
  }

  topLevelCode(name, def, ctx) {
    if (def.$ref) return docComment(def.description) + `public typealias ${name} = ${refName(def.$ref)}\n`;
    const literals = literalStrings(def);
    if (literals) return this.enumCode(name, literals, def.description);
    if (isAnyJson(def)) return docComment(def.description ?? 'Any JSON value.') + `public typealias ${name} = JSONValue\n`;

    const variants = def.anyOf || def.oneOf;
    if (variants && variants.length === 2) {
      const string = variants.find((v) => v.type === 'string' && !v.enum && v.const === undefined);
      const object = variants.find((v) => v.type === 'object' && v.properties);
      if (string && object) return this.stringOrObjectCode(name, object, def.description, ctx);
    }

    switch (def.type) {
      case 'object':
        if (def.properties) return this.structCode(name, def, ctx);
        break;
      case 'string':
      case 'integer':
      case 'number':
      case 'boolean': {
        const swiftType = { string: 'String', integer: 'Int', number: 'Double', boolean: 'Bool' }[def.type];
        const notes = [def.description, def.pattern && `Pattern: \`${def.pattern}\``].filter(Boolean).join('\n\n');
        return docComment(notes) + `public typealias ${name} = ${swiftType}\n`;
      }
    }
    return null;
  }

  generateModule({ module }) {
    const ctx = { module, aux: [] };
    const header = `// Generated from @pixerate/schemas ${module} contracts by scripts/gen-swift.mjs. Do not edit.\nimport Foundation\n\n`;
    const names = [...this.schemas].filter(([, s]) => s.module === module).map(([name]) => name);
    // Enums first, then everything else by name
    names.sort((a, b) => {
      const aIsEnum = this.enums.has(a);
      const bIsEnum = this.enums.has(b);
      if (aIsEnum !== bIsEnum) return aIsEnum ? -1 : 1;
      return a.localeCompare(b);
    });

    let code = header;
    for (const name of names) {
      ctx.aux = [];
      const main = this.topLevelCode(name, this.schemas.get(name).def, ctx);
      if (main === null) {
        this.skipped.push({ module, name, reason: `unsupported top-level schema (${Object.keys(this.schemas.get(name).def).join(', ')})` });
        continue;
      }
      for (const aux of ctx.aux) code += aux + '\n';
      code += main + '\n';
    }
    return code.replace(/\n+$/, '\n');
  }

  report() {
    const otherModules = [...new Set(this.index.map((e) => e.module))].filter((m) => !this.generatedModules.has(m)).sort();
    let md = '<!-- Generated by scripts/gen-swift.mjs. Do not edit. -->\n# Generated Swift coverage\n\n';
    md += `Generated modules: ${MODULES.map((m) => `\`${m.module}\``).join(', ')}.\n\n`;
    md += `JSON Schema only (not generated into Swift yet): ${otherModules.map((m) => `\`${m}\``).join(', ')}.\n\n`;
    md += '## Skipped schemas\n\n';
    md += this.skipped.length
      ? this.skipped.map((s) => `- \`${s.module}\` \`${s.name}\`: ${s.reason}`).join('\n') + '\n\n'
      : 'None.\n\n';
    md += '## Fields typed as `JSONValue`\n\nThe generator could not map these to a specific Swift type.\n\n';
    md += this.fallbacks.length
      ? this.fallbacks.map((f) => `- \`${f.module}\` \`${f.where}\`: ${f.reason}`).join('\n') + '\n'
      : 'None.\n';
    return md;
  }
}

async function main() {
  const generator = new Generator();
  const outputs = new Map(); // absolute path -> content
  for (const mod of MODULES) {
    outputs.set(path.resolve(swiftGeneratedDir, mod.file), generator.generateModule(mod));
  }
  outputs.set(reportPath, generator.report());

  if (isCheck) {
    let hasDiff = false;
    for (const [fullPath, expectedContent] of outputs) {
      const rel = path.relative(rootDir, fullPath);
      if (!fs.existsSync(fullPath)) {
        console.error(`Missing generated file: ${rel}`);
        hasDiff = true;
      } else if (fs.readFileSync(fullPath, 'utf8') !== expectedContent) {
        console.error(`Stale generated file: ${rel}`);
        hasDiff = true;
      }
    }
    for (const file of fs.existsSync(swiftGeneratedDir) ? fs.readdirSync(swiftGeneratedDir) : []) {
      if (!outputs.has(path.resolve(swiftGeneratedDir, file))) {
        console.error(`Unexpected extra file in Generated/: ${file}`);
        hasDiff = true;
      }
    }
    if (hasDiff) {
      console.error('Generated Swift is stale. Run `npm run gen:swift` to re-generate.');
      process.exit(1);
    }
    console.log('Generated Swift check passed.');
    return;
  }

  fs.rmSync(swiftGeneratedDir, { recursive: true, force: true });
  fs.mkdirSync(swiftGeneratedDir, { recursive: true });
  for (const [fullPath, content] of outputs) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Wrote ${path.relative(rootDir, fullPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
