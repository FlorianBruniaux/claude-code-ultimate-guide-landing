---
id: 16-027
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: RLHF and supervised fine-tuning
  b: Constitutional AI (Anthropic 2022) and RLAIF
  c: Chain-of-thought prompting and self-consistency
  d: Retrieval-augmented generation and fact-checking
doc_reference:
  file: guide/core/context-engineering.md
  section: 13. Constitutional and Self-consistency Audits
  anchor: '#constitutional-audit'
---

What research lineage does the guide cite for the constitutional audit pattern?

---

The guide traces the constitutional audit to Constitutional AI (Anthropic, 2022) and RLAIF: using a high-level value document to constrain a lower-level generation process. The transposition to context engineering operates at the config level rather than the output level: the "constitution.md" constrains the rule system's internal consistency rather than the model's response content. The mechanism is simpler than output-level constitutional AI because the inputs are shorter and fully deterministic.
