---
id: 12-017
category_id: 12
difficulty: intermediate
profiles:
- senior
- power
correct: a
options:
  a: Text updates were coalesced to 100ms intervals instead of being rendered per-token
  b: Streaming was moved from the terminal renderer to a WebSocket-based diffing engine
  c: Tool call schemas were cached across turns to avoid re-parsing on every token
  d: The context window was pruned continuously during streaming rather than only
    at compaction time
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.191
---

Claude Code v2.1.191 reduced CPU usage during streaming by roughly 37%. What internal change achieved this?

---

The release note states CPU usage during streaming dropped about 37% by coalescing text updates to 100ms intervals instead of updating the display per token. This is a separate figure from the token-reduction percentage attributed to dynamic tool dispatch elsewhere in the guide, the two numbers measure different things, CPU cycles during rendering versus token usage from tool schema loading, and happen to land in a similar range by coincidence. Options b, c, and d describe plausible-sounding but unstated mechanisms not mentioned in the release note.
