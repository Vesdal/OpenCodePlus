$ErrorActionPreference = 'Stop'
$original = Join-Path $env:LOCALAPPDATA 'Programs\@opencodedesktop'
$custom = Join-Path $original 'resources\maintenance\build'
$executable = Join-Path $original 'OCodePlus.exe'
$backup = Join-Path $original 'resources\maintenance\rollback-2.0.24'
New-Item -ItemType Directory -Path $backup -Force | Out-Null
$archive = Join-Path $original 'resources\app.asar'
if (!(Test-Path (Join-Path $backup 'app.asar'))) {
  $hash = (Get-FileHash $archive -Algorithm SHA256).Hash
  if ($hash -ne 'B8B647D8A8DCEAC454A154371BD7BA49A206DA6621270107838FABBA010C479D') { throw 'Unexpected original archive; refusing update.' }
  Copy-Item $archive (Join-Path $backup 'app.asar')
}
Get-CimInstance Win32_Process | Where-Object { $_.Name -in @('OpenCode.exe','OpenCode+.exe','OCodePlus.exe') -and $_.ExecutablePath -and ($_.ExecutablePath.StartsWith($original) -or $_.ExecutablePath.StartsWith($custom)) } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500
$cli = Join-Path $original 'resources\opencode-cli.exe'
$serviceWasRunning = $false
if (Test-Path -LiteralPath $cli) {
  $serviceStatus = (& $cli service status 2>$null | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine
  if ($serviceStatus -match '^http://(127\.0\.0\.1|localhost):\d+/?$') {
    $serviceWasRunning = $true
    & $cli service stop | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Cannot stop the background service; executables stay locked.' }
    for ($i = 0; $i -lt 20; $i++) {
      Start-Sleep -Milliseconds 500
      $serviceStatus = (& $cli service status 2>$null | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine
      if ($serviceStatus -eq 'stopped') { break }
      if ($i -eq 19) { throw 'Background service did not stop; executables stay locked.' }
    }
  }
}
$stagedArchive = Join-Path $custom 'resources\app.asar'
$stagedBundle = [Text.Encoding]::UTF8.GetString([IO.File]::ReadAllBytes($stagedArchive))
if (!$stagedBundle.Contains('c.Service.ensure({file:') -or !$stagedBundle.Contains('process.env.XDG_STATE_HOME=R.getPath(`userData`);')) {
  throw 'The staged desktop lacks stale-service recovery; refusing to replace the working customized installation.'
}
Copy-Item $stagedArchive $archive -Force
$icons = Join-Path $original 'resources\icons'
New-Item -ItemType Directory -Path $icons -Force | Out-Null
Copy-Item (Join-Path $custom 'resources\icons\icon.ico') $icons -Force
Copy-Item (Join-Path $custom 'resources\icons\icon.png') $icons -Force
if (!(Test-Path $executable)) { Move-Item (Join-Path $original 'OpenCode.exe') $executable }
& (Join-Path $PSScriptRoot 'executable-icon.ps1') -Executable $executable -Icon (Join-Path $icons 'icon.ico')
& (Join-Path $PSScriptRoot 'set-exe-display-names.ps1') -DesktopExe $executable -CliExe (Join-Path $original 'resources\opencode-cli.exe')
if ($serviceWasRunning) {
  $endpoint = (& $cli service start 2>&1 | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine
  if ($endpoint -notmatch '^http://(127\.0\.0\.1|localhost):\d+/?$') { throw 'Background service did not restart; launch OpenCode+ to restore it.' }
}
$source = Join-Path $original 'resources\source'
New-Item -ItemType Directory -Path $source -Force | Out-Null
$project = Split-Path $PSScriptRoot -Parent
Compress-Archive -Path @((Join-Path $project 'src'),(Join-Path $project 'tools'),(Join-Path $project 'tests'),(Join-Path $project 'package.json'),(Join-Path $project 'LICENSE'),(Join-Path $project 'LICENSE.OpenCode.txt'),(Join-Path $project 'LEGAL.md'),(Join-Path $project 'UPDATE.md')) -DestinationPath (Join-Path $source 'OpenCodePlus-customizations.zip') -Force
Copy-Item (Join-Path $project 'LICENSE'),(Join-Path $project 'LEGAL.md') $source -Force
$launcher = Join-Path $original 'resources\launch-opencode-plus.ps1'
Copy-Item (Join-Path $PSScriptRoot 'launch-opencode-plus.ps1') $launcher -Force
$shell = New-Object -ComObject WScript.Shell
$shortcutFolders = @([Environment]::GetFolderPath('Desktop'), (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'))
try { $shortcutFolders += 'C:\ProgramData\Microsoft\Windows\Start Menu\Programs' } catch {}
foreach ($folder in $shortcutFolders) {
  $link = $shell.CreateShortcut((Join-Path $folder 'OpenCode+.lnk'))
  $link.TargetPath = $executable
  $link.Arguments = ''
  $link.WorkingDirectory = $original
  $link.IconLocation = (Join-Path $icons 'icon.ico') + ',0'
  $link.Description = 'OpenCode+ by Vesdal'
  try { $link.Save() } catch {}
  # Only OpenCode+ must remain: drop any stale OpenCode shortcut whatever it targets.
  try { Remove-Item (Join-Path $folder 'OpenCode.lnk') -Force -ErrorAction SilentlyContinue } catch {}
}
Write-Output 'Updated installed application; existing profile, configurations and service data preserved.'
