# Design Tokens

## Purpose

Central repository of design tokens used by the autonomous agent to build consistent UI across platforms. Tokens define colors, typography, spacing, radii, shadows, and motion.

## When to Consult

- While creating new widgets or screens.
- During theming or theming changes.
- When validating design against brand guidelines.

## Scope

- Color palette (semantic colors: primary, secondary, success, error etc.)
- Typography hierarchy (h1, h2, body, caption, button)
- Spacing scales (gap, padding, margin)
- Corner radii (mini, small, medium, large, circle)
- Shadows (elevation, key, drop)
- Motion (duration, easing for transitions)

## Core Concepts

Colors are defined in a **system** (light/dark) + **semantic** tokens.
Typography tokens include `font-family`, `font-weight`, `line-height`, `letter-spacing`.
Spacing tokens are based on a 4dp modular scale.
Radii tokens align with platform guidelines: 4dp for material, 8dp for macOS.
Shadows use CSS‐like syntax or `elevation` degrees.
Motion uses `easeInOut`, `easeOut`, `easeIn` curves.

## Detailed Operational Guidance

### Color Tokens
```yaml
colors:
  light:
    primary: #6200EE
    secondary: #03DAC6
    background: #FFFFFF
    surface: #FFFFFF
    error: #B00020
    onPrimary: #FFFFFF
    onSecondary: #000000
    onBackground: #000000
    onSurface: #000000
    onError: #FFFFFF
  dark:
    primary: #BB86FC
    secondary: #03DAC6
    background: #121212
    surface: #121212
    error: #CF6679
    onPrimary: #000000
    onSecondary: #000000
    onBackground: #FFFFFF
    onSurface: #FFFFFF
    onError: #000000
```
Use semantic token names in the code: `Theme.of(context).colorScheme.primary`.

### Typography Tokens
```yaml
typography:
  h1:
    fontFamily: Roboto
    fontWeight: 700
    fontSize: 96
    lineHeight: 112
    letterSpacing: -1.5
  h2:
    fontFamily: Roboto
    fontWeight: 700
    fontSize: 60
    lineHeight: 72
    letterSpacing: -0.5
  body:
    fontFamily: Roboto
    fontWeight: 400
    fontSize: 16
    lineHeight: 24
    letterSpacing: 0
  caption:
    fontFamily: Roboto
    fontWeight: 400
    fontSize: 12
    lineHeight: 16
    letterSpacing: 0.4
```
Use `GoogleFonts` to load fonts or `flutter_gen` for local fonts.

### Spacing Tokens
```yaml
spacing:
  small: 4
  medium: 8
  large: 16
  xLarge: 24
  xxLarge: 32
```
Always multiply by the scale in code: `EdgeInsets.all(Spacing.medium)`.

### Radii Tokens
```yaml
radii:
  small: 4
  medium: 8
  large: 16
  circle: 9999
```
Use `BorderRadius.circular(Radii.medium)`.

### Shadows
```yaml
shadows:
  level1: 0 1 3 0 rgba(0 0 0 / 0.08)
  level2: 0 1 5 0 rgba(0 0 0 / 0.12)
```
Apply with `BoxShadow`.

### Motion
```yaml
motion:
  short: 150
  medium: 300
  long: 450
  easing: easeInOut
```
Use `AnimatedContainer(duration: Duration(milliseconds: motion.medium), curve: Curves.easeInOut)`.

## Rules and Constraints
- Tokens must be defined in a single YAML file (or JSON) and loaded at app start.
- Do not hardcode any token values in widget code.
- Provide fallback light/dark tokens if not explicitly set.
- Keep token names semantic, not implementation specific.

## Practical Implementation Guidance
- Add `design_tokens.yaml` to `assets` and load with `rootBundle.loadString`.
- Generate a Dart `design_tokens.dart` file automatically (e.g., via `build_runner`).
- Use `Riverpod` or `Provider` to expose theme tokens across the app.

## Common Mistakes
- Mixing up light/dark tokens; UI may appear with wrong colors.
- Changing token values without re‑generating the Dart file.
- Over‑specifying fonts leading to bundle bloat.

## Troubleshooting
- **App displays wrong colors** – Verify token path in pubspec.yaml.
- **Text appears fuzzy** – Ensure font files are in assets and referenced.
- **Design tokens not loaded** – Run `flutter pub run build_runner build`.

## Cross‑Platform Considerations
- Token names stay the same across Android, iOS, macOS, Windows; only the implementation of colors adapts (Material, Fluent, HIG).
- For Flutter Desktop, use `Platform.isMacOS` to select HIG color tokens if needed.

## Related Knowledge
- [Design & UX](design_and_ux.md)
- [Platform Design – Windows](platform_design_windows.md)
- [Platform Design – Android](platform_design_android.md)
- [Platform Design – macOS](platform_design_macos.md)

## Official References
- Material Design Color System: https://m3.material.io/styles/color/the-color-system
- Fluent Design Token Documentation: https://learn.microsoft.com/fluentui/patterns/color
- Apple HIG Color Palette: https://developer.apple.com/design/human-interface-guidelines/visual-design/color/
- SwiftUI Design Tokens Guide: https://developer.apple.com/documentation/swiftui/design-tokens

## Version / Date
- Updated: 2026‑10‑07
- Flutter SDK: 3.8
