---
id: 03-009
category_id: 3
difficulty: power
profiles:
- power
correct: b
options:
  a: Claude's ability to remember across sessions
  b: Temporarily modifying CLAUDE.md for specific tasks, then restoring
  c: Automatic memory compression
  d: Syncing memory between devices
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.3 Settings & Permissions
  anchor: '#dynamic-memory-profile-switching'
official_doc: https://code.claude.com/docs/en/permissions
---

What is 'Dynamic Memory' (Profile Switching)?

---

Dynamic Memory means temporarily modifying CLAUDE.md for specific tasks then restoring it. Techniques include: git stash (stash original, modify, restore), profile library (keep profiles like security-audit.md, debugging.md in ~/.claude/profiles/), or parallel instances (different CLAUDE.md in different worktrees). Switch profiles with a script: `claude-profile security-audit`.
