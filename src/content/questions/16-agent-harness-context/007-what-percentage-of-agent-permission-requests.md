---
id: 16-007
category_id: 16
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: d
options:
  a: 42%
  b: 67%
  c: 78%
  d: 93%
doc_reference:
  file: guide/core/agent-harness.md
  section: 3. The Lethal Trifecta - Security Model
  anchor: '#why-human-review-alone-fails'
---

According to Anthropic's internal data (April 2026), what percentage of agent permission requests in production are approved without adequate review?

---

Anthropic's shared responsibility model documentation (April 2026) reports 93% of agent permission requests are approved without adequate review. This is not a criticism of the humans involved: it is a structural consequence of volume and cognitive load. When a human approves 50 permission dialogs per hour, individual approval becomes a formality. The defense that scales is structural isolation and second-agent validation, not human review.
