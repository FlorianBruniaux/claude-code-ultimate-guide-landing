---
id: 05-020
category_id: 5
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: When a skill grows too large and needs to be split
  b: When the model passes representative evals without the skill, making it a retirement candidate that still needs a risk and dependency review
  c: When a skill triggers too often and needs to be throttled
  d: When a skill is adopted by the wider community
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.X Skill Lifecycle & Retirement
  anchor: '#5x-skill-lifecycle-retirement'
---

What is the "Spot Outgrowth" pattern in skill lifecycle management?

---

Spot Outgrowth occurs when the model passes representative evals without a Capability Uplift skill. That result makes the skill a retirement candidate; it does not prove safe deletion. Check active workflow dependencies, usage evidence, task frequency, and failure severity, then disable the skill and compare sessions before retiring it.
