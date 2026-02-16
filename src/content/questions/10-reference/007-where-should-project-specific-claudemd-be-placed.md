---
id: 10-007
category_id: 10
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
  d: ~/.config/claude/project.md
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.3 Configuration Reference
  anchor: '#claudemd-locations'
---

Where should project-specific CLAUDE.md be placed (committed to git)?

---

CLAUDE.md locations:

| Location | Scope | Committed |
|----------|-------|-----------|
| `~/.claude/CLAUDE.md` | All projects | N/A (global) |
| `/project/CLAUDE.md` | This project | **Yes** |
| `/project/.claude/CLAUDE.md` | Personal | No |

The root `CLAUDE.md` is committed and shared with the team.
The `.claude/CLAUDE.md` is personal and should be in `.gitignore`.
