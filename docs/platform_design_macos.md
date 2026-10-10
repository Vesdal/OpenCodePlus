# Platform Design – macOS

## Purpose

Reference for macOS desktop design, covering Human Interface Guidelines, system integration, and native patterns to guide the agent when building macOS‑specific features.

## When to Consult

- Creating new windows, menus, or context menus.
- Adding system services: Dock, Spotlight, Siri, File associations.
- Implementing macOS‑specific behaviors: Force‑Quit, dark mode, accessibility.
- Packaging using DMG, MAS, or App Store.

## Scope

- HIG (Human Interface Guidelines).
- Native UI components: NSWindow, NSView, NSMenu, NSButton.
- System integration: Dock tiles, menu bar extras, Spotlight and Finder extensions.
- Accessibility: VoiceOver, dynamic type, contrast.
- Packaging: DMG, notarization, Codesign.

## Core Concepts

1. **HIG Adherence** – layout, typography, color, and motion.
2. **Application Lifecycle** – launch, terminate, background.
3. **Dock & Menu Bar** – status icons, menus, drag‑drop.
4. **File System Access** – sandboxing, `NSFileCoordinator`, `Security-Scoped Bookmarks`.
5. **Accessibility** – VoiceOver, SwitchControl.

## Detailed Operational Guidance

### UI Components
- Use `NSWindow` with `styleMask` combinations for title bar, toolbar, and resizing.
- `NSView` subclass for custom drawing; override `drawRect` and use `NSBezierPath` or `CGContext`.
- Menus: build via `NSMenu` / `NSMenuItem`. Use `keyEquivalent` for shortcuts.

### Dock & Notification
- Use `NSDockTile` for badge and image.
- System notifications via `NSUserNotificationCenter` (deprecated) or `UNUserNotificationCenter`.
- Status bar: `NSStatusBar.system.statusItem`.

### File Access
- For sandboxed apps, request permission with `NSOpenPanel` / `NSSavePanel`.
- Use `Security-Scoped Bookmarks` for long‑term file references.

### Accessibility
- Implement `NSAccessibility` protocol for custom views.
- Provide `accessibilityLabel`, `accessibilityValue`, `accessibilityRole`.
- Test with VoiceOver; ensure element order and hints.

## Rules and Constraints
- Avoid hard‑coded pixel values; use Auto Layout via constraints or `NSLayoutConstraint`.
- Use `AppKit` or `SwiftUI` but keep platform‑specific code isolated.
- All images should include `@2x`, `@3x` for Retina support.
- Use `@MainActor` for UI updates.

## Practical Implementation Guidance
| Feature | Framework | Example |
|---------|-----------|---------|
| Window | AppKit | `let win = NSWindow(contentRect: , styleMask: )` |
| Menu | AppKit | `let menu = NSMenu()` |
| Status Item | AppKit | `NSStatusBar.system.statusItem` |

## Common Mistakes
- Ignoring sandboxing rules for file access.
- Using deprecated `NSUserNotificationCenter`.
- Over‑complex status bar icons leading to misplacement.

## Troubleshooting
- **App fails notarization** – Check for unsigned resources.
- **Menu items don't appear** – Verify `build` phase includes `*.xib` resources.
- **Accessibility failures** – Run `Accessibility Inspector`.

## Cross‑Platform Considerations
- For Flutter, use `flutter_desktop_macos` package; map these patterns to `Platform.isMacOS` checks.
- Use conditional imports (`import 'macos.dart' if (dart.library.io) …`) for macOS‑specific logic.

## Related Knowledge
- [Platform Design – Windows](platform_design_windows.md)
- [Platform Design – Android](platform_design_android.md)
- [Design Tokens](design_tokens.md)

## Official References
- macOS Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/macos/
- macOS App Development Guides: https://developer.apple.com/documentation/appkit

## Version / Date
- Updated: 2026‑10‑07
- macOS SDK: 15
