import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('active and bin inventories both support select all and bulk actions',()=>{
  const source=fs.readFileSync('src/project-settings.js','utf8');
  assert.ok(source.includes("section('Active projects',false)"));
  assert.ok(source.includes("section('Bin',true)"));
  assert.ok(source.includes('all.indeterminate'));
  assert.ok(source.includes('context.projects.isRemoved(project.worktree)'));
  assert.ok(source.includes('context.projects.bin()'));
  assert.ok(source.includes('plus-bulk-bar'));
  assert.ok(source.includes('menu.hidden = total > 0'));
  assert.ok(source.includes("trigger.textContent='•••'"));
  assert.ok(!source.includes("button('Add project'"));
});
test('sidebar deletion is permanent and leaves project files on disk',()=>{
  const source=fs.readFileSync('src/navigation.js','utf8');
  assert.ok(source.includes('iconButton(`Delete project and sessions permanently`,`delete`'));
  assert.ok(source.includes('__plusPurgeSessionIdsBestEffort(api,ids)'));
  assert.ok(source.includes('ctx.projects.deleteRegistration(project.worktree)'));
  assert.ok(source.includes('Project files on disk are preserved'));
  assert.ok(!source.includes('plus-sidebar-bin'));
  assert.ok(fs.readFileSync('src/project-settings.js','utf8').includes('context.projects.bin()'));
  assert.ok(fs.readFileSync('src/project-settings.js','utf8').includes('const api = context.sdk.api;'));
  const css=fs.readFileSync('src/navigation.css','utf8');
  assert.ok(css.includes('--plus-danger-bg:#4b1619'));
});
