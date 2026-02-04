---
id: 07-015
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: 'background: true'
  b: 'async: true'
  c: 'nonblocking: true'
  d: 'mode: async'
doc_reference:
  file: guide/ultimate-guide.md
  section: Hook Execution Model
  anchor: '#hook-execution-model'
---

What configuration parameter makes a hook run asynchronously (v2.1.0+)?

---

Since Claude Code v2.1.0, hooks support `async: true` in their configuration. This makes the hook fire without blocking Claude's execution. Useful for logging, notifications, or analytics hooks where you don't need to wait for the result before continuing.
