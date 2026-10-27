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
  file: guide/ops/observability.md
  section: Token Estimation Method
  anchor: '#token-estimation-method'
---

What is the token estimation method used by the session logger?

---

The logger estimates tokens using ~4 characters per token heuristic. This is approximate and tends to slightly overestimate. The guide's logger works from tool names, file paths, and text length rather than API usage data, so its estimates have ~15-25% variance from actual billing. For measured figures use /usage, the status line, or OpenTelemetry export.
