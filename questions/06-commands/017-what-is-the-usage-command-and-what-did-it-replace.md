---
id: 06-017
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: A new alias for /help showing tool usage statistics
  b: The merged successor of /cost and /stats, showing token counts, session cost, and usage graphs (both remain as shortcuts)
  c: A command that shows Claude's current memory usage in MB
  d: A replacement for /compact with usage analytics
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Commands Table
  anchor: '#built-in-commands'
---

What is the `/usage` command and what did it replace?

---

`/usage` is the **unified session dashboard** that merged `/cost` (token spend) and `/stats` (activity chart and streak) into a single command. Both `/cost` and `/stats` still function as shortcuts that redirect to `/usage` — no workflow breaks. `/usage` shows: model in use, context percentage, token counts, session cost, and activity graphs. Use it whenever you'd previously have run both `/cost` and `/stats` separately.
