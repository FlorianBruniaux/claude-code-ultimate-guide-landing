---
id: 09-054
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: WHY = task description, WHAT = output format — maximum 5 cycles
  b: WHY = the problem being solved, WHAT = the specific task — maximum 3 cycles
  c: WHY = reason for spawning the agent, WHAT = files to read — maximum 2 cycles
  d: WHY = business rationale, WHAT = architecture decision — maximum 1 cycle
doc_reference:
  file: guide/workflows/agent-teams.md
  section: 9. Iterative Retrieval for Sub-Agents
  anchor: "#9-iterative-retrieval-for-sub-agents"
---

What is the WHY/WHAT structure in the Iterative Retrieval pattern for sub-agents, and what is the maximum number of retrieval cycles?

---

Iterative Retrieval gives sub-agents a bounded context budget. WHY = the problem being solved or constraint being met (gives the agent decision context). WHAT = the specific task to execute. An agent that only knows WHAT lacks the business constraints that prevent wrong choices. WHY steers implementation without additional correction cycles. Maximum 3 cycles: Cycle 1 uses initial context, Cycle 2 is a specific targeted request, Cycle 3 is a final targeted request where the agent must produce output regardless of remaining uncertainty.
