---
id: 02-007
category_id: 2
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: When context usage reaches 100%
  b: When information from one task contaminates another
  c: When Claude forgets your instructions
  d: When files get corrupted
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.2 Context Poisoning (Bleeding)
  line: 2015-2044
---

What is 'context poisoning' (also called context bleeding)?

---

Context poisoning occurs when information from one task contaminates another. Examples include: style bleeding (blue button style applies to unrelated forms), instruction contamination (conflicting rules cause confusion), and temporal confusion (Claude uses outdated file names). Use explicit task boundaries and clarify priorities to prevent it.
