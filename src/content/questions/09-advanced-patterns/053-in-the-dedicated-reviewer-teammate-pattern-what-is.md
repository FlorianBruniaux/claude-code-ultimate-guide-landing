---
id: 09-053
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: 1 reviewer per 10 builders — reviewer is a bottleneck at lower ratios; read-only prevents context overload
  b: 1 reviewer per 3-4 builders — fewer builders makes reviewer a bottleneck, more causes queue backup; read-only prevents merge conflicts
  c: 1 reviewer per builder — parity maximizes review coverage; read-only is optional
  d: 2 reviewers per builder — double review catches more bugs; read-only is required by the API
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Dedicated Reviewer Teammate
  anchor: "#dedicated-reviewer-teammate"
---

In the Dedicated Reviewer Teammate pattern, what is the recommended ratio and why must the reviewer be read-only?

---

The Dedicated Reviewer Teammate adds a read-only agent that reviews on every TaskCompleted event. Ratio: 1 reviewer per 3-4 builders. Below this range the reviewer becomes a bottleneck. Above it, the review queue backs up and findings arrive too late to be acted on cleanly. Read-only is essential: a reviewer with write access will start fixing issues itself, creating merge conflicts and defeating the purpose of parallel isolation. The reviewer's job is to produce structured findings (blocking vs non-blocking), not to apply fixes.
