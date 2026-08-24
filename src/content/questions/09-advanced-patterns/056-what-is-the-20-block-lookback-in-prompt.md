---
id: 09-056
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: Claude reads only the last 20 user messages (older context is lost permanently; the fix is /save)
  b: Cache matching looks back approximately 20 message blocks (long sessions lose cache efficiency as early blocks fall outside the window; the fix is /compact)
  c: Cache is invalidated after 20 tool calls (agents must pause every 20 calls; the fix is to reduce tool usage)
  d: After 20 turns the session context is truncated (the fix is to start a new session)
doc_reference:
  file: guide/ultimate-guide.md
  section: Cost Optimization
  anchor: "#how-claude-code-handles-caching-automatically"
---

What is the 20-block lookback in prompt caching, what problem does it cause in long sessions, and what is the fix?

---

Cache matching uses a bounded lookback of approximately 20 blocks. In long sessions with many tool calls, blocks from early in the conversation fall outside this window and become cache misses even if their content hasn't changed. The practical consequence: very long sessions gradually lose cache efficiency at the message layer. The fix is /compact: it compresses conversation history into a single summary block, resetting the lookback window and restoring high cache hit rates for subsequent turns.
