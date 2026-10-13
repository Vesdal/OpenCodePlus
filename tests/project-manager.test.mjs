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
test('sidebar trash preserves settings bin; destructive controls use danger styling',()=>{
  const source=fs.readFileSync('src/navigation.js','utf8');
  assert.ok(source.includes('iconButton(`Move project to bin`,`delete`'));
  assert.ok(source.includes('projects.project.close(server,project.worktree)'));
  assert.ok(source.includes('__plusSessions.close(serverKey'));
  assert.ok(!source.includes('plus-sidebar-bin'));
  assert.ok(fs.readFileSync('src/project-settings.js','utf8').includes('context.projects.bin()'));
  const css=fs.readFileSync('src/navigation.css','utf8');
  assert.ok(css.includes('--plus-danger-bg:#4b1619'));
});
