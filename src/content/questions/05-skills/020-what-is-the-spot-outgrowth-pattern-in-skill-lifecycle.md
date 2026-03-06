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
  b: When the model improves to the point where it passes the skill's eval without the skill, signaling the skill can be retired
  c: When a skill triggers too often and needs to be throttled
  d: When a skill is adopted by the wider community
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.X Skill Lifecycle & Retirement
  anchor: '#5x-skill-lifecycle--retirement'
---

What is the "Spot Outgrowth" pattern in skill lifecycle management?

---

Spot Outgrowth occurs when a model improves to the point where it can pass a skill's eval on its own, without the skill being loaded. This is the retirement signal for Capability Uplift skills: run the eval without the skill — if it passes, the skill is no longer needed. Removing it reduces context load and maintenance overhead. This contrasts with "Catch Regressions," which detects when a skill drifts after a model update.
