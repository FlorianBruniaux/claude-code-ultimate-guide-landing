---
id: 09-033
category_id: 9
difficulty: power
profiles:
- power
correct: d
options:
  a: Two Claude instances running on different machines for redundancy
  b: A planner instance and a reviewer instance that share the same working directory
  c: Horizontal scaling with 5-15 parallel implementer agents
  d: Vertical separation with one instance as Planner (read-only, creates specs) and another as Implementer (executes approved specs)
doc_reference:
  file: guide/workflows/dual-instance-planning.md
  section: Comparison to Other Patterns
  anchor: '#comparison-to-other-patterns'
---

What is the dual-instance planning pattern (Jon Williams) and how does it scale compared to other multi-instance approaches?

---

The dual-instance pattern creates a **vertical separation**: Instance 1 ("Claude Zero" or Planner) is read-only and creates detailed specs stored in `.claude/plans/`. Instance 2 (Implementer) reads approved specs and executes them. Jon Williams' pattern costs ~$100-200/month vs the Boris multi-instance pattern ($500-1K/month, horizontal scaling with 5-15 parallel agents). The dual-instance pattern is best for spec-heavy, quality-focused work where the planning/implementation separation reduces rework and correction loops.
---
