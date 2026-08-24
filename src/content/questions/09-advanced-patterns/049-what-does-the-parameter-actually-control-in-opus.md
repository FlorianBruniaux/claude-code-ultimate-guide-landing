---
id: 09-049
category_id: 9
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Only the thinking token budget (how many tokens for extended reasoning)
  b: "The overall computational budget: thinking, tool calls, text verbosity, and analysis depth"
  c: The maximum number of tool calls per response
  d: A quality gate that filters low-confidence outputs
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Effort Levels
  anchor: "#effort-levels"
---

What does the `effort` parameter actually control in Opus 4.6?

---

`effort` controls the **overall computational budget**, not just thinking.

At `effort: low`:
- Fewer tool calls (combines operations when possible)
- No explanatory preamble before actions
- Concise responses

At `effort: high`:
- More tool calls with detailed explanations
- Describes plan before executing
- Comprehensive analysis and summaries

This means `effort` affects behavior even when thinking is disabled (Alt+T off).
It's a holistic efficiency dial, not a thinking toggle.
