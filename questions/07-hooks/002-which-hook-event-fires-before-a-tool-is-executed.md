---
id: 07-002
category_id: 7
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: BeforeToolUse
  b: PreToolUse
  c: ToolStart
  d: OnToolCall
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.1 The Event System
  anchor: '#event-types'
official_doc: https://code.claude.com/docs/en/hooks
---

Which hook event fires BEFORE a tool is executed?

---

The `PreToolUse` event fires before any tool runs.

Common event types:
- **PreToolUse**: Before tool execution (ideal for security validation)
- **PostToolUse**: After tool execution (for formatting, logging)
- **UserPromptSubmit**: When user sends a message (context enrichment)
- **Notification**: When Claude sends a notification
- **SessionStart/SessionEnd**: Session lifecycle events
- **Stop**: When user interrupts
