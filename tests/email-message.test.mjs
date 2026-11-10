import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EmailMessageSchema } from '../dist/index.js';

test('EmailMessageSchema keeps ampHtml and impersonateUser', () => {
  const parsed = EmailMessageSchema.parse({
    to: 'user@example.com',
    subject: 'AMP',
    text: 'plain',
    ampHtml: '<html ⚡4email></html>',
    html: '<p>html</p>',
    impersonateUser: 'sender@example.com'
  });
  assert.equal(parsed.ampHtml, '<html ⚡4email></html>');
  assert.equal(parsed.impersonateUser, 'sender@example.com');
});

test('EmailMessageSchema leaves ampHtml and impersonateUser optional', () => {
  const parsed = EmailMessageSchema.parse({ to: 'user@example.com', subject: 's' });
  assert.equal(parsed.ampHtml, undefined);
  assert.equal(parsed.impersonateUser, undefined);
});
