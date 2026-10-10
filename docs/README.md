# Knowledge Base

## Purpose

Shared engineering knowledge repository for all projects. It stores durable, reusable knowledge — platform guidelines, design patterns, architecture decisions, workflow rules — so the agent does not have to research the same topics repeatedly. Project‑specific details live in each project's own documentation, not here.

## Location

`C:\Projects\app-template\docs`

This folder is the single authoritative copy. Never duplicate it into individual projects.

## Structure

| File | Content |
|------|---------|
| `knowledge/KNOWLEDGE_INDEX.md` | Central retrieval-first map of all knowledge documents. |
| `knowledge/` | Compact derived knowledge, including the reserved design area. |
| `sources/` | Large offline source archive; never load wholesale as prompt context. |
| `AGENT_KNOWLEDGE_WORKFLOW.md` | How the agent retrieves, applies, and updates knowledge. |
| `design_and_ux.md` | UX principles and interface design patterns. |
| `design_tokens.md` | Design tokens: colors, typography, spacing, radii, motion. |
| `platform_design_windows.md` | Windows / Fluent design guidelines. |
| `windows_mica_windows_app_sdk.md` | Mica and Acrylic backdrops for WinUI 3 and Win32. |
| `platform_design_android.md` | Android / Material 3 guidelines. |
| `platform_design_macos.md` | macOS / Human Interface Guidelines. |
| `flutter_widgets.md` | Flutter widgets, theming and state management. |
| `dart_language_features.md` | Dart language features, null safety, code generation. |
| `godot_project_structure.md` | Godot 4 project layout and export configuration. |
| `architecture_modular.md` | Modular architecture and dependency injection. |
| `ai_applications.md` | AI integration: OpenAI‑compatible APIs, local models, prompting. |

## Using the Index

`knowledge/KNOWLEDGE_INDEX.md` is the entry point. Consult it before implementing anything non-trivial: it maps topics, platforms, sections, status, and provenance. Load only the documents the index suggests for the task at hand.

## Modular Retrieval

Documents can be large. The workflow is:

1. Search `knowledge/KNOWLEDGE_INDEX.md` for the relevant topic.
2. Read only the listed documents.
3. Follow cross‑references between documents when needed.
4. Load more documents only if the first set is insufficient.

## Internet Acquisition

When local knowledge is missing, ambiguous, or outdated:

1. Research on the Internet, preferring official documentation and authoritative sources.
2. Verify claims across multiple sources where possible.
3. Extract durable, reusable knowledge (not copies of whole pages).
4. Store it in a document here and reference the source URL.
5. Update `knowledge/KNOWLEDGE_INDEX.md` and commit.

## Updating and Maintenance

- New document → add a row to the index table and, if the topic overlaps existing entries, a note in the coverage section.
- Renamed or removed document → update the index immediately; the index must always match the folder.
- Keep documents modular, current, and non‑duplicated; prefer updating an existing document over creating a near‑duplicate.
- Commit every index or document change with a clear message.

## Shared Knowledge vs Project Documentation

- **Central KB (this folder)**: reusable technical, architectural, platform, design and workflow knowledge.
- **Project docs** (e.g. a project's `README.md` / `ARCHITECTURE.md`): decisions and details specific to that product.
- When in doubt: if the knowledge would help a different project, it belongs here; if only one project would ever use it, it stays in the project.

## Changelog

- 2026‑10‑07 – Added `windows_mica_windows_app_sdk.md` (Mica/Acrylic for WinUI 3 and Win32); indexed it and cross‑referenced from `platform_design_windows.md`; workflow updated with the internet acquisition phase.
- 2026‑10‑08 – Index synced with the real folder contents; obsolete references removed; `AGENT_KNOWLEDGE_WORKFLOW.md` deduplicated; this README rewritten as the KB presentation.
