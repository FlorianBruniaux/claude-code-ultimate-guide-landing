---
id: 10-025
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: A list of all active MCP server connections with ping times
  b: Actionable suggestions — context-heavy tools, memory bloat warnings, and optimization tips
  c: The full session transcript compressed to a summary
  d: A breakdown of token usage by file type
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.74
  anchor: '#v2174'
---

What actionable information does the updated `/context` command now provide (v2.1.74)?

---

The v2.1.74 `/context` command upgrade added **actionable suggestions** alongside the existing context usage display. It identifies context-heavy tools consuming disproportionate tokens, flags memory bloat, surfaces capacity warnings, and provides specific optimization tips to reduce context usage. This makes `/context` not just a passive meter but an active advisor for managing context health during long sessions.
---
