---
id: 17-010
category_id: 17
difficulty: junior
profiles:
  - junior
  - senior
  - power
  - pm
correct: b
options:
  a: Both should use LinearB — it scales from small to large teams
  b: "5-person: GitHub Insights + spreadsheet (no dedicated dashboard needed). 25-person: LinearB or Faros.ai for automated DORA, segmented per squad"
  c: "5-person: no metrics needed. 25-person: full SPACE + DORA + AI metrics dashboard"
  d: Both should use the same tools but with different refresh frequencies
doc_reference:
  file: guide/ops/team-metrics.md
  section: By Team Size
  anchor: "#by-team-size"
---

What is the recommended metrics tooling difference between a 5-person team and a 25-person team?

---

5-person team: GitHub Insights + a shared spreadsheet. No dedicated dashboard — overhead not worth it. Review metrics monthly. 25-person team: LinearB or Faros.ai for automated DORA (connects to GitHub + CI/CD), GitHub Analytics for AI contribution metrics, PostHog or Amplitude for product metrics. Critical at 25 people: track DORA per squad, not just per organization — global averages hide squad-level problems (a 3-squad team where 80% of incidents come from one squad will show "Medium" CFR overall and miss the signal).
