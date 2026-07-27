---
id: 08-026
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
  anchor: "#mcp-configuration-location"
---

Where is the user-scope MCP configuration stored?

---

MCP servers are configured in `~/.claude.json` under the `"mcpServers"` field.

Configuration locations:
- `~/.claude.json` (field `"mcpServers"`) - User/local scope
- `.mcp.json` at project root - Project scope (shareable via VCS)

The configuration specifies which servers to run and their settings.
