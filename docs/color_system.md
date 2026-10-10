# Color System

## 1. Start from roles, not hex values
Define semantic roles first:
- canvas;
- surface;
- elevated surface;
- primary text;
- secondary text;
- border;
- focus;
- accent;
- accent-contrast;
- success;
- warning;
- danger;
- info.

Then assign actual colors.

## 2. Neutral foundation
A strong UI usually needs a disciplined neutral system.

Use several neutral levels to establish depth and hierarchy.
Avoid using pure black/pure white everywhere unless the visual language calls for it.

## 3. Accent discipline
An accent should identify important actions or selected states.

Avoid:
- saturating every button;
- tinting every card;
- using the accent as a giant background;
- multiple unrelated accent hues.

## 4. Semantic colors
Success/warning/danger/info have meaning.
Do not use them as decoration.

Always pair semantic color with another signal when meaning matters:
- icon;
- label;
- shape;
- position.

## 5. Light and dark themes
Do not simply invert values.
Re-evaluate:
- contrast;
- saturation;
- elevation;
- border visibility;
- semantic color intensity.

## 6. Perceptual coherence
When generating palettes programmatically, prefer a perceptual color space such as OKLCH/LCH as an intermediate design tool so equal numeric steps behave more consistently visually.

## 7. Contrast
Check text and essential controls against their actual background.
Design tokens should not be "contrast safe by accident"; verify the final combinations.

## 8. Platform adaptation
Keep semantic roles stable while allowing platform-specific actual colors/materials.
A primary action can map differently on Windows, macOS, and Android while preserving its meaning.
