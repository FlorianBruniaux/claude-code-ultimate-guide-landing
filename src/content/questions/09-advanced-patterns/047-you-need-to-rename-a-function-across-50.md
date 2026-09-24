---
id: 09-047
category_id: 9
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: Haiku 4.5 with max effort
  b: Haiku 4.5 with xhigh effort
  c: Haiku 4.5 without an effort parameter, followed by tests and diff review
  d: Every rename requires Fable
doc_reference:
  file: guide/ultimate-guide.md
  section: Decision Table
  anchor: '#decision-table'
---

Which model setting is valid for a bounded rename with a verified reference list?

---

Haiku 4.5 has no effort parameter. It is a candidate for bounded changes when the references and acceptance checks are clear. Verify the diff and tests; renames can still affect public APIs, dynamic references, or generated files. Standard input rates are $1/MTok for Haiku 4.5 versus $4/MTok for Opus 5.5, not a 60-fold difference.
