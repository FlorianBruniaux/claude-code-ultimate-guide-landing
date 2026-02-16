---
id: 14-009
category_id: 14
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: Track tool usage counts
  b: Identify file access patterns
  c: Provide exact token counts and actual API costs
  d: Record operation timestamps
doc_reference:
  file: guide/observability.md
  section: What This Monitoring CANNOT Do
  anchor: '#what-this-monitoring-cannot-do'
---

What CANNOT the session monitoring do?

---

Monitoring CANNOT provide: exact token counts (CLI doesn't expose API metrics), actual API costs (estimates only), TTFT timing, real-time streaming metrics, or context window usage. It CAN track: tool usage counts, file access patterns, relative comparisons, operation timing.
