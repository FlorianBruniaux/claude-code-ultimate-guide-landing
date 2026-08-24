---
id: 12-018
category_id: 12
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Gradual quality degradation caused by too many code comments in the context window
  b: "The n² attention cost: as context grows, each new token attends to all previous tokens, causing exponential slowdown and quality degradation regardless of content quality"
  c: Rot caused by leaving unused variables and dead code in the context
  d: API rate limiting that causes degraded responses when context is large
doc_reference:
  file: guide/core/architecture.md
  section: Context Rot
---

What is 'Context Rot' and what makes it structural rather than incidental?

---

Context Rot is structural, not incidental: transformer attention is O(n²), where each new token attends to all previous tokens. As context grows, the effective attention per token dilutes, early context gets underweighted, and recent tokens dominate disproportionately. This happens even with high-quality context content. Solutions: /compact (prune), context chaining (fresh session with curated summary), or JIT retrieval (never load; fetch on demand). You cannot fix structural rot by cleaning up your prompts.
