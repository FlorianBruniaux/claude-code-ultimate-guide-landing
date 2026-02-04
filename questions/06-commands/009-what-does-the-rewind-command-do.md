---
id: 06-009
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Restores a previous git commit
  b: Undoes Claude's recent changes in the current session
  c: Clears the entire conversation history
  d: Rolls back the last command execution
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.1 Slash Commands
  anchor: '#built-in-commands'
---

What does the `/rewind` command do?

---

The `/rewind` command undoes Claude's recent changes in the current session.

Key points:
- Works only for uncommitted changes made by Claude
- Does NOT create git commits
- Use when Claude made a mistake and you want to try a different approach

For committed changes, use `git revert` instead.
The keyboard shortcut `Esc×2` (double-tap Escape) also triggers rewind.
