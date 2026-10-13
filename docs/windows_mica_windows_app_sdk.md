# Windows – Mica and Acrylic Backdrops for WinUI 3 and Win32 Apps

## Purpose

Provide a short‑form, machine‑ready reference for applying the *Mica* and *Acrylic* system backdrops in Windows 11 desktop applications.  The document explains how to use the Windows App SDK (WinUI 3), the Win32 API, and the optional third‑party `MicaForEveryone` helper.  It covers version‑specific details, key API calls, and practical tips that an autonomous agent can use without human copy‑paste.

## When to Consult

- When building a Flutter/WinUI 3 Windows desktop app that requires a modern, Fluent‑look background.
- When converting a legacy Win32 app to a Windows 11 experience or wishing to add a backdrop.
- When the project must support Windows 10 + 11 but the code may have to avoid the backdrop on older OS versions.

## Scope

- WinUI 3 / Windows App SDK (XAML) usage.
- Win32 C++/Rust/WinRT usage via `Composition`/`MicaController`.
- Third‑party Mica helpers (`MicaForEveryone`).
- Runtime checks for Windows 11 / 22000+.
- Performance considerations (single wallpaper sampling, dynamic adaption).

## Core Concepts

| Concept | Description |
|---------|-------------|
| *Mica* | An opaque, themed backdrop that samples the desktop wallpaper once.  Available on Windows 11 ≥ 22000 and Windows App SDK ≥ 1.1.
| *Acrylic* | Similar to Mica but semi‑transparent.  Available on Windows 11 ≥ 22000.
| *WinUI 3 SystemBackdrop* | XAML property `Window.SystemBackdrop` set to `MicaBackdrop` or `DesktopAcrylicBackdrop`.
| *Win32 MicaController* | COM‑based API providing `SetTarget`, `IsSupported` for Win32 windows.
| *MicaForEveryone* | A Windows App Store utility that enables Mica on legacy Win32 app title bars via `DwmSetWindowAttribute`.

## Operational Guidance

### 1. Detect Available Backdrop
```csharp
bool IsMicaSupported => Environment.OSVersion.Version.Major >= 10 &&
                       Environment.OSVersion.Version.Build >= 22000 &&
                       WindowsAppSDK.Version >= new Version(1,1);
```
- For native C++ use `GetVersionEx` or `CheckWin32Version`. 
- If unsupported, fall back to solid background.

### 2. WinUI 3 XAML (recommended)
```xml
<Window …>
  <Window.SystemBackdrop>
    <MicaBackdrop Kind="Base" />
  </Window.SystemBackdrop>
</Window>
```
- **Base** – normal, light/dark automatically follows system theme.
- **BaseAlt** – brighter tint that works on dark‑theme title bars.
- For runtime switching:
```csharp
var mica = new MicaBackdrop();
mica.Kind = MicaKind.BaseAlt; // or Base
Window.SystemBackdrop = mica;
```
- Add `using Microsoft.UI.Windowing;` and `Microsoft.UI.Xaml.Controls`.

### 3. Win32 C++/WinRT
```cpp
// Include Windows App SDK headers
#include <Microsoft.UI.Windowing.h>
#include <Microsoft.UI.Composition.h>

winrt::compositor::Compositor compositor{};
auto controller = winrt::Microsoft::UI::Composition::MicaController{compositor};
if(controller.IsSupported()){
    auto hwnd = …; // Win32 HWND
    auto target = winrt::Microsoft::UI::WindowId{(uint64_t)hwnd};
    controller.SetTarget(target, winrt::Microsoft::UI::Composition::CompositionSurface{…});
}
```
- Requires `WindowsAppSDK` NuGet package (v1.x) and `WinRT` project.
- When used in a Flutter/Win32 hybrid, expose a `C++/WinRT` static library that Flutter calls via `PlatformChannel`.

### 4. Third‑Party Helper (MicaForEveryone)
- Install `MicaForEveryone` from the Microsoft Store or sideload.
- For programmatic use, the helper exposes a COM interface `IMicaForEveryone` that can be invoked to apply backdrop to an existing window:
```cpp
co_await MicaForEveryone::ApplyAsync(hwnd, MiCAKind::BaseAlt);
```
- Useful when the app cannot be recompiled with WinUI 3.

### 5. Best‑Practice Tips
- **Performance** – Mica samples the wallpaper once per window; avoid changing the backdrop unnecessarily.
- **High‑contrast** – In high‑contrast mode, set `MicaController.FallbackColor` to a solid color.
- **Window Resize** – Ensure the compositor is updated when the window is resized; Mica scales automatically.
- **Title Bar** – If you use a custom caption, set `Window.UseCustomChromeForSystemBackdrops = true` (WinUI 3) or set `DwmSetWindowAttribute` for legacy Win32.
- **Compatibility** – On Windows 10 or early 11 builds (\u003c22000), fallback to a solid gray background.
- **Testing** – Verify by running `Windows App SDK diagnostics` and ensuring `MicaBackdrop` is visible; on unsupported OS, the API throws `E_NOTIMPL`.

## Common Mistakes
- Using `MicaBackdrop` on Windows 10 → crash.
- Forgetting to enable `Microsoft.AppService` to reference the SDK for Win32.
- Assuming `MicaController.IsSupported` always true; it can be `false` on older App SDK runtimes.
- Updating backdrop on every frame → performance drop.
- Mixing `MicaBackdrop` and `DesktopAcrylicBackdrop` without respecting `Kind`.

## Troubleshooting
- **No backdrop shows** – Check `IsSupported`; confirm `WindowsAppSDK` is installed.
- **Runtime exception** – `E_UNEXPECTED` often means the target window was not registered.
- **High‑contrast fallback** – Set `FallbackColor` in `MicaController`.
- **App hangs** – Excessive `SetTarget` calls; debounce.

## Related Knowledge Links
- [Platform Design – Windows](platform_design_windows.md)
- [Flutter Widgets](flutter_widgets.md)
- [Windows App SDK docs – System backdrops](https://learn.microsoft.com/windows/apps/windows-app-sdk/system-backdrops)

## References
- Windows App SDK – System Backdrops (WinUI 3): https://learn.microsoft.com/windows/apps/windows-app-sdk/system-backdrops
- Windows App SDK – MicaController API (Win32): https://learn.microsoft.com/windows/apps/windows-app-sdk/mica-controller
- MicaForEveryone GitHub: https://github.com/MicaApps/MicaForEveryone2
- Win32 DWM backdrop docs: https://learn.microsoft.com/windows/win32/api/dwmapi

## Version / Date
- Updated: 2026‑10‑07
- Windows App SDK 1.7.0
- MicaForEveryone 1.0.0
