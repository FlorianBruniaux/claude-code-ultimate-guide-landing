---
id: 09-057
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: "Research produces NOTES.md, Plan produces SPEC.md, Implement produces code: Gate 1 is a code review"
  b: "Research produces RESEARCH.md, Plan produces PLAN.md, Implement produces code: Gate 1 is a GO/NO-GO decision by the human before any planning begins"
  c: "Research produces a prompt, Plan produces a task list, Implement produces a diff: Gate 1 is an automated test pass"
  d: "All phases share a PROGRESS.md: gates are enforced by Claude automatically"
doc_reference:
  file: guide/workflows/rpi.md
  section: How the Gates Work
  anchor: "#how-the-gates-work"
---

In the RPI workflow (Research > Plan > Implement), what artifact does each phase produce, and what happens at Gate 1?

---

RPI structures feature development into three locked phases. Phase 1 (Research): produces RESEARCH.md covering feasibility, risks, decision points, and an effort estimate. Gate 1: the human marks GO or NO-GO. Phase 2 (Plan): produces PLAN.md with architecture decisions and sequential implementation steps. Gate 2: human approves before any code is written. Phase 3 (Implement): produces working code with per-step test gates. Gate 1 is the most important: a NO-GO saves the cost of a full implementation that would need to be discarded.
