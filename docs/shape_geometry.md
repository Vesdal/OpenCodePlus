# Shape and Geometry

## 1. Radius families
Define a limited radius scale, for example:
- small control;
- medium control/container;
- large surface;
- circular/pill.

Do not invent one-off radii without a visual reason.

## 2. Nested rounded rectangles
For a true nested surface, use this starting relationship:

inner_radius ≈ max(0, outer_radius - inset)

Example:
outer radius 20 with an 8-unit inset -> inner radius around 12.

This helps preserve visual continuity.

Exceptions are valid when:
- the child is intentionally a different component type;
- the child is floating rather than inset;
- the design language explicitly uses a contrasting shape.

## 3. Outer vs inner corners
When a child sits inside a rounded parent:
- the parent should generally read as equal or more rounded;
- the child should not unexpectedly look more bulbous than its container;
- do not combine a very square outer container with highly rounded inner cards unless it is intentional.

## 4. Stroke weight
Use a small stroke family.
A 1-unit border, 2-unit focus ring, and occasional stronger divider are easier to read than many near-identical weights.

## 5. Corner continuity
Check:
- input inside container;
- cards inside sections;
- dialog inside dimmed background;
- segmented controls;
- sheets;
- toolbars.

The shapes should look related, not independently generated.

## 6. Touch and hit areas
Visual shape and hit target do not have to match exactly.
A compact icon can have a larger invisible hit area.

## 7. Pills
Use pill shapes for:
- tags;
- compact status;
- segmented controls when appropriate;
- intentionally capsule-like controls.

Do not turn every button into a pill.
