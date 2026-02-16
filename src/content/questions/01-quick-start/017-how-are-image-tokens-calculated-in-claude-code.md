---
id: 01-017
category_id: 1
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: file_size_bytes / 1000
  b: (width × height) / 750
  c: pixels / 1000
  d: Fixed 500 tokens per image
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.3 Essential Commands
  anchor: '#image-resolution-guidelines'
---

How are image tokens calculated in Claude Code?

---

Token calculation formula: (width × height) / 750 ≈ tokens consumed. Examples: 200×200 = ~54 tokens, 500×500 = ~334 tokens, 1000×1000 = ~1334 tokens. This helps estimate context impact before pasting images. Use /status after pasting to monitor actual context usage.
