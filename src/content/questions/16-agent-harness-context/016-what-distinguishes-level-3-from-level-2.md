---
id: 16-016
category_id: 16
difficulty: junior
profiles:
- junior
- senior
- power
correct: d
options:
  a: Level 3 has canary tests; Level 2 does not
  b: Level 3 uses profiles; Level 2 uses a single config
  c: Level 3 has CI drift detection; Level 2 does not
  d: Level 3 uses path-scoped modules; Level 2 uses structured sections in one file
doc_reference:
  file: guide/core/context-engineering.md
  section: 9. Maturity Assessment
  anchor: '#9-maturity-assessment'
---

What is the key structural difference between Level 2 and Level 3 on the context engineering maturity scale?

---

Level 2 "Structured config" organizes rules into clear sections with global/project separation, but everything lives in root CLAUDE.md files. Level 3 "Modular config" moves subsystem-specific rules into path-scoped modules (.claude/rules/) with deliberate layering. The root CLAUDE.md at L3 stays under 150 lines. Canary tests and profiles are L4 and L5 features respectively.
