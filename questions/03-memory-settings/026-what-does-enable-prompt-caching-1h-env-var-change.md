---
id: 03-026
category_id: 3
difficulty: power
profiles:
- senior
- power
correct: d
options:
  a: It enables prompt caching for the first time (disabled by default)
  b: It caches only the first hour of session history
  c: It increases the cache size to accommodate one hour of token budget
  d: It extends cache TTL from the default 5 minutes to 1 hour, reducing API costs on long sessions with stable context
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.114
  anchor: '#v21114'
---

What does the `ENABLE_PROMPT_CACHING_1H` environment variable change compared to the default?

---

`ENABLE_PROMPT_CACHING_1H` extends the **prompt cache TTL from 5 minutes to 1 hour**. Prompt caching is already enabled by default in Claude Code — this env var only changes how long the cache stays warm. Benefit: on long sessions where the system prompt and early context are stable, a 1-hour TTL dramatically reduces redundant token processing and API costs. This is not a data retention setting — prompt cache is temporary API-level storage, completely separate from Anthropic's long-term data retention policy.