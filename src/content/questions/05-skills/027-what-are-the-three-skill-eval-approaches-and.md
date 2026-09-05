---
id: 05-027
category_id: 5
difficulty: power
profiles:
  - power
correct: b
options:
  a: "A passing eval proves the skill is correct for every model, repository, and future prompt"
  b: "Benchmark and A/B results support a scoped comparison; Trigger Tuning measures routing; independent validators and qualified human review strengthen the evidence"
  c: "An LLM judge is independent evidence because it cannot share the tested model's blind spots"
  d: "Activation accuracy proves output quality, so task assertions are optional"
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.Y Skill Evals
  anchor: "#5y-skill-evals"
---

What can Skill Evals support, and what do they not prove?

---

Benchmark Mode records pass rates, elapsed time, and token usage across isolated cases. A/B Testing compares two skill versions without telling the judge which is which. Trigger Tuning targets false positives and false negatives in activation. These artifacts support a scoped comparison; they do not prove universal correctness or remove model variance. Record the model, client version, prompts, assertions, run count, failures, and cost, then add deterministic checks or qualified human review where the risk warrants it.
