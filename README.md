# OpenCode+

**A little local app-building gremlin. Native apps too, not just websites.**

hi. i wanted something like Base44, but more local, more friendly to people who
cannot code, and not stuck making only web apps. I wanted to describe an idea and
have an AI help turn it into a real native application. Windows, macOS, phones:
the ambition is bigger than another browser tab. Web apps are still welcome.
we do not discriminate against tabs. mostly.

OpenCode+ is my attempt to make that experience out of
[OpenCode](https://github.com/anomalyco/opencode). It is a customized Windows
desktop client with a simpler project/session sidebar, a recoverable bin, and
instructions and a small knowledge base for the AI doing the work.

## Please read this before getting excited

**This is incomplete. It is not a full Base44 replacement yet.** It may need
more updates, testing, setup improvements, and bug fixes before it gets there.
Think "local Base44-ish experiment," not "everything solved, ship your bank."

The goal is a zero-code experience **for the person using it**. That does not
mean there is no code underneath, no setup, no bugs, or no judgment required.
AI can make mistakes. Review what it does, especially before letting it touch
important files. Please do not raw-dog production with an experimental build.

The included `AGENTS.md` and `docs/knowledge/` guide the assistant toward native
platforms, accessible UI, testing, and careful dependency choices. They are
instructions, not magic powers. Native builds still need the appropriate SDKs;
Apple targets require Apple's tools and supported hardware. The knowledge base
also contains dated notes: verify changing APIs and platform guidance.

## Why this is free

I have no coding skills. I spent roughly **$70–80 on AI APIs** modifying this
app, and it took several tries. I supplied the ideas, requests, and feedback;
the original OpenCode developers and AI assistants did the programming heavy
lifting. I do not feel right charging as if I had personally written all this
or done the real engineering effort myself, so I want to distribute it freely.

That said, **every bit of support is appreciated**. It helps cover API costs
and future experiments. I'll set up a Buy Me a Coffee link later; there is no
payment link here yet, and support will not be required to use the project.

Free app does not mean free inference: your chosen AI provider may charge for
API calls. No personal provider configuration, API keys, or `opencode.json` is
included. Bring your own configuration. please bring your own wallet too.

## What is here

- Custom desktop navigation, projects, sessions, and a persistent session bin.
- The same bin inventory in the sidebar and Projects settings, with restore
  controls and single/bulk management.
- A silent Windows launcher, an installer wrapper, and a self-extracting
  portable wrapper with the matching CLI/runtime.
- `AGENTS.md` and curated `docs/` for AI-assisted application development.
- Customization source, tests, packaging scripts, and a pinned upstream source
  checkout in `upstream/opencode/`.

"Local" describes the desktop and development workflow. It does **not** mean
all AI inference happens offline. Your provider settings determine where
requests go. This is not affiliated with Base44, Anomaly, OpenAI, or Anthropic.

## Downloads and current verification

Windows x64 installer and portable executables are intended for GitHub Releases,
not the source tree. They are unsigned, so Windows may display a warning.
The wrappers require .NET Framework 4.x. The portable unpacks a runtime into
LocalAppData and does not require an installed OpenCode desktop; it uses the
shared service/data conventions rather than keeping everything on a USB stick.

The existing executables were compiled and their payload archive was checked,
but **were not launched or installation-tested**. They predate the documentation
and knowledge-base additions in this source revision. They must not be described
as fully verified or as including those additions without a rebuild.

## Source and building

- `src/`: custom UI, lifecycle helpers, styles, and branding.
- `tests/`: Node regression tests (`npm test`).
- `tools/`: version-guarded ASAR patcher, launchers, and packaging source.
- `upstream/opencode/`: original project at `v2.0.24`, commit
  `e7a34f09bfd9134dfade5a8ddb843f7030bc9a69`, including upstream build scripts and
  dependency lockfiles. See `UPSTREAM.md`.
- `docs/`: curated guidance, not a redistribution of the large third-party
  research archive. External references remain links.

The customization build currently expects a matching Windows installation and
its original ASAR input. `OPENCODE_PLUS_BASE_ARCHIVE` can select that input;
`npm run build` runs the guarded patcher. It is **not yet a clean one-command,
from-source build on a fresh machine**. The upstream tag is pinned, but its match
to every file in the existing binaries and full dependency/license compliance
have not yet been verified. See `LEGAL.md` for the release blockers.

## The people who deserve the credit

**First and most importantly: the original OpenCode developers.**
[Anomaly](https://github.com/anomalyco),
[Dax / thdxr](https://github.com/thdxr),
[Adam](https://github.com/adamdotdev), and
[all OpenCode contributors](https://github.com/anomalyco/opencode/graphs/contributors)
built the foundation. OpenCode+ would not exist without their work. Their MIT
license and copyright notices are preserved.

- **Vesdal:** concept, direction, requests, and testing feedback.
- **ChatGPT / OpenAI and Claude / Anthropic:** AI-assisted coding and iteration.
  These are credits, not human repository collaborators or an endorsement.

See [COLLABORATORS.md](COLLABORATORS.md) for attribution. Customizations use
AGPL-3.0-only; upstream and third-party components keep their own licenses.

small gremlin, big plans. bugs may still be having a party in the walls.
