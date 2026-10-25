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

test('sidebar delete controls permanently purge session data while preserving project files', () => {
  const navigation = fs.readFileSync('src/navigation.js', 'utf8');
  assert.ok(navigation.includes('Delete session permanently'));
  assert.ok(navigation.includes('Delete project and sessions permanently'));
  assert.ok(navigation.includes('__plusPurgeSessionIdsBestEffort(api,ids)'));
  assert.ok(navigation.includes('ctx.projects.deleteRegistration(project.worktree)'));
  assert.ok(navigation.includes('Project files on disk are preserved'));
  assert.ok(navigation.includes('window.__plusSessions.remove(serverKey,id)'));
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
  assert.equal(result.failed.map(f => f.id).join(','), 'stale');
  const empty = await context.window.__plusPurgeSessionIdsBestEffort(api, []);
  assert.equal([...empty.purged].join(','), '');
  assert.equal(empty.failed.length, 0);
});
test('best-effort purge treats already-removed sessions as purged', async () => {
  const context = lifecycleContext();
  const api = {session: {remove: async () => { throw Object.assign(new Error('Session not found: ses_gone'), {status: 404}); }}};
  const result = await context.window.__plusPurgeSessionIdsBestEffort(api, ['ses_gone']);
  assert.equal([...result.purged].join(','), 'ses_gone');
  assert.equal(result.failed.length, 0);
});

test('project and session trash icons share the same right edge', () => {
  const css = fs.readFileSync('src/navigation.css', 'utf8');
  const rule = css.match(/\.plus-project-sessions\s*\{[^}]*\}/)[0];
  assert.ok(rule.includes('margin:0 0 8px 8px'));
  assert.ok(!rule.includes('margin:0 8px 8px'));
});
