---
id: 13-029
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: b
options:
  a: "About 50 servers, mostly development instances"
  b: "Approximately 1,000 servers with no authentication, exposing Kubernetes clusters, CRM access, and arbitrary shell"
  c: "Over 10,000 servers, all running outdated MCP versions"
  d: "Fewer than 10, all quickly patched after disclosure"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Defensive Resources"
  anchor: "#defensive-resources"
---

How many unauthenticated MCP servers were discovered exposed on the internet by Bitsight TRACE?

---

Bitsight TRACE's continuous scanning found approximately 1,000 unauthenticated MCP servers exposed on the internet. These exposed servers provided access to Kubernetes clusters, CRM systems, WhatsApp messaging, and arbitrary shell execution — all without any authentication. This highlights the critical importance of never exposing MCP servers to the internet without proper authentication.
