---
id: 16-018
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
- pm
correct: c
options:
  a: Rules exceed 100 lines and adherence degrades
  b: No verification mechanism exists for rule compliance
  c: Works for solo developers but breaks at team scale
  d: Context window is exhausted too quickly
doc_reference:
  file: guide/core/context-engineering.md
  section: 9. Maturity Assessment
  anchor: '#9-maturity-assessment'
---

What is the documented failure mode of Level 2 ("Structured config") on the maturity scale?

---

Level 2 works well in a solo context because one developer controls the whole config and intuitively knows what each section means. It breaks at team scale because multiple developers editing the same root CLAUDE.md creates coordination friction, conflicting conventions, and loss of the shared mental model. The ~100-line degradation is the L1 failure mode. No verification is the L3 failure mode. Context exhaustion is handled at the token optimization layer, not the maturity model.
