---
id: 13-015
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: "The MCP server pretends to be a different server entirely"
  b: "The user accidentally connects to a wrong MCP server"
  c: "The MCP protocol itself has a buffer overflow vulnerability"
  d: "An attacker manipulates MCP session data or outputs, and the client trusts the poisoned response"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Attack Techniques"
  anchor: "#attack-techniques"
---

How does a "Confused Deputy" attack work via MCP (technique T004)?

---

A Confused Deputy attack via MCP (T004) occurs when an attacker manipulates MCP session IDs or outputs, causing the client to trust poisoned responses. Examples include session ID reuse in oatpp-mcp (CVE-2025-6515) and chaining Git MCP + Filesystem MCP via a poisoned README. Mitigation: cryptographic session IDs, input validation, least-privilege for MCP tools.
