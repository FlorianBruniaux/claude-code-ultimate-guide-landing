---
id: 12-016
category_id: 12
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: Testing effort is split evenly between deterministic components and the LLM reasoning
    core, but adoption of dedicated LLM eval tools exceeds 50%
  b: More than 70% of testing effort targets the LLM reasoning core, while less than
    5% targets deterministic components like tool calls
  c: Adoption of dedicated LLM evaluation tools like DeepEval exceeds 60%, but testing
    of deterministic components is neglected entirely
  d: More than 70% of testing effort targets deterministic components like tools and
    workflow logic, while less than 5% targets the LLM reasoning core (the Plan Body)
doc_reference:
  file: guide/core/agent-harness.md
  section: 7. Test Distribution Anti-pattern
  anchor: '#7-test-distribution-anti-pattern'
---

An empirical study across dozens of open-source agent frameworks and hundreds of agentic applications, cited in the agent harness guide, found a mismatch in where testing effort goes. What is that mismatch?

---

The study found more than 70% of testing effort targets deterministic components such as tools, APIs, and workflow logic, while less than 5% targets the Plan Body, the LLM reasoning core where non-obvious failures like plausible-but-wrong outputs actually live. Adoption of dedicated LLM evaluation tools sat below 1%, not above 50 or 60% as in options a and c. Option b inverts the real finding. The guide recommends rebalancing to at minimum 20-30% of testing effort on the Plan Body.
