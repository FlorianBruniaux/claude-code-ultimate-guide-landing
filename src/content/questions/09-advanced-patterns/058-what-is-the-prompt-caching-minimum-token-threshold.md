---
id: 09-058
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: "Opus 4.6: 1,024 tokens — any CLAUDE.md over one paragraph is cached"
  b: "Opus 4.6: 4,096 tokens — a CLAUDE.md under ~4,000 tokens is never cached on Opus 4.6"
  c: "Opus 4.6: 2,048 tokens — Opus and Sonnet share the same minimum"
  d: "Opus 4.6: 8,192 tokens — most CLAUDE.md files are too short to be cached"
doc_reference:
  file: guide/ultimate-guide.md
  section: Cost Optimization
  anchor: "#how-claude-code-handles-caching-automatically"
---

What is the prompt caching minimum token threshold for Opus 4.6, and what is the practical implication for short CLAUDE.md files?

---

Minimum token thresholds for prompt caching eligibility vary by model. Opus 4.6, Opus 4.5, and Haiku 4.5 require 4,096 tokens minimum. Sonnet 4.6 requires 2,048 tokens. Sonnet 4.5 and earlier require 1,024 tokens. Blocks smaller than the threshold are never cached regardless of stability. A short CLAUDE.md that doesn't cross the threshold for the target model provides zero caching benefit, which is relevant for teams optimizing session costs on Opus 4.6.
