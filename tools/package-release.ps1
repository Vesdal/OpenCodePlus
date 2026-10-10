$ErrorActionPreference = 'Stop'
$workspace = Split-Path $PSScriptRoot -Parent
$installed = Join-Path $env:LOCALAPPDATA 'Programs\@opencodedesktop'
$output = Join-Path ([Environment]::GetFolderPath('MyDocuments')) 'Vesdal\OpenCodePlus'
$stage = Join-Path $env:LOCALAPPDATA 'Temp\opencode\release-20261010'
if (Test-Path $stage) { throw 'Release staging already exists; refusing to overwrite.' }
New-Item -ItemType Directory -Path $stage,$output -Force | Out-Null
$payload = Join-Path $stage 'payload'
New-Item -ItemType Directory -Path $payload -Force | Out-Null
foreach ($item in Get-ChildItem $installed) {
    if ($item.Name -in @('resources','debug.log','Uninstall OpenCode.exe')) { continue }
    Copy-Item $item.FullName $payload -Recurse
}
$resources = Join-Path $payload 'resources'
New-Item -ItemType Directory -Path $resources | Out-Null
foreach ($name in @('app.asar.unpacked','icons','opencode-cli.exe','opencode-cli.version','launch-opencode-plus.ps1','launch-opencode-plus.vbs')) {
    Copy-Item (Join-Path $installed "resources\$name") $resources -Recurse
}
Copy-Item (Join-Path $installed 'resources\maintenance\build\resources\app.asar') $resources
$source = Join-Path $output 'Source'
if (Test-Path $source) { throw 'Source destination already exists; refusing to overwrite.' }
New-Item -ItemType Directory -Path $source | Out-Null
foreach ($name in @('src','tools','tests','package.json','README.md','UPDATE.md','LICENSE','LICENSE.OpenCode.txt','LEGAL.md')) {
    Copy-Item (Join-Path $workspace $name) $source -Recurse
}
# Include the exact upstream build input; customization source alone cannot reproduce the app.
New-Item -ItemType Directory -Path (Join-Path $source 'upstream') | Out-Null
Copy-Item (Join-Path $installed 'resources\maintenance\rollback-2.0.24\app.asar') (Join-Path $source 'upstream\app.asar')
New-Item -ItemType Directory -Path (Join-Path $resources 'source') | Out-Null
Copy-Item $source (Join-Path $resources 'source\workspace') -Recurse
$zip = Join-Path $stage 'payload.zip'
& 7z a -tzip -mx=5 $zip "$payload\*" -bso0 -bsp0
if ($LASTEXITCODE -ne 0) { throw 'Payload compression failed' }
& 7z t $zip -bso0 -bsp0
if ($LASTEXITCODE -ne 0) { throw 'Payload verification failed' }
$compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
foreach ($name in @('OpenCodePlus-Setup.exe','OpenCodePlus-Portable.exe')) {
    & $compiler /nologo /target:winexe /optimize+ /reference:System.IO.Compression.dll /reference:System.IO.Compression.FileSystem.dll /reference:System.Windows.Forms.dll /reference:Microsoft.CSharp.dll "/resource:$zip,payload.zip" "/out:$(Join-Path $output $name)" (Join-Path $PSScriptRoot 'PackageLauncher.cs')
    if ($LASTEXITCODE -ne 0) { throw 'Executable compilation failed' }
}
Get-FileHash (Join-Path $output '*.exe') -Algorithm SHA256 | ForEach-Object { "$($_.Hash)  $([IO.Path]::GetFileName($_.Path))" } | Set-Content (Join-Path $output 'SHA256SUMS.txt')
Write-Output "Created source, installer and portable in $output. Neither executable was launched."
