---
id: 14-014
category_id: 14
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: a
options:
  a: Routing prompts by complexity to a cheaper model when the task does not need
    top-tier reasoning
  b: Negotiating a fixed monthly per-seat license instead of paying per token
  c: Disabling prompt caching to force fresh context on every turn
  d: Running every task through the most capable model to avoid any retry cost
doc_reference:
  file: guide/ops/ai-unit-economics.md
  section: 3. The real cost-reduction levers
  anchor: '#3-the-real-cost-reduction-levers'
---

Which of these is one of the cost-reduction levers for agentic AI spend identified in the guide's unit economics framework?

---

The guide names four engineering levers that reduce per-task cost: routing by complexity, isolating heavy work in sub-agents, capping iterations with explicit exit criteria, and reusing cached context. Routing by complexity means sending lookups, renames, and formatting tasks to a cheaper model and reserving the expensive one for genuinely ambiguous work, one production account cited in the guide saw cost cut roughly in half this way. Fixed per-seat pricing is explicitly the SaaS model the guide contrasts agentic cost against, not a lever within it, and disabling caching would raise cost since cache reads are priced far below fresh input.
