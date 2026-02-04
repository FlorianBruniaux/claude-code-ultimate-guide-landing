---
id: 10-008
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Disables MCP servers
  b: Debugs MCP server connections with verbose output
  c: Tests MCP configurations
  d: Enables MCP auto-discovery
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.4 Troubleshooting
  anchor: '#mcp-debugging-techniques'
---

What does the --mcp-debug flag do?

---

The `--mcp-debug` flag enables debug mode for MCP server connections.

MCP debugging techniques:
```bash
claude --mcp-debug  # Debug all MCP connections
/mcp               # View MCP status inside Claude Code
```

Use when MCP servers aren't connecting or tools aren't appearing.
