import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const helper = path.resolve('tools/launch-opencode-plus.ps1').replaceAll("'", "''");
function run(script) {
  return execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ". '" + helper + "'; $ErrorActionPreference='Stop'; " + script], {encoding:'utf8', timeout:20000}).trim();
}
test('healthy service is reused without version check or starting',()=>{
  assert.equal(run("function Invoke-OpenCodeCLI { param($CLI,$CLIArgs); if(($CLIArgs -join ' ') -ne 'service status'){throw 'Unexpected mutation'}; 'http://127.0.0.1:12345' }; Resolve-OpenCodeService 'mock' '2.0.24'"),'http://127.0.0.1:12345');
});
test('stopped service starts only after matching bundled version is checked',()=>{
  assert.equal(run("$script:calls=@(); function Invoke-OpenCodeCLI { param($CLI,$CLIArgs); $key=$CLIArgs -join ' '; $script:calls+=$key; switch($key){'service status'{'stopped'} '--version'{'opencode v2.0.24'} 'service start'{'http://127.0.0.1:23456'} default{throw 'Unexpected command'} } }; $url=Resolve-OpenCodeService 'mock' '2.0.24'; if(($script:calls -join ',') -ne 'service status,--version,service start'){throw 'Wrong startup sequence'}; $url"),'http://127.0.0.1:23456');
});
test('version mismatch refuses to start, stop, upgrade or replace service',()=>{
  assert.equal(run("function Invoke-OpenCodeCLI { param($CLI,$CLIArgs); switch($CLIArgs -join ' '){'service status'{'stopped'} '--version'{'opencode v2.0.25'} default{throw 'Mutation attempted'} } }; try { Resolve-OpenCodeService 'mock' '2.0.24'; throw 'Expected rejection' } catch { if($_.Exception.Message -notlike 'Bundled CLI version does not match*'){throw}; 'rejected' }"),'rejected');
});
test('unexpected service state is not overwritten',()=>{
  assert.equal(run("function Invoke-OpenCodeCLI { param($CLI,$CLIArgs); if(($CLIArgs -join ' ') -ne 'service status'){throw 'Mutation attempted'}; 'unresponsive' }; try { Resolve-OpenCodeService 'mock' '2.0.24'; throw 'Expected rejection' } catch { if($_.Exception.Message -notlike 'Unexpected service status*'){throw}; 'rejected' }"),'rejected');
});
test('failed service startup cannot silently launch the desktop',()=>{
  assert.equal(run("function Invoke-OpenCodeCLI { param($CLI,$CLIArgs); switch($CLIArgs -join ' '){'service status'{'stopped'} '--version'{'opencode v2.0.24'} 'service start'{'failed'} default{throw 'Unexpected command'} } }; try { Resolve-OpenCodeService 'mock' '2.0.24'; throw 'Expected rejection' } catch { if($_.Exception.Message -notlike 'Service did not return a local endpoint*'){throw}; 'rejected' }"),'rejected');
});
