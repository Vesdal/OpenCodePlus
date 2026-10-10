import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('session bin persists, isolates servers, and restores child sessions without deleting history', () => {
  const storage = new Map();
  const context = {localStorage: {getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)}, window: {dispatchEvent() {}, addEventListener() {}}, Event: class {}};
  const source = fs.readFileSync('src/session-lifecycle.js', 'utf8');
  vm.runInNewContext(source, context);
  const session = {id: 'parent', title: 'Keep history', location: {directory: 'C:\\project'}};
  context.window.__plusSessions.close('server-a', session, ['child']);
  vm.runInNewContext(source, context);
  const bin = context.window.__plusSessions;
  assert.equal(bin.bin('server-a')[0].session.title, 'Keep history');
  assert.equal(bin.hidden('server-a', 'parent'), true);
  assert.equal(bin.hidden('server-a', 'child'), true);
  assert.equal(bin.hidden('server-b', 'parent'), false);
  bin.restore('server-a', 'parent');
  assert.equal(bin.bin('server-a').length, 0);
  assert.equal(bin.hidden('server-a', 'child'), false);
  bin.close('server-a', session, ['child']);
  bin.remove('server-a', 'parent');
  assert.equal(bin.bin('server-a').length, 0);
  assert.equal(bin.hidden('server-a', 'parent'), true);
});

test('settings and sidebar share session identity and inventory', () => {
  const settings = fs.readFileSync('src/project-settings.js', 'utf8');
  const navigation = fs.readFileSync('src/navigation.js', 'utf8');
  assert.ok(settings.includes('__plusSessionServerKey(e.server)'));
  assert.ok(settings.includes('__plusSessions.bin(sessionServer())'));
  assert.ok(settings.includes('__plusSessions.restore(sessionServer()'));
  assert.ok(navigation.includes('iconButton(`Restore session`'));
  assert.ok(!navigation.includes('button(`Restore`'));
});

test('sidebar trash never calls the destructive session API', () => {
  const source = fs.readFileSync('src/navigation.js', 'utf8');
  assert.ok(!source.includes('data.session.remove('));
  assert.ok(source.includes('Move session to bin'));
  assert.ok(source.includes('__plusSessions.restore('));
});
