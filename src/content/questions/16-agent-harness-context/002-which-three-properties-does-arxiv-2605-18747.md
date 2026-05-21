---
id: 16-002
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Reliability, scalability, security
  b: Executability, inspectability, statefulness
  c: Observability, traceability, recoverability
  d: Determinism, repeatability, auditability
doc_reference:
  file: guide/core/agent-harness.md
  section: 1. Three Foundational Properties
  anchor: '#1-three-foundational-properties'
---

Which three properties does arXiv 2605.18747 ("Code as Agent Harness") say distinguish a harness from a simple LLM wrapper?

---

The paper formalizes three properties: executability (the harness can verify what the agent actually did, not just what it claimed), inspectability (failures produce actionable diagnostic output rather than requiring session reconstruction), and statefulness (session state is externalized so the agent can resume after a context reset). The other options describe desirable system qualities but are not the paper's three-property definition.
