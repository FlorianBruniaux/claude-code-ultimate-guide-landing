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
  c: Context percentage threshold that triggers automatic lazy loading (5%, 10%, or 20%)
  d: Maximum number of tools to load per MCP server
doc_reference:
  file: guide/architecture.md
  section: Tool Search & Lazy Loading
  anchor: '#tool-search-lazy-loading'
---

What does the 'auto:N' threshold control in MCP tool configuration?

---

The `ENABLE_TOOL_SEARCH=auto:N` setting controls the **context percentage threshold** that triggers lazy loading. Available values:

- `auto:5` → Aggressive (5% context threshold) - for power users with 100+ tools
- `auto:10` → Default (10% context threshold) - balanced for 20-50 tools
- `auto:20` → Conservative (20% context threshold) - for lightweight setups with 5-10 tools

When tool definitions exceed this percentage of total context, Claude Code automatically activates lazy loading. Instead of loading all tools upfront, it provides a Tool Search tool for on-demand discovery, dramatically reducing baseline context usage.

**Example**: chrome-devtools MCP provides 26 tools consuming 17,000 tokens. With lazy loading, Claude only loads 3-5 relevant tools per query (~3K tokens)—a 91% reduction.
