# Upstream provenance and release status

- Project: https://github.com/anomalyco/opencode
- Tag: `v2.0.24`
- Commit: `e7a34f09bfd9134dfade5a8ddb843f7030bc9a69`
- License: MIT; retained in `upstream/opencode/LICENSE` and `LICENSE.OpenCode.txt`.
- Retrieved: 2026-10-10, using the upstream Git tag.
- Changes: upstream checkout is unmodified. Desktop customization patches are
  maintained separately in `src/` and `tools/`.

The source checkout includes original desktop, CLI, server, lockfiles, and build
scripts. The packaged desktop identifies itself as version 2.0.24. Version
agreement is not proof of binary reproducibility. A clean build and comparison
to the existing runtime, full license review, and release-payload rebuild remain
necessary before asserting complete Corresponding Source for those binaries.

The original `upstream/app.asar` is a local build input, not preferred source;
it is excluded from Git. Do not publish generated runtime binaries as source.
