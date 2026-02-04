---
id: 03-005
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Ask for confirmation each time
  b: Auto-approve without asking
  c: Block completely
  d: Log but allow
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.3 Settings & Permissions
  anchor: '#permission-behavior'
---

What is the permission behavior for tools listed in the 'deny' category?

---

Tools in the 'deny' category are blocked completely - Claude cannot use them at all. The three permission behaviors are: 'allow' (auto-approve without asking), 'deny' (block completely), and 'ask' (prompt for confirmation). For example, denying "Bash(rm -rf *)" prevents accidental destructive operations.
