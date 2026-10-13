# OpenCode+ update

The installed application in `%LOCALAPPDATA%/Programs/@opencodedesktop` is updated in place, not uninstalled. The desktop executable is now `OCodePlus.exe`; shortcuts (including matching pinned shortcuts) target this name. The original uninstall registration is retained, but the vendor uninstaller has not been revalidated after renaming. OpenCode+ continues using its existing custom Electron profile; configuration, agents, credentials and service databases are not replaced.

The single original archive is retained in `%LOCALAPPDATA%/OpenCodePlus/rollback-2.0.24/app.asar` for recovery and reproducible builds. Set `OPENCODE_PLUS_BASE_ARCHIVE` to this file before rebuilding after deployment. `tools/update-installed.ps1` deploys the verified staging archive and O+ icons, updating shortcuts without touching user data.

Navigation is built within the existing Solid application context. Projects expand into server-backed session lists; selecting a session uses the original navigation API. The `/` route opens a chat rather than a home page. Startup preference and sidebar collapse state are local profile preferences. Settings stays in the sidebar footer; its keyboard shortcut remains intact.

Display names: `tools/set-exe-display-names.ps1` (via `tools/ExeVersionPatch.cs`, Win32 version resources only) names the desktop and CLI executables OpenCode+ so Task Manager shows OpenCode+ instead of OpenCode/Bun. Version numbers, code and vendor attributions are preserved. `tools/update-installed.ps1` stops the desktop and the background service, patches both executables, restarts the service, and removes any stale OpenCode shortcut so only OpenCode+ remains in Start Menu and Desktop.

Settings motion: switching sections animates only the settings panel (180 ms fade/slide, honors reduced motion); typing in settings search no longer runs a full-page transition per keystroke.

QA launches with `OPENCODE_PLUS_QA=1` create a hidden window, preventing desktop focus interference. Do not use that environment variable for normal launches. RAM savings beyond the existing spellcheck/spare-renderer changes are not established by a controlled benchmark.
