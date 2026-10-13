# Web App UX

## Purpose

Interaction patterns for browser-based apps: responsive layout, navigation,
forms, feedback, and lifecycle states from first visit to daily use.

## Layout and navigation

- One primary navigation model per viewport: sidebar or top bar on desktop,
  bottom bar or drawer on small screens. Do not mix two primary models.
- Content width follows reading and scanning: narrow measure for prose,
  wider grids for collections. Density adapts to viewport, not user setting
  alone.
- Deep links for every addressable view. Back and forward buttons must work;
  in-app back controls mirror them and never fight them.

## Forms and input

- Label every control visibly. Placeholders are hints, not labels.
- Validate on submit, re-validate on change after the first error. Errors name
  the field, the problem, and the fix, next to the field.
- Destructive or expensive submits confirm once, inline, with the consequence
  stated. Undo beats confirmation for reversible actions.

## Lifecycle states

- Every async surface needs four states: loading, content, empty, error.
  Skeleton or progress for loading, actionable empty states (what, why, next
  step), errors with retry plus a way to report or escape.
- Optimistic updates for fast-feeling interactions, with rollback plus notice
  on failure. Never leave the UI in a state the backend rejected.
- Autosave drafts where input is long or costly. Restore them visibly after
  reload, crash, or navigation.

## First run and onboarding

- Show value before asking for setup: sensible defaults, sample content,
  progressive disclosure of advanced options.
- Onboarding is at most three steps, skippable, resumable. Each step earns
  its place by unlocking visible capability.
