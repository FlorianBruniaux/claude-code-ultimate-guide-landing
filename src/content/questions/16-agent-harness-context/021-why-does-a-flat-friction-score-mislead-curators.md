---
id: 16-021
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: Raw volume points at the noisiest tool, not the most actionable cause
  b: The formula errors x 3 + retries x 2 overweights errors
  c: Flat scores cannot track trends over time
  d: The formula does not capture LLM-as-judge results
doc_reference:
  file: guide/core/context-engineering.md
  section: 10. Signal Taxonomy and Causal Attribution
  anchor: '#10-signal-taxonomy-and-causal-attribution'
---

Why does a flat friction score (errors x 3 + retries x 2) mislead the Curator in ACE-v2?

---

On a ten-week ACE-v1 run on the Aristote project, the Bash tool generated 3,377 retries versus 597 for Read and 254 for Edit. Raw volume pointed at Bash as the primary problem, but the actual pattern was missing batching instructions in the configuration. The flat score caused the Curator to prioritize the wrong layer. Typed signals fix this by capturing which rule files and skills were active at the moment of friction, not just which tool fired.
