---
id: 10-023
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: It skips permission checks
  b: Faster serving of the same model at twice its standard token rates
  c: It switches the session to Haiku
  d: It runs all tool calls in parallel
doc_reference:
  file: guide/ultimate-guide.md
  section: Pricing Model (verified September 24, 2026)
  anchor: '#pricing-model-verified-september-24-2026'
---

What is fast mode on Opus 5.5 and what is its standard token-price tradeoff?

---

Fast mode serves Opus 5.5 at $8/$40 per million input/output tokens versus $4/$20 at standard speed. Anthropic advertises up to 2.5 times faster output, not a guaranteed end-to-end speedup. Use /fast in Claude Code; subscription usage is charged to usage credits. Sonnet and Haiku do not support fast mode.
