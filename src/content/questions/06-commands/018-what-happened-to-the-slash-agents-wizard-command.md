---
id: 06-018
category_id: 6
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: d
options:
  a: It was merged into /config as a new tab
  b: It was renamed to /subagents but works the same way
  c: It still exists but now requires the --legacy flag
  d: The interactive wizard was removed; /agents now only prints a reminder to ask Claude to manage subagents or to edit .claude/agents/ directly
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

What happened to the /agents interactive wizard command as of v2.1.198?

---

The /agents wizard was removed in v2.1.198. On v2.1.198 and later, /agents only prints a reminder to ask Claude to create or manage subagents, or to edit .claude/agents/ or ~/.claude/agents/ directly; on v2.1.197 and earlier it opened an interactive interface. It wasn't merged into /config, renamed, or gated behind a flag.
