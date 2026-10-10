# OpenCode+ license and compliance review

Copyright (c) 2026 Vesdal. OpenCode+ customizations are licensed under
GNU Affero General Public License version 3 only (AGPL-3.0-only).
Modified on 2026-10-10. See LICENSE for the full terms.

OpenCode 2.0.24's packaged metadata declares MIT. Its original authors retain
their copyrights and MIT permissions; these are not replaced by this project's
AGPL notice. Electron, Chromium and other third-party components retain their
respective licenses. Existing packaged notices must be preserved.

This project is being prepared for public source distribution. No upstream
service code is changed. This review is technical, not a legal certification
of the entire dependency graph or authorization to assert binary compliance.

Before distributing binaries, provide complete Corresponding Source under
AGPL sections 4–6, including the exact upstream source revision, all modifications,
build/install scripts, notices and required installation information. A binary
app.asar plus these patch scripts is NOT the complete preferred upstream source.
The official v2.0.24 source tag has now been retrieved and pinned in UPSTREAM.md.
Its exact correspondence to the installed binary and all bundled dependency/asset
licenses still require verification. Public binary redistribution is not certified
by this review; the tag alone does not resolve that requirement.

If a modified covered application is made available to remote users, provide a
prominent free Corresponding Source download as required by section 13. Do not
publish a placeholder source link or claim a generic upstream repository is the
source of this modified version.

The publication source includes customizations, build/install instructions,
original upstream source, and curated agent guidance. Private configuration,
credentials, profiles, session databases, generated QA artifacts, and original
binary archives are excluded from Git. Curated guidance is maintained by
Vesdal; linked third-party source archives are not redistributed. Their licenses
and attribution remain applicable. Do not claim a complete source-verified
binary release until the above checks have been completed.

Primary references checked on 2026-10-10:
- Packaged @opencode/desktop 2.0.24 package.json: license MIT.
- https://raw.githubusercontent.com/anomalyco/opencode/dev/LICENSE (MIT;
  development branch corroboration only, not an exact binary source revision).
- https://www.gnu.org/licenses/agpl-3.0.txt (sections 0–6, 13, 15–16).
