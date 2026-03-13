---
id: 08-021
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Git MCP is for Linux; GitHub MCP is for macOS and Windows
  b: Git MCP uses OAuth; GitHub MCP uses API tokens
  c: Git MCP is official Anthropic (12 local git tools, no auth); GitHub MCP is official GitHub (remote platform, requires GitHub Copilot for remote mode)
  d: Git MCP works in CI/CD; GitHub MCP works only in interactive mode
doc_reference:
  file: guide/diagrams/05-mcp-ecosystem.md
  section: Official Servers
  anchor: '#official-servers'
---

What is the key difference between the official `git-mcp` and `github-mcp` servers?

---

`git-mcp` is the **official Anthropic Git server** — provides 12 local git tools (log, status, diff, commit, etc.) with no authentication required. It operates entirely on the local repository. `github-mcp` is the **official GitHub server** — connects to the remote GitHub platform and requires authentication. For remote mode (push, PR creation, issues), it requires a GitHub Copilot subscription. Choose `git-mcp` for local git operations and `github-mcp` for GitHub platform integration.
---
