---
id: 12-006
category_id: 12
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: c
options:
  a: Unlimited depth
  b: Depth = 3
  c: Depth = 1 (cannot spawn sub-sub-agents)
  d: Depth = 2
doc_reference:
  file: guide/architecture.md
  section: Why Depth = 1?
  anchor: '#why-depth--1'
---

What is the maximum depth for sub-agents spawned via the Task tool?

---

Sub-agents have a depth=1 limit. They CANNOT spawn sub-sub-agents. This prevents: recursive explosion (infinite resources), context pollution (accumulated context), debugging nightmares (multi-level chains), and unpredictable costs (nested token usage).
