---
id: 16-040
category_id: 16
difficulty: senior
profiles:
- power
- senior
correct: b
options:
  a: Tokens counted twice by the API when prompt caching and streaming are both enabled
  b: Content that survives a /compact or summarization pass but no longer does useful
    work, consuming budget without being load-bearing
  c: The extra tokens a model spends on chain-of-thought reasoning before producing
    its final answer
  d: Tokens billed for a request that failed and was silently retried by the streaming
    watchdog
doc_reference:
  file: guide/ecosystem/context-engineering-tools.md
  section: Context Quality After Compaction ("Ghost Tokens")
---

In the context engineering guide, what does the term "ghost tokens" describe?

---

Ghost tokens are content that survived a lossy summarization or /compact pass but stopped doing useful work, dead weight that costs budget without being load-bearing. The guide frames this as a narrower, later-stage question than Minimum Viable Context, which targets noise before compaction ever runs. The other options describe unrelated phenomena, double-billing, chain-of-thought overhead, and retry billing, not covered by this term in the guide.
