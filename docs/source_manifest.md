# Offline Source Manifest

Purpose: maintain a large local source archive while keeping the curated KB small.

Root:
C:\Projects\app-template\docs\sources

Metadata convention:
- Each imported source has a stable source ID directory under `sources/<domain>/<source-id>/`.
- Each source directory contains `SOURCE.yaml` following `sources/_metadata.schema.yaml`.
- Unknown metadata is omitted rather than guessed.
- The derived index references source IDs, exact versions, and verification dates when available.

## Rust language and ecosystem

1. Rust Book
Repository: https://github.com/rust-lang/book
Official docs: https://doc.rust-lang.org/stable/book/
License: Apache-2.0 OR MIT (repository contents)
Use: fundamentals, idioms, ownership, concurrency, async-adjacent foundations.

2. Rust Reference
Repository: https://github.com/rust-lang/reference
Official docs: https://doc.rust-lang.org/reference/
License: Apache-2.0 OR MIT
Use: language semantics and precise syntax/behavior.

3. Cargo Book
Repository: https://github.com/rust-lang/cargo
Official docs: https://doc.rust-lang.org/cargo/
License: Apache-2.0 OR MIT
Use: workspace/dependency/build/package management.

4. Rustonomicon
Repository: https://github.com/rust-lang/nomicon
Official docs: https://doc.rust-lang.org/nomicon/
License: Apache-2.0 OR MIT (repository)
Use: unsafe Rust, FFI, low-level reasoning.
Note: the project itself warns that it is a draft.

5. Rust API Guidelines
Repository: https://github.com/rust-lang/api-guidelines
Official docs: https://rust-lang.github.io/api-guidelines/
License: Apache-2.0 OR MIT
Use: idiomatic public APIs and library design.

6. Rust Design Patterns
Repository: https://github.com/rust-unofficial/patterns
Official docs: https://rust-unofficial.github.io/patterns/
License: MPL-2.0
Use: idioms, design patterns, anti-patterns.

7. Rust Clippy
Repository: https://github.com/rust-lang/rust-clippy
Official docs: https://doc.rust-lang.org/clippy/
License: Apache-2.0 OR MIT
Use: code quality/lints and common mistakes.

## Rust UI / native GUI

8. Slint
Repository: https://github.com/slint-ui/slint
Docs: https://docs.slint.dev/
License: see repository/package license; current project metadata includes GPL-3.0-only OR Slint royalty-free/commercial licensing
Use: Rust/C++ declarative native UI, cross-platform custom UI, Android support.

9. Slint C++ template
Repository: https://github.com/slint-ui/slint-cpp-template
License: MIT
Use: small C++/Slint reference project and Android integration example.

## Microsoft / Windows

10. Fluent UI
Repository: https://github.com/microsoft/fluentui
License: MIT for the repository files described by the project
Use: components, theming, patterns.

11. Fluent System Icons
Repository: https://github.com/microsoft/fluentui-system-icons
Icon package license: check package metadata; SVG package is MIT
Use: modern iconography and icon naming.

12. Fluent 2 design guidance
Web: https://fluent2.microsoft.design/
Use: color, typography, layout, tokens, platform-aware design.

## Android / Material

13. Material 3
Official design: https://m3.material.io/
Android guidance: https://developer.android.com/design
Material Web source repo: https://github.com/material-components/material-web
Repository license: Apache-2.0
Use: color, typography, shapes, tokens, components.

## Apple

14. Human Interface Guidelines
Web: https://developer.apple.com/design/human-interface-guidelines/
Use: hierarchy, layout, typography, controls, platform behavior.

15. Liquid Glass
Web: https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
Use: current Apple material guidance, control/navigation treatment, adaptation.

Apple material pages are treated as web references, not as downloadable code/asset repositories. Do not copy proprietary Apple assets/fonts without explicit licensing permission.

## Qt

16. Qt 6 documentation
Official docs: https://doc.qt.io/qt-6/
Use: C++/Qt architecture, Qt Quick, graphics/RHI, widgets, platform behavior.

Qt source/docs should be acquired through official Qt distribution/documentation channels when an offline archive is needed. Do not invent a Git repository path.

## Offline Rust docs

If rustup is installed, use the official local documentation mechanism:
rustup doc --book

Also inspect the locally installed rustup documentation index for other books/components rather than downloading random mirrors.

## Refresh policy

Source archive refresh:
- when a project depends on a new major version;
- when official platform guidance changes;
- at most once per project milestone unless current fixes require earlier refresh.

Every refresh should preserve the old commit/version in git history.
