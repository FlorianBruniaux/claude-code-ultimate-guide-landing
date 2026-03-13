---
id: 07-018
category_id: 7
difficulty: power
profiles:
- power
correct: b
options:
  a: Fire when any background agent pauses; fire when a TodoWrite task is ticked
  b: TeammateIdle fires when an agent team member is about to go idle (blockable); TaskCompleted fires when a task is being marked complete (blockable)
  c: Fire when the session is idle for 5 minutes; fire when a cron job completes
  d: Both are read-only notification hooks — they cannot block operations
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.3 Hook Event Types
  anchor: '#hook-event-types'
---

What are the `TeammateIdle` and `TaskCompleted` hook events used for in multi-agent workflows?

---

`TeammateIdle` fires when an agent team member is about to go idle — useful for team coordination and quality gates (can block). `TaskCompleted` fires when a task is being marked as completed — useful for enforcing completion criteria or running validation before a task is officially closed (can block). Both events are relevant to multi-agent orchestration and appear in the hook event types table alongside worktree and session lifecycle events.
---