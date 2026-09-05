---
id: 05-026
category_id: 5
difficulty: senior
profiles:
  - senior
  - power
correct: c
options:
  a: It scans every skill, including bundled and enterprise skills, in local and Remote Control sessions
  b: It proves that every never-invoked skill is safe to delete
  c: It reports visible skill context cost and never-invoked skills in the terminal, with scope and availability limits
  d: It archives unused skills outside discovery paths automatically
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.X Skill Lifecycle & Retirement
  anchor: "#5x-skill-lifecycle-retirement"
---

What evidence does `/skill-doctor` provide, and what are its current limits?

---

`/skill-doctor` reports context cost for visible skills and flags skills that have never been invoked. It requires Claude Code v2.1.252 or later, excludes bundled and enterprise skills, depends on feature-flag fetching, and is unavailable through Remote Control. Treat the unused flag as a review signal and combine it with representative sessions, dependencies, and risk.
