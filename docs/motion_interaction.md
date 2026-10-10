# Motion and Interaction

## 1. Purpose
Motion should communicate:
- continuity;
- hierarchy;
- cause/effect;
- state change;
- spatial relationship.

## 2. Keep it fast
Prefer short transitions for ordinary controls.
Long animation is appropriate only when the movement itself teaches something.

## 3. Spatial continuity
When a surface expands, moves, or transforms, preserve a believable relationship between source and destination.

## 4. Interaction states
Define at minimum:
- rest;
- hover (when relevant);
- pressed;
- focused;
- selected;
- disabled;
- loading;
- error;
- success.

## 5. Avoid decorative motion
Do not animate every element.
Motion is expensive cognitively and technically.

## 6. Reduced motion
Respect reduced-motion settings where the platform exposes them.

## 7. Performance
Prefer transform/opacity and framework-native animation primitives that avoid expensive layout work.
Measure on low-end target hardware when motion is central to the experience.
