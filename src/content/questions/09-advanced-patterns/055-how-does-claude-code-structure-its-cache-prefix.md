---
id: 09-055
category_id: 9
difficulty: power
profiles:
  - power
correct: c
options:
  a: messages > system > tools — messages layer is always a hit, tools layer is always a miss
  b: system > tools > messages — only system prompt hits reliably
  c: tools > system > messages — tools and system layers are almost always hits, messages layer varies
  d: tools > messages > system — all three layers hit equally often
doc_reference:
  file: guide/ultimate-guide.md
  section: Cost Optimization
  anchor: "#how-claude-code-handles-caching-automatically"
---

How does Claude Code structure its cache prefix hierarchy, and which layers are almost always cache hits?

---

Every API call structures content in a fixed order: tools then system then messages. Cache matching always starts from the beginning of this prefix. Tools (the tool list) and system (CLAUDE.md) are stable across most turns. This means the first two layers are almost always cache hits, and only new message turns require fresh computation. Placing the most stable content first maximizes the proportion of each request served from cache at 0.1x base cost.
