---
id: 13-032
category_id: 13
difficulty: power
profiles:
- power
correct: d
options:
  a: A CI/CD pipeline that auto-approves MCP servers with green security scans
  b: The process for MCP server developers to submit their tools to the Anthropic marketplace
  c: A Docker-based isolation system for running untrusted MCP servers
  d: An approval pipeline (request → review → approve → deploy) with a YAML registry tracking approved/pending/denied servers
doc_reference:
  file: guide/security/enterprise-governance.md
  section: MCP Governance Workflow
  anchor: '#3-mcp-governance-workflow'
---

What does the MCP governance workflow in the enterprise governance guide provide?

---

The MCP governance workflow provides an **approval pipeline** for org-level MCP server control: request → review → approve → deploy. It includes a YAML registry format for tracking approved, pending, and denied servers with risk classification (LOW/MEDIUM/HIGH), data scope classification (PUBLIC/INTERNAL/CONFIDENTIAL/RESTRICTED), and expiry dates. A governance enforcement hook (`governance-enforcement-hook.sh`) validates active MCP configuration against the approved registry at session start — warning without blocking (governance-first, not friction-first). This is for teams that need auditability for SOC2/ISO27001 compliance.

**New policy (Claude Code v2.1.114+):** `blockedMarketplaces` in `settings.json` allows blocking specific MCP marketplace sources by `hostPattern` and `pathPattern` — complementing the registry workflow with a proactive block list at the infrastructure level, before servers even reach the approval queue.
---