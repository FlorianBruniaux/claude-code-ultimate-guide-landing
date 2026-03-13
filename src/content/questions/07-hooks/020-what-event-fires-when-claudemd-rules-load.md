---
id: 07-020
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: ConfigChange — fires whenever any configuration file changes
  b: InstructionsLoaded — fires when CLAUDE.md or .claude/rules/*.md files are loaded into context (v2.1.69+)
  c: SessionStart — fires when the session begins (instructions are part of this event)
  d: PreToolUse — fires before any tool call, including instruction file reads
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.69
  anchor: '#v2169'
---

What hook event fires when CLAUDE.md or rules files are loaded into context (v2.1.69+)?

---

`InstructionsLoaded` fires when CLAUDE.md or `.claude/rules/*.md` files are loaded into the context. Added in v2.1.69, this event is useful for auditing which instructions were active during a session, validating that required rule files were loaded, or triggering notifications when rules change. It fires at the start of a session (distinct from `SessionStart`) and also when rules are reloaded mid-session. All hook events from v2.1.69+ also include `agent_id`, `agent_type`, and `worktree` fields for subagent tracking.
---