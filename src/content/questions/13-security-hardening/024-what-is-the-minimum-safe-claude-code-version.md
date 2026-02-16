---
id: 13-024
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: a
options:
  a: ">= 2.1.34 (fixes ADVISORY-CC-2026-001 sandbox bypass)"
  b: ">= 1.0.93 (fixes command blocklist bypasses only)"
  c: ">= 1.0.111 (fixes WebFetch SSRF only)"
  d: ">= 0.14.1 (fixes MCP Inspector RCE only)"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Minimum Safe Versions"
  anchor: "#minimum-safe-versions"
---

What is the minimum safe version of Claude Code that fixes the sandbox bypass vulnerability?

---

Claude Code >= 2.1.34 is the minimum safe version, fixing ADVISORY-CC-2026-001 — a sandbox bypass where commands excluded from sandboxing could bypass Bash permission enforcement. Earlier versions also have CVE-2025-66032 (8 blocklist bypasses, fixed 1.0.93) and CVE-2026-24052 (WebFetch SSRF, fixed 1.0.111). Always run the latest version for cumulative security fixes.
