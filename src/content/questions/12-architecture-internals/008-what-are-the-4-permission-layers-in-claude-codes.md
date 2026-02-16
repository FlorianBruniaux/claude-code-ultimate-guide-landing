---
id: 12-008
category_id: 12
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: User, Admin, System, Root
  b: Interactive prompts, Allow/Deny rules, Hooks, Sandbox
  c: Read, Write, Execute, Delete
  d: Local, Project, Global, Enterprise
doc_reference:
  file: guide/architecture.md
  section: Permission & Security Model
  anchor: '#5-permission--security-model'
---

What are the 4 permission layers in Claude Code's security model?

---

Claude Code has 4 layered security: (1) Interactive prompts (allow once/always/deny), (2) Allow/Deny rules in settings.json, (3) Hooks (Pre/Post execution scripts), (4) Sandbox mode (filesystem + network isolation). Each layer adds protection.
