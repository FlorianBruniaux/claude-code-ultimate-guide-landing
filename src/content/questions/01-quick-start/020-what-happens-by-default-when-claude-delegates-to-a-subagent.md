---
id: 01-020
category_id: 1
difficulty: junior
profiles:
- junior
- pm
correct: c
options:
  a: The main session freezes until the subagent finishes its work
  b: The subagent runs silently and no one is ever told when it completes
  c: Claude keeps working on other things while the subagent runs, and you're notified
    when it finishes
  d: You must manually check progress every few minutes since there is no notification
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

As of Claude Code v2.1.198, what happens by default when Claude delegates a task to a subagent?

---

Since v2.1.198, subagents run in the background by default, so Claude keeps working on other parts of your task while the subagent runs and you get notified when it finishes, rather than waiting idle. This replaced the earlier behavior where a subagent call blocked the parent session until it returned. No manual polling is required, the notification is automatic.
