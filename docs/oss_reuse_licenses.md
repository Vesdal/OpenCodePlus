# Open Source Reuse and License Policy

## Goal
Allow OpenCode to reuse excellent open-source building blocks without creating licensing problems.

## Discovery order
Prefer:
1. official repository;
2. official package;
3. maintained ecosystem repository;
4. community project only when clearly justified.

## Pre-integration checklist
Record:
- repository URL;
- package/component;
- version/tag/commit;
- SPDX license if available;
- asset/font license if different;
- target platforms;
- maintenance status;
- integration method;
- whether code is copied, vendored, modified, linked, or used as a dependency.

## License preference
For projects that may be distributed commercially, prefer permissive licenses:
- MIT;
- BSD-2-Clause / BSD-3-Clause;
- Apache-2.0;
- similarly permissive licenses after review.

Treat copyleft licenses as a deliberate architecture decision.
Do not copy GPL/AGPL code into a project unless the project explicitly accepts those obligations.

## Fonts and visual assets
Treat fonts, icons, illustrations, screenshots, and source code as separate license subjects.
A repository's source-code license does not automatically prove that every binary asset or font is licensed identically.

## Reuse method
Prefer:
- dependency/package usage;
- vendored module with preserved license files;
- generated bindings/assets with notices;

over random copy/paste.

## Notices
When required:
- preserve LICENSE/NOTICE files;
- add attribution;
- keep version/source information.

## No license guessing
If a component has no clear license, do not copy it.
Search for an official licensing statement or choose another source.
