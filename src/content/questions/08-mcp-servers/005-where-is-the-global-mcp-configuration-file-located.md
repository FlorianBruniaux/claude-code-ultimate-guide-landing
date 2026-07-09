---
id: 08-005
category_id: 8
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: ~/.mcp/config.json
  b: ~/.claude.json
  c: /etc/claude/mcp.json
  d: ~/.config/claude/mcp.json
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.3 Configuration
  anchor: '#mcpjson-location'
---

Where is the global MCP configuration file located?

---

The global (user-scope) MCP configuration lives in `~/.claude.json` under the `mcpServers` field.

Configuration locations:
- `~/.claude.json` - User scope (applies across your projects)
- `.mcp.json` in the project root - Project scope (shared with the team)

Claude Code explicitly does NOT read paths like `~/.claude/mcp.json` or `~/.claude/config/mcp.json`. Servers are normally registered via `claude mcp add`.
