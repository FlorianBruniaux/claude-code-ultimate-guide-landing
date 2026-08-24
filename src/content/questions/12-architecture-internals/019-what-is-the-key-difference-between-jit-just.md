---
id: 12-019
category_id: 12
difficulty: power
profiles:
  - power
correct: b
options:
  a: JIT retrieval uses vector databases while RAG uses keyword search
  b: JIT retrieval never pre-loads context, sub-agents fetch only what they need at the moment of need; RAG pre-indexes and embeds documents upfront for semantic lookup
  c: JIT is faster but less accurate; RAG is slower but more precise
  d: JIT is for code retrieval only; RAG handles documentation retrieval
doc_reference:
  file: guide/core/architecture.md
  section: JIT vs RAG Retrieval
---

What is the key difference between JIT (Just-In-Time) retrieval and RAG in the context of Claude Code sub-agents?

---

JIT retrieval in sub-agents means never pre-loading context: the agent identifies what it needs (WHY/WHAT pattern), fetches only that, processes it, then discards. This keeps context windows small per agent. RAG pre-indexes and embeds a corpus upfront, enabling semantic similarity lookup at query time. For Claude Code sub-agents: JIT is preferred for targeted retrieval tasks (no embedding setup, no stale index); RAG suits knowledge bases queried repeatedly across many sessions.
