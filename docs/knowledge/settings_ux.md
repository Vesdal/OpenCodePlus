# Settings UX

## Purpose

How to structure preferences so users find controls, understand consequences,
and recover from mistakes. Applies to desktop, web, and mobile settings
surfaces.

## Information architecture

- Group by user goal (appearance, accounts, storage), not by implementation
  layer. Fewer than eight top-level groups; search across everything.
- Progressive disclosure: common controls first, advanced behind details or a
  secondary tab. Every advanced control still needs a plain-language label.
- One search box filters groups, items, and descriptions. Empty search results
  suggest the closest match instead of a dead end.

## Controls and consequences

- Match control to cardinality: switch for on/off, radio or select for one of
  few, text input for open values. Show the effective value, not just the
  stored one (for example resolved paths, effective shortcuts).
- State consequences inline where the user decides: storage freed, restarts
  required, sync effects. No surprises after Apply.
- Apply immediately where safe; stage plus explicit Save only where a change
  is disruptive (server endpoints, data directories). Always offer Reset to
  defaults per section.

## Destructive actions

- Two tiers: reversible (bin, archive, disable) and irreversible (permanent
  delete, wipe). Reversible actions never ask; irreversible ones confirm once
  with the exact scope named (how many items, what is lost, what is kept).
- Binned items restore with their context (sessions, relations) and expire on
  a stated schedule. Permanent delete frees backend data and reports partial
  failures honestly instead of failing the whole batch silently.
- Keep destructive controls visually distinct (danger styling) and out of the
  primary flow: overflow menus and bulk bars, not main buttons.
