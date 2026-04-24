---
id: 07-022
category_id: 7
difficulty: power
profiles:
- power
correct: d
options:
  a: Use type "mcp" with a tool field in the hook definition
  b: Call claude mcp invoke <tool> inside the hook shell script
  c: Set mcp true and specify command "<tool-name>" in the hook config
  d: Use type "mcp_tool" with tool_name and optional input fields in the hook definition
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Hook Configuration
  anchor: '#hook-configuration'
---

How do you invoke an MCP tool directly from a hook instead of running a shell command?

---

Since v2.1.118+, hooks support `type: "mcp_tool"` as an alternative to `type: "command"`. Configuration:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "mcp_tool",
        "tool_name": "memory__store",
        "input": { "key": "last_edit", "value": "$TOOL_OUTPUT" }
      }]
    }]
  }
}
```

This invokes the MCP tool directly without spawning a shell process — faster, no shell injection risk, and works in sandboxed environments where shell execution is restricted. Wrong answer A (`type: "mcp"`) does not exist.
