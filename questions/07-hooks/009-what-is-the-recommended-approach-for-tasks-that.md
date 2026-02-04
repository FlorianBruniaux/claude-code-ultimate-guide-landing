---
id: 07-009
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Both should use bash scripts
  b: Both should use AI agents
  c: Pattern-based use bash scripts; understanding-needed use AI agents
  d: Pattern-based use AI agents; understanding-needed use bash scripts
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.1 The Event System
  anchor: '#shell-scripts-vs-ai-agents-when-to-use-what'
---

What is the recommended approach for tasks that need 'understanding' vs pattern-based tasks?

---

The guide recommends choosing the right tool:

**Use Bash scripts when:**
- Tasks are deterministic (create branch, push)
- Pattern-based (check for secrets with regex)
- Fast, predictable, no token cost

**Use AI Agents when:**
- Interpretation is needed (code review quality)
- Context-dependent decisions
- Understanding and judgment required

Rule: "If you can write a regex for it, use a bash script."
