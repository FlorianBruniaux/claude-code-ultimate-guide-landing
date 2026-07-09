---
id: 02-021
category_id: 2
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Because 1M-token windows aren't actually available to most Claude Code users
    yet
  b: Because a 1M-token window costs the same per request regardless of how full it
    is
  c: Because a window full of noise, stale turns, and redundant instructions performs
    worse than a smaller, curated one, and costs more
  d: Because the API throws a hard error once a session crosses roughly 900K tokens
doc_reference:
  file: guide/core/context-engineering.md
  section: 'MECW: Maximum Effective Context Window'
---

Why does the guide treat "just use the 1M-token context window" as an anti-pattern rather than a capability win?

---

The guide frames this as a signal-to-noise question, not a capacity question. A 128K-token window with well-maintained, curated content outperforms a 1M-token window loaded with stale turns and redundant tool output. The large window doesn't eliminate context rot, it delays it while making each request slower and more expensive. There's no hard token error at 900K, and cost scales with what's actually sent, so filling the window for its own sake is pure downside.
