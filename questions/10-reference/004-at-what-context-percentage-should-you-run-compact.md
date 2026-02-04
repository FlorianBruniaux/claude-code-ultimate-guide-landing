---
id: 10-004
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: 50%
  b: 70-90%
  c: 95%+
  d: Only when errors occur
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.4 Troubleshooting
  anchor: '#context-recovery'
---

At what context percentage should you run /compact according to best practices?

---

Context management guidelines:

| Context Level | Action |
|--------------|--------|
| 0-50% | Work freely |
| 50-75% | Be selective |
| **75-90%** | **Use `/compact`** |
| 90%+ | Use `/clear` |

Proactive compaction at 70% prevents context degradation and maintains performance.
