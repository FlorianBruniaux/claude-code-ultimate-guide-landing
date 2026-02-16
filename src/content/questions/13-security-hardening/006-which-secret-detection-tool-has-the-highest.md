---
id: 13-006
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: TruffleHog
  b: GitGuardian
  c: Gitleaks
  d: detect-secrets
doc_reference:
  file: guide/security-hardening.md
  section: Tool Comparison
  anchor: '#tool-comparison'
---

Which secret detection tool has the highest recall (88%) but lower precision (46%)?

---

Gitleaks: 88% recall, 46% precision, fast (~2 min/100K commits) - best for pre-commit hooks. TruffleHog: 52% recall, 85% precision, slow - best for CI verification. GitGuardian: 80% recall, 95% precision - enterprise monitoring. detect-secrets: 60% recall, 98% precision - baseline approach.
