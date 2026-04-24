---
id: 15-016
category_id: 15
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: A GUI wrapper around Claude Code for non-developer users who prefer visual interfaces
  b: Anthropic's name for multi-agent pipelines built directly with the Messages API
  c: A paid Claude Code add-on that provides cloud execution for terminal commands
  d: A separate cloud-hosted agent platform using the ant CLI for production automation workflows — distinct from the developer-focused Claude Code CLI
doc_reference:
  file: guide/ecosystem/ai-ecosystem.md
  section: Claude Managed Agents
  anchor: '#claude-managed-agents'
---

What is Claude Managed Agents (launched April 2026) and how does it differ from Claude Code?

---

Claude Managed Agents is a **cloud-hosted agent execution platform** launched April 8, 2026. It uses the `ant` CLI (not `claude`), runs agents in Anthropic's infrastructure, and targets **production automation workflows** — not interactive developer sessions. Key differences: Claude Code is a local CLI for interactive development with file system access; Managed Agents is a cloud platform for deploying persistent, triggered agents. They coexist: Claude Code for development, Managed Agents for production deployment. Also distinct from the Messages API (lower-level HTTP calls) — Managed Agents adds orchestration, memory, and scheduling on top.
