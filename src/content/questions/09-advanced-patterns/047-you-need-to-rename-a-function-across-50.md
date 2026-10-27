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

Haiku 4.5, the haiku alias on the cloud providers, has no effort parameter; Haiku 5.5 does support effort levels. A lighter model is a candidate for bounded changes when the references and acceptance checks are clear. Verify the diff and tests; renames can still affect public APIs, dynamic references, or generated files. For scale, standard input rates are $0.10/MTok for Haiku 5.5 (up to 100K input tokens) versus $4/MTok for Opus 5.5.
