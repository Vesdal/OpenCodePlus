# Native UI Framework Selection

Choose a UI technology by constraints, not popularity:

| Requirement | Strong candidates | Main tradeoff |
|---|---|---|
| Native Windows controls, windowing, accessibility, and App SDK depth | WinUI 3 / Windows App SDK | Windows-specific implementation |
| Native Apple behavior and accessibility | AppKit/UIKit/SwiftUI | Separate platform code |
| Shared declarative UI with Rust integration | Slint | Verify platform/accessibility coverage and commercial licensing |
| Mature C++/QML ecosystem and broad modules | Qt Quick / Qt Widgets | Qt licensing and larger framework surface |
| Shared ordinary app UI with existing Dart expertise | Flutter | Native behavior requires platform adapters/plugins |

Evaluate native fidelity, accessibility APIs, rendering backend, text/input behavior, platform integration, packaging, startup/memory cost, licensing, team skills, and long-term maintenance. Prototype the riskiest requirement—usually accessibility, windowing, text/input, or FFI—before committing.

Keep domain services independent from the toolkit. Put visual state in a presentation layer, use platform adapters for system features, and test the same user intent through each platform's native interaction model.

## Sources

- Slint documentation: https://docs.slint.dev/latest/docs/slint/
- Qt 6 documentation: https://doc.qt.io/qt-6/
- Windows App SDK: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
