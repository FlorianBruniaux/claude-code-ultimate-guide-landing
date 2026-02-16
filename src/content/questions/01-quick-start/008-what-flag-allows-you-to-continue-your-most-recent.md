---
id: 01-008
category_id: 1
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: --last
  b: --continue or -c
  c: --resume-last
  d: --restore
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.3 Essential Commands
  anchor: '#session-continuation-and-resume'
---

What flag allows you to continue your most recent Claude Code conversation?

---

Use `claude --continue` or `claude -c` to automatically resume your most recent conversation. This maintains full context and conversation history across terminal sessions. For resuming a specific session by ID, use `claude --resume <id>` or `claude -r <id>`. This is particularly useful for multi-day features or when interrupted.
