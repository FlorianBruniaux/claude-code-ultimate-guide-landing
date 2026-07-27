---
id: 05-026
category_id: 5
difficulty: senior
profiles:
  - senior
  - power
correct: c
options:
  a: Create, Deploy, Monitor — the checklist covers security scanning
  b: Draft, Review, Publish — the checklist covers documentation completeness
  c: Catch Regressions, Spot Outgrowth, and Retirement — the checklist ensures safe removal without breaking team workflows
  d: Install, Configure, Uninstall — the checklist covers dependency cleanup
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.X Skill Lifecycle & Retirement
  anchor: "#5x-skill-lifecycle-retirement"
---

What are the three phases of the Skill Lifecycle, and what does the retirement checklist address?

---

The Skill Lifecycle has three phases. Catch Regressions: run skill-specific tests after every Claude model update, because model changes can alter how skills trigger or perform. Spot Outgrowth: periodically check whether the model now handles the skill's job natively — Capability Uplift skills are the most likely candidates. Retirement: the checklist covers verifying no active workflows depend on the skill, communicating the removal to the team, and confirming the model handles the use case adequately before deleting. Skipping the retirement checklist is how teams accidentally break automated pipelines.
