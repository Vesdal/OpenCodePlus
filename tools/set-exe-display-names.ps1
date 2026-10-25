param([string]$DesktopExe, [string]$CliExe)
$ErrorActionPreference = 'Stop'
# Names the installed executables so Task Manager and window lists show
# OpenCode+ instead of the upstream OpenCode/Bun identities. Version numbers,
# code and other resources are preserved; only display strings change.
$compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if (!(Test-Path -LiteralPath $compiler)) { throw 'C# compiler not found; cannot name executables.' }
if (!(Test-Path -LiteralPath $DesktopExe)) { throw "Desktop executable missing: $DesktopExe" }
if (!(Test-Path -LiteralPath $CliExe)) { throw "CLI executable missing: $CliExe" }
$patcher = Join-Path ([IO.Path]::GetTempPath()) 'opencode-plus-exeverpatch.exe'
& $compiler /nologo /target:exe /optimize+ "/out:$patcher" (Join-Path $PSScriptRoot 'ExeVersionPatch.cs')
if ($LASTEXITCODE -ne 0) { throw 'Version patcher compilation failed' }
& $patcher $DesktopExe FileDescription='OpenCode+' ProductName='OpenCode+' InternalName='OpenCode+' OriginalFilename='OCodePlus.exe'
if ($LASTEXITCODE -ne 0) { throw 'Desktop executable naming failed; is it still running?' }
& $patcher $CliExe FileDescription='OpenCode+' ProductName='OpenCode+' InternalName='OpenCode+' OriginalFilename='opencode-cli.exe'
if ($LASTEXITCODE -ne 0) { throw 'CLI naming failed; is the background service still running?' }
Write-Output 'Executables named OpenCode+.'
