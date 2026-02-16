---
id: 13-025
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: "mcp-fortress — a runtime protection dashboard"
  b: "mcp-scan (npx mcp-scan) — backed by Snyk with 90-100% recall on known malicious skills"
  c: "skills-ref validate — a skill spec compliance checker"
  d: "Garak — an LLM vulnerability scanner by NVIDIA"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Scanning Tools"
  anchor: "#scanning-tools"
---

Which CLI tool scans MCP server configurations for known vulnerabilities?

---

mcp-scan (run via `npx mcp-scan`) is the primary CLI tool for scanning MCP configurations. Backed by Invariant/Snyk, it detects known vulnerable MCP servers, scans SKILL.md for prompt injection and malicious code, and supports Claude Desktop, Cursor, and Windsurf configs. It achieves 90-100% recall with 0% false positives on skills.sh top-100. Limitation: cannot detect runtime-only payloads.
