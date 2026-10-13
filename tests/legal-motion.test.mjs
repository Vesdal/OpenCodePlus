import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('AGPL notices retain upstream MIT and document source distribution limits',()=>{
  assert.equal(JSON.parse(fs.readFileSync('package.json')).license,'AGPL-3.0-only');
  assert.match(fs.readFileSync('LICENSE','utf8'),/GNU AFFERO GENERAL PUBLIC LICENSE/);
  assert.match(fs.readFileSync('LICENSE.OpenCode.txt','utf8'),/MIT License/);
  assert.match(fs.readFileSync('LEGAL.md','utf8'),/not certified/);
});
test('collapsed project lists release data and cancel pending requests',()=>{
  const source=fs.readFileSync('src/navigation.js','utf8');
  assert.match(source,/new AbortController/);
  assert.match(source,/setSessions\(\[\]\)/);
});
test('settings transitions use targeted animation and honor reduced motion',()=>{
  const source=fs.readFileSync('src/plus.js','utf8');
  assert.match(source,/animateSettings/);
  assert.match(source,/prefers-reduced-motion: reduce/);
  assert.match(source,/panel\.getAnimations\(\)/);
});
test('settings section switches animate the panel; search typing stays direct',()=>{
  const build=fs.readFileSync('tools/build.mjs','utf8');
  assert.ok(build.includes('n.select(e),window.__opencodePlus.animateSettings()'));
  assert.ok(!build.includes('window.__opencodePlus.transition(()=>{t.search.clear()'));
});
