# Design and User Experience

## Purpose

Provide a consolidated, practical reference for UX principles and patterns that an autonomous agent can use to design interfaces for desktop, mobile, and web.

## When to Consult

- When starting a new UI component or screen.
- When refactoring an existing UI for better accessibility or responsiveness.
- When evaluating a design against platform guidelines.

## Scope

- Core UX concepts (affordance, affordances, feedback, constraints).
- Information architecture, navigation, and layout patterns.
- Device‑specific interaction design (keyboard, mouse, touch, keyboard shortcuts).
- Accessibility compliance.
- Responsive and adaptive design techniques.
- Component library patterns.
- Design systems and tokens.

## Core Concepts

1. **User‑Centered Design** – User goals drive every decision.
2. **Feedback** – Immediate visual/click feedback for every action.
3. **Affordance** – UI elements show their action.
4. **Consistency** – Keep similar interactions consistent across the app.
5. **Hierarchy** – Visual hierarchy guides attention.
6. **Accessibility** – Contrast, focus order, screen‑reader support.

## Detailed Operational Guidance

### Information Architecture
- **Card Sorting** – Use Open‑Source tools like `card_sort` or online equivalents to surface natural categories.
- **Breadcrumbs** – For multi‑level hierarchies on desktop.
- **Tab Bars** – Best for up to 5 top‑level items; use overflow menus beyond that.

### Navigation Patterns
- **Bottom Navigation** – 3‑5 top‑level items on mobile.
- **Drawer / Side Nav** – For complex apps with many sections.
- **Modal Navigation** – For transient tasks.

### Layout
- **Flex/Grid** – Use Flex widgets in Flutter (`Flex`, `Column`, `Row`, `Wrap`).
- **Responsive breakpoints** – mobile <600; tablet 600‑1200; desktop >1200.
- **Adaptive Widgets** – `LayoutBuilder` / `MediaQuery`.

### Forms
- Use `Form` widget with `TextFormField` and `FormFieldValidator` for Flutter.
- Inline validation; show clear error messages.
- Group related fields with `Card` or `Container`.

### Tables & Lists
- For large data, use `PaginatedDataTable` or `ListView.builder`.
- Infinite scroll vs pagination depending on use‑case.

### Accessibility
- **Color Contrast** – Minimum 4.5:1 for normal text, 3:1 for large text.
- **Focus Indicators** – Visible focus ring; use `KeyboardFocus` in Flutter.
- **Screen Reader** – `Semantics` widget in Flutter.
- **Keyboard Shortcuts** – Windows: Ctrl+Key; macOS: ⌘+Key. Use `Shortcuts` widget.

## Rules and Constraints
- Avoid custom gestures conflicting with default system gestures.
- Keep text < 2–4 lines for headings.
- Buttons must have minimum 44x44pt hit area.
- Use semantic roles (`header`, `main`, `footer`) for web via `flutter_web_plugins`.

## Practical Implementation Guidance
| Feature | Flutter widget | Example Code |
|---------|----------------|-------------|
| Button | `ElevatedButton` | `ElevatedButton(onPressed: (){}, child: Text('Submit'))` |
| List | `ListView.builder` | `ListView.builder(itemCount: items.length, itemBuilder: (_, i)=>Text(items[i]))` |
| Form | `Form` + `TextFormField` | See [Flutter Widgets](flutter_widgets.md) and verify the selected framework's form APIs. |

## Common Mistakes
- Not respecting platform-specific spacing; e.g., using 16 dp on iOS instead of 12 dp.
- Overloading a single screen with too many options, causing cognitive overload.
- Ignoring keyboard accessibility; e.g., no focus traversal.

## Troubleshooting
- **UI freezes** – Check for long‑running tasks on UI thread.
- **Inconsistent padding** – Ensure using theme `EdgeInsets` or `SizedBox` constants.
- **Accessibility warnings** – Run `flutter analyze --enable-experiment=accessibility`.

## Cross‑Platform Considerations
- Text scaling: Use `MediaQuery.textScaleFactor`. Flutter respects system font size changes.
- Platform color scheme: Use `Theme.of(context).colorScheme` and provide `Brightness` variants.
- Platform specific widgets: `CupertinoNavigationBar` for iOS, `AppBar` for Android.

## Related Knowledge Documents
- [Design Tokens](design_tokens.md)
- [Platform Design – Windows](platform_design_windows.md)
- [Platform Design – Android](platform_design_android.md)
- [Platform Design – macOS](platform_design_macos.md)
- [Flutter Widgets](flutter_widgets.md)

## Official References
- **Google Material Design**: https://material.io/design
- **Apple Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines
- **Microsoft Fluent Design System**: https://learn.microsoft.com/fluentui
- **Flutter UX best practices**: https://flutter.dev/docs/development/ui/interaction

## Version / Date
- Updated: 2026‑10‑08
- Flutter SDK: 3.8 (stable)
- Dart SDK: 3.3
- macOS SDK: 13.4
