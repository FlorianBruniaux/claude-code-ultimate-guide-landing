---
id: 12-020
category_id: 12
difficulty: power
profiles:
  - power
correct: b
options:
  a: Measuring the maximum number of tokens that can drift before a session crashes
  b: A statistical test comparing the distribution of recent token embeddings to a baseline distribution to detect semantic drift in ongoing conversations
  c: Tracking the maximum memory distance between two related CLAUDE.md files
  d: A compression algorithm that minimizes mean deviation in context summaries
doc_reference:
  file: guide/core/architecture.md
  section: Context Drift Detection
---

What is MMD (Maximum Mean Discrepancy) used for in context drift detection?

---

MMD (Maximum Mean Discrepancy) is a kernel-based statistical test that compares two distributions without assuming a parametric form. In context drift detection: you embed tokens/messages from a baseline window and a recent window, then compute MMD between the two distributions. A high MMD score indicates the conversation has drifted semantically from its original topic, a signal to /compact or start a fresh session. Threshold: MMD > 0.3 typically warrants intervention. More robust than cosine distance for multi-modal drift.
