---
id: 15-017
category_id: 15
difficulty: power
profiles:
- power
correct: d
options:
  a: Claude Code uses a different model family than Managed Agents and the Messages API
  b: Claude Code requires no API key — Anthropic handles billing transparently for the CLI
  c: Claude Code runs entirely offline without cloud communication for local-only work
  d: Claude Code is optimized for interactive developer workflows with file system access and session continuity — Managed Agents targets production automation, Messages API targets custom integrations
doc_reference:
  file: guide/ecosystem/ai-ecosystem.md
  section: Claude Managed Agents
  anchor: '#claude-managed-agents'
---

Claude Managed Agents, the Messages API, and Claude Code all run Claude agents. What is the primary differentiator of Claude Code?

---

The three tiers target distinct use cases: **Messages API** = lowest level, you manage everything (HTTP calls, state, orchestration); **Claude Code** = developer-optimized CLI with file system, terminal, session memory, and interactive approval flows — built for coding workflows; **Claude Managed Agents** = cloud-hosted production platform with scheduling, triggers (HTTP/GitHub), and persistent execution — no local setup required. Wrong answer A: all three use the same Claude model family. Wrong answer B: Claude Code uses your Anthropic API key like any other client.
