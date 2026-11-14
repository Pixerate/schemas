import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JudgeMediaArgsSchema } from '../dist/media.js';

test('judge_media args accept the three question types', () => {
  const parsed = JudgeMediaArgsSchema.parse({
    media: ['iVBORw0KGgo='],
    questions: [
      { name: 'on_brief', type: 'yes_no', question: 'Does the image show a red fox in snow?' },
      { name: 'best', type: 'choice', question: 'Which looks best?', options: ['first', 'second'] },
      { name: 'quality', type: 'score', question: 'How sharp is it?', levels: ['blurry', 'ok', 'sharp'] }
    ],
    context: 'A winter campaign'
  });
  assert.equal(parsed.questions.length, 3);
});

test('judge_media args reject bad names, empty media and too many questions', () => {
  const q = { name: 'q', type: 'yes_no', question: 'Is it?' };
  assert.equal(JudgeMediaArgsSchema.safeParse({ media: ['x'], questions: [{ ...q, name: 'has space' }] }).success, false);
  assert.equal(JudgeMediaArgsSchema.safeParse({ media: [], questions: [q] }).success, false);
  assert.equal(JudgeMediaArgsSchema.safeParse({ media: ['x'], questions: Array(9).fill(q) }).success, false);
  assert.equal(
    JudgeMediaArgsSchema.safeParse({ media: ['x'], questions: [{ ...q, type: 'choice', options: ['only'] }] }).success,
    false
  );
});
