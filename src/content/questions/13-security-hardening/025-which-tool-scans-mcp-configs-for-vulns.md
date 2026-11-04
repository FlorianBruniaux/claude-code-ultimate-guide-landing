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
  a: "mcp-fortress: a runtime protection dashboard"
  b: "Snyk Agent Scan, formerly mcp-scan (uvx snyk-agent-scan): backed by Snyk with 90-100% recall on known malicious skills"
  c: "skills-ref validate: a skill spec compliance checker"
  d: "Garak: an LLM vulnerability scanner by NVIDIA"
doc_reference:
  file: "guide/security/security-hardening.md"
  section: 1.2 Agent Skills Supply Chain Risks
  anchor: "#12-agent-skills-supply-chain-risks"
---

Which CLI tool scans MCP server configurations for known vulnerabilities?

---

Snyk Agent Scan (formerly Invariant's mcp-scan, run via `uvx snyk-agent-scan@latest`) is the primary CLI tool for scanning MCP configurations. Backed by Snyk, it detects known vulnerable MCP servers, scans SKILL.md for prompt injection and malicious code, and supports Claude Desktop, Cursor, and Windsurf configs. It achieves 90-100% recall with 0% false positives on skills.sh top-100. Limitations: it cannot detect runtime-only payloads, and it sends tool descriptions and skill content to Snyk's analysis API. Do not run the npm package named mcp-scan: it belongs to an unrelated publisher.
