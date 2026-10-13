import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('navigation keeps original session APIs and startup preferences',()=>{
  const source=fs.readFileSync('src/navigation.js','utf8');
  assert.ok(source.includes('home.project.openProjectSession('));
  assert.ok(source.includes('home.project.openProjectNewSession('));
   assert.ok(!source.includes('plus.startup'));
  assert.ok(source.includes('plus.sidebar.collapsed'));
  assert.ok(!source.includes('MutationObserver'));
});
test('home route is replaced and settings removed from Windows menu',()=>{
  const source=fs.readFileSync('tools/build.mjs','utf8');
  assert.ok(source.includes('path:`/`,component:plusStart'));
  assert.ok(source.includes('portalStart'));
  assert.ok(source.includes('labelKey:`desktop.menu.settings`'));
});
test('project identity stays stable and startup uses the existing Preferences select',()=>{
  const navigation=fs.readFileSync('src/navigation.js','utf8');
  assert.ok(navigation.includes('.map(p=>p.worktree)'));
  assert.ok(navigation.includes('dropdownAnimation?.cancel()'));
  assert.ok(!navigation.includes('document.createElement(`select`)'));
  assert.ok(navigation.includes('name:`settings-gear`'));
   assert.ok(navigation.includes('No projects found'));
   assert.ok(navigation.includes('tabs.select(last)'));
});
test('sidebar footer keeps only Add project; per-project New session stays',()=>{
  const navigation=fs.readFileSync('src/navigation.js','utf8');
  assert.ok(navigation.includes('+ Add project'));
  assert.ok(!navigation.includes('button(`+ New session`,()=>home.project.openNewSession())'));
  assert.ok(navigation.includes('button(`+ New session`,()=>home.project.openProjectNewSession(server,project.worktree)'));
});
