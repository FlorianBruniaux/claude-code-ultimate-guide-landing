---
id: 04-009
category_id: 4
difficulty: power
profiles:
- power
correct: b
options:
  a: Running 7 Claude instances simultaneously
  b: Launching 7 specialized sub-agents in parallel to implement complete features
  c: A debugging technique
  d: A code review checklist
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.6 Advanced Agent Patterns
  anchor: '#the-7-parallel-task-method'
---

What is the '7-Parallel-Task Method'?

---

The 7-Parallel-Task Method launches 7 specialized sub-agents in parallel: 1) Components, 2) Styles, 3) Tests, 4) Types, 5) Hooks, 6) Integration, 7) Config. All run in parallel, then results are consolidated. This dramatically speeds up feature implementation by parallelizing independent work streams.
