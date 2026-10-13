# Memory change

The desktop loose-session list previously retained every server session,
including sessions already belonging to projects. It now retains only the
inventory it renders and refreshes when project membership changes. Individual
session objects are not truncated; opening, pinning and restoring remain intact.
Cancellation checks prevent an older request from replacing newer results.

A deterministic 1,000-session fixture retains 10 objects instead of 1,000 when
990 belong to projects. This is retained-reference evidence, not a claim of a
specific live-process RSS reduction. Project loaders still fetch their sessions.

The Bun-based CLI backend is a shared local service, not an orphan. It remains
separate deliberately so background requests, tools and other clients survive
desktop window closure. Folding it into Electron or terminating it with the
window would change that behavior. No service lifecycle, process disguise,
artificial working-set trimming or aggressive memory limits were introduced.
