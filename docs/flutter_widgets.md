# Flutter Widgets

## Purpose

Reference guide for common Flutter widgets and their composition patterns. The agent uses this to assemble UI while respecting design tokens, platform guidelines, and accessibility.

## When to Consult

- Building a new screen or component.
- Converting a design mock to code.
- Seeking preferred patterns for complex layouts.

## Scope

- Stateless vs Stateful widgets.
- Composition patterns: `Row/Column`, `Stack`, `ListView`, `FutureBuilder`, `StreamBuilder`.
- Material vs Cupertino widgets.
- Custom painter and `CustomClipper`.
- Theme and `InheritedWidget` usage.

## Core Concepts

1. **Widget Lifecycle** – initState, didChangeDependencies, build, dispose.
2. **Composition** – build complex UIs by nesting lightweight widgets.
3. **State Management** – Provider, Riverpod, Bloc, setState.
4. **Theming** – `Theme`, `ThemeData`, `ColorScheme`, `TextTheme`.

## Detailed Operational Guidance

### Stateless vs Stateful
Choose `StatelessWidget` when UI is a pure function of `BuildContext` and `widget` fields. Use `StatefulWidget` when the widget must track or react to a `State` object.

### Common Layouts
- `Flex` (Row/Column) with `MainAxisAlignment` and `CrossAxisAlignment`.
- `GridView` and `SliverGrid` for grid layouts.
- `Stack` for overlaying elements.
- `ListView.builder` for large, scrollable lists.

### Form Handling
- `Form` widget, coupled with `TextFormField` and validators.
- Manage focus with `FocusNode` and `FocusScope`.

### Material vs Cupertino
- Use `Material` suite for Android/Windows; `Cupertino` suite for iOS and macOS when mimicking system look.
- Platform-aware widget: `Platform.isIOS` or `kIsWeb` to switch.

### Async Data
- `FutureBuilder`/`StreamBuilder` for single‑shot/stream data.
- Consider `AsyncValue` from `riverpod` for null safety.

### Accessiblity
- Wrap interactive widgets with `Semantics` or provide `semanticLabel`.
- Use `Focus` widget for keyboard navigation.
- Declare `accessibilityFeatures` in `MaterialApp`.

## Rules and Constraints
- Avoid `Container` for simple styling; prefer `SizedBox` or `Padding`.
- Keep widget tree depth shallow; avoid over‑nesting.
- Use `const` where possible to improve performance.
- Do not bypass the widget lifecycle; use `StatefulWidget` only when needed.

## Practical Implementation Guidance
| Widget | Purpose | Typical Use |
|--------|---------|-------------|
| `Scaffold` | Provides app structure: AppBar, Drawer, FAB | Main screen scaffold |
| `AppBar` | Top app bar | Navigation, title, actions |
| `BottomNavigationBar` | Bottom navigation | 2–5 items |
| `FloatingActionButton` | Primary action | Add / create |
| `Drawer` | Side navigation | Nested items |
| `ListTile` | List row | Simple data display |
| `ExpansionTile` | Collapsible list | Nested lists |
| `DataTable` | Tabular data | Fixed columns |
| `Stepper` | Multi‑step process | Forms, wizards |

## Common Mistakes
- Not using `const` constructors, leading to unnecessary rebuilds.
- Using a single `Column` with many children; causes overflow.
- Forgetting `SafeArea` on devices with notches.
- Not handling null safety in async builders.

## Troubleshooting
- **UI flickers** – Ensure no `setState` in `build`.
- **List scrolls to top on rebuild** – Use `Key` for `ListView`.
- **Overflow** – Wrap with `Expanded` or `Flexible`.

## Cross‑Platform Considerations
- Wrap platform‑specific UI in `Platform.isAndroid/Windows/macOS/iOS` checks.
- Use `AdaptiveWidget` from `flutter_adaptive` for automatic adaptation.

## Related Knowledge
- [Design Tokens](design_tokens.md)
- [Design & UX](design_and_ux.md)
- [Platform Design – Android](platform_design_android.md)

## Official References
- Flutter Widget catalog: https://api.flutter.dev/flutter/widgets/widgets-library.html
- Accessibility in Flutter: https://flutter.dev/docs/accessibility
- Adaptive widget patterns: https://flutter.dev/docs/hot-reload#hot-reload

## Version / Date
- Updated: 2026‑10‑07
- Flutter SDK: 3.8
