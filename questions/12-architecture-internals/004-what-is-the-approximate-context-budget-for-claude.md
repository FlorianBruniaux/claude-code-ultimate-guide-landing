---
id: 12-004
category_id: 12
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: ~32K tokens
  b: ~100K tokens
  c: ~200K tokens
  d: ~500K tokens
doc_reference:
  file: guide/architecture.md
  section: Context Budget Breakdown
  anchor: '#context-budget-breakdown'
---

What is the approximate context budget for Claude Code with Claude 3.5 Sonnet?

---

Claude Code operates within a ~200K token context window. This is shared between: system prompt (~5-15K), CLAUDE.md files (~1-10K), conversation history (variable), tool results (variable), and reserved response buffer (~40-45K). Usable space is approximately 140-150K tokens.
