---
id: 07-022
category_id: 7
difficulty: power
profiles:
- senior
- power
correct: d
options:
  a: It now substring-matches more aggressively, so "mcp__brave-search" matches any
    tool containing that string, including unrelated servers
  b: It disables matching on hyphenated names entirely; hyphens must be escaped with
    a backslash
  c: It splits on hyphens and matches each segment independently, so "brave-search"
    also matches a tool named just "search"
  d: It switched to exact matching, so a matcher of "mcp__brave-search" no longer
    catches other tools from that server; use "mcp__brave-search__.*" instead
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.195
---

A hook matcher of mcp__brave-search stopped catching all tools from that MCP server after upgrading to v2.1.195. What changed, and how do you restore the old coverage?

---

v2.1.195 fixed hook matchers on hyphenated identifiers, such as server names and tool names like code-reviewer, that were accidentally substring-matching instead of exact-matching. A matcher that used to catch everything containing mcp__brave-search now only matches that exact string, so a config expecting broad coverage of a hyphenated MCP server silently narrows to nothing useful. The fix is an explicit wildcard pattern, mcp__brave-search__.*, to match all tools under that server. Options a, b, and c describe matcher behaviors that were never implemented.
