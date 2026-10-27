---
id: 03-022
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Both block every Read call, because the specifier in parentheses is ignored
  b: The bare rule only warns, while the specifier version blocks
  c: The bare rule matches every Read call, while the specifier version matches only reads of the `.env` file
  d: The specifier version matches any file that has `.env` anywhere in its path
doc_reference:
  file: guide/ultimate-guide.md
  section: Permission Patterns
  anchor: '#permission-patterns'
---

What does the rule `"Read(./.env)"` match in `permissions.deny`, compared with a bare `"Read"` rule?

---

Permission rules use the format `Tool` or `Tool(specifier)`. A bare `Read` matches every read, while `Read(./.env)` matches only reads of the `.env` file. `Bash(npm run *)` and `WebFetch(domain:example.com)` follow the same pattern for their tools. Claude Code evaluates `deny` rules first, then `ask`, then `allow`, and the first match decides, so a deny rule cannot be overridden by a broader allow rule.
---
