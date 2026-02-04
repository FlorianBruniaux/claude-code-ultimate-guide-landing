---
id: 06-001
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: ~/.claude/commands/
  b: .claude/commands/
  c: /usr/local/claude/commands/
  d: .claude/config/commands/
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.2 Creating Custom Commands
  anchor: '#62-creating-custom-commands'
official_doc: https://code.claude.com/docs/en/slash-commands
---

Where should custom commands be placed to make them available in Claude Code?

---

Custom commands are placed in `.claude/commands/` within your project directory.

This allows project-specific commands that can be committed with your codebase.
The global directory `~/.claude/` is for personal settings, not project commands.

Commands are organized in subdirectories:
- `.claude/commands/tech/` for development workflows
- `.claude/commands/product/` for product workflows
