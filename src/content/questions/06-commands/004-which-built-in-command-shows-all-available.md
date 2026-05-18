---
id: 06-004
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: /commands
  b: /list
  c: /help
  d: /show
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.1 Slash Commands
  anchor: '#61-slash-commands'
official_doc: https://code.claude.com/docs/en/slash-commands
---

Which built-in command shows all available commands including custom ones?

---

The `/help` command displays all available commands, both built-in and custom.

Built-in commands include:
- `/clear` - Clear conversation
- `/compact` - Summarize context
- `/status` - Show session info
- `/plan` - Enter Plan Mode
- `/rewind` - Undo changes

User-invocable skills from `.claude/skills/` (with `disable-model-invocation: true`) are also listed here. Since CC 2.1.3, custom slash commands live in `.claude/skills/` rather than `.claude/commands/`.
