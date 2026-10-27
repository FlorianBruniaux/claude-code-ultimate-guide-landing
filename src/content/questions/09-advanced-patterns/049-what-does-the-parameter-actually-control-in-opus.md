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
  b: 'The overall computational budget: thinking, tool calls, text verbosity, and analysis depth'
  c: The maximum number of tool calls per response
  d: A quality gate that filters low-confidence outputs
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Effort Levels
  anchor: '#effort-levels'
---

What does the `effort` parameter actually control in models that support it, such as Opus 5.5?

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

This means `effort` affects behavior beyond thinking. On Opus 5.5, Sonnet 5.5, Haiku 5.5, and the Fable models thinking cannot be turned off (Alt+T has no effect), so `effort` is the dial for how much work the model does.
It's a holistic efficiency dial, not a thinking toggle.
