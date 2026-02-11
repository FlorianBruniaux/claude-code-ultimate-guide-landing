---
id: 13-026
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: d
options:
  a: "Runtime monitoring of MCP server memory usage"
  b: "Automated patching of vulnerable MCP servers"
  c: "DNS rebinding protection for local MCP servers"
  d: "Software composition analysis that screens packages before install and detects slopsquatting"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Scanning Tools"
  anchor: "#scanning-tools"
---

What does SafeDep vet MCP provide for agent security?

---

SafeDep vet MCP is a software composition analysis tool integrated as an MCP server. It screens package suggestions before pip/npm install, detects slopsquatting (AI-hallucinated package names that attackers register), and identifies vulnerable and malicious packages. It's package-focused and complements mcp-scan (which focuses on MCP configs and SKILL.md scanning).
