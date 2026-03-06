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

Trigger Tuning analyzes your skill's `description` field and suggests improvements to reduce two types of triggering errors: false positives (skill fires when it shouldn't) and false negatives (skill doesn't fire when it should). As skill libraries grow, descriptions can conflict and cause unreliable activation. According to Anthropic's internal testing, 5 of 6 document-creation skills showed improved triggering accuracy after optimization. [Source: claudecode.jp — directional]
