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
  file: guide/ops/observability.md
  section: What This Monitoring CANNOT Do
  anchor: '#what-this-monitoring-cannot-do'
---

What CANNOT a hook-based session logger provide on its own?

---

A hook-based logger CANNOT provide exact token counts or actual API costs by itself, because the guide's logger estimates tokens from text length instead of reading API usage data. Claude Code reports measured usage through other channels: /usage shows session cost and token usage, the status line can show context window usage, and OpenTelemetry export streams per-user token and cost metrics. A logger CAN track tool usage counts, file access patterns, relative comparisons, and operation timing.
