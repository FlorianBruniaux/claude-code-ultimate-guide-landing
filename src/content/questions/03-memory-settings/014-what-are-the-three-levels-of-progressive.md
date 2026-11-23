---
id: 03-014
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Admin, User, Guest
  b: Beginner (very restrictive), Intermediate, Advanced
  c: Read, Write, Execute
  d: Low, Medium, High
doc_reference:
  file: guide/ultimate-guide.md
  section: permissions.allow / permissions.deny Configuration
  anchor: '#permissionsallow--permissionsdeny-configuration'
---

What are the three levels of progressive permission rules in permissions.allow?

---

The three progressive permission levels are: Beginner (very restrictive - only Read, Grep, Glob), Intermediate (adds Bash git/pnpm commands), and Advanced (adds Edit, Write, WebFetch, Agent). Start restrictive and expand as you gain confidence. This prevents accidents while learning.
