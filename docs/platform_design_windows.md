# Platform Design – Windows

## Purpose

Provide a concise, official‑source reference for designing Windows desktop applications, covering Fluent Design, Windows UI patterns, and native integration. This document is used by the agent when generating components or validating UI against Windows conventions.

## When to Consult

- When creating a new desktop UI or wizard.
- When refactoring dialogs or menus.
- When integrating native APIs such as file dialogs, notifications, or clipboard.
- When packaging for Windows or troubleshooting platform‑specific issues.

## Scope

- Fluent Design principles and components.
- Windows desktop UI patterns: windows, dialogs, system menus, taskbar integration.
- Accessibility guidelines.
- Packaging and deployment: MSI, MSIX, Inno Setup.
- System integration: shortcuts, file associations, registry, toast notifications.
- Keyboard and mouse conventions, touch support.

## Core Concepts

1. **Fluent Design** – Layered visual design, fluid motion, and depth.
2. **Window Lifecycle** – Navigation, minimization, focus handling.
3. **System Integration** – File associations, URI schemes, clipboard, notifications.
4. **Accessibility** – High‑contrast, screen reader support, keyboard navigation.

## Detailed Operational Guidance

### Fluent Design
- Use transparent layers with *Mica* (Windows 11) and *Acrylic* (Windows 10) for background blur.
- Apply *Cortana* style gradient and subtle light source.
- Use *Microsoft Fluent UI* widgets where available.

### Menus & Commands
- Top‑level menus: File, Edit, View, Navigate, Help.
- Use *Command Palette* (Ctrl+Shift+P) for quick commands.
- Include *Recent* list in File menu.
- Provide *Keyboard shortcuts* with **Ctrl+** on Windows.

### Dialogs
- Use *ContentDialog* (UWP) or *WPF Window*.
- Respect system **Dialog** styling: header, content, primary/secondary actions.
- Ensure focus is trapped inside modal dialogs.

### Accessibility
- Ensure **high‑contrast** theme supports Windows default.
- Use **Live Regions** for dynamic updates.
- Provide **ReadAloud** captions.

## Rules and Constraints
- Do not hardcode DPI values; use `UseLayoutRounding` and `LayoutTransform` in WPF.
- Minimize reliance on `Win32` APIs unless necessary.
- Use **AppUserModelID** for taskbar grouping.
- Keep **toast notifications** short (< 5 sec) and use `ToastNotificationManager`.

## Practical Implementation Guidance
| Feature | Language | Example |
|---------|----------|---------|
| Window | C# WPF | `new Window { Title = "My App" }` |
| Mica | UWP | `ApplicationView.GetForCurrentView().SetPreferredMinSize(...)` |
| Toast | WinUI | `ToastNotificationManager.CreateToastNotifier().Show(toast)` |

## Common Mistakes
- Forcing *pixel‑perfect* layouts; should use relative units.
- Ignoring **DPI scaling** → blurry UI.
- Over‑embedding dialogs → leads to focus confusion.

## Troubleshooting
- **Crashes on start** – Check AppXManifest for missing capabilities.
- **Layout breakage** – Verify `UseLayoutRounding` and `RenderOptions.BitmapScalingMode`.
- **Accessibility warnings** – Run `Accessibility Insights`.

## Cross‑Platform Considerations
- If targeting macOS or Android, isolate Windows‑specific logic behind platform abstractions or use *Flutter for Android/Windows*.

## Related Knowledge
- [Platform Design – macOS](platform_design_macos.md)
- [Platform Design – Android](platform_design_android.md)
- [Design Tokens](design_tokens.md)
- [Mica/Acrylic Backdrops](windows_mica_windows_app_sdk.md)

## Official References
- Microsoft Fluent Design System: https://learn.microsoft.com/fluentui
- Windows UX Design Guidelines: https://learn.microsoft.com/windows/apps/design
- Accessibility Requirements for Windows: https://learn.microsoft.com/windows/accessibility

## Version / Date
- Updated: 2026‑10‑07
- Windows SDK: 10.0.22621 (Windows 11)
- Fluent UI v1.8 (stable)
