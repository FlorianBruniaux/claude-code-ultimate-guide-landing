---
id: 16-003
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: a
options:
  a: 37%
  b: 60%
  c: 22%
  d: 50%
doc_reference:
  file: guide/core/agent-harness.md
  section: 2.3 Tool Registry
  anchor: '#23-tool-registry'
---

According to Anthropic's internal data cited in the guide, what token reduction does dynamic tool dispatch achieve versus static loading of all tool schemas?

---

Anthropic's internal data cites a 37% reduction in token usage from dynamic tool dispatch versus loading all schemas on every call. The logic is intuitive: giving the model 40 tool schemas when only 4 are relevant for the current task adds noise and cost. The guide notes this number is not independently replicated, but the directional claim is credible.
