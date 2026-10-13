# Open-Source Reuse

GitHub presence does not imply permission to copy. Before reuse, record the exact repository, URL, tag/commit, license and license URL, component, intended use, modification and redistribution rights, copyleft obligations, notices, attribution, assets/fonts, and transitive licenses.

Prefer dependency use when it gives a clean boundary; copy/adapt only when necessary. Prefer permissive licenses such as MIT, BSD, and Apache-2.0 for unrestricted distribution, while still preserving notices. Do not copy GPL/AGPL or proprietary platform assets into incompatible products. Review package metadata and separate asset/font licenses.

For every candidate, inspect README, LICENSE, release/version, source path, maintenance status, security history, platform support, and dependency cost. Record why it is relevant and what was rejected.

## Current reference candidates

These are references, not automatic dependency recommendations:

| Project | Purpose | License/provenance | Use rule |
|---|---|---|---|
| `rust-lang/book` | Rust language learning/reference examples | Apache-2.0 OR MIT; https://github.com/rust-lang/book | Reference or selectively adapt with notices |
| `rust-lang/api-guidelines` | Public Rust API conventions | Apache-2.0 OR MIT; https://github.com/rust-lang/api-guidelines | Reference |
| `slint-ui/slint` | Declarative Rust/C++ UI | Verify package/repository license at selected commit; https://github.com/slint-ui/slint | Evaluate; do not copy without license review |
| `microsoft/WindowsAppSDK` | Windows native APIs and samples | MIT repository license; https://github.com/microsoft/WindowsAppSDK | Reference or use official packages |
| `microsoft/fluentui` | Fluent components and patterns | MIT repository license; https://github.com/microsoft/fluentui | Verify package/asset notices before reuse |
| `material-components/material-web` | Material component implementation | Apache-2.0; https://github.com/material-components/material-web | Use or adapt with notices and compatibility review |

Repository maintenance, selected commit, transitive dependencies, and asset licenses must be rechecked at integration time.

## Sources

- GitHub licensing guidance: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-on-github/licensing-a-repository
- Choose a License: https://choosealicense.com/ (reference; verify license text and obligations from the repository)
- Slint license page/repository: https://github.com/slint-ui/slint
- Fluent UI repository: https://github.com/microsoft/fluentui (MIT repository license; verify package-level notices)
