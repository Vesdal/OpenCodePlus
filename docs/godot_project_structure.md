# Godot 4 Project Structure

## Purpose

Consolidated reference for the canonical file and folder layout used in Godot 4 game projects. The agent relies on this to create new scenes, scripts, and assets with the correct structure, simplifying asset imports and build configurations.

## When to Consult

- Starting a new Godot game.
- Adding a new feature requiring scene or script changes.
- Configuring export templates or platform-specific resources.
- Troubleshooting asset loading or script errors.

## Scope

- Recommended directory hierarchy.
- Asset management (sprites, scenes, scripts, shaders, audio).
- Export configuration files (project.godot, export_preset.cfg). 
- Version control best practices.

## Core Concepts

1. **Scene Graph** – Godot’s fundamental structure; each `.tscn` or `.scn` file is a tree of nodes.
2. **Resource Organization** – Group resources by type (`res://assets/sprites`, `res://assets/scenes`).
3. **Autoloads / Singletons** – Global scripts initialized at startup.
4. **Export Presets** – Platform‑specific binary/installer settings.
5. **C# vs GDScript** – Use GDScript for logic; C# for performance‑critical modules.

## Detailed Operational Guidance

### Directory Layout
```
project_root/
├── assets/
│   ├── audio/          # .wav, .mp3
│   ├── fonts/          # .ttf, .otf
│   ├── materials/      # .tres
│   ├── shaders/        # .gdshader
│   ├── scenes/         # .tscn , sub‑folders per feature
│   ├── sprites/        # .png / .jpg
│   └── textures/       # .png, .jpg, .hdr
├── autoload/           # singleton scripts
├── scripts/            # reusable logic (.gd, .cs)
├── docs/               # project docs
├── res/*                (actual Godot resource files)
├── export/              # export templates
└── project.godot         # Godot project config
```
- Keep assets in `res/` to make them project‑wide. The folder name doesn’t matter as long as it’s referenced properly.

### Project.godot
- Contains project settings: window size, physics FPS, export options.
- Keep the file minimal; use Godot Editor for complex changes.

### Export Presets
- Create presets under `project.godot[export]` for each target platform.
- Specify `compression_mode`, `minify`, and platform‑specific flags.

### Autoloads
- Add global scripts via `Project Settings → Autoload`.
- Common pattern: `GameState.gd`, `AudioManager.gd`.

## Rules and Constraints
- Avoid deep folder hierarchies that hamper editor navigation.
- Keep scenes self‑contained; export sub‑scenes for reuse.
- Scripts should follow PascalCase file naming.
- Use `_` prefix for private variables.

## Practical Implementation Guidance
- Use `add_scene_to_path()` to generate new scenes.
- Use `exportvar` for editor‑exposed variables.
- Keep C# scripts in `scripts/` and enable the C# toolchain in `project.godot`.

## Common Mistakes
- Mixing absolute and relative paths in scripts.
- Using `load()` with a wrong path; prefer `preload()`.
- Forgetting to export a singleton script, leading to `null` references.
- Not using `PackedScene.instance()` for repeated object creation.

## Troubleshooting
- **Missing resource** – Check `FileSystem` panel for broken paths. Use `Project → Validate`.
- **Script error** – Verify the script path in the node's script property.
- **Export failure** – Ensure export preset uses correct template.

## Cross‑Platform Considerations
- Use `OS.has_feature('Android')`, `OS.has_feature('Windows')` etc. for feature checks.
- For platform icons, use `res://assets/icons/<platform>.png`.

## Related Knowledge
- [Godot 4 Documentation](https://docs.godotengine.org/en/stable/) 
- [Godot 4 Community Guide](https://godotengine.org/)

## Official References
- Godot 4 project structure cheat‑sheet: https://docs.godotengine.org/en/stable/tutorials/projects/project_structure.html
- Exporting for multiple platforms: https://docs.godotengine.org/en/stable/editor/exporting.html
- Godot scripts: GDScript vs C#: https://docs.godotengine.org/en/stable/tutorials/scripting/scripting_continuity.html

## Version / Date
- Updated: 2026‑10‑07
- Godot 4.2 LTS
