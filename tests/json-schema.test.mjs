import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
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
    const submodules = ['common', 'realtime', 'genui', 'media', 'agent', 'jobs', 'analytics', 'jazz'];

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

  it('re-exporting produces no diff (--check passes)', () => {
    // Run the check script and assert exit 0
    const output = execSync('node scripts/export-json-schema.mjs --check', {
      cwd: rootDir,
      encoding: 'utf8'
    });
    assert.ok(output.includes('JSON Schema check passed'));
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

  it('generates known-good swift fixtures in tests/fixtures/swift/', () => {
    fs.mkdirSync(fixturesDir, { recursive: true });

    // 1. Jazz policy from {} (defaults filled)
    const emptyPolicy = jazz.JazzPolicySchema.parse({});
    fs.writeFileSync(
      path.resolve(fixturesDir, 'jazz_policy_empty.json'),
      JSON.stringify(emptyPolicy, null, 2) + '\n'
    );

    // 2. Jazz observation
    const observation = jazz.JazzObservationSchema.parse({
      id: 'obs-001',
      at: '2026-11-03T12:30:00.000Z',
      surface: 'canvas',
      origin: 'user',
      action: 'add',
      targets: [
        { id: 'node-1', kind: 'node', type: 'image', label: 'Hero Image' }
      ],
      fields: ['position', 'style'],
      inGesture: false,
      summary: 'Added Hero Image on canvas'
    });
    fs.writeFileSync(
      path.resolve(fixturesDir, 'jazz_observation.json'),
      JSON.stringify(observation, null, 2) + '\n'
    );

    // 3. Jazz riff with nested tool arguments
    const riff = jazz.JazzRiffSchema.parse({
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
    });
    fs.writeFileSync(
      path.resolve(fixturesDir, 'jazz_riff.json'),
      JSON.stringify(riff, null, 2) + '\n'
    );

    // 4. Agent tool fixture
    const tool = agent.AgentToolSchema.parse({
      type: 'code_execution',
      config: {
        timeout: 30,
        networkAccess: false,
        environment: 'sandbox'
      }
    });
    fs.writeFileSync(
      path.resolve(fixturesDir, 'agent_tool.json'),
      JSON.stringify(tool, null, 2) + '\n'
    );

    // 5. Common aspect ratio fixture
    const aspectRatio = common.AspectRatioSchema.parse('16:9');
    fs.writeFileSync(
      path.resolve(fixturesDir, 'common_aspect_ratio.json'),
      JSON.stringify(aspectRatio, null, 2) + '\n'
    );

    // 6. Agent file change fixture
    const fileChange = agent.AgentFileChangeSchema.parse({
      path: 'src/main.ts',
      kind: 'modified',
      diff: '@@ -1,3 +1,3 @@',
      stats: { added: 1, removed: 0 },
      before: 'console.log("hello")',
      after: 'console.log("hello world")'
    });
    fs.writeFileSync(
      path.resolve(fixturesDir, 'agent_file_change.json'),
      JSON.stringify(fileChange, null, 2) + '\n'
    );

    // 7. Jazz phrase fixture
    const phrase = jazz.JazzPhraseSchema.parse({
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
    });
    fs.writeFileSync(
      path.resolve(fixturesDir, 'jazz_phrase.json'),
      JSON.stringify(phrase, null, 2) + '\n'
    );

    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'jazz_policy_empty.json')));
    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'jazz_observation.json')));
    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'jazz_riff.json')));
    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'agent_tool.json')));
    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'common_aspect_ratio.json')));
    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'agent_file_change.json')));
    assert.ok(fs.existsSync(path.resolve(fixturesDir, 'jazz_phrase.json')));
  });
});
