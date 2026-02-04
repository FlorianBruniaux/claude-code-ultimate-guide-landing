---
id: 05-006
category_id: 5
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Skills are faster
  b: Skills provide single source of truth - update once, all agents benefit
  c: Skills are required by Claude Code
  d: Skills cost less
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.1 Understanding Skills
  anchor: '#why-skills'
---

Why use skills instead of duplicating knowledge in multiple agents?

---

Skills follow DRY (Don't Repeat Yourself) principles. Without skills, you'd duplicate security knowledge in Agent A, B, and C. With skills, the security-guardian skill is the single source - all agents inherit it, and updates propagate everywhere. This ensures consistency and simplifies maintenance.
