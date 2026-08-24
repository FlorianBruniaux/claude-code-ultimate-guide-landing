---
id: 17-008
category_id: 17
difficulty: junior
profiles:
  - junior
  - senior
  - power
  - pm
correct: b
options:
  a: "PR count: more objective than story points"
  b: "Cycle Time + Deployment Frequency: velocity is gameable within 2 sprints by changing estimation practices, while cycle time is harder to fake"
  c: "Lines of code: more measurable and consistent"
  d: Story points normalized by team size
doc_reference:
  file: guide/ops/team-metrics.md
  section: Vanity Metrics to Drop
  anchor: "#vanity-metrics-to-drop"
---

Which metric should replace Sprint Velocity and why?

---

Sprint velocity should be replaced by Cycle Time + Deployment Frequency. Velocity is gameable within 2 sprints by changing estimation practices (teams inflate point values to look faster). Cycle time (commit to prod) is harder to fake. The guide's vanity metrics to drop table: Sprint Velocity → Cycle Time + Deployment Frequency. Lines of Code → Bug Escape Rate. NPS alone → CSAT + Time-to-value. Commits/day → Lead Time for Changes. Story points → Throughput (features shipped). Code coverage % → Mutation testing score + Bug Escape Rate.
