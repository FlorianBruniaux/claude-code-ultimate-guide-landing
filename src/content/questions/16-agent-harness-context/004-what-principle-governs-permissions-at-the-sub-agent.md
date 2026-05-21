---
id: 16-004
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: Role inheritance
  b: Context isolation
  c: Trust delegation
  d: Principle of least privilege
doc_reference:
  file: guide/core/agent-harness.md
  section: 2.4 Sub-Agent Management
  anchor: '#24-sub-agent-management'
---

What principle governs permissions at the sub-agent delegation boundary according to the guide?

---

The principle of least privilege applies at the delegation boundary: sub-agents receive only the minimum permissions required for their specific task, not the full permission set of the orchestrating agent. This prevents privilege escalation chains where a low-sensitivity sub-task gains access to capabilities that should be restricted to the orchestrator. Role inheritance and trust delegation describe patterns the guide explicitly says should not be used here.
