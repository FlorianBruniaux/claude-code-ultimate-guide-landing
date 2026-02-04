---
id: 07-010
category_id: 7
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: AfterToolUse
  b: PostToolUse
  c: ToolComplete
  d: OnToolDone
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.1 The Event System
  anchor: '#event-types'
---

Which hook event fires AFTER a tool has finished executing?

---

The `PostToolUse` event fires after any tool completes execution.

Common use cases for PostToolUse:
- Auto-formatting code after edits
- Running linters after file changes
- Logging tool usage for auditing
- Triggering tests after code changes

The Auto-Formatter template uses PostToolUse to run Prettier after Edit/Write operations.
