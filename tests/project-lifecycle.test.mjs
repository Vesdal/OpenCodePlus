import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('bin restores, expires at 30 days, isolates servers and keeps deleted entries out of legacy migration',()=>{
  const storage=new Map();let now=1000;
  const context={localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},window:{dispatchEvent(){}},Event:class{},Date:{now:()=>now}};
  vm.runInNewContext(fs.readFileSync('src/project-lifecycle.js','utf8'),context);
  const p=context.window.__plusProjects;
  p.close('local','C:\\Projects\\One');assert.equal(p.bin('local').length,1);
  assert.equal(p.hidden('remote','C:\\Projects\\One'),false);
  p.restore('local','C:/Projects/One');assert.equal(p.bin('local',['C:/Projects/One']).length,0);assert.equal(p.hidden('local','C:/Projects/One'),false);
  p.close('local','C:/Projects/One');now+=30*86400000;
  assert.equal(p.bin('local').length,0);assert.equal(p.hidden('local','C:/Projects/One'),true);
  assert.equal(p.bin('local',['C:/Projects/One']).length,0);
  p.restore('local','C:/Projects/One');p.remove('local','C:/Projects/One');
  assert.equal(p.bin('local',['C:/Projects/One']).length,0);
});
