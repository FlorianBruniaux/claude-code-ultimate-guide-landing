---
id: 16-024
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: It is automatically applied to avoid accumulation
  b: It is deleted from the signal store
  c: It resets its counter and starts fresh
  d: It escalates to "pending human decision" with a blocking flag, or closes as "won't fix" with documented reason
doc_reference:
  file: guide/core/context-engineering.md
  section: 11. Loop Closure - PR-Based Curation
  anchor: '#suggestion-suppression'
---

What should happen to a Curator suggestion that appears in three consecutive reports without any action?

---

A suggestion that appears three times without action should either escalate to "pending human decision" with a blocking flag in the next PR, or close as "won't fix" with a documented reason. Allowing suggestions to repeat silently is the same failure mode as the open loop, just more subtle. The escalation counter is the mechanism that prevents the system from ignoring its own recommendations indefinitely without forcing a human decision.
