---
id: 01-005
category_id: 1
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Mentions another user
  b: References a specific file for targeted operations
  c: Tags a message as important
  d: Activates an agent
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.3 Essential Commands
  anchor: '#file-references-with-'
---

What does the `@` symbol do when used in a prompt?

---

The `@` symbol references specific files in your prompts for targeted operations. For example, `Review @src/auth/login.tsx for security issues` signals Claude to read that file. This provides precision (target exact files), speed (skip file discovery), and clarity (makes your intent explicit). Claude reads the file on-demand via tools.
