import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('bin is available only in Projects settings, not the sidebar', () => {
  const sidebar = fs.readFileSync('src/navigation.js', 'utf8');
  assert.ok(!sidebar.includes('Manage bin'));
  assert.ok(!sidebar.includes('plus-sidebar-bin'));
  assert.ok(fs.readFileSync('src/project-settings.js', 'utf8').includes("section('Bin',true)"));
});

test('bin retains only restore metadata and leaves the original session intact', () => {
  let stored;
  const context = {localStorage: {getItem: () => null, setItem: (_, value) => {stored = value;}}, window: {dispatchEvent() {}, addEventListener() {}}, Event: class {}};
  vm.runInNewContext(fs.readFileSync('src/session-lifecycle.js', 'utf8'), context);
  const session = {id: 'parent', title: 'Title', location: {directory: 'C:\\project'}, metadata: {large: 'x'.repeat(100000)}, permissions: ['keep']};
  context.window.__plusSessions.close('local', session, ['child']);
  assert.ok(stored.length < 300);
  assert.equal(session.metadata.large.length, 100000);
  assert.equal(context.window.__plusSessions.hidden('local', 'child'), true);
  context.window.__plusSessions.restore('local', 'parent');
  assert.equal(context.window.__plusSessions.bin('local').length, 0);
});
