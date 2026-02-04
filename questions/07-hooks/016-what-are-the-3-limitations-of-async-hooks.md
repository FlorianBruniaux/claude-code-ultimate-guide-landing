---
id: 07-016
category_id: 7
difficulty: power
profiles:
- power
correct: b
options:
  a: Can't access stdin, can't write files, can't read environment variables
  b: No exit code feedback (can't block), no additionalContext returned, no blocking
    capability
  c: Can't use network, can't spawn processes, can't read files
  d: Limited to 1s timeout, no stderr capture, no argument passing
doc_reference:
  file: guide/ultimate-guide.md
  section: Hook Execution Model
  anchor: '#hook-execution-model'
---

What are the 3 limitations of async hooks compared to sync hooks?

---

Async hooks trade control for speed:

1. **No exit code feedback** - Can't block Claude based on success/failure
2. **No additionalContext** - Can't inject context back into the conversation
3. **No blocking capability** - Fire-and-forget only

Use async for non-critical operations (logging, telemetry). Use sync for security gates, formatting, and validation.
