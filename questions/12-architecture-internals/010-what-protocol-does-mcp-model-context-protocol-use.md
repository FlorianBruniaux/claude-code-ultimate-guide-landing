---
id: 12-010
category_id: 12
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: REST API over HTTPS
  b: GraphQL
  c: JSON-RPC 2.0 over stdio or HTTP
  d: gRPC with Protocol Buffers
doc_reference:
  file: guide/architecture.md
  section: MCP Integration
  anchor: '#6-mcp-integration'
---

What protocol does MCP (Model Context Protocol) use for communication?

---

MCP uses JSON-RPC 2.0 over stdio or HTTP transport. MCP tools follow the naming convention `mcp__<server>__<tool>`. Servers start on first use and stay alive during the session. They have the same permission system as native tools.
