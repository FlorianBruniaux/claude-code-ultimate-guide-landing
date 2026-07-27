---
id: 09-047
category_id: 9
difficulty: intermediate
profiles:
  - senior
  - power
correct: c
options:
  a: "Opus, effort: max — renaming at scale requires deep reasoning"
  b: "Sonnet, effort: high — large scope requires careful analysis"
  c: "Haiku, effort: low — mechanical find-replace, no design decisions"
  d: "Sonnet, effort: medium — safe default for any multi-file operation"
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Model Selection & Thinking Guide
  anchor: "#25-model-selection-thinking-guide"
---

You need to rename a function across 50 files. Which model and effort level is most appropriate?

---

**Haiku + low effort** is correct for mechanical tasks like renaming across files.

The key question: does this task require reasoning, design decisions, or judgment?
- Rename = find-replace. Pattern is known, approach is decided.
- No edge cases requiring analysis.
- Haiku is 60x cheaper than Opus on input tokens.

Using Opus here wastes tokens on reasoning that doesn't add value.
Save Opus for tasks where its depth changes the outcome.
