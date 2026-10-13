# Design QA

## Purpose

Repeatable visual and interaction checks before calling UI work done. Runs on
the built app, not on mockups, at representative sizes and themes.

## Rendered inspection

- Screenshot every changed surface at small, medium, and large widths, in
  light and dark themes where supported. Compare against tokens, not memory.
- Check text first: truncation, wrapping, overflow, and empty strings. Then
  spacing rhythm, alignment, and nested radii. Then color roles and contrast
  pairs (normal text, large text, UI components).
- Exercise the full matrix per surface: happy path, empty, loading, error,
  retry, disabled, focused, hover, pressed, selected, and persistence across
  relaunch.

## Interaction checks

- Keyboard only: reach everything, see focus always, escape closes topmost
  layer, shortcuts listed where advertised.
- Touch targets at least 44 units where applicable; hover-only affordances
  must have a touch equivalent.
- Reduced motion and high contrast honored: no essential animation, no
  color-only meaning, no information carried by translucency alone.

## Regression discipline

- Record baseline screenshots for critical flows. Re-capture after token,
  density, or platform changes and diff deliberately.
- File each defect with surface, viewport, theme, state, expected, actual,
  and one screenshot. Fix highest-impact issues first; cosmetic polish last.
- Re-verify on the release build: debug and release rendering, fonts, and
  assets can differ.
