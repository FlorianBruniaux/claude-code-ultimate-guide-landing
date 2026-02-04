---
id: 08-014
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: claude plugins list
  b: claude plugin
  c: /plugins
  d: claude list plugins
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.5 Plugin System
  anchor: '#plugin-commands'
---

What command lists all installed plugins in Claude Code?

---

Running `claude plugin` (without subcommand) lists all installed plugins with status.

Plugin commands:
- `claude plugin` - List installed plugins
- `claude plugin install <name>` - Install plugin
- `claude plugin enable <name>` - Enable plugin
- `claude plugin disable <name>` - Disable plugin
- `claude plugin uninstall <name>` - Remove plugin
- `claude plugin validate <path>` - Validate plugin manifest
