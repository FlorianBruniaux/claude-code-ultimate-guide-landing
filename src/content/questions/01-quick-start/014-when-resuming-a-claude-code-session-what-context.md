---
id: 01-014
category_id: 1
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Only the conversation history
  b: Full conversation history, files read/edited, CLAUDE.md settings
  c: Just the last 10 messages
  d: Only files that were modified
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.2 Session Continuation and Resume
  line: 753-761
official_doc: https://code.claude.com/docs/en/how-claude-code-works
---

When resuming a Claude Code session, what context is preserved?

---

When you resume a session (via `claude -c` or `claude -r <id>`), Claude retains:
- ✅ Full conversation history
- ✅ Files previously read/edited
- ✅ CLAUDE.md and project settings
- ✅ Uncommitted code changes awareness
- ✅ MCP server state (if Serena is used)

**Not preserved**:
- ❌ Session-scoped permissions (must re-approve)
- ❌ Standard MCP server state (Serena exception)
