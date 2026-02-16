---
id: 10-010
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: /info
  b: /status
  c: /stats
  d: /session
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Commands Table
  anchor: '#built-in-commands'
---

What command shows session info including context usage and cost?

---

The `/status` command shows session information.

Output includes:
- Model being used
- Context usage percentage
- Session cost
- Token counts

Example output:
`Model: Sonnet | Ctx: 45.2k | Cost: $1.23 | Ctx(u): 42.0%`

Use `/stats` for usage statistics with activity graphs.
