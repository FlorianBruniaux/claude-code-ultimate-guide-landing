---
id: 08-012
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: claude mcp add --env API_KEY=key server
  b: claude mcp add -e API_KEY=key my-server -- npx @org/server
  c: claude mcp install server --api-key key
  d: claude add mcp server -k key
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.3 Configuration
  anchor: '#cli-based-mcp-configuration'
---

How do you add an MCP server with environment variables via CLI?

---

Use the `-e` flag to pass environment variables:

```bash
claude mcp add -e API_KEY=your-key my-server -- npx @org/server
```

For multiple environment variables:
```bash
claude mcp add -e DATABASE_URL=postgres://... -e DEBUG=true postgres -- npx @prisma/postgres
```

This is quicker than manually editing mcp.json.
