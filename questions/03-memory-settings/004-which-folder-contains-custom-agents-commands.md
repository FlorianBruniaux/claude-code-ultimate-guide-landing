---
id: 03-004
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: ~/.claude/
  b: /project/CLAUDE.md
  c: /project/.claude/
  d: /project/config/
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.2 The .claude/ Folder Structure
  anchor: '#full-structure'
---

Which folder contains custom agents, commands, hooks, and skills?

---

The `.claude/` folder in your project contains: agents/ (custom agent definitions), commands/ (custom slash commands), hooks/ (event-driven scripts), skills/ (knowledge modules), rules/ (auto-loaded conventions), and settings files. This is your project's Claude Code configuration directory for all extensions.
