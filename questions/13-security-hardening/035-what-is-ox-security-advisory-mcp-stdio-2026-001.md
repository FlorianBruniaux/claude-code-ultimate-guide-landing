---
id: 13-035
category_id: 13
difficulty: power
profiles:
- senior
- power
correct: d
options:
  a: A buffer overflow in the MCP Inspector UI patched in v1.9.1 of the MCP SDK
  b: An authentication bypass in SSE transport requiring a server-side fix to patch
  c: A race condition in MCP tool call processing mitigated by rate limiting
  d: A by-design flaw in STDIO transport where local processes can intercept MCP tool calls via pipe access — architectural, not patchable
doc_reference:
  file: guide/security/security-hardening.md
  section: MCP STDIO Advisory
  anchor: '#mcp-stdio-advisory'
---

What is OX Security ADVISORY-MCP-STDIO-2026-001 and why can it not be patched?

---

OX Security ADVISORY-MCP-STDIO-2026-001 identifies a **by-design architectural flaw** in MCP's STDIO transport: because STDIO uses OS pipes, any local process with sufficient privileges can intercept the communication between Claude Code and an MCP server — reading tool inputs and outputs, including secrets or query results. There is no fix because pipe interception is a fundamental OS capability. Mitigations: run STDIO MCP servers as least-privilege dedicated processes; avoid STDIO on shared/multi-user machines; prefer HTTP/SSE with authentication for sensitive MCP servers. Option A (CVE-2025-49596) is a separate, patched vulnerability in MCP Inspector.
