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
  d: It was removed; subagents are managed by editing .claude/agents/ directly or
    asking Claude conversationally
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

What happened to the /agents interactive wizard command as of v2.1.198?

---

The /agents wizard was removed in v2.1.198. Subagents are now managed by editing files directly under .claude/agents/ or by asking Claude to create or edit them conversationally, rather than through a dedicated wizard command. It wasn't merged into /config, renamed, or gated behind a flag, it's gone as a standalone interactive flow.
