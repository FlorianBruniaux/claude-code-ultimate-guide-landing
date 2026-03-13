---
id: 03-022
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: They are equivalent — both block the same operations
  b: Simple patterns block the tool entirely; tool-qualified patterns only warn
  c: Tool-qualified format requires a regex while simple patterns use globs
  d: Tool-qualified format matches the full path argument; simple string matches only exact file names
doc_reference:
  file: guide/ultimate-guide.md
  section: Permission Patterns
  anchor: '#permission-patterns'
---

What is the key difference between `"Read(file_path:*.env*)"` and `"*.env"` in `permissions.deny`?

---

The tool-qualified format `Read(file_path:*.env*)` matches against the **full path argument** passed to the Read tool, using glob patterns. The simple string form `"*.env"` only matches exact file names. For example, `Read(file_path:*.env*)` would block reads of `.env.production` or `config/.env.local`, while `"*.env"` would only block a file literally named `.env`. The tool-qualified format is more granular and recommended for sensitive file protection.
---
