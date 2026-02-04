---
id: 12-014
category_id: 12
difficulty: power
profiles:
- power
correct: c
options:
  a: 10x overhead (10 API calls)
  b: 25x overhead (25 API calls)
  c: 51x overhead (1 TaskList + 50 TaskGet calls required)
  d: 100x overhead (100 API calls)
doc_reference:
  file: guide/ultimate-guide.md
  section: Tasks API Limitations
  anchor: '#tasks-api-limitations'
---

What is the API cost overhead of fetching full details for 50 tasks via Tasks API?

---

Tasks API limitation: TaskList returns only summary fields (id, subject, status, owner, blockedBy). To get full details (description, metadata), you need individual TaskGet calls. For 50 tasks: 1 TaskList + 50 TaskGet = 51 API calls. This N+1 pattern is a known limitation compared to TodoWrite which returned everything in one call.
