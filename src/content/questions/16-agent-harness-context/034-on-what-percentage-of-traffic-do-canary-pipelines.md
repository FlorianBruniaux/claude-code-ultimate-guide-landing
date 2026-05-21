---
id: 16-034
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: c
options:
  a: 5-10%
  b: 10-25%
  c: 1-2%
  d: 0.1-0.5%
doc_reference:
  file: guide/roles/ai-roles.md
  section: 19. AI Eval Engineer
  anchor: '#19-ai-eval-engineer'
---

On what percentage of production traffic do AI Eval Engineers typically run canary A/B comparisons before promoting model changes?

---

Canary pipelines run on 1-2% of production traffic. This is the standard figure cited in the guide for both the AI Eval Engineer role and for AWS Bedrock AgentCore's continuous evaluation feature. Running on more traffic increases the blast radius of a regression; running on less reduces statistical power. The 1-2% range balances statistical significance against exposure, and matches how Bedrock AgentCore implements eval-on-traffic for catching silent quality degradation.
