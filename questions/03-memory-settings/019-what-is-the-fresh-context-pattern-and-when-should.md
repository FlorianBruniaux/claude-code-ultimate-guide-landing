---
id: 03-019
category_id: 3
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Clearing browser cache before testing
  b: Starting a new session with clean context after implementation phase to avoid
    accumulated noise
  c: Resetting git to a clean state
  d: Deleting the .claude folder to start fresh
doc_reference:
  file: guide/ultimate-guide.md
  section: Fresh Context Pattern
  anchor: '#fresh-context-pattern'
---

What is the 'Fresh Context Pattern' and when should you use it?

---

The Fresh Context Pattern means starting a new Claude Code session between exploration and implementation phases. During exploration, context accumulates noise (dead ends, rejected approaches, debugging output). A fresh session gives Claude clean context focused purely on implementation, improving output quality.
