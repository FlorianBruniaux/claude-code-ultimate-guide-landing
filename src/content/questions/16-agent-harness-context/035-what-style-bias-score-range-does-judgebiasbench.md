---
id: 16-035
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: 0.76-0.92
  b: 0.10-0.25
  c: 0.45-0.65
  d: 0.30-0.50
doc_reference:
  file: guide/roles/ai-roles.md
  section: 19. AI Eval Engineer
  anchor: '#19-ai-eval-engineer'
---

What style bias score range does "Judging the Judges" (arXiv 2604.23178) report for frontier LLM-as-judge systems?

---

"Judging the Judges" (arXiv 2604.23178) reports style bias scores of 0.76-0.92 for frontier models, versus position bias below 0.04. (This figure comes from that paper, not from the separate "JudgeBiasBench" paper, arXiv 2603.08091.) Style bias is the dominant pattern: LLM judges approve stylistically polished but incorrect outputs significantly more often than they should. The practical consequence is that true negative rates for identifying invalid outputs typically sit below 25%. AI Eval Engineers use this data to design evaluation pipelines that combine LLM-as-judge for qualitative dimensions with code-based checks for anything that can be evaluated mechanically.
