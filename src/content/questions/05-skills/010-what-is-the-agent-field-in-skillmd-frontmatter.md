---
id: 05-010
category_id: 5
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Which agent created the skill
  b: "Which subagent type (Explore, Plan, general-purpose, or a custom .claude/agents/ subagent) to use when context: fork is set"
  c: The agent that must use this skill
  d: The agent's name
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.2 Creating Skills
  anchor: '#skillmd-frontmatter'
---

What is the 'agent' field in SKILL.md frontmatter?

---

The `agent` field selects which subagent type runs the skill when `context: fork` is set. Accepted values are the built-in agents (Explore, Plan, general-purpose) or any custom subagent from `.claude/agents/`; if omitted, it defaults to general-purpose. It has no effect unless paired with `context: fork`, and has nothing to do with a 'specialist' versus 'general' classification.
