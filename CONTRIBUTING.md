# Contributing to OpenCodePlus

Hi, thanks for wanting to help!

This repo is a personal experiment, and `main` is protected: nobody can push
to it directly â€” not even the owner. Everything lands through a reviewed
pull request. That keeps malware and junk out.

## How it works

1. **Open an issue first** describing what you'd like to add or fix. Big
   changes without a prior issue will be closed â€” this is how you "ask for
   access": propose, discuss, then code.
2. **Fork** the repo, create a branch, do the work there.
3. **Open a pull request** against `main`. Small, focused PRs get reviewed
   fastest. Describe what you changed and how you tested it
   (`npm test` for the customizations).
4. Wait for review. Every PR is read and tested by Vesdal before merge.

## Security rules (non-negotiable)

- No binaries, executables, or prebuilt blobs in PRs. Release artifacts ship
  only through GitHub Releases made by the owner.
- No minified or obfuscated code â€” everything must be human-readable.
- No secrets, API keys, tokens, or credentials. Ever.
- No new network endpoints, permissions, or dependencies without explaining
  why in the PR. Keep new dependencies minimal and pinned.

## License

Customizations are AGPL-3.0-only, OpenCode is MIT â€” see LEGAL.md. By
contributing you agree your work keeps its license, and other components keep
theirs. The original app is by the
[OpenCode developers](https://github.com/anomalyco/opencode).
