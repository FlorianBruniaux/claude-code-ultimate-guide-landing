---
id: 09-030
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: You cannot exceed 150K tokens in a single CLAUDE.md file
  b: The model stops responding after 150 consecutive instructions
  c: When instruction count exceeds roughly 150, attention becomes unreliable and adherence drops sharply
  d: Claude Code enforces a hard 150-rule limit and refuses to load more
doc_reference:
  file: guide/core/context-engineering.md
  section: The Context Budget
  anchor: '#2-the-context-budget'
---

What is the "150-instruction ceiling" in context engineering?

---

The 150-instruction ceiling refers to the approximate point at which transformer attention becomes unreliable for maintaining adherence to all instructions simultaneously. Research and community data (HumanLayer: 15-25% adherence on large instruction sets) show that once the number of always-on instructions exceeds roughly 150, Claude begins missing rules or applying them inconsistently. The fix is path-scoping — loading rules only when relevant files are in scope — to keep the effective instruction count well below the ceiling.
---