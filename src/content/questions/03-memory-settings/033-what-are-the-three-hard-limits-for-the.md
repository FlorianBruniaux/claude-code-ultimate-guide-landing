---
id: 03-033
category_id: 3
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: 100 lines, 10KB, 50 files
  b: 200 lines (index cap), 25KB (file size max), 200 files (directory cap)
  c: 500 lines, 100KB, 1000 files
  d: 50 lines, 5KB, 20 files
doc_reference:
  file: guide/ultimate-guide.md
  section: MEMORY.md Structure
  anchor: "#memorymd-structure"
---

What are the three hard limits for the MEMORY.md auto-memory system?

---

MEMORY.md auto-memory has three hard limits: (1) 200-line cap: lines beyond 200 in MEMORY.md are truncated and never loaded into context; (2) 25KB max per memory file: larger files are split or truncated; (3) 200-file directory cap: the memory directory is capped at 200 individual memory files. These limits exist to prevent the memory system from consuming too much context window. Manage proactively: archive old memories, merge duplicates, keep the index concise.
