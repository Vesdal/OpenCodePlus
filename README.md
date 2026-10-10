[![Buy me a matcha](https://img.shields.io/badge/%F0%9F%8D%B5_Buy_me_a_matcha-f4e9c6?style=for-the-badge&labelColor=f4e9c6&color=f4e9c6)](https://www.buymeacoffee.com/vesdal)

# OpenCode+

Hi

I wanted something like Base44, but local and easier for someone who can't
code. Also: **native apps**, not just websites. Web apps are fine too. I just
want my app to be let out of its basement.

I used AI to customize [OpenCode](https://github.com/anomalyco/opencode):
a friendlier project/chat sidebar, a bin with restore, and some instructions
and knowledge to help the assistant build things more carefully.

**Still incomplete.** This is my little experiment, sooo not a full Base44
replacement yet. It needs updates and more testing. Zero-code is the goal for
the user but dont set the bar too high lol. May still have some improvements to make.

## Money bit

I spent about **$70–80 in API calls**, with a FEW (uuuh ye definitely just a few) failed tries along the way
I have neither coding skills or time to learn coding (uni is graping my ahh), so have mercy on me
Charging like I wrote all this myself wouldn't feel right to me, so it's free and here on github (the goat, long live the admins)

Any support is appreciated tho

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
LocalAppData; still dosn't stick to your usb drive.

## Credits

**Original OpenCode developers**
[Anomaly](https://github.com/anomalyco), [Dax](https://github.com/thdxr),
[Adam](https://github.com/adamdotdev), and
[all contributors](https://github.com/anomalyco/opencode/graphs/contributors).

**Vesdal:** idea, direction, and feedback.
**ChatGPT and Claude:** AI-assisted coding and iteration. More in [COLLABORATORS.md](COLLABORATORS.md).

Customizations: AGPL-3.0-only. OpenCode: MIT. Other components keep their licenses.
Not affiliated with Base44, Anomaly, OpenAI, or Anthropic.
