---
id: 03-002
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: ~/.claude/CLAUDE.md
  b: /project/.claude/CLAUDE.md
  c: /project/CLAUDE.md
  d: /project/.claude/settings.local.json
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.1 Memory Files (CLAUDE.md)
  anchor: '#level-2-project-projectclaudemd'
official_doc: https://code.claude.com/docs/en/memory
---

Where should team conventions be stored to be shared via version control?

---

Team conventions should be stored in `/project/CLAUDE.md` (the project root). This file is committed to git and shared with the team. Local overrides go in `/project/.claude/CLAUDE.md` (gitignored), and personal global preferences go in `~/.claude/CLAUDE.md`. This separation ensures team standards are enforced while allowing personal customization.
