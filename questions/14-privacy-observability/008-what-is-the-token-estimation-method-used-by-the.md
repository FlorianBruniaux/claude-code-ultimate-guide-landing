---
id: 14-008
category_id: 14
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: API-provided exact counts
  b: ~4 characters per token (heuristic, slightly overestimates)
  c: 1 word = 1 token
  d: Based on file size only
doc_reference:
  file: guide/observability.md
  section: Token Estimation Method
  anchor: '#token-estimation-method'
---

What is the token estimation method used by the session logger?

---

The logger estimates tokens using ~4 characters per token heuristic. This is approximate and tends to slightly overestimate. Claude Code CLI doesn't expose actual API token metrics, so estimates have ~15-25% variance from actual billing.
