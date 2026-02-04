---
id: 10-002
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Ctrl+Z
  b: Esc (double-tap)
  c: Ctrl+R
  d: Alt+Z
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.2 Keyboard Shortcuts
  anchor: '#session-control'
---

What keyboard shortcut rewinds to a previous checkpoint (undo Claude's changes)?

---

Double-tap `Esc` (Esc×2) rewinds to the previous checkpoint.

This is equivalent to the `/rewind` command.
It undoes Claude's recent changes in the current session without creating git commits.

Use when Claude made a mistake and you want to try a different approach.
