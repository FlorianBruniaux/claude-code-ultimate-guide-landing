---
id: 11-023
category_id: 11
difficulty: senior
profiles:
  - senior
  - power
  - pm
correct: b
options:
  a: Teams deploy too slowly because AI adds overhead
  b: High deployment frequency can coexist with burnout, skill atrophy, and shallow reviews. DORA measures pace, not sustainability or quality
  c: DORA metrics are only valid for teams of 10 or more engineers
  d: Deployment frequency causes merge conflicts when AI generates too many branches
doc_reference:
  file: guide/roles/learning-with-ai.md
  section: Team-Level Steering Metrics
  anchor: "#team-level-steering-metrics"
---

What is the velocity trap in AI-augmented teams, and why is DORA 'High' on deployment frequency not sufficient evidence of health?

---

The velocity trap: a team rated High on DORA deployment frequency can simultaneously experience burnout (engineers rubber-stamping AI output), skill atrophy (engineers losing the ability to reason about code independently), and shallow reviews (speed pressure discourages deep inspection). DORA measures pace of delivery, but not whether the team understands what it is shipping. This is why Level 2 metrics (CFR by code origin, review time) exist: to surface quality degradation that hides behind fast numbers.
