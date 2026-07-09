---
id: 04-022
category_id: 4
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: d
options:
  a: It always runs on Haiku regardless of the session's model, for speed
  b: It always runs on the most expensive model available, for maximum thoroughness
  c: It runs on Sonnet by default and can be upgraded to Opus with a flag
  d: It inherits the main session's model, capped at Opus, instead of always defaulting
    to Haiku
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

As of v2.1.198, which model does the built-in Explore agent, used for read-only codebase search, run on?

---

Explore now inherits the main session's model, capped at Opus, instead of always running on Haiku as it did before. A session running on Sonnet or Opus gets a more capable Explore agent, while a Haiku session still gets Haiku. Option a describes the pre-2.1.198 default; options b and c invent behaviors not in the release notes.
