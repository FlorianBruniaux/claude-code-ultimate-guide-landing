---
id: 03-001
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Global > Project > Local
  b: Local (.claude/CLAUDE.md) > Project (/project/CLAUDE.md) > Global (~/.claude/CLAUDE.md)
  c: Project > Local > Global
  d: All CLAUDE.md files have equal priority
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.4 Precedence Rules
  anchor: '#claudemd-precedence'
official_doc: https://code.claude.com/docs/en/memory
---

What is the correct precedence order for CLAUDE.md files (highest to lowest priority)?

---

The precedence is: Local (.claude/CLAUDE.md) > Project (/project/CLAUDE.md) > Global (~/.claude/CLAUDE.md). More specific beats more general. Local overrides are personal (gitignored), project settings are shared (committed), and global settings apply to all projects. This hierarchy allows personal preferences to override team conventions when needed.
