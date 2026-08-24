---
id: 09-052
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: Maximum files an agent can read (agent stops reading and proceeds with available context)
  b: Maximum retry attempts on any failing task (agent stops and reports to the team lead rather than continuing to retry)
  c: Maximum number of teammate agents (team lead stops spawning and works sequentially)
  d: Maximum token budget per agent (agent switches to low-effort mode to conserve tokens)
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Loop Guardrails
  anchor: "#loop-guardrails"
---

What does MAX_ITERATIONS=8 control in agent team workflows, and what happens when the limit is reached?

---

Loop Guardrails prevent agents from getting stuck in unproductive retry cycles. MAX_ITERATIONS sets a hard cap on retry attempts for any single failing task. When the limit is reached, the agent stops and reports to the team lead instead of retrying. A reflection prompt ("What specifically failed? What one change would fix it?") runs before each retry, forcing the agent to change approach rather than repeat the same failing action. Without iteration limits, agents can consume their entire token budget retrying a blocked task while the rest of the work queue stalls.
