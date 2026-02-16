---
id: 13-008
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: filesystem (unrestricted), database (prod credentials)
  b: '@anthropic/mcp-server-*, context7, sequential-thinking, memory'
  c: browser (full access), custom MCPs
  d: All MCPs are safe by default
doc_reference:
  file: guide/security-hardening.md
  section: MCP Safe List (Community Vetted)
  anchor: '#mcp-safe-list-community-vetted'
---

Which MCP servers are marked as 'Safe' in the community-vetted safe list?

---

MCP Safe List: @anthropic/mcp-server-* (official), context7 (read-only docs), sequential-thinking (no external access, local), memory (local file-based). Risk: filesystem unrestricted (CVE-2025-53109), database prod (exfiltration). Unsafe: browser full access.
