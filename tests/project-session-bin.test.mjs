import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function lifecycleContext() {
  const storage = new Map();
  const context = {localStorage: {getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value)}, window: {dispatchEvent() {}, addEventListener() {}}, Event: class {}};
  vm.runInNewContext(fs.readFileSync('src/session-lifecycle.js', 'utf8'), context);
  return context;
}

test('purge helper deletes exactly the given ids and nothing else', async () => {
  const context = lifecycleContext();
  const calls = [];
  const api = {session: {remove: async ({sessionID}) => { calls.push(sessionID); }}};
  const session = {id: 'parent', title: 'Bin me', location: {directory: 'C:\\project'}};
  context.window.__plusSessions.close('server-a', session, ['parent', 'child', 'child']);
  const removed = await context.window.__plusPurgeSessionIds(api, ['parent', 'child', 'child']);
  assert.equal([...removed].join(','), 'parent,child');
  assert.deepEqual(calls, ['parent', 'child']);
  // Purging never touches the bin bookkeeping itself; the caller marks entries removed.
  assert.equal(context.window.__plusSessions.bin('server-a').length, 1);
});

test('purge helper propagates backend failures so the UI can retry', async () => {
  const context = lifecycleContext();
  const api = {session: {remove: async () => { throw new Error('gone'); }}};
  await assert.rejects(context.window.__plusPurgeSessionIds(api, ['x']));
});

test('project trash bins the project sessions without deleting data', () => {
  const navigation = fs.readFileSync('src/navigation.js', 'utf8');
  assert.ok(navigation.includes('Move project to bin'));
  assert.ok(navigation.includes('__plusSessions.close(serverKey'));
  assert.ok(navigation.includes('projects.project.close(server,project.worktree)'));
  assert.ok(!navigation.includes('api.session.remove('));
  assert.ok(!navigation.includes('__plusPurgeSessionIds'));
});

test('permanent delete removes backend session data to free space', () => {
  const settings = fs.readFileSync('src/project-settings.js', 'utf8');
  assert.ok(settings.includes('__plusPurgeSessionIdsBestEffort(api'));
  assert.ok(settings.includes('deleteRegistration(directory)'));
  assert.ok(settings.includes('__plusSessions.remove(sessionServer()'));
  assert.ok(settings.includes('to free space'));
});
test('best-effort purge keeps confirmed ids and reports the rest without aborting', async () => {
  const context = lifecycleContext();
  const api = {session: {remove: async ({sessionID}) => { if (sessionID === 'stale') throw new Error('gone'); }}};
  const result = await context.window.__plusPurgeSessionIdsBestEffort(api, ['a', 'stale', 'a', 'b']);
  assert.equal([...result.purged].join(','), 'a,b');
  assert.equal([...result.failed].join(','), 'stale');
  const empty = await context.window.__plusPurgeSessionIdsBestEffort(api, []);
  assert.equal([...empty.purged].join(','), '');
  assert.equal([...empty.failed].join(','), '');
});

test('project and session trash icons share the same right edge', () => {
  const css = fs.readFileSync('src/navigation.css', 'utf8');
  const rule = css.match(/\.plus-project-sessions\s*\{[^}]*\}/)[0];
  assert.ok(rule.includes('margin:0 0 8px 8px'));
  assert.ok(!rule.includes('margin:0 8px 8px'));
});
