# Apple Liquid Glass

## Purpose

Liquid Glass is a dynamic material and interaction layer for Apple platforms. It lets controls and navigation remain visually distinct while preserving awareness of the content beneath them. Treat it as a functional hierarchy tool, not as a general-purpose decoration.

## Reusable rules

- Put Liquid Glass primarily in the functional layer: navigation, tab bars, toolbars, controls, and transient interactive surfaces.
- Keep the content layer visually stable. Do not cover content with a blanket Liquid Glass background or apply the effect to every card and container.
- Prefer system components, which receive current material behavior, accessibility adaptation, and platform-specific treatment automatically.
- Use custom Liquid Glass sparingly, only where the element has clear functional importance and the effect improves separation, focus, or continuity.
- Use the clear variant only when a visually rich background must remain visible; otherwise prefer regular Liquid Glass for legibility and hierarchy.
- Preserve readable contrast over changing content. Test scrolling, light/dark appearance, reduced transparency, increased contrast, and other accessibility settings.
- Let content scroll and peek beneath floating functional surfaces when that reinforces spatial continuity; avoid motion or translucency that competes with the task.
- Do not use material to compensate for weak layout, hierarchy, or grouping. A material cannot fix unclear navigation or excessive containment.

## Platform adaptation

The material is shared across supported Apple platforms but its placement, scale, controls, and behavior must follow the platform: touch-first iPhone, adaptive and multitasking-aware iPad, window/menu/toolbar-oriented macOS, and the conventions of other Apple surfaces. Keep native controls and system chrome recognizable.

## Review checklist

1. Is the surface functional rather than decorative?
2. Does it clearly separate controls/navigation from content?
3. Is the underlying content still legible and useful?
4. Does the design remain coherent without transparency?
5. Does it respect reduced-transparency, increased-contrast, and reduced-motion preferences?
6. Is the effect limited to the smallest meaningful set of surfaces?

## Provenance

- Apple Developer Documentation, “Liquid Glass”: https://developer.apple.com/documentation/technologyoverviews/liquid-glass
- Apple HIG, Materials: https://developer.apple.com/design/human-interface-guidelines/materials
- Local supplied PDF provenance: `docs/sources/apple/liquid-glass/` (metadata only; PDF extraction was unsuccessful and the binary was removed)

The curated guidance is a compact paraphrase, not a reproduction of Apple documentation.
