---
id: 12-004
category_id: 12
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: Only the conversation history
  b: The system prompt, CLAUDE.md files, conversation history, and tool results
  c: Only your prompts and Claude's replies
  d: Only CLAUDE.md files and tool results
doc_reference:
  file: guide/architecture.md
  section: Context Budget Breakdown
  anchor: '#context-budget-breakdown'
---

Which of these share the same context window in Claude Code?

---

Claude Code operates within one context window shared between the system prompt, CLAUDE.md files, conversation history, and tool results, plus room reserved for the response. On the direct API, Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1 have a native 1M-token window, while the legacy Haiku 4.5 has 200K. A bigger window raises the ceiling but does not remove the need to manage what fills it.
