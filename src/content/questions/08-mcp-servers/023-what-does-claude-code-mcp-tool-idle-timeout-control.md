---
id: 08-023
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: It sets how long Claude Code waits before retrying a failed MCP server connection
    at startup
  b: It controls how long a remote MCP tool call can hang with no response before
    it aborts with an error, overriding the 5-minute default
  c: It sets the interval between roots/list_changed notifications sent to MCP servers
  d: It controls how long tool schemas stay cached before Claude Code re-fetches them
    from the server
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.187
---

What does the CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT environment variable control?

---

Before v2.1.187, a remote MCP tool call that never responded could hang a session indefinitely. That release made such calls abort with an error after a default 5-minute idle period, and CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT lets you override that default. It has nothing to do with connection retries at startup, roots notification intervals, or tool schema caching, which are separate mechanisms.
