---
id: 05-021
category_id: 5
difficulty: power
profiles:
- power
correct: d
options:
  a: It adjusts the timing of when skills are loaded into context
  b: It compresses skill descriptions to reduce token usage
  c: It automatically runs all skill tests on a schedule
  d: It analyzes and improves the skill's description field to reduce false positives and false negatives in skill activation
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.Y Skill Evals
  anchor: '#5y-skill-evals'
---

What does Trigger Tuning (Description Optimizer) do in Skill Evals?

---

Trigger Tuning analyzes a skill's `description` and suggests changes intended to reduce false positives and false negatives in activation. It evaluates routing, not output quality. A skill can trigger at the right time and still produce an incorrect result, so test activation and task assertions separately.
