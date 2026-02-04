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
  b: Explore, Plan, general-purpose (3 types)
  c: Junior, Senior, Expert, Architect
  d: Fast, Balanced, Thorough, Complete
doc_reference:
  file: guide/architecture.md
  section: Sub-Agent Types
  anchor: '#sub-agent-types'
---

What are the 4 specialized sub-agent types available in Claude Code?

---

Claude Code offers 3 built-in sub-agent types via the Task tool's subagent_type parameter:

1. **Explore** (Haiku): Codebase exploration with read-only tools. Optimized for file discovery and code search with thoroughness levels (quick/medium/very thorough).

2. **Plan** (Inherit): Architecture planning and research during plan mode. Read-only tools prevent infinite nesting.

3. **general-purpose** (Inherit): Complex multi-step tasks with all tools available (Read, Edit, Write, Bash, Grep, Glob).

**Important**: Bash is a TOOL (command execution utility), not a sub-agent type. Sub-agents can USE the Bash tool, but there is no "Bash" sub-agent type.

Source: Official documentation code.claude.com/docs/en/sub-agents (verified 2026-02-03)
