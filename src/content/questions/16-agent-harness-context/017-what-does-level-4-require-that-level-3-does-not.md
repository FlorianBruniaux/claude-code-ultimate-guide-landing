---
id: 16-017
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: a
options:
  a: Canary tests and adherence tracking (measurement habit)
  b: Path-scoped modules
  c: Team profile assembly
  d: CI drift detection
doc_reference:
  file: guide/core/context-engineering.md
  section: 9. Maturity Assessment
  anchor: '#9-maturity-assessment'
---

What does Level 4 ("Measured config") require that Level 3 ("Modular config") does not?

---

Level 4 adds canary tests that verify key conventions, violation rate tracking for important rules, and context audits after major milestones. The guide notes that moving from L3 to L4 requires a measurement habit, not more configuration. CI drift detection and profile assembly are Level 5 features. Path-scoped modules are the Level 3 graduation criterion.
