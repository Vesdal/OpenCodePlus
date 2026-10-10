# OpenCode+

hi. little app gremlin is learning very harb.

I wanted something like Base44, but local and easier for someone who cannot
code. Also: **native apps**, not just websites. Web apps are fine too. I just
want my app to sometimes escape the browser. let him out.

So I used AI to customize [OpenCode](https://github.com/anomalyco/opencode):
a friendlier project/chat sidebar, a bin with restore, and some instructions
and knowledge to help the assistant build things more carefully.

**Still incomplete.** This is my little experiment, not a full Base44
replacement yet. It needs updates and more testing. Zero-code is the goal for
the user, not a promise that setup and bugs have gone to colleg and graduated.
Native apps still need their platform SDKs; cloud AI can still cost money.

## Money bit

I spent about **$70–80 in API calls**, with a few failed tries along the way.
I have no coding skills: I supplied ideas and feedback, not the actual
engineering heavy lifting. Charging like I wrote all this myself wouldn't feel
right to me, so it's free.

Any support is appreciated, though. Buy Me a Coffee coming later. No paywall,
no guilt trip. gremlin has already eaten enough of my wallet.

## What's included

- Customizations, tests, build/packaging scripts, and original OpenCode source
  pinned to `v2.0.24`.
- `AGENTS.md` and a small development knowledge base in `docs/`.
- No personal `opencode.json`, API keys, or chat history.

Run `npm test` for the customization tests. Building currently needs the
matching Windows runtime; fresh-machine builds aren't one-click yet.
Details: [UPSTREAM.md](UPSTREAM.md) and [LEGAL.md](LEGAL.md).

Windows installer and portable are uploaded to a **draft release**. They include
the guidance and sources, but are unsigned and have **not been run or
installation-tested**. Source/binary and dependency-license checks remain
unfinished, so they're not public downloads yet. Portable unpacks to
LocalAppData; it doesn't mean "everything stays on your USB stick."

## Credit where it's due

**The original OpenCode developers deserve the main credit:**
[Anomaly](https://github.com/anomalyco), [Dax](https://github.com/thdxr),
[Adam](https://github.com/adamdotdev), and
[all contributors](https://github.com/anomalyco/opencode/graphs/contributors).
They built the foundation. I made requests at it until this happened.

**Vesdal:** idea, direction, and feedback.
**ChatGPT and Claude:** AI-assisted coding and iteration, not human GitHub
collaborators. More in [COLLABORATORS.md](COLLABORATORS.md).

Customizations: AGPL-3.0-only. OpenCode: MIT. Other components keep their licenses.
Not affiliated with Base44, Anomaly, OpenAI, or Anthropic.

pls be gentle. app is still studing.
