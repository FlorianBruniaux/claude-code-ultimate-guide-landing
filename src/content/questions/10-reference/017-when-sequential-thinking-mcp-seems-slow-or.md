---
id: 10-017
category_id: 10
difficulty: power
profiles:
- power
correct: b
options:
  a: It's broken and needs restart
  b: 10-30 second responses are normal due to significant compute
  c: Switch to a different MCP
  d: Reduce the query complexity
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.4 Troubleshooting
  anchor: '#sequential-thinking-mcp-issues'
---

When Sequential Thinking MCP seems slow or unresponsive, what should you expect?

---

Sequential Thinking uses significant compute - expect 10-30 second responses.

This is not an error, just be patient.

Tips for Sequential:
- Works best with specific, well-defined problems
- Good: "Debug why user authentication fails on mobile"
- Bad: "Make the app better"

The longer response time reflects deeper analysis.
