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
  section: 1.3 Essential Commands
  anchor: '#context-preservation'
official_doc: https://code.claude.com/docs/en/how-claude-code-works
---

When resuming a Claude Code session, what context is preserved?

---

When you resume a session, Claude retains: full conversation history, files previously read/edited, CLAUDE.md and project settings, and uncommitted code changes awareness. MCP servers restart on each session - their state is NOT preserved. Session-scoped permissions also don't carry over.
