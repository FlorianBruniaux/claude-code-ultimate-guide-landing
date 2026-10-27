---
id: 09-056
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Claude reads only the last 20 user messages (older context is lost permanently; the fix is /save)
  b: For each breakpoint, cache matching checks up to about 20 block positions back (a long session can push an earlier cached prefix outside that window; the fix is an earlier explicit cache breakpoint)
  c: Cache is invalidated after 20 tool calls (agents must pause every 20 calls; the fix is to reduce tool usage)
  d: After 20 turns the session context is truncated (the fix is to start a new session)
doc_reference:
  file: guide/ultimate-guide.md
  section: Cost Optimization
  anchor: '#how-claude-code-handles-caching-automatically'
---

What is the 20-block lookback in prompt caching, what problem does it cause in long sessions, and what is the fix?

---

For each breakpoint, matching checks up to 20 block positions for a prefix that a previous request actually cached. This is not a limit of 20 conversation turns, and it does not discard old content merely because a session is long. If additions move a prior write outside the search window, an earlier explicit breakpoint can preserve access to it. Compaction rewrites history and can require a fresh cache write, so /compact does not guarantee a better hit rate.
