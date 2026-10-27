---
id: 08-014
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: claude plugin installed
  b: claude plugin list
  c: /plugins-list
  d: claude list plugins
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.5 Plugin System
  anchor: '#plugin-commands'
---

What command lists all installed plugins in Claude Code?

---

`claude plugin list` lists your installed plugins. `claude plugins` is an alias of `claude plugin`, and inside a session `/plugin list` does the same.

Plugin commands:
- `claude plugin list` - List installed plugins
- `claude plugin install <name>` - Install plugin
- `claude plugin enable <name>` - Enable plugin
- `claude plugin disable <name>` - Disable plugin
- `claude plugin validate <path>` - Validate plugin manifest
