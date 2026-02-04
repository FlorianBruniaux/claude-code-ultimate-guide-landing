---
id: 04-010
category_id: 4
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Heavy (25K+ tokens) for thoroughness
  b: Medium (10-15K tokens) for balance
  c: Lightweight (<3K tokens) for speed
  d: Weight doesn't matter
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.6 Advanced Agent Patterns
  anchor: '#agent-weight-classification'
---

What is the recommended agent weight for frequently-used tasks?

---

Use lightweight agents (<3K tokens, <1s init time) for frequent tasks and workers. Golden Rule: "A lightweight agent used 100x > A heavy agent used 10x." Agent weight categories: Lightweight (<3K tokens) for frequent tasks, Medium (10-15K) for analysis/reviews, Heavy (25K+) for architecture/full audits. Match weight to task frequency.
