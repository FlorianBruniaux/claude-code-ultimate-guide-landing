---
id: 09-018
category_id: 9
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: Arrange-Act-Assert
  b: Given-When-Then (Gherkin)
  c: Setup-Execute-Verify
  d: Input-Process-Output
doc_reference:
  file: guide/methodologies.md
  section: 'Tier 3: Behavior & Acceptance'
  anchor: '#tier-3-behavior--acceptance'
---

What format does BDD (Behavior-Driven Development) use for test scenarios?

---

BDD uses Given-When-Then format (Gherkin). BDD is beyond testing - it's a collaboration process: (1) Discovery with devs/business, (2) Formulation with examples, (3) Automation via Cucumber. Example: Given product with 0 stock → When customer attempts purchase → Then system refuses.
