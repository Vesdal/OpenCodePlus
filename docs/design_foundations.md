# Design Foundations

Purpose: prevent arbitrary, inconsistent, "AI-generated" visual design.

## 1. Hierarchy
Every screen needs an ordered hierarchy of attention.

Use:
- position;
- size;
- weight;
- contrast;
- whitespace;
- grouping;
- motion

to establish importance.

Do not make every element visually loud.

## 2. Gestalt and grouping
Use proximity, similarity, common region, continuity, alignment, figure/ground, and common fate deliberately.

Practical rule:
- elements that belong together should be spatially close;
- unrelated groups need meaningful separation;
- do not use borders/cards merely to compensate for poor spacing.

## 3. Alignment
Prefer a small number of alignment lines.

Common alignments:
- leading edge of titles/content;
- baseline of controls;
- shared column edges;
- consistent icon/text relationships.

Avoid almost-aligned elements.

## 4. Spacing rhythm
Choose a base spacing unit and derive most gaps from it.

Use a small scale rather than arbitrary numbers.

Spacing should express hierarchy:
- small = tightly related;
- medium = related groups;
- large = section changes.

Do not create "air" merely to make a screen look premium.

## 5. Density
Density must match the task.

High-information tools need efficient density.
Consumer/editorial interfaces may use more breathing room.

Do not use a huge empty central region unless empty space is itself intentional.

## 6. Balance
Balance visual mass, not just geometry.

Large type, dark surfaces, saturated accents, dense icons, and strong borders all carry visual weight.

## 7. Consistency
Consistency is not repetition of the same box.

Keep consistent:
- component meaning;
- interaction states;
- spacing relationships;
- shape language;
- typography roles;
- icon semantics;
- feedback patterns.

Allow hierarchy-driven differences.

## 8. Familiarity + character
Use established platform patterns for common behaviors.
Express product character in:
- content;
- restrained brand accents;
- imagery;
- type details;
- signature interactions;
- carefully chosen components.

Do not invent new controls for familiar actions without a reason.

## 9. Progressive disclosure
Show the most important information first.
Move advanced controls into:
- menus;
- inspectors;
- sheets;
- expandable sections;
- secondary navigation

when that reduces clutter.

## 10. Surface model
Decide what is:
- background;
- content surface;
- transient surface;
- control surface;
- overlay.

Do not place every component on an elevated card.

## 11. Depth
Depth should communicate:
- layering;
- focus;
- transient state;
- modality.

Use shadows, blur, tint, or material only when they communicate something.

## 12. Reference-driven design
When a visual reference exists:
1. analyze structure;
2. identify reusable design rules;
3. identify what is product-specific;
4. recreate the rule, not a pixel-traced imitation unless explicitly requested.

## 13. Review questions
Before declaring UI complete:
- Can I identify the primary task in <2 seconds?
- Do related elements read as related without unnecessary containers?
- Are any headings or controls oversized?
- Is the screen using cards because they help, or because the model defaults to cards?
- Are spacing values systematic?
- Are corners coherent?
- Are text styles systematic?
- Is the accent color doing useful work?
- Are interactive states distinct?
- Does it feel native to the platform while preserving product identity?
