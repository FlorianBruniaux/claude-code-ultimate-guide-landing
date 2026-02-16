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
  b: ~/.claude/mcp.json
  c: /etc/claude/mcp.json
  d: ~/.config/claude/mcp.json
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.3 Configuration
  anchor: '#mcpjson-location'
---

Where is the global MCP configuration file located?

---

The global MCP configuration is at `~/.claude/mcp.json`.

Configuration locations:
- `~/.claude/mcp.json` - Global (applies to all projects)
- `/project/.claude/mcp.json` - Project-specific (overrides global)

The configuration specifies which servers to run and their settings.
