---
id: 02-002
category_id: 2
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: 100,000 tokens
  b: 200,000 tokens
  c: 1,000,000 tokens
  d: 2,000,000 tokens
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.2 Context Management
  anchor: '#the-context-budget'
---

What native context window do the current Claude models (Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.1) have on the direct API?

---

The current Claude models have a native 1M-token context window on the direct API, while the legacy Haiku 4.5 has 200K. Think of it like RAM - when it fills up, things slow down or fail, and a bigger window does not remove the need to manage it. This context includes all messages, files read, command outputs, and tool results. Effective context management is described as "the most important concept in Claude Code."
