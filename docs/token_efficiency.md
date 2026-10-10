# Token and Context Efficiency

Goal: reduce input and output tokens while preserving the full capability of the model selected by the user.

## 1. Context is a budget
The largest hidden cost is repeatedly sending irrelevant context.

Do not:
- dump the whole repository;
- dump the whole KB;
- paste entire web pages;
- repeat the whole user request;
- reopen unchanged files;
- repeat prior analysis verbatim.

## 2. Retrieval-first
Use:
index -> targeted search -> targeted file read -> implementation.

For source archives:
metadata -> README/LICENSE -> target path -> exact file/section.

## 3. Keep outputs short
The agent should:
- make edits through tools;
- return compact status;
- avoid narrating every command;
- report only useful evidence;
- summarize failures instead of pasting full logs.

## 4. Bounded iterations
Use a step budget.
Recommended defaults:
- routine build/edit: 10-12 agent steps;
- research: 8-10;
- visual correction: 3 focused passes.

When the budget is exhausted, stop and reassess instead of continuing blindly.

## 5. Escalate instead of looping
If the same cause fails twice:
- inspect the actual error;
- choose a stronger model;
- change the approach.

Do not spend 30 cheap iterations trying the same idea.

## 6. Model choice
The user chooses the model. Do not set, switch, or recommend a model as part of these token rules.
Token optimization must come from context hygiene and bounded execution, not from downgrading the model.

## 7. Reasoning controls
Where supported by the provider, use:
- low text verbosity;
- low/medium reasoning effort for ordinary tasks;
- high reasoning effort only for hard tasks.

OpenCode passes model-specific agent options through to the provider, so unsupported options may be ignored by a given backend.

## 8. Compaction
Enable automatic compaction.
Keep a compact recent context window.
Keep durable state in project/KB files, not in conversation history.

## 9. Stable instruction compression
Put long stable rules in AGENTS.md and concise reusable knowledge in the central KB.
Do not repeat the same rules in every project prompt.

## 10. Web token efficiency
Search broadly but read narrowly.
Store:
- title;
- source;
- relevant takeaway;
- version/date;
- license if applicable.

Do not archive huge HTML blobs in the curated KB.

## 11. Tool-output hygiene
Filter shell output.
Prefer:
- rg/find/select;
- test summaries;
- changed files;
- error excerpts around the failure.

Do not send multi-thousand-line logs to the model when the failure can be isolated to 20 lines.

## 12. Checkpoint format
For long work keep a compact state file such as:

OBJECTIVE:
ACCEPTANCE:
ARCHITECTURE:
ACTIVE FILES:
DONE:
BLOCKERS:
NEXT:

Keep it under a few dozen lines.

## 13. Session termination
After successful implementation + verification:
- stop;
- summarize evidence;
- commit.

Do not keep exploring just because more tools are available.
