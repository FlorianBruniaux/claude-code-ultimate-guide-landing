---
id: 16-025
category_id: 16
difficulty: intermediate
profiles:
- senior
- power
correct: c
options:
  a: 1 month for skills, 3 months for rules
  b: 6 months for both skills and rules
  c: 3 months for skills, 6 months for rules
  d: 1 month for rules, 6 months for skills
doc_reference:
  file: guide/core/context-engineering.md
  section: 12. Ejection - Disciplined De-engineering
  anchor: '#ejection-heuristics'
---

What are the default dormancy thresholds for ejection candidates in ACE-v2?

---

The guide defines 3 months for skills and 6 months for rules as the default dormancy thresholds. Skills change more frequently as tooling evolves, so a shorter window is appropriate. Rules represent more stable conventions, so the threshold is longer. These are defaults, not absolutes: teams in fast-moving domains may use shorter windows, while teams with stable long-lived rules may extend them. The signal for dormancy is absence from the friction log, not just calendar time.
