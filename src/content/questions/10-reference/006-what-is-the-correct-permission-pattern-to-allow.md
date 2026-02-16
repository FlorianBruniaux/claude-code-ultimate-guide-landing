---
id: 10-006
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Bash(git)
  b: Bash(git *)
  c: git:*
  d: Bash(*git*)
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.3 Configuration Reference
  anchor: '#permission-patterns'
---

What is the correct permission pattern to allow ALL git commands?

---

The pattern `Bash(git *)` allows any git command.

Permission pattern examples:
- `Bash(git *)` - Any git command
- `Bash(npm test)` - Exactly "npm test"
- `Edit` - All file edits
- `mcp__serena__*` - All Serena tools

Wildcards (*) enable flexible permission matching.
