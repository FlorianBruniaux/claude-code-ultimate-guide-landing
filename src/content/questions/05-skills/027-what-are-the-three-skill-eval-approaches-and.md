---
id: 05-027
category_id: 5
difficulty: power
profiles:
  - power
correct: b
options:
  a: Unit testing, integration testing, end-to-end testing — Trigger Tuning reduces false positives in unit tests
  b: Benchmark Mode (skill vs no-skill comparison), A/B Testing (parallel execution paths), and Trigger Tuning — Trigger Tuning adjusts the skill description to improve auto-invocation rate when Claude should use the skill but doesn't
  c: Code review, peer review, automated review — Trigger Tuning aligns skill output with team style guides
  d: Alpha, beta, production — Trigger Tuning controls which user segments receive the skill
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.Y Skill Evals
  anchor: "#5y-skill-evals"
---

What are the three Skill Eval approaches, and what specific problem does Trigger Tuning address?

---

Skill Evals use three approaches. Benchmark Mode compares outputs with the skill active versus without it, giving a measurable quality delta. A/B Testing runs both paths in parallel on real tasks to measure impact under actual conditions. Trigger Tuning addresses a specific failure mode: the skill exists and works correctly, but Claude does not invoke it when it should. Adjusting the skill description to more precisely match the language and context of the target task improves auto-invocation rate without changing the skill's logic.
