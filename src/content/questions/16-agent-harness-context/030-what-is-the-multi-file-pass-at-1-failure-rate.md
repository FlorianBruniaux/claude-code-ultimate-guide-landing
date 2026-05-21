---
id: 16-030
category_id: 16
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: 5.2%
  b: 19.4%
  c: 32.1%
  d: 41.5%
doc_reference:
  file: guide/roles/ai-roles.md
  section: 17. Spec Engineer
  anchor: '#17-spec-engineer'
---

According to the guide, what is the pass@1 failure rate for multi-file agent tasks without a specification?

---

Multi-file tasks fail at 19.4% pass@1 without a spec. This is the quantitative case for the Spec Engineer role: as organizations move agents into multi-file implementation work, the absence of a structured specification becomes the primary driver of output quality failures. The 32.1% figure is Claude Code's pass rate on the c-CRAB benchmark (pull requests with test suites), a different metric.
