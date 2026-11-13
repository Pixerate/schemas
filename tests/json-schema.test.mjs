import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import * as common from '../dist/common.js';
import * as realtime from '../dist/realtime.js';
import * as genui from '../dist/genui.js';
import * as media from '../dist/media.js';
import * as agent from '../dist/agent.js';
import * as jobs from '../dist/jobs.js';
import * as analytics from '../dist/analytics.js';
import * as jazz from '../dist/jazz.js';
import * as skills from '../dist/skills.js';
import * as index from '../dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const jsonSchemaDir = path.resolve(rootDir, 'json-schema');
const fixturesDir = path.resolve(__dirname, 'fixtures', 'swift');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const MODULES = {
  common,
  realtime,
  genui,
  media,
  agent,
  jobs,
  analytics,
  jazz,
  skills,
  index
};

describe('JSON Schema export', () => {
  it('every exported *Schema has a file in json-schema/', () => {
    const indexJsonPath = path.resolve(jsonSchemaDir, 'index.json');
    assert.ok(fs.existsSync(indexJsonPath), 'index.json must exist');
    const indexData = JSON.parse(fs.readFileSync(indexJsonPath, 'utf8'));

    const fileMap = new Map();
    for (const entry of indexData) {
      fileMap.set(`${entry.module}/${entry.name}`, entry.file);
      const filePath = path.resolve(jsonSchemaDir, entry.file);
      assert.ok(fs.existsSync(filePath), `JSON Schema file for ${entry.name} must exist at ${filePath}`);
    }

    const seenSchemas = new Set();
    const submodules = ['common', 'realtime', 'genui', 'media', 'agent', 'jobs', 'analytics', 'jazz', 'skills'];

    for (const modName of submodules) {
      const mod = MODULES[modName];
      for (const [key, val] of Object.entries(mod)) {
        if (!key.endsWith('Schema') || !val || typeof val.parse !== 'function') continue;
        if (seenSchemas.has(key)) continue;
        seenSchemas.add(key);
        const name = key.replace(/Schema$/, '');
        assert.ok(fileMap.has(`${modName}/${name}`), `Expected schema ${name} in module ${modName}`);
      }
    }

    for (const [key, val] of Object.entries(index)) {
      if (!key.endsWith('Schema') || !val || typeof val.parse !== 'function') continue;
      if (seenSchemas.has(key)) continue;
      seenSchemas.add(key);
      const name = key.replace(/Schema$/, '');
      assert.ok(fileMap.has(`index/${name}`), `Expected schema ${name} in module index`);
    }
  });

  it('every $ref names a whole definition that exists', () => {
    const indexData = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'index.json'), 'utf8'));
    for (const entry of indexData) {
      const jsonSchema = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, entry.file), 'utf8'));
      const visit = (node) => {
        if (!node || typeof node !== 'object') return;
        if (typeof node.$ref === 'string') {
          const match = node.$ref.match(/^#\/definitions\/([^/]+)$/);
          assert.ok(match, `${entry.file}: $ref ${node.$ref} should name a whole definition`);
          assert.ok(jsonSchema.definitions?.[match[1]], `${entry.file}: $ref ${node.$ref} has no definition`);
        }
        Object.values(node).forEach(visit);
      };
      visit(jsonSchema);
      assert.doesNotThrow(() => ajv.compile(jsonSchema), `${entry.file} should compile`);
    }
  });

  it('a schema used inside another one is a $ref to its own definition', () => {
    const phrase = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'jazz', 'JazzPhrase.json'), 'utf8'));
    assert.deepEqual(phrase.definitions.JazzPhrase.properties.observations.items, { $ref: '#/definitions/JazzObservation' });
    const context = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'jazz', 'JazzContext.json'), 'utf8'));
    assert.deepEqual(context.definitions.JazzContext.properties.policy, { $ref: '#/definitions/JazzPolicy' });
  });

  it('defaults computed at parse time are left out', () => {
    const notification = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'index', 'Notification.json'), 'utf8'));
    assert.equal(notification.definitions.Notification.properties.createdAt.default, undefined);
    const presence = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'realtime', 'PresenceUser.json'), 'utf8'));
    assert.equal(presence.definitions.PresenceUser.properties.lastSeen.default, undefined);
    // Fixed defaults stay
    const policy = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'jazz', 'JazzPolicy.json'), 'utf8'));
    assert.equal(policy.definitions.JazzPolicy.properties.allowEditUserContent.default, false);
  });

  it('for a sample valid and invalid value per jazz schema, JSON Schema and Zod agree', () => {
    const testCases = [
      {
        name: 'JazzOrigin',
        valid: 'user',
        invalid: 'invalid_origin'
      },
      {
        name: 'JazzJsonValue',
        valid: { nested: [1, true, 'text', null] },
        invalid: 12345 // Note: JazzJsonValue accepts numbers, so invalid is not a primitive JSON value; test array of invalid below
      },
      {
        name: 'JazzTargetKind',
        valid: 'node',
        invalid: 'bad_kind'
      },
      {
        name: 'JazzTarget',
        valid: { id: 't1' },
        invalid: { id: '' }
      },
      {
        name: 'JazzAction',
        valid: 'add',
        invalid: 'destroy'
      },
      {
        name: 'JazzObservation',
        valid: {
          id: 'obs1',
          at: '2026-11-03T12:00:00.000Z',
          surface: 'canvas',
          origin: 'user',
          action: 'add',
          targets: [{ id: 't1' }]
        },
        invalid: {
          id: 'obs1',
          origin: 'bad_origin'
        }
      },
      {
        name: 'JazzPhrase',
        valid: {
          id: 'p1',
          surface: 'canvas',
          startedAt: '2026-11-03T12:00:00.000Z',
          endedAt: '2026-11-03T12:01:00.000Z',
          observations: [{
            id: 'obs1',
            at: '2026-11-03T12:00:00.000Z',
            surface: 'canvas',
            origin: 'user',
            action: 'add',
            targets: [{ id: 't1' }]
          }]
        },
        invalid: {
          id: 'p1',
          observations: []
        }
      },
      {
        name: 'JazzAutonomy',
        valid: 'suggest',
        invalid: 'automatic'
      },
      {
        name: 'JazzPolicy',
        valid: {},
        invalid: { autonomy: 'bad' }
      },
      {
        name: 'JazzToolCall',
        valid: { name: 'draw', arguments: { x: 1 } },
        invalid: { name: '' }
      },
      {
        name: 'JazzRiffIntent',
        valid: 'add',
        invalid: 'destroy'
      },
      {
        name: 'JazzRiffStatus',
        valid: 'proposed',
        invalid: 'discarded'
      },
      {
        name: 'JazzRiff',
        valid: {
          id: 'r1',
          sessionId: 's1',
          origin: 'agent:pixie',
          surface: 'canvas',
          strategy: 'continue',
          intent: 'add',
          title: 'Add box',
          confidence: 0.8,
          mode: 'suggest',
          status: 'proposed',
          createdAt: '2026-11-03T12:00:00.000Z'
        },
        invalid: { id: 'r1', confidence: 2.0 }
      },
      {
        name: 'JazzVerdict',
        valid: 'accepted',
        invalid: 'declined'
      },
      {
        name: 'JazzFeedback',
        valid: { riffId: 'r1', verdict: 'accepted', at: '2026-11-03T12:00:00.000Z', by: 'user' },
        invalid: { riffId: 'r1', verdict: 'declined' }
      },
      {
        name: 'JazzRiffSummary',
        valid: { id: 'r1', strategy: 'continue', intent: 'add', title: 'Add', status: 'proposed' },
        invalid: { id: 'r1', status: 'bad_status' }
      },
      {
        name: 'JazzContext',
        valid: {
          sessionId: 's1',
          agent: { id: 'a1' },
          surface: 'canvas',
          phrases: [],
          policy: {}
        },
        invalid: { sessionId: '' }
      },
      {
        name: 'JazzTextFlavor',
        valid: 'gfm',
        invalid: 'rst'
      },
      {
        name: 'JazzTextVoiceId',
        valid: 'punctuate',
        invalid: 'shout'
      },
      {
        name: 'JazzTextVoiceStats',
        valid: { kept: 3, undone: 1 },
        invalid: { kept: -1, undone: 0 }
      },
      {
        name: 'JazzTextVoiceState',
        valid: { voice: 'punctuate', strength: 0.8, kept: 5, undone: 1, rules: { 'sentence-case': { kept: 4, undone: 0 } } },
        invalid: { voice: 'punctuate', strength: 2 }
      },
      {
        name: 'JazzTextLeadRequest',
        valid: { paragraph: 'first item\nsecond item', before: '# Notes', flavor: 'gfm', voices: [{ voice: 'punctuate', kept: 2, undone: 0 }] },
        invalid: { paragraph: '' }
      },
      {
        name: 'JazzTextGenre',
        valid: 'prose',
        invalid: 'screenplay'
      },
      {
        name: 'JazzTextVoice',
        valid: { voice: 'smart-typography', strength: 0.5, disabledRules: ['em-dash'] },
        invalid: { voice: 'smart-typography', strength: -0.1 }
      },
      {
        name: 'JazzTextRange',
        valid: { start: 0, end: 12 },
        invalid: { start: -1, end: 12 }
      },
      {
        name: 'JazzTextSuggestionKind',
        valid: 'list',
        invalid: 'footnote'
      },
      {
        name: 'JazzTextSuggestion',
        valid: { kind: 'list', range: { start: 0, end: 22 }, replacement: '- first item\n- second item', why: 'Format items as a list.' },
        invalid: { kind: 'list', range: { start: 0, end: 22 }, replacement: '', why: '' }
      },
      {
        name: 'JazzTextLeadResponse',
        valid: {
          genre: 'notes',
          palette: [{ voice: 'punctuate', strength: 0.6 }],
          suggestions: [{ kind: 'list', range: { start: 0, end: 22 }, replacement: '- first item\n- second item', why: 'Turn lines into a list.' }],
          why: 'Notes with list structure.',
          fuelBalance: 199
        },
        invalid: { genre: 'unknown', palette: [], why: 'no' }
      }
    ];

    for (const item of testCases) {
      const jsonSchema = JSON.parse(fs.readFileSync(path.resolve(jsonSchemaDir, 'jazz', `${item.name}.json`), 'utf8'));
      const validate = ajv.compile(jsonSchema);
      const zodSchema = jazz[`${item.name}Schema`];

      // Valid sample
      const ajvValid = Boolean(validate(item.valid));
      let zodValid = true;
      try {
        zodSchema.parse(item.valid);
      } catch {
        zodValid = false;
      }
      assert.equal(ajvValid, true, `AJV should accept valid sample for ${item.name}`);
      assert.equal(zodValid, true, `Zod should accept valid sample for ${item.name}`);

      // Invalid sample (skip JazzJsonValue invalid test as all JSON values are valid JazzJsonValues)
      if (item.name !== 'JazzJsonValue') {
        const ajvInvalid = Boolean(validate(item.invalid));
        let zodInvalid = true;
        try {
          zodSchema.parse(item.invalid);
        } catch {
          zodInvalid = false;
        }
        assert.equal(ajvInvalid, false, `AJV should reject invalid sample for ${item.name}`);
        assert.equal(zodInvalid, false, `Zod should reject invalid sample for ${item.name}`);
      }
    }
  });

  it('swift fixtures in tests/fixtures/swift/ are what Zod produces', () => {
    // The Swift tests decode each fixture, encode it again and compare with this JSON.
    // Run with UPDATE_SWIFT_FIXTURES=1 to rewrite them after a schema change.
    const fixtures = {
      // Defaults filled in from {}; the Swift test also decodes {} and compares
      'jazz_policy_empty.json': jazz.JazzPolicySchema.parse({}),
      'jazz_observation.json': jazz.JazzObservationSchema.parse({
        id: 'obs-001',
        at: '2026-11-03T12:30:00.000Z',
        surface: 'canvas',
        origin: 'user',
        action: 'add',
        targets: [{ id: 'node-1', kind: 'node', type: 'image', label: 'Hero Image' }],
        fields: ['position', 'style'],
        inGesture: false,
        summary: 'Added Hero Image on canvas'
      }),
      'jazz_riff.json': jazz.JazzRiffSchema.parse({
        id: 'riff-42',
        sessionId: 'session-abc',
        origin: 'agent:pixie',
        surface: 'canvas',
        strategy: 'continue-series',
        intent: 'add',
        title: 'Add subtitle below Hero',
        rationale: 'Complement hero image with a subtitle block',
        confidence: 0.95,
        targets: ['node-1'],
        toolCalls: [
          {
            name: 'add_text_node',
            arguments: {
              text: 'Discover Endless Possibilities',
              fontSize: 24,
              bold: true,
              coords: { x: 100, y: 350 },
              tags: ['heading', 'hero']
            }
          }
        ],
        mode: 'suggest',
        proposalId: 'prop-123',
        status: 'proposed',
        createdAt: '2026-11-03T12:30:05.000Z'
      }),
      'jazz_phrase.json': jazz.JazzPhraseSchema.parse({
        id: 'phrase-1',
        surface: 'canvas',
        startedAt: '2026-11-03T12:00:00.000Z',
        endedAt: '2026-11-03T12:01:00.000Z',
        observations: [
          {
            id: 'obs-1',
            at: '2026-11-03T12:00:30.000Z',
            surface: 'canvas',
            origin: 'user',
            action: 'add',
            targets: [{ id: 'node-1', kind: 'node', label: 'Box' }]
          }
        ],
        summary: 'Added box'
      }),
      'jazz_context.json': jazz.JazzContextSchema.parse({
        sessionId: 'session-abc',
        agent: { id: 'pixie', name: 'Pixie' },
        surface: 'canvas',
        phrases: [],
        riffs: [{ id: 'riff-42', strategy: 'continue-series', intent: 'add', title: 'Add subtitle', status: 'proposed' }],
        policy: { autonomy: 'assist', tempo: { idleMs: 900 } }
      }),
      'jazz_text_lead_request.json': jazz.JazzTextLeadRequestSchema.parse({
        paragraph: 'apples\npears\nplums',
        before: '# Shopping',
        after: 'See `[table]` below.',
        flavor: 'gfm',
        voices: [
          {
            voice: 'punctuate',
            strength: 0.75,
            kept: 6,
            undone: 1,
            rules: {
              'end-stop': { kept: 1, undone: 1 },
              'sentence-case': { kept: 5, undone: 0 }
            }
          }
        ],
        teamId: 'team-swash'
      }),
      'jazz_text_lead_response.json': jazz.JazzTextLeadResponseSchema.parse({
        genre: 'list',
        palette: [
          { voice: 'punctuate', strength: 0.3, disabledRules: ['end-stop'] },
          { voice: 'smart-typography', strength: 0 }
        ],
        suggestions: [
          {
            kind: 'list',
            range: { start: 0, end: 18 },
            replacement: '- apples\n- pears\n- plums',
            why: 'Three short lines read cleaner as a bulleted list.'
          }
        ],
        why: 'Short shopping items: easing off full stops and offering a list.',
        fuelBalance: 249
      }),
      'agent_tool.json': agent.AgentToolSchema.parse({
        type: 'code_execution',
        config: { timeout: 30, networkAccess: false, environment: 'sandbox' }
      }),
      'agent_file_change.json': agent.AgentFileChangeSchema.parse({
        path: 'src/main.ts',
        kind: 'modified',
        diff: '@@ -1,3 +1,3 @@',
        stats: { added: 1, removed: 0 },
        before: 'console.log("hello")',
        after: 'console.log("hello world")'
      }),
      // Nullable fields: null values and a string value
      'agent_public_api_key.json': agent.PublicApiKeySchema.parse({
        id: 'key-1',
        name: 'CI key',
        keyPrefix: 'pk_live_ab',
        ownerType: 'user',
        ownerId: 'user-1',
        createdBy: 'user-1',
        scopes: ['read'],
        status: 'active',
        createdAt: '2026-11-03T12:00:00.000Z',
        updatedAt: '2026-11-03T12:00:00.000Z',
        expiresAt: null,
        lastUsedAt: '2026-11-03T13:00:00.000Z',
        revokedAt: null
      }),
      'common_aspect_ratio.json': common.AspectRatioSchema.parse('16:9'),
      'common_video_attachment_url.json': common.VideoAttachmentSchema.parse('https://example.com/clip.mp4'),
      'common_video_attachment_object.json': common.VideoAttachmentSchema.parse({
        url: 'https://example.com/clip.mp4',
        mimeType: 'video/mp4'
      })
    };

    fs.mkdirSync(fixturesDir, { recursive: true });
    const update = process.env.UPDATE_SWIFT_FIXTURES === '1';
    for (const [file, value] of Object.entries(fixtures)) {
      const fullPath = path.resolve(fixturesDir, file);
      const content = JSON.stringify(value, null, 2) + '\n';
      if (update) {
        fs.writeFileSync(fullPath, content);
      } else {
        assert.ok(fs.existsSync(fullPath), `Missing ${file}. Run UPDATE_SWIFT_FIXTURES=1 npm test.`);
        assert.equal(fs.readFileSync(fullPath, 'utf8'), content, `${file} is stale. Run UPDATE_SWIFT_FIXTURES=1 npm test.`);
      }
    }
    const extra = fs.readdirSync(fixturesDir).filter((f) => f.endsWith('.json') && !(f in fixtures));
    assert.deepEqual(extra, [], 'Unexpected Swift fixtures');
  });
});
