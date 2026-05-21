---
id: 16-015
category_id: 16
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Level 0
  b: Level 1
  c: Level 2
  d: Level 3
doc_reference:
  file: guide/core/context-engineering.md
  section: 9. Maturity Assessment
  anchor: '#9-maturity-assessment'
---

On the L0-L5 context engineering maturity scale, at which level does a flat CLAUDE.md start degrading after approximately 100 lines?

---

Level 1 is "Flat config": a single CLAUDE.md with no structure. The failure mode is that rules pile up and adherence degrades after around 100 lines. Level 0 has no configuration at all. Level 2 adds structured sections but still lives in a single file per scope. The ~100-line degradation threshold is one of the few empirically observed limits in context engineering, matching the diminishing returns of long rule lists before chunking or path-scoping.
