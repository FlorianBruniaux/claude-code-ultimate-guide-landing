---
id: 16-012
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: The verifier model is slower than the generator
  b: The generator and verifier share the same biases and context, missing the same error class
  c: Self-verification increases latency beyond acceptable thresholds
  d: The verifier lacks access to the original requirements
doc_reference:
  file: guide/core/agent-harness.md
  section: 8. Creator-Verifier Pattern
  anchor: '#8-creator-verifier-pattern'
---

Why does self-verification fail structurally in the creator-verifier framework?

---

The model that generated the output carries the same biases and context as the model that reviews it. A fresh model instance, given only the artifact and the success criteria, is structurally different from self-review because it hasn't already committed to the reasoning path that produced the output. This is why the pattern requires no shared context between creator and verifier: shared context is the mechanism that reintroduces the same blind spots.
