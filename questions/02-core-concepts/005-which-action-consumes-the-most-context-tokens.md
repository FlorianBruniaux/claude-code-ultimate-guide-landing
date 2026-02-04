---
id: 02-005
category_id: 2
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Reading a small file (~500 tokens)
  b: Running a simple command (~1K tokens)
  c: Reading a large file or multi-file search (~5K+ tokens)
  d: Sending a short message
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.2 Context Management
  anchor: '#what-consumes-context'
---

Which action consumes the MOST context tokens?

---

Reading large files (5K+ tokens) and multi-file searches (3K+ tokens) consume the most context. A small file costs ~500 tokens, running commands ~1K tokens. Long conversations accumulate over time. To optimize, be specific in queries, use symbol references like "read the calculateTotal function" instead of entire files.
