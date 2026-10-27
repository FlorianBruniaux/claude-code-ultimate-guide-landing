---
id: 12-006
category_id: 12
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Unlimited depth
  b: Up to three layers below the main conversation
  c: Depth = 1 (a subagent cannot spawn subagents)
  d: Up to two layers below the main conversation
doc_reference:
  file: guide/core/architecture.md
  section: Why Depth = 1?
  anchor: '#why-depth-1'
---

What is the default maximum nesting depth for subagents spawned via the Agent tool?

---

By default a subagent can spawn subagents of its own, up to three layers below the main conversation. At the depth limit Claude Code withholds the Agent tool, so the subagent does its delegated work itself and returns one summary. Set CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH to change the limit; a value of 1 turns nesting off. A depth limit still matters because nested subagents multiply cost and make multi-level chains hard to debug.
