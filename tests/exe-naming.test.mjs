import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('version patcher rebuilds display strings without touching code', () => {
  const source = fs.readFileSync('tools/ExeVersionPatch.cs', 'utf8');
  assert.ok(source.includes('BeginUpdateResource'));
  assert.ok(source.includes('UpdateResource'));
  assert.ok(source.includes('VS_VERSION_INFO'));
  assert.ok(source.includes('FileDescription'));
  assert.ok(source.includes('OriginalFilename'));
  assert.ok(source.includes('StringFileInfo'));
});

test('desktop and CLI executables are both named OpenCode+', () => {
  const source = fs.readFileSync('tools/set-exe-display-names.ps1', 'utf8');
  assert.ok(source.includes('$DesktopExe'));
  assert.ok(source.includes('$CliExe'));
  assert.ok(source.includes("FileDescription='OpenCode+'"));
  assert.ok(source.includes("OriginalFilename='OCodePlus.exe'"));
  assert.ok(source.includes("OriginalFilename='opencode-cli.exe'"));
});

test('updates name executables, restart the service and drop stale shortcuts', () => {
  const source = fs.readFileSync('tools/update-installed.ps1', 'utf8');
  assert.ok(source.includes('set-exe-display-names.ps1'));
  assert.ok(source.includes('service stop'));
  assert.ok(source.includes('service start'));
  assert.ok(source.includes("Remove-Item (Join-Path $folder 'OpenCode.lnk')"));
  assert.ok(!source.includes("if ($oldLink.TargetPath -eq (Join-Path $original 'OpenCode.exe'))"));
  assert.ok(source.includes("'OpenCode+.lnk'"));
});
