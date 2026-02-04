---
id: 14-002
category_id: 14
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Only your prompts
  b: Prompts, files Claude reads, MCP results, Bash outputs, error messages
  c: Only code snippets you copy-paste
  d: Hashed metadata only
doc_reference:
  file: guide/data-privacy.md
  section: What Leaves Your Machine
  anchor: '#what-leaves-your-machine'
---

What data is sent to Anthropic when using Claude Code?

---

Everything Claude sees is sent: your prompts, files Claude reads (including .env if not excluded!), MCP server results (SQL queries, API responses), Bash command outputs, and error messages with stack traces. Use permissions.deny to block sensitive files.
