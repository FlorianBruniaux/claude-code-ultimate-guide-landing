---
id: 03-034
category_id: 3
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Delete the oldest entries to stay under the limit
  b: Archive stale entries to separate files, merge duplicates, and keep the index to short pointer lines under 150 chars each
  c: Create a second MEMORY.md file as MEMORY2.md to extend capacity
  d: Increase the limit by adding a setting in settings.json
doc_reference:
  file: guide/ultimate-guide.md
  section: MEMORY.md Structure
  anchor: "#memorymd-structure"
---

What is the correct approach when MEMORY.md index approaches 200 lines?

---

When MEMORY.md approaches 200 lines: archive stale memories (move outdated content to an archive file but remove the index pointer), merge duplicates (two entries about the same topic → one updated entry), and ensure each index line is short (under ~150 chars) — the index is just pointers, not content. MEMORY.md is an index file; the actual content lives in individual memory files. Never create a second MEMORY.md — there is no MEMORY2.md support.
