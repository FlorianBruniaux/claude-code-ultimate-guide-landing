---
id: 16-011
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: d
options:
  a: +3 to +8%
  b: +30 to +50%
  c: +5 to +10%
  d: +12 to +26%
doc_reference:
  file: guide/core/agent-harness.md
  section: 8. Creator-Verifier Pattern
  anchor: '#8-creator-verifier-pattern'
---

What correctness improvement range does the creator-verifier pattern achieve versus self-verification across documented implementations?

---

Independent verification improves correctness by +12 to +26% versus self-verification across documented implementations including Microsoft Agent Framework, AutoGen Studio, Google ADK, and Playwright Test Agents. The range varies by task type and implementation, but the directional effect is consistent. The structural reason: a model verifying its own output carries the same biases and context as the generating model, so it systematically misses the same class of errors.
