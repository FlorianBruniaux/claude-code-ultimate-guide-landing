---
id: 07-016
category_id: 7
difficulty: power
profiles:
- power
correct: b
options:
  a: Can't access stdin, can't write files, can't read environment variables
  b: Cannot block on exit code 2, cannot give real-time stdout/systemMessage feedback,
    cannot guarantee execution order with other hooks
  c: Can't use network, can't spawn processes, can't read files
  d: Limited to 1s timeout, no stderr capture, no argument passing
doc_reference:
  file: guide/ultimate-guide.md
  section: Limitations of Async Hooks
  anchor: '#limitations-of-async-hooks'
---

What are the 3 limitations of async hooks compared to sync hooks?

---

Async hooks trade control for speed. Per the guide, they cannot:

1. **Block Claude on errors** - exit code 2 is ignored
2. **Provide real-time feedback** - no live stdout or systemMessage during the turn
3. **Guarantee execution order** - ordering with other hooks is not assured

Async hooks CAN still return additionalContext via JSON output; it just reaches Claude on the next conversation turn rather than in real time. Use async for non-critical operations (logging, telemetry). Use sync for security gates, formatting, and validation.
