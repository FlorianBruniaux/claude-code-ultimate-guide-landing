---
id: 12-002
category_id: 12
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: It has exactly 5 tools and nothing else
  b: It has a fixed set of exactly 8 tools that never changes
  c: It has a core set (Bash, Read, Edit, Write, Grep, Glob, and Agent for subagents) plus further tools such as WebFetch, WebSearch, and task tracking, all listed in the tools reference
  d: It has no built-in tools, only MCP tools
doc_reference:
  file: guide/architecture.md
  section: The Tool Arsenal
  anchor: '#2-the-tool-arsenal'
---

Which statement about Claude Code's built-in tools is accurate?

---

The tools reference lists many built-in tools, not a fixed count of 8. The core ones are Bash (universal adapter), Read, Edit, Write, Grep, Glob, and Agent (spawns a subagent with its own context window), alongside others such as WebFetch, WebSearch, Skill, and the task-tracking tools. TodoWrite was superseded by TaskCreate/TaskGet/TaskList/TaskUpdate, and those tools are only on by default for some older models (Opus 4.7, Sonnet 4.6, Haiku 4.5, and earlier).
