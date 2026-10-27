---
id: 12-012
category_id: 12
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Reader, Writer, Searcher, Executor
  b: Explore, Plan, general-purpose (the main built-in types)
  c: Junior, Senior, Expert, Architect
  d: Fast, Balanced, Thorough, Complete
doc_reference:
  file: guide/core/architecture.md
  section: Sub-Agent Types
  anchor: '#sub-agent-types'
---

What are the specialized sub-agent types available in Claude Code?

---

Claude Code's main built-in sub-agents, spawned through the Agent tool, are:

1. **Explore**: Codebase exploration with read-only tools. It uses the main conversation's model (with exceptions when the main conversation runs Fable) and supports thoroughness levels (quick/medium/very thorough).

2. **Plan**: Research during plan mode so exploration output stays out of the main conversation. Read-only tools; it inherits the main conversation's model.

3. **general-purpose**: Complex multi-step tasks with every tool available to subagents.

Claude Code also ships helper agents such as claude, statusline-setup, and claude-code-guide, which are invoked automatically.

**Important**: Bash is a TOOL (command execution utility), not a sub-agent type. Sub-agents can USE the Bash tool, but there is no "Bash" sub-agent type.

Source: Official documentation code.claude.com/docs/en/sub-agents (verified 2026-10-27)
