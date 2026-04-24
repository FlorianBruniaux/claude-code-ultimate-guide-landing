---
id: 13-037
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: Scans running MCP servers for open ports and exposed endpoints, grades A through D
  b: Analyzes Claude Code API call patterns for anomalies, grades 0 to 100
  c: Reviews git history for leaked secrets and credentials, grades Low/Medium/High/Critical
  d: Scans .claude/ config files (settings.json, hooks, permissions) against 102 rules and grades overall security posture A through F
doc_reference:
  file: guide/security/security-hardening.md
  section: Scanning Tools
  anchor: '#scanning-tools'
---

What does AgentShield scan and what grading system does it use?

---

AgentShield is a **configuration security scanner** for Claude Code projects. It audits `.claude/` files — `settings.json`, hook scripts, permission lists, and CLAUDE.md files — against **102 rules** covering misconfigured permissions, dangerous hook patterns, overly broad allow lists, and missing security controls. Output is a letter grade **A through F** (A = most secure, F = critical issues). Use AgentShield alongside SafeDep vet MCP: SafeDep covers supply chain (packages), AgentShield covers configuration hygiene. Neither replaces the other.
