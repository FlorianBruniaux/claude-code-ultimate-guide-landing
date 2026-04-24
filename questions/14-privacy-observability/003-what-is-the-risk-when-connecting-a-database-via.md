---
id: 14-003
category_id: 14
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: Database might slow down
  b: Query results (including PII) are sent to Anthropic and stored per retention
    policy
  c: Claude might drop tables
  d: MCP uses too many tokens
doc_reference:
  file: guide/data-privacy.md
  section: 'Risk 2: MCP Database Access'
  anchor: '#risk-2-mcp-database-access'
---

What is the risk when connecting a database via MCP?

---

When MCP executes a database query, ALL results are sent to Anthropic: "SELECT * FROM orders" → 100 rows with customer names, emails, addresses → stored according to your retention tier. NEVER connect production databases. Use dev/staging with anonymized data.

**Additional risk (OX ADVISORY-MCP-STDIO-2026-001):** When using STDIO transport for MCP, local processes on the same machine can intercept tool calls — including database queries and their results — via pipe access. This is an architectural limitation of the STDIO protocol (not a bug). On shared or multi-user machines, prefer HTTP/SSE transport with authentication over STDIO for database MCP connections.
