---
id: 16-019
category_id: 16
difficulty: intermediate
profiles:
- senior
- power
correct: d
options:
  a: Errors, warnings, retries, timeouts, cancellations
  b: LLM, tools, memory, context, output
  c: Input, processing, output, feedback, escalation
  d: Syntactic, semantic, procedural, alignment, performance
doc_reference:
  file: guide/core/context-engineering.md
  section: 10. Signal Taxonomy and Causal Attribution
  anchor: '#10-signal-taxonomy-and-causal-attribution'
---

What are the five signal categories in the ACE-v2 signal taxonomy?

---

ACE-v2 replaces the flat friction score with five typed categories: syntactic (tool error, parse failure, malformed call), semantic (output rejected by user, retry with clarification), procedural (rule conflict, missing step, wrong execution phase), alignment (tone violation, out-of-scope change, hallucinated claim), and performance (token overrun, context overflow, /compact forced mid-task). Each event gets one category, which determines where the Curator looks for the root cause.
