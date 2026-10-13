# Local-First UX

## Purpose

Patterns for apps that keep user data on the device and treat the network
as an enhancement, not a requirement. Applies to desktop and mobile apps
with local storage, sync, or companion services.

## Data ownership

- The device copy is the source of truth the user sees. Never block reading
  or editing own data on connectivity.
- Destructive operations act on the local copy first and sync after. Confirm
  only irreversible loss, not routine organization.
- Show where data lives when it matters: on this device, syncing, backed up.
  One compact status indicator beats a settings page of jargon.

## Offline and sync states

- Distinguish three states in UI: up to date, syncing, needs attention.
  Syncing is transient and quiet; needs-attention persists until resolved.
- Queue outbound changes with visible pending counts where the user waits on
  them (outbox, pending uploads). Silent queues that fail silently erode trust.
- Conflicts resolve with user intent preserved: keep both, pick one side,
  never silent last-write-wins on content the user authored.

## Storage and performance budgets

- Prefer incremental sync (deltas, pagination) over full re-downloads.
- Cache aggressively, invalidate explicitly: every cache needs a named
  invalidation trigger (logout, version change, user refresh).
- Large local datasets need virtualized lists, indexed search, and background
  import with progress plus cancel.

## Update and repair flows

- Updates never destroy local data. Migrate stores forward with versioned
  schemas; keep a rollback snapshot until the new version proves healthy.
- Offer export in open formats. Portability is a feature, and the cheapest
  insurance against migration bugs.
