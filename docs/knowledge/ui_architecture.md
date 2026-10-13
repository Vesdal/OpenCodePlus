# UI Architecture

Separate presentation, state, domain, and services. Domain logic should be testable without a UI toolkit; services own I/O, persistence, networking, and native integration; presentation maps state to components and emits intents.

Centralize semantic design tokens and component variants. Keep platform adapters behind narrow interfaces. Choose navigation from information architecture and deep-link/back requirements. Use explicit state models for loading, success, empty, error, retry, cancellation, and offline modes.

Prefer local-first behavior where practical: persist durable user data, cache stable resources, handle migrations, keep credentials out of source, and make synchronization/recovery explicit. Design dependency boundaries for substitution and tests; avoid service locators that hide ownership.

Responsive layouts must account for window size, orientation, input, text scaling, safe areas, and platform conventions. Accessibility semantics belong in component contracts and tests, not only in screen code.

Test domain transitions, persistence, navigation, component interactions, accessibility labels, representative breakpoints, and failure/retry paths.

## Sources

- Material adaptive design: https://m3.material.io/foundations/adaptive-design/overview
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- Windows design: https://learn.microsoft.com/en-us/windows/apps/design/
