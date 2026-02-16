---
id: 04-015
category_id: 4
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: When tasks are read-only
  b: When tasks are destructive (write operations) and dependent on each other
  c: When using haiku model
  d: When more than 3 agents are involved
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.6 Advanced Agent Patterns
  anchor: '#parallelization-decision-matrix'
---

When should parallel execution of agents be avoided?

---

Avoid parallel execution for destructive (write) operations that are dependent on each other. The decision matrix: Independent + Non-destructive = Parallel (max efficiency); Independent + Destructive = Sequential with Plan Mode first; Dependent operations = Sequential (order matters). Parallel writes risk conflicts if files share imports/exports.
