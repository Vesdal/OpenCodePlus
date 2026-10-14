param([switch]$CheckOnly)
$ErrorActionPreference = 'Stop'

function Invoke-OpenCodeCLI {
    param([string]$CLI, [string[]]$CLIArgs)
    $output = @(& $CLI @CLIArgs 2>&1)
    if ($LASTEXITCODE -ne 0) { throw ('OpenCode ' + ($CLIArgs -join ' ') + ' failed: ' + ($output -join ' ')) }
    return (($output | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine).Trim()
}

function Resolve-OpenCodeService {
    param([string]$CLI, [string]$ExpectedVersion)
    $status = Invoke-OpenCodeCLI -CLI $CLI -CLIArgs @('service', 'status')
    if ($status -match '^http://(127\.0\.0\.1|localhost):\d+/?$') { return $status }
    if ($status -ne 'stopped') { throw ('Unexpected service status; refusing to replace the existing service: ' + $status) }
    $version = Invoke-OpenCodeCLI -CLI $CLI -CLIArgs @('--version')
    if ($version -notmatch ('^opencode v?' + [regex]::Escape($ExpectedVersion) + '$')) {
        throw ('Bundled CLI version does not match this custom desktop; no service was started: ' + $version)
    }
    $endpoint = Invoke-OpenCodeCLI -CLI $CLI -CLIArgs @('service', 'start')
    if ($endpoint -notmatch '^http://(127\.0\.0\.1|localhost):\d+/?$') { throw ('Service did not return a local endpoint: ' + $endpoint) }
    return $endpoint
}

function Wait-OpenCodeServiceHealthy {
    # The desktop discovers (never starts) the service, so only open it once
    # the endpoint accepts connections. Otherwise the desktop shows
    # "Desktop IPC handler failed" on cold boot.
    param([string]$CLI, [string]$Endpoint)
    $uri = [System.Uri]$Endpoint
    $deadline = (Get-Date).AddSeconds(60)
    while ((Get-Date) -lt $deadline) {
        $status = Invoke-OpenCodeCLI -CLI $CLI -CLIArgs @('service', 'status')
        if ($status -match '^http://(127\.0\.0\.1|localhost):\d+/?$') {
            $client = New-Object System.Net.Sockets.TcpClient
            try {
                $iar = $client.BeginConnect($uri.Host, $uri.Port, $null, $null)
                if ($iar.AsyncWaitHandle.WaitOne(1000)) { $client.EndConnect($iar); return $status }
            } catch { } finally { $client.Close() }
        }
        Start-Sleep -Milliseconds 500
    }
    throw ('Service did not become healthy in time: ' + $Endpoint)
}

# Dot-source only the functions for regression tests; never launch or modify a service.
if ($MyInvocation.InvocationName -eq '.') { return }
try {
    $installation = Split-Path $PSScriptRoot -Parent
    $cli = Join-Path $PSScriptRoot 'opencode-cli.exe'
    $desktop = Join-Path $installation 'OCodePlus.exe'
    $expectedVersion = (Get-Content -LiteralPath (Join-Path $PSScriptRoot 'opencode-cli.version') -Raw).Trim()
    # Keep the CLI service registry aligned with the customized desktop's userData profile.
    $env:XDG_STATE_HOME = Join-Path $env:APPDATA 'ai.opencode.desktop.plus.custom-20261009'
    if (!(Test-Path -LiteralPath $desktop) -or !(Test-Path -LiteralPath $cli)) { throw 'The customized desktop or its bundled CLI is missing.' }
    $endpoint = Wait-OpenCodeServiceHealthy -CLI $cli -Endpoint (Resolve-OpenCodeService -CLI $cli -ExpectedVersion $expectedVersion)
    if ($CheckOnly) { Write-Output ('Service ready: ' + $endpoint); exit 0 }
    # The desktop remains discovery-only. This launcher never stops, replaces, or upgrades a running service.
    Start-Process -FilePath $desktop -WorkingDirectory $installation -WindowStyle Normal | Out-Null
} catch {
    if ($CheckOnly) { Write-Error $_; exit 1 }
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, 'OpenCode+ startup', 'OK', 'Error') | Out-Null
    exit 1
}
