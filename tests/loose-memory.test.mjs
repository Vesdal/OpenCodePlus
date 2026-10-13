import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('loose inventory does not retain project session payloads or alter sessions', () => {
  const context = {window: {addEventListener() {}}, localStorage: {getItem: () => null}};
  vm.runInNewContext(fs.readFileSync('src/session-lifecycle.js', 'utf8'), context);
  const normalize = value => value.replaceAll('\\', '/').toLowerCase();
  const sessions = Array.from({length: 1000}, (_, index) => ({id: String(index), location: {directory: index < 990 ? 'C:\\Project' : 'C:\\Other'}, metadata: 'x'.repeat(1024)}));
  const filtered = context.window.__plusLooseSessions(sessions, ['c:/project'], normalize);
  assert.equal(filtered.length, 10);
  assert.equal(filtered[0], sessions[990]);
  assert.equal(sessions.length, 1000);
  assert.equal(context.window.__plusLooseSessions(sessions, [], normalize).length, 1000);
});
