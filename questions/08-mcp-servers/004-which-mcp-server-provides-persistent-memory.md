---
id: 08-004
category_id: 8
difficulty: power
profiles:
- power
correct: c
options:
  a: Context7
  b: Postgres
  c: Serena
  d: Sequential Thinking
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.2 Available Servers
  anchor: '#session-memory-workflow'
---

Which MCP server provides persistent memory across sessions?

---

Serena provides session memory that persists across conversations.

Serena memory tools:
- `write_memory` - Save context for future sessions
- `read_memory` - Retrieve saved context
- `list_memories` - List all stored memories

Memory is stored in `.serena/memories/` and survives between Claude Code sessions.
This is crucial for maintaining context on long-running projects.
