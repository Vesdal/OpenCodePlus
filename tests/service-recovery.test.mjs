import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('build keeps service auto-recovery and pins the profile state path', () => {
  const source = fs.readFileSync('tools/build.mjs', 'utf8');
  assert.ok(!source.includes('Service.discover'));
  assert.ok(source.includes('a&&(process.env.XDG_STATE_HOME=R.getPath(`userData`));'));
  assert.ok(source.includes('process.env.XDG_STATE_HOME=R.getPath(`userData`);'));
});

test('deploy refuses staged desktops without service recovery', () => {
  const source = fs.readFileSync('tools/update-installed.ps1', 'utf8');
  assert.ok(source.includes('c.Service.ensure({file:'));
  assert.ok(source.includes('stale-service recovery'));
  assert.ok(source.includes('$link.TargetPath = $executable'));
});

test('packed archives can be repaired to service recovery in place', () => {
  const source = fs.readFileSync('tools/repair-asar-service.mjs', 'utf8');
  assert.ok(source.includes('c.Service.discover({file:'));
  assert.ok(source.includes('c.Service.ensure({file:'));
  assert.ok(source.includes('.bak'));
});
