# Rust GUI and Native Integration

## Framework selection

Select from requirements, not preference. Compare native fidelity, rendering control, accessibility, platform APIs, ecosystem maturity, licensing, packaging, team skill, and performance. Treat Slint, Qt, and native platform UI as alternatives with different tradeoffs; do not assume a cross-platform toolkit gives identical platform behavior.

## Slint

Slint is a declarative UI toolkit for desktop, embedded, and mobile with Rust, C++, JavaScript, and Python integrations. It provides a UI language, generated bindings, platform backends, and a component library. Verify the exact package and commercial/open-source license before distribution; current repository metadata includes GPL-3.0-only or Slint royalty-free/commercial licensing.

## Architecture

Keep domain and service code independent of the UI toolkit. Use a presentation model or view-model for state, explicit commands/events, and platform adapters for windows, menus, notifications, files, permissions, and native accessibility. Keep FFI unsafe code in one crate/module and expose typed, testable interfaces.

For framework selection criteria and tradeoffs, see `native_ui_selection.md`.

## Platform and rendering concerns

- Windows: native window behavior, App SDK APIs, DPI, composition, packaging, and accessibility may require Win32/WinRT integration.
- macOS/iOS: AppKit/UIKit/SwiftUI conventions, sandboxing, signing, and accessibility often favor native adapters.
- Android: lifecycle, density, input, permissions, and packaging need Android-specific integration.
- Rendering architecture, GPU backend, text shaping, scaling, and frame pacing must be tested on target hardware.
- Cross-platform abstractions should cover shared intent; platform adapters should preserve native interaction and accessibility rather than flattening differences.

## Sources

- Slint docs: https://docs.slint.dev/latest/docs/slint/ (verified 2026-10-08)
- Slint repository: https://github.com/slint-ui/slint (license must be checked at selected version)
- Qt 6.12 docs: https://doc.qt.io/qt-6/ (verified 2026-10-08; framework/tool licensing varies)
- Rustonomicon FFI: https://doc.rust-lang.org/nomicon/ffi.html (verified 2026-10-08)
