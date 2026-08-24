---
id: 17-007
category_id: 17
difficulty: intermediate
profiles:
  - senior
  - power
  - pm
correct: c
options:
  a: "bugs_in_prod / total_bugs_filed; threshold: >10%"
  b: "bugs_before_prod / bugs_in_prod; threshold: >5%"
  c: "bugs_in_prod / (bugs_before_prod + bugs_in_prod); threshold: >20%"
  d: "total_bugs / deployments; threshold: >1 per deploy"
doc_reference:
  file: guide/ops/team-metrics.md
  section: Product Metrics
  anchor: "#product-metrics-the-often-missing-layer"
---

What is the Bug Escape Rate formula and what threshold signals a QA process problem?

---

Bug Escape Rate = bugs_in_prod / (bugs_before_prod + bugs_in_prod). Example: 4 prod bugs + 16 pre-prod bugs = 20% escape rate. Threshold: >20% means QA and review processes are consistently failing to catch issues before users see them. With AI-assisted development, this metric is worth watching closely. Faster code generation combined with looser review can push Bug Escape Rate up even when absolute bug count stays flat. Pair with CFR segmented by AI vs manual code origin.
