---
id: 02-023
category_id: 2
difficulty: intermediate
profiles:
  - senior
  - power
correct: b
options:
  a: Teams smaller than 5 developers who need a simple process
  b: Feature teams with parallel delivery needs — multiple features developed simultaneously
  c: Projects requiring detailed UML documentation and design models
  d: Enterprise teams with more than 50 developers
doc_reference:
  file: guide/core/methodologies.md
  section: "Tier 4: Feature Delivery"
  anchor: "#tier-4-feature-delivery"
---

What is the primary criterion for choosing FDD (Feature-Driven Development) with Claude Code?

---

FDD's primary criterion is feature teams with parallel delivery needs — multiple features being developed simultaneously across the team. FDD's per-feature iteration (Design → Build) maps well onto Claude Code's session-based workflow, where each feature gets a dedicated planning and implementation session. The key signal is "parallel delivery", not team size. FDD is less suited to projects where features have deep interdependencies requiring sequential development.
