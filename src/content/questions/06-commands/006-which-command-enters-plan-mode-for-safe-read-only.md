---
id: 06-006
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: /safe
  b: /readonly
  c: /plan
  d: /explore
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.1 Slash Commands
  anchor: '#built-in-commands'
official_doc: https://code.claude.com/docs/en/commands
---

Which command enters Plan Mode for safe, read-only exploration?

---

The `/plan` command enters Plan Mode, where Claude can analyze and explore
the codebase without making any changes.

This is ideal for:
- Understanding unfamiliar codebases
- Architectural analysis before changes
- Safe exploration of risky operations

Exit Plan Mode by approving the plan Claude presents, or with `Shift+Tab`.
There is no `/execute` command in Claude Code.
