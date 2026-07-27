---
id: 17-009
category_id: 17
difficulty: intermediate
profiles:
  - senior
  - power
  - pm
correct: b
options:
  a: Is it free? Is it automated? Does it look good in reports? Does leadership care?
  b: Can you act on it in 2 weeks? Does it explain why (not just what)? Is it correlated to a business outcome? Can it be measured automatically?
  c: Is it a DORA metric? Does it appear in the SPACE framework? Is it industry-standard? Does it require no custom code?
  d: Does it track individual performance? Is it available in GitHub? Is it exportable to CSV? Does it run daily?
doc_reference:
  file: guide/ops/team-metrics.md
  section: The 4-Question Test
  anchor: "#the-4-question-test"
---

What is the 4-Question Test for deciding whether to add a metric to your tracking stack?

---

The 4-Question Test: (1) Can you act on it within 2 weeks? — if not, it's a reporting metric, not a steering metric. (2) Does it explain why, not just what? — if this number moves, do you know what to investigate? (3) Is it correlated to a business outcome? — deployment frequency correlates to revenue in SaaS; lines of code correlates to nothing. (4) Can it be measured automatically? — if collecting it requires manual work, it will be abandoned within 3 months. Rule: fewer than 3 "yes" answers, drop the metric.
