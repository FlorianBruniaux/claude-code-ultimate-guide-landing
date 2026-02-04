---
id: 08-017
category_id: 8
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: claude mcp install figma
  b: claude mcp add --transport http figma https://mcp.figma.com/mcp
  c: claude figma connect
  d: npm install @figma/mcp
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.3 Figma MCP Integration
  anchor: '#setup-options'
---

What command adds the Figma MCP server for remote access?

---

For remote MCP (all Figma plans, any machine): `claude mcp add --transport http figma https://mcp.figma.com/mcp`. For desktop MCP (requires Figma desktop app with Dev Mode): `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`. Official Figma MCP was announced in 2025.
