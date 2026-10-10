# Windows Design

Use current Fluent guidance: clear hierarchy, accessible contrast, responsive layouts, purposeful materials, consistent typography, explicit commands, and keyboard/mouse/touch support. Adapt navigation and density to window size; support title-bar, menu, toolbar, dialog, and system integration conventions.

Mica is a primarily opaque, depth-establishing backdrop for an application window; Acrylic is a translucent material for transient surfaces or layered context. Materials should support hierarchy, not become decoration. Provide solid/high-contrast fallbacks and test power, transparency, contrast, and performance settings.

Use semantic tokens for color, spacing, corner radius, typography, states, and elevation. Keep command bars and menus task-oriented. Test keyboard focus, UI Automation, Narrator, high contrast, scaling, resize, snap, multiple monitors, and narrow/large windows.

## Windows App SDK decision rules

Windows App SDK is the recommended modern platform for new Windows desktop applications and can add modern APIs to WinUI 3, Win32, WPF, and Windows Forms. It is delivered independently of Windows, supports packaged and unpackaged deployment, and has stable, preview, and experimental channels. Pin the SDK channel/version and verify OS support, runtime deployment, signing, lifecycle, windowing, and resource management before shipping.

## Sources

- Windows design hub: https://learn.microsoft.com/en-us/windows/apps/design/ (Microsoft Docs commit `1dc2ee6fb71c55c054c458a22ff996bbdd14ee17`, updated 2026-10-07)
- Fluent 2: https://fluent2.microsoft.design/ (official design system; verified 2026-10-08)
- Fluent UI repository: https://github.com/microsoft/fluentui (MIT repository license; inspect package notices)
- Windows Mica/Acrylic: `docs/windows_mica_windows_app_sdk.md`
- Windows App SDK: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/ (Microsoft Docs commit `6f2c24537eb0618e2a905bb900bab8c5d86e8745`, updated 2026-09-10)
- Windows App SDK repository: https://github.com/microsoft/WindowsAppSDK (MIT license; verify selected release and package notices)
