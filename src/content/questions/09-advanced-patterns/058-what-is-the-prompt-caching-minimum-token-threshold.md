---
id: 09-058
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: 'Opus 4.6: 1,024 tokens (applied to each CLAUDE.md file separately)'
  b: 'Opus 4.6: 4,096 tokens (applied to the cacheable prompt prefix as a whole, so a short CLAUDE.md can still be cached as part of a larger prefix)'
  c: 'Opus 4.6: 2,048 tokens (Opus and Sonnet share the same minimum)'
  d: 'Opus 4.6: 8,192 tokens (most prompts are too short to be cached)'
doc_reference:
  file: guide/ultimate-guide.md
  section: Cost Optimization
  anchor: '#how-claude-code-handles-caching-automatically'
---

What is the prompt caching minimum token threshold for Opus 4.6, and what does it apply to?

---

Minimum thresholds for prompt caching vary by model. Opus 5.5, Sonnet 5.5, Fable 5.1, and Haiku 5.5 require 512 tokens. Opus 4.7 requires 2,048. Opus 4.6, Opus 4.5, and Haiku 4.5 require 4,096. Opus 4.8, Sonnet 5, and Sonnet 4.6 require 1,024. The minimum applies to the cacheable prompt prefix, not to CLAUDE.md or each block in isolation, so a short CLAUDE.md can be part of a sufficiently large cached prefix alongside tools and other instructions. Check the exact model and platform before applying a threshold.
