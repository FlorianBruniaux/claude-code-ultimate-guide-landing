---
id: 16-029
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: Rule present in more than 50% of developer profiles
  b: Rule present in more than 80% of developer profiles
  c: Rule present in all developer profiles
  d: Rule present in at least 3 developer profiles
doc_reference:
  file: guide/core/context-engineering.md
  section: 14. Multi-dev Profile Reconciliation
  anchor: '#detection'
---

In multi-dev profile reconciliation, at what threshold does a rule become a "hoist candidate" for the shared project config?

---

A rule appearing in more than 50% of individual developer profiles is a hoist candidate: it belongs in the shared project-level CLAUDE.md rather than duplicated across profiles. The 80% figure applies to ejection's profile overlap heuristic (consolidation proposals), not to the reconciliation threshold. The reconciliation check distinguishes behavioral rules (hoist candidates above threshold) from preference rules (tone, verbosity) which are never hoisted regardless of frequency.
