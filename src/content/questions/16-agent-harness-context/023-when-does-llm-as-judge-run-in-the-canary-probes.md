---
id: 16-023
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: On every probe to ensure thoroughness
  b: Only on probes where cosine similarity drops below 0.85
  c: On probes where the diff exceeds 100 tokens
  d: Never (cosine similarity alone is sufficient)
doc_reference:
  file: guide/core/context-engineering.md
  section: 11. Loop Closure - PR-Based Curation
  anchor: '#ab-canary-probes'
---

In the ACE-v2 A/B canary probe process, when does LLM-as-judge run?

---

The canary process runs cosine similarity as a first pass on all probe outputs. LLM-as-judge runs only on probes where similarity drops below 0.85, because those are the cases with divergence large enough to warrant qualitative evaluation. This keeps canary costs near zero for most PRs while reserving expensive LLM judgment for edge cases that actually warrant it. Running LLM-as-judge on every probe would make the canary process prohibitively expensive.
