---
id: 15-011
category_id: 15
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: 20-30% savings on API costs
  b: 50% savings but slower execution
  c: 80-90% savings by planning with Opus then executing free with local LLM
  d: No savings but better privacy
doc_reference:
  file: examples/scripts/bridge.py
  section: LM Studio Bridge
  anchor: '#lm-studio-bridge'
---

What cost savings does the Claude Code to LM Studio bridge provide?

---

The Claude Code to LM Studio bridge provides 80-90% cost savings. Strategy: use Opus for planning phase (~$0.50-2 per session) then execute implementation with a free local LLM via LM Studio. The bridge script translates Claude's plan into local LLM instructions. Trade-off: local LLMs are less capable but free.
