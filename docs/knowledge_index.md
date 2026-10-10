# Knowledge Index Compatibility Pointer

The canonical retrieval-first index is now [`knowledge/KNOWLEDGE_INDEX.md`](knowledge/KNOWLEDGE_INDEX.md).

This pointer is retained so existing links do not break. Do not add new entries here.

## Purpose

Central map that links concepts, platform guidelines, and design patterns to their dedicated documentation. The agent uses this index to quickly locate relevant documents without loading unrelated content.

## When to Consult

- At the start of any planning or implementation task.
- When new features introduce cross‑domain concepts.
- For resolving ambiguities between overlapping guidelines.

## Index
| Category | Sub‑topic | Document | URL |
|----------|-----------|----------|-----|
| **Design & UX** | UX Principles | design_and_ux.md | docs/design_and_ux.md |
| | Design Tokens | design_tokens.md | docs/design_tokens.md |
| **Platform Design** | Windows | platform_design_windows.md | docs/platform_design_windows.md |
| | Windows Mica/Acrylic | windows_mica_windows_app_sdk.md | docs/windows_mica_windows_app_sdk.md |
| | Android | platform_design_android.md | docs/platform_design_android.md |
| | macOS | platform_design_macos.md | docs/platform_design_macos.md |
| **Flutter** | Widgets | flutter_widgets.md | docs/flutter_widgets.md |
| **Dart** | Language Features | dart_language_features.md | docs/dart_language_features.md |
| **Godot** | Project Structure | godot_project_structure.md | docs/godot_project_structure.md |
| **Software Architecture** | Modular Design | architecture_modular.md | docs/architecture_modular.md |
| **AI Applications** | OpenAI & Local Models | ai_applications.md | docs/ai_applications.md |
| **Documentation** | Agent Knowledge Workflow | AGENT_KNOWLEDGE_WORKFLOW.md | docs/AGENT_KNOWLEDGE_WORKFLOW.md |

### Topic Coverage Notes

Some concepts indexed previously as separate documents are covered inside existing documents. Do not look for dedicated files for them:

- **Flutter theming and state management** → `docs/flutter_widgets.md` (Theming and State Management core concepts).
- **Navigation patterns** → `docs/design_and_ux.md` (Navigation Patterns section).
- **Null safety and code generation** → `docs/dart_language_features.md` (both in Scope and Operational Guidance).
- **Dependency Injection** → `docs/architecture_modular.md` (DI and Service Locator patterns).
- **Godot export presets** → `docs/godot_project_structure.md` (Export configuration files in Scope).
- **Local models (Ollama) and prompt engineering** → `docs/ai_applications.md` (local inference and prompt templates sections).
- **Mica/Acrylic backdrops (WinUI 3 / Win32)** → `docs/windows_mica_windows_app_sdk.md` (companion to the Windows platform design doc).

## Usage Guidelines
- Use `search` to find a specific keyword inside documents.
- Load only the documents whose titles appear in this index.
- Keep the index up to date when adding new docs.

## Cross‑Platform Coordination
- For overlapping concepts (e.g., **Design Tokens**), rely on the platform‑specific design documents.
- When implementing platform‑specific logic, confirm that the corresponding doc is referenced.
- For Windows Fluent backdrops, pair `docs/platform_design_windows.md` with `docs/windows_mica_windows_app_sdk.md`.

## Updating the Index
1. Append the new document’s metadata.
2. Ensure URLs are correct.
3. Re‑run static analysis.
4. Commit changes with a clear message.

## Version / Date
- Updated: 2026‑10‑08
