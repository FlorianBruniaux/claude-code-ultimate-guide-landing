---
id: 08-010
category_id: 8
difficulty: power
profiles:
- power
correct: b
options:
  a: Plugins are faster
  b: Plugins bundle Claude-specific workflows; MCP servers add external tool capabilities
  c: They are identical
  d: MCP servers are for beginners, plugins for experts
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.5 Plugin System
  anchor: '#plugin-vs-mcp-server'
---

What distinguishes a Plugin from an MCP Server in Claude Code?

---

The rule of thumb:
- **Plugin** = "How Claude thinks" (new workflows, specialized agents)
- **MCP Server** = "What Claude can do" (new tools, external systems)

Plugins bundle agents, skills, and configuration into installable modules.
MCP servers add external capabilities like database access or browser automation.

Installation differs too:
- Plugins: `claude plugin install`
- MCP: Add to `settings.json` MCP config
