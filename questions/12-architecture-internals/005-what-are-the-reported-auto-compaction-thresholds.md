---
id: 12-005
category_id: 12
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: 50-60%
  b: 75-92% (conflicting reports)
  c: 95-99%
  d: No auto-compaction exists
doc_reference:
  file: guide/architecture.md
  section: Auto-Compaction
  anchor: '#auto-compaction'
---

What are the reported auto-compaction thresholds for Claude Code?

---

Auto-compaction thresholds vary by source: PromptLayer analysis reports 92%, community observations report 75-80%. When triggered, older conversation turns are summarized, tool results condensed, and recent context preserved. Use /compact to manually trigger summarization.
