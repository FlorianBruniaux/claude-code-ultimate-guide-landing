---
id: 07-026
category_id: 7
difficulty: power
profiles:
  - power
correct: b
options:
  a: Claude asks the user interactively for approval, in any session type
  b: "Claude pauses with stop_reason: \"tool_deferred\" and waits for --resume; only works in headless sessions"
  c: The tool is denied permanently for the rest of the session
  d: Claude falls back to the default permission prompt
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: "#hook-output"
---

A PreToolUse hook returns `permissionDecision: "defer"`. What happens next and where does this work?

---

The `defer` permission decision (v2.1.89+) is designed exclusively for headless integrations. When returned, Claude pauses with `stop_reason: "tool_deferred"` and waits for the external orchestrator to collect input and resume the session with `--resume <session-id>`. In interactive terminal sessions, `defer` is ignored with a warning. This enables human-in-the-loop approval flows from external UIs, queues, or approval systems without breaking the session.
