---
id: 13-016
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: a
options:
  a: "A malicious website rebinds its domain to 127.0.0.1 to access MCP servers running locally"
  b: "An attack that changes the DNS records of the MCP server's domain"
  c: "A technique to intercept MCP traffic between client and remote server"
  d: "An attack that poisons the DNS cache of the MCP server host"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Attack Techniques"
  anchor: "#attack-techniques"
---

What is a DNS rebinding attack on local MCP servers (technique T005)?

---

DNS rebinding on local MCP (T005) allows a malicious website to rebind its domain to 127.0.0.1, gaining access to MCP servers running locally without authentication. Affected: MCP Python SDK HTTP/SSE (CVE-2025-66416), MCP Gateway (CVE-2025-64443), Playwright MCP (CVE-2025-9611). Mitigation: use stdio transport; enable DNS rebinding protection; authenticate local servers.
