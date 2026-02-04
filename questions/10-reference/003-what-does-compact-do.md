---
id: 10-003
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Compresses files on disk
  b: Summarizes and compresses the conversation context
  c: Minimizes the terminal window
  d: Reduces Claude's response length
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Commands Table
  anchor: '#built-in-commands'
---

What does `/compact` do?

---

`/compact` summarizes and compresses the conversation context.

Use `/compact` when:
- Context usage reaches 70-90%
- Responses become slow
- Claude starts forgetting earlier context

This frees up context space while preserving important information.
Check context usage with `/status`.
