---
id: 10-023
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: A mode that skips permission checks for 2.5x faster execution
  b: Opus 4.6 running at 2.5x faster speed with 6x the price, enabled via /fast or speed:"fast" API parameter
  c: A lightweight Haiku-based mode for simple tasks at reduced cost
  d: Parallel tool execution mode that runs all tool calls simultaneously
doc_reference:
  file: guide/ultimate-guide.md
  section: Model Pricing
  anchor: '#model-pricing'
---

What is "fast mode" for Opus 4.6 and what are its trade-offs?

---

Fast mode runs Opus 4.6 at **2.5x faster** speed but at **6x the price** ($30/$150 per 1M tokens vs $5/$25 standard). Enable it in Claude Code via `/fast`, or in the API by adding `speed: "fast"` and the `anthropic-beta: fast-mode-2026-02-01` header. It is the same Opus 4.6 model — same quality, same 1M context support — just optimized for speed at a significant cost premium. Best for time-critical tasks where latency matters more than cost.
---
