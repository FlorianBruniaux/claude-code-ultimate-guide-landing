---
id: 17-011
category_id: 17
difficulty: intermediate
profiles:
  - senior
  - power
correct: c
options:
  a: "Deployment Frequency: AI generates too many deployments"
  b: "MTTR: AI incident response makes recovery too slow"
  c: "Change Failure Rate: AI generates syntactically correct but subtly wrong code; rubber-stamp reviews cause CFR to creep up over 6-12 months"
  d: "Lead Time: AI slows down review queues by generating larger diffs"
doc_reference:
  file: guide/ops/team-metrics.md
  section: DORA in an AI-Augmented Context
  anchor: "#dora-in-an-ai-augmented-context"
---

What does the DORA metric most at risk from AI adoption without review discipline?

---

Change Failure Rate is the metric most at risk when AI adoption outpaces review discipline. AI generates syntactically correct, structurally plausible code that can still have subtle behavioral errors. Teams that treat AI PRs as "lower risk" and rubber-stamp reviews see CFR creep up over 6-12 months. The failure is gradual: each individual AI PR looks fine, but cumulative reduced scrutiny shows up in production. Track CFR separately for AI-generated vs manually written code; if AI CFR is materially higher, reinforce the review process.
