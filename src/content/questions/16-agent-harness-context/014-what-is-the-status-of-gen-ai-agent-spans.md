---
id: 16-014
category_id: 16
difficulty: power
profiles:
- senior
- power
correct: a
options:
  a: Experimental (attributes may be renamed before stabilization)
  b: Stable since 2024
  c: Deprecated in favor of gen_ai.client
  d: Draft (no production implementations yet)
doc_reference:
  file: guide/core/agent-harness.md
  section: 6. Observability Stack
  anchor: '#otel-genai-conventions-may-2026-status'
---

What is the practical implication of `gen_ai.agent` spans being marked Experimental in the OTel GenAI conventions as of May 2026?

---

`gen_ai.agent` spans are Experimental, meaning attributes like `gen_ai.agent.name` and `gen_ai.agent.id` may be renamed or restructured before the spec stabilizes. Production harnesses using agent spans today should plan for a remapping cost when stabilization happens. OpenInference (Arize) and OpenLLMetry (Traceloop) provide a stable schema layer on top of the evolving OTel spec to absorb this cost, which is why the guide recommends them for production agent observability.
