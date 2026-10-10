# Apple Design

## System principles

Apple HIG emphasizes hierarchy, harmony, and consistency. Preserve content hierarchy, use familiar controls and navigation, adapt layouts to size and input, and respect platform conventions across iOS, iPadOS, and macOS.

Use system typography, semantic colors, standard controls, menus, toolbars, sidebars, sheets, dialogs, search, and accessibility behavior where they fit. Validate Dynamic Type/text scaling, pointer/keyboard input, VoiceOver, reduced motion, increased contrast, and window/multitasking states.

## Liquid Glass

See [`apple_liquid_glass.md`](apple_liquid_glass.md) for the focused rules, platform adaptation guidance, review checklist, and provenance. In short: use Liquid Glass sparingly in the functional layer for important controls and navigation, not as a blanket content-layer effect.

## Platform adaptation

- iPhone: prioritize focused flows, touch targets, safe areas, and progressive disclosure.
- iPad: use adaptive navigation, split views, multitasking, pointer/keyboard support, and spacious but purposeful layouts.
- macOS: use window, menu bar, toolbar, sidebar, keyboard shortcut, pointer, and resizable-window conventions; do not ship a stretched phone layout.

## Sources

- HIG: https://developer.apple.com/design/human-interface-guidelines/ (verified 2026-10-08)
- Materials: https://developer.apple.com/design/human-interface-guidelines/materials (verified 2026-10-08)
- Layout: https://developer.apple.com/design/human-interface-guidelines/layout (updated 2026-09-09; verified 2026-10-08)
- Liquid Glass overview: https://developer.apple.com/documentation/technologyoverviews/liquid-glass (PDF supplied locally; extraction/review not completed)
- Provenance record: `docs/sources/apple/liquid-glass/` (metadata only; PDF is not retained in the working tree)
