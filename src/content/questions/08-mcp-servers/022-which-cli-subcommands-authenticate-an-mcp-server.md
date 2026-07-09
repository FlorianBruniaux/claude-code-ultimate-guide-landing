---
id: 08-022
category_id: 8
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: claude mcp auth <name>, which always opens a browser and has no headless option
  b: claude mcp connect <name> --headless, added in the same release as the /mcp menu
  c: claude mcp login <name> and claude mcp logout <name>, with a --no-browser flag
    that redirects the OAuth flow through stdin for SSH sessions
  d: claude mcp auth-refresh <name>, which silently renews tokens without user interaction
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.186
---

Which CLI subcommands let you authenticate or deauthenticate a named MCP server directly from the terminal, without going through the interactive /mcp menu?

---

claude mcp login <name> and claude mcp logout <name> authenticate and deauthenticate a specific MCP server straight from the CLI. Both shipped in v2.1.186. The --no-browser flag redirects the OAuth flow through stdin instead of opening a browser tab, which matters for SSH sessions or headless containers where no browser is reachable. The other three options name commands that don't exist in Claude Code.
