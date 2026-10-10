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
Copy-Item (Join-Path $custom 'resources\app.asar') $archive -Force
$icons = Join-Path $original 'resources\icons'
New-Item -ItemType Directory -Path $icons -Force | Out-Null
Copy-Item (Join-Path $custom 'resources\icons\icon.ico') $icons -Force
Copy-Item (Join-Path $custom 'resources\icons\icon.png') $icons -Force
if (!(Test-Path $executable)) { Move-Item (Join-Path $original 'OpenCode.exe') $executable }
& (Join-Path $PSScriptRoot 'executable-icon.ps1') -Executable $executable -Icon (Join-Path $icons 'icon.ico')
$source = Join-Path $original 'resources\source'
New-Item -ItemType Directory -Path $source -Force | Out-Null
$project = Split-Path $PSScriptRoot -Parent
Compress-Archive -Path @((Join-Path $project 'src'),(Join-Path $project 'tools'),(Join-Path $project 'tests'),(Join-Path $project 'package.json'),(Join-Path $project 'LICENSE'),(Join-Path $project 'LICENSE.OpenCode.txt'),(Join-Path $project 'LEGAL.md'),(Join-Path $project 'UPDATE.md')) -DestinationPath (Join-Path $source 'OpenCodePlus-customizations.zip') -Force
Copy-Item (Join-Path $project 'LICENSE'),(Join-Path $project 'LEGAL.md') $source -Force
$launcher = Join-Path $original 'resources\launch-opencode-plus.ps1'
Copy-Item (Join-Path $PSScriptRoot 'launch-opencode-plus.ps1') $launcher -Force
$shell = New-Object -ComObject WScript.Shell
foreach ($folder in @([Environment]::GetFolderPath('Desktop'), (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'))) {
  $link = $shell.CreateShortcut((Join-Path $folder 'OpenCode+.lnk'))
  $link.TargetPath = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
  $link.Arguments = '-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "' + $launcher + '"'
  $link.WorkingDirectory = $original
  $link.IconLocation = (Join-Path $icons 'icon.ico') + ',0'
  $link.Description = 'OpenCode+ by Vesdal'
  $link.Save()
  $old = Join-Path $folder 'OpenCode.lnk'
  if (Test-Path $old) {
    $oldLink = $shell.CreateShortcut($old)
    if ($oldLink.TargetPath -eq (Join-Path $original 'OpenCode.exe')) { Remove-Item $old }
  }
}
Write-Output 'Updated installed application; existing profile, configurations and service data preserved.'
