---
id: 16-020
category_id: 16
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: Syntactic
  b: Procedural
  c: Semantic
  d: Alignment
doc_reference:
  file: guide/core/context-engineering.md
  section: 10. Signal Taxonomy and Causal Attribution
  anchor: '#signal-categories'
---

In the ACE-v2 signal taxonomy, a "Write-before-Read violation" belongs to which category?

---

A Write-before-Read violation is a procedural signal: it represents a rule conflict or missing step in the execution phase sequence. Procedural events are caused by the agent skipping or misordering steps that the configuration defines as required. Syntactic would be a malformed tool call. Semantic would be a user rejecting the output. Alignment would be a tone violation or out-of-scope change.
