---
id: 03-003
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Store team hook configurations
  b: Define project-wide settings
  c: Personal permission overrides (gitignored)
  d: Configure MCP servers for the team
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.3 Settings & Permissions
  anchor: '#settingslocaljson-personal-permissions'
official_doc: https://code.claude.com/docs/en/memory
---

What is the purpose of settings.local.json?

---

settings.local.json stores personal permission overrides and is gitignored. It allows you to customize which tools are auto-allowed, denied, or require asking for your personal workflow without affecting team settings. For example, you might allow all git commands while the team requires confirmation for certain operations.
