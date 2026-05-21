---
id: 16-013
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: c
options:
  a: Experimental
  b: Deprecated
  c: Stable
  d: Draft
doc_reference:
  file: guide/core/agent-harness.md
  section: 6. Observability Stack
  anchor: '#otel-genai-conventions-may-2026-status'
---

What is the OTel GenAI convention status of `gen_ai.client` spans as of May 2026?

---

`gen_ai.client` spans are marked Stable in the OTel GenAI conventions as of May 2026. This means production harnesses can safely depend on `gen_ai.request.model`, `gen_ai.usage.input_tokens`, and `gen_ai.usage.output_tokens` attributes without expecting breaking changes. This is in contrast to `gen_ai.agent` spans, which are still Experimental and may have attributes renamed or restructured before stabilization.
