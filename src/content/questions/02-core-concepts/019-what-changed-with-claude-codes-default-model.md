---
id: 02-019
category_id: 2
difficulty: intermediate
profiles:
- junior
- senior
- pm
correct: c
options:
  a: Claude Haiku became the default model to cut costs across the board
  b: Claude Opus became the default model, capped at a 500K-token context window
  c: Claude Sonnet 5 became the default model, with a native 1M-token context window
  d: The default model stayed the same, only the pricing tier changed
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.197
---

What changed with Claude Code's default model in v2.1.197?

---

v2.1.197 introduced Claude Sonnet 5 as the new default model in Claude Code, with a native 1M-token context window, not a capped or reduced one. Opus and Haiku are still selectable through /model, but neither became the default in this release.
