# Knowledge Index

## Purpose

Retrieval-first catalog for the compact knowledge layer. This file is the first lookup; it is not a content dump.

## Retrieval order

1. Match the task to a topic, platform, and lifecycle status below.
2. Open only the listed document and the named section when available.
3. Follow one-hop cross-references only when required.
4. Search the matching source archive entry for evidence or version details.
5. Use official web sources only when local material is insufficient, then update this index and provenance.

## Metadata fields

| Field | Meaning |
|---|---|
| Topic | Retrieval concept or task keyword |
| Platforms | Relevant target platforms; `shared` means cross-platform |
| Path | Repository-relative document path |
| Sections | Preferred narrow sections or keywords |
| Status | `current`, `review`, or `superseded` |
| Sources | Source IDs or URLs supporting the document |
| Verified | Last verification date, when known |

## Curated knowledge catalog

Audit qualification: legacy `current` labels and dates below are historical catalog claims, not proof of complete source/license or API verification. Revalidate version-sensitive claims before implementation. Several flat design/policy documents exist locally but are untracked; they are not reproducible from this repository's commits. Liquid Glass overview PDF extraction was unsuccessful; its metadata records that limitation. Use the focused derived documents as retrieval entry points, not as exhaustive or authoritative substitutes for primary sources.

The existing flat documents are retained at their current paths during incremental migration. This avoids duplicate copies and preserves existing links. New derived documents belong under `docs/knowledge/`.

| Topic | Platforms | Path | Sections | Status | Sources | Verified |
|---|---|---|---|---|---|---|
| Design foundations and UX | shared | `docs/design_and_ux.md`, `docs/design_foundations.md` | hierarchy, navigation, patterns | current | document provenance | 2026-10-08 |
| Design tokens | shared | `docs/design_tokens.md` | colors, type, spacing, radii, motion | current | document provenance | 2026-10-08 |
| Color systems | shared | `docs/color_system.md` | semantic color, contrast, accessibility | current | document provenance | 2026-10-08 |
| Typography and rhythm | shared | `docs/typography_rhythm.md` | hierarchy, spacing, density | current | document provenance | 2026-10-08 |
| Shape geometry | shared | `docs/shape_geometry.md` | nesting, radii, borders, elevation | current | document provenance | 2026-10-08 |
| Motion and interaction | shared | `docs/motion_interaction.md` | states, affordances, timing | current | document provenance | 2026-10-08 |
| Windows / Fluent / Mica | Windows | `docs/platform_design_windows.md`, `docs/windows_mica_windows_app_sdk.md` | Fluent, backdrops, adaptation | current | Microsoft official guidance | 2026-10-08 |
| Android / Material | Android | `docs/platform_design_android.md` | Material 3, adaptation | current | Android official guidance | 2026-10-08 |
| macOS / Apple | macOS, iOS | `docs/platform_design_macos.md` | HIG, materials, platform behavior | current | Apple official guidance | 2026-10-08 |
| Flutter widgets | shared | `docs/flutter_widgets.md` | widgets, theming, state | current | document provenance | 2026-10-08 |
| Dart language | shared | `docs/dart_language_features.md` | null safety, generation | current | document provenance | 2026-10-08 |
| Architecture and DI | shared | `docs/architecture_modular.md` | modularity, dependency injection | current | document provenance | 2026-10-08 |
| AI applications | shared | `docs/ai_applications.md` | OpenAI-compatible APIs, local models | current | document provenance | 2026-10-08 |
| Open-source reuse | shared | `docs/oss_reuse_licenses.md` | license review, attribution, provenance | current | document provenance | 2026-10-08 |
| Retrieval and web research | shared | `docs/AGENT_KNOWLEDGE_WORKFLOW.md`, `docs/web_research_policy.md`, `docs/token_efficiency.md` | acquisition, verification, context limits | current | workflow documents | 2026-10-08 |
| Godot structure | shared | `docs/godot_project_structure.md` | layout, export | current | document provenance | 2026-10-08 |
| Rust foundations | shared | `docs/knowledge/rust_foundations.md` | ownership, editions, Cargo, unsafe, FFI, performance | current | Rust official docs | 2026-10-08 |
| Rust ecosystem and delivery | shared | `docs/knowledge/rust_ecosystem.md` | API design, errors, testing, packaging, cross-platform | current | Rust official docs | 2026-10-08 |
| Rust GUI/native integration | Windows, macOS, iOS, Android, shared | `docs/knowledge/rust_gui.md` | Slint, Qt, rendering, adapters, packaging | current | Slint, Qt, Rust official docs | 2026-10-08 |
| Native UI selection | shared | `docs/knowledge/native_ui_selection.md` | framework tradeoffs, selection criteria, prototyping | current | official platform/framework docs | 2026-10-08 |
| Apple design | macOS, iOS, iPadOS | `docs/knowledge/apple_design.md` | HIG, Liquid Glass, materials, adaptation | current | Apple HIG; `apple/liquid-glass` | 2026-10-08 |
| Apple Liquid Glass | iOS, iPadOS, macOS, Apple platforms | `docs/knowledge/apple_liquid_glass.md` | functional layer, materials, clear variant, accessibility | current | Apple HIG; `apple/liquid-glass` | 2026-10-08 |
| Windows design | Windows | `docs/knowledge/windows_design.md` | Fluent, Mica, Acrylic, commands, windows | current | Microsoft official docs | 2026-10-08 |
| Android and Material 3 | Android | `docs/knowledge/android_material.md` | tokens, components, adaptive layouts | current | Android/Material official docs | 2026-10-08 |
| Accessibility | shared | `docs/knowledge/accessibility/README.md` | WCAG, semantics, input, focus, motion | current | W3C and platform guidance | 2026-10-08 |
| Design theory | shared | `docs/knowledge/design/theory.md` | Gestalt, hierarchy, systems, anti-patterns | current | Apple, Microsoft, Material, W3C | 2026-10-08 |
| UI architecture | shared | `docs/knowledge/ui_architecture.md` | layers, state, tokens, adaptation, testing | current | platform design systems | 2026-10-08 |
| Performance | shared | `docs/knowledge/performance/README.md` | profiling, rendering, I/O, release budgets | current | Rust, Android, Microsoft docs | 2026-10-08 |
| Open-source reuse | shared | `docs/knowledge/open_source_reuse.md` | license, provenance, notices, restrictions | current | GitHub and project licenses | 2026-10-08 |
| Knowledge acquisition | shared | `docs/knowledge/research_workflow.md` | web research, provenance, retrieval | current | central workflow | 2026-10-08 |
| Color system | shared | `docs/color_system.md` | semantic roles, contrast, palette construction | current | local design guidance | 2026-10-08 |
| Design foundations | shared | `docs/design_foundations.md` | hierarchy, consistency, anti-patterns | current | local design guidance | 2026-10-08 |
| Motion and interaction | shared | `docs/motion_interaction.md` | continuity, states, feedback, reduced motion | current | local design guidance | 2026-10-08 |
| Open-source license policy | shared | `docs/oss_reuse_licenses.md` | discovery, license review, provenance | current | local reuse guidance | 2026-10-08 |
| Shape and geometry | shared | `docs/shape_geometry.md` | radius families, nested geometry, elevation | current | local design guidance | 2026-10-08 |
| Token and context efficiency | shared | `docs/token_efficiency.md` | retrieval, context budgets, output discipline | current | local workflow guidance | 2026-10-08 |
| Typography and rhythm | shared | `docs/typography_rhythm.md` | type roles, spacing, density, readability | current | local design guidance | 2026-10-08 |
| Web research policy | shared | `docs/web_research_policy.md` | source selection, verification, provenance | current | local workflow guidance | 2026-10-08 |
| Local-first UX | shared | `docs/knowledge/local_first_ux.md` | ownership, offline, sync, budgets | current | local guidance | 2026-10-13 |
| Web app UX | shared | `docs/knowledge/web_app_ux.md` | layout, forms, states, onboarding | current | local guidance | 2026-10-13 |
| Settings UX | shared | `docs/knowledge/settings_ux.md` | IA, consequences, destructive tiers | current | local guidance | 2026-10-13 |
| Design QA | shared | `docs/knowledge/design_qa.md` | screenshots, interaction, regression | current | local guidance | 2026-10-13 |

## Reserved domains

Future focused documents should be added under `docs/knowledge/` for Rust, Slint, Qt, Apple, Microsoft, Android, accessibility, performance, architecture, and open-source implementation patterns. Add one row here per document; never add a phantom path.

## Maintenance

- Update this file whenever a document is added, renamed, superseded, or removed.
- Use source IDs and exact versions where a source archive entry exists.
- Keep one canonical document per reusable concept; merge overlaps instead of creating near-duplicates.
