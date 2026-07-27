---
id: 09-050
category_id: 9
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Claude refuses to use any tools and responds from memory only
  b: Claude combines tool operations to minimize calls and skips explanatory preamble
  c: Claude limits itself to 3 tool calls maximum per response
  d: Claude uses only Read tools, no Write or Edit tools
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Effort Levels
  anchor: "#effort-levels"
---

What is the observable impact of `effort: low` on tool usage?

---

At `effort: low`, Claude optimizes for efficiency:

**Tool usage**: Combines operations that would normally be separate calls.
Instead of Read → Analyze → Read → Analyze, it might do a single targeted Read.

**No preamble**: Skips "I'll now read the file to understand..." introductions.
Actions happen directly, without narration.

**Result**: Faster, cheaper execution for tasks that don't need transparency.
Best for sub-agents in automated pipelines, classification tasks, lookups.

Example task suited for `low`: `"Rename getUserById to findUserById across src/"`
