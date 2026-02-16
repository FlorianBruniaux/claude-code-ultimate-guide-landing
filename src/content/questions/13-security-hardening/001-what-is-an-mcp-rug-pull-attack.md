---
id: 13-001
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: An MCP server that crashes unexpectedly
  b: A benign MCP that turns malicious after gaining trust (no re-approval needed)
  c: An MCP that uses too many tokens
  d: An attack on the MCP protocol itself
doc_reference:
  file: guide/security-hardening.md
  section: 'Attack: MCP Rug Pull'
  anchor: '#attack-mcp-rug-pull'
---

What is an 'MCP Rug Pull' attack?

---

An MCP Rug Pull exploits the one-time approval model: attacker publishes benign MCP → user approves once → MCP works normally (builds trust) → attacker pushes malicious update → MCP exfiltrates credentials WITHOUT re-approval. Mitigation: version pinning + hash verification.
