---
id: 13-037
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: These commands stopped requiring authentication, exposing MCP server names publicly
  b: They no longer spawn .mcp.json servers self-approved by a committed .claude/settings.json;
    unapproved servers now show as Pending approval
  c: They started deleting unused MCP server configurations automatically
  d: They began caching MCP server responses without invalidation, causing stale data
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.196
---

What security gap did v2.1.196 close regarding claude mcp list and claude mcp get?

---

Before v2.1.196, a repository could ship a committed .claude/settings.json that self-approved an .mcp.json server. Running claude mcp list or claude mcp get would then silently spawn that server even if it had never actually been reviewed by the developer, and even if it was malicious. The fix makes those commands show unapproved servers as "Pending approval" instead of running them, closing a path where a malicious committed settings file could grant a server auto-approval before anyone looked at it.
