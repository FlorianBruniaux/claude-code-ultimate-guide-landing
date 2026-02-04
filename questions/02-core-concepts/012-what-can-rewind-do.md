---
id: 02-012
category_id: 2
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Undo git commits
  b: Revert Claude's file changes within the current session
  c: Go back in conversation history
  d: Restore deleted files from disk
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.4 Rewind
  anchor: '#24-rewind'
---

What can /rewind do?

---

/rewind reverts file changes made by Claude. It works across multiple files but only on Claude's changes (not manual edits), only within the current session, and does NOT automatically revert git commits. For risky operations, create a git checkpoint first: "Let's commit what we have before trying this experimental approach."
