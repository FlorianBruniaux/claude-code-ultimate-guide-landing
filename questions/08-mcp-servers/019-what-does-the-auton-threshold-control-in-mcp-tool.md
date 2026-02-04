---
id: 08-019
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Maximum concurrent MCP connections
  b: Cache size for tool results
  c: Automatic lazy loading when tool definitions exceed 10,000 tokens - tools discovered
    via Tool Search instead of loaded upfront
  d: Retry count for failed tool calls
doc_reference:
  file: guide/ultimate-guide.md
  section: MCP Configuration
  anchor: '#mcp-configuration'
---

What does the 'auto:N' threshold control in MCP tool configuration?

---

When MCP tool definitions exceed 10,000 tokens, Claude Code automatically activates lazy loading. Instead of loading all tool definitions upfront, it marks them with 'defer_loading: true' and provides a Tool Search tool for on-demand discovery.

When Claude needs a specific tool, it searches using keywords and selectively loads approximately 3-5 relevant tools (~3K tokens) per query. This dramatically reduces baseline context usage:

**Example**: chrome-devtools MCP provides 26 tools consuming 17,000 tokens. With lazy loading configured for only 4 specific tools, it uses 1,500 tokens—a 91% reduction.

**Important**: There is no configurable 'auto:N' parameter where N = max tools to load. The 10K token threshold triggers lazy loading automatically. Claude Code detects when tool descriptions surpass this threshold and switches to the Tool Search mechanism without manual configuration.

This feature was introduced to address context pollution from MCP servers with many tools, most of which aren't frequently used.
