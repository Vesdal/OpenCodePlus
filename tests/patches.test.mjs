import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { replaceOnce, patchRecents, removeGradients } from '../tools/patches.mjs';
test('version guards refuse missing and ambiguous patch targets', () => {
  assert.throws(() => replaceOnce('abc', 'x', 'y'));
  assert.throws(() => replaceOnce('xx', 'x', 'y'));
  assert.equal(replaceOnce('abc', 'b', 'x'), 'axc');
});
test('gradient removal handles nested functions and solid fallback', () => {
  assert.equal(removeGradients('background:linear-gradient(var(--x),rgba(0,0,0,.1)),red;mask:radial-gradient(black, transparent)'), 'background:none,red;mask:none');
  assert.throws(() => removeGradients('linear-gradient('));
});
test('recent removal affects only the scoped closed list', () => {
  const source = fs.readFileSync('tools/renderer-reference.txt', 'utf8');
  const patched = patchRecents(source);
  const start = patched.indexOf('function vk(e){'); const end = patched.indexOf('function yk(e){', start);
  const factory = vm.runInNewContext(patched.slice(start, end) + ';vk', { eE: value => value.toLowerCase().replaceAll('\\', '/') });
  const store = { projects: { local: [{ worktree: 'active' }] }, recentlyClosed: { local: ['C:\\One', 'C:\\Two'], remote: ['C:\\One'] }, lastProject: { local: 'active' } };
  const project = factory({ store, scope: () => 'local', setStore: (key, scope, value) => store[key][scope] = value });
  project.forgetClosed('c:/one');
  assert.deepEqual(Array.from(store.recentlyClosed.local), ['C:\\Two']);
  assert.deepEqual(store.recentlyClosed.remote, ['C:\\One']);
  assert.equal(store.projects.local[0].worktree, 'active');
  assert.equal(store.lastProject.local, 'active');
  project.open('C:\\One'); assert.equal(store.projects.local[0].worktree, 'C:\\One');
});
test('replacement preserves literal dollar signs in delegated event handlers', () => {
  assert.equal(replaceOnce('before anchor after', 'anchor', 's.$$click=handler'), 'before s.$$click=handler after');
});
