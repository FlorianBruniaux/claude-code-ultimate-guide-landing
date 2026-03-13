---
id: 09-035
category_id: 9
difficulty: power
profiles:
- power
correct: c
options:
  a: If canary checks fail, the pipeline continues but logs warnings
  b: Canary checks run after execution to validate results
  c: If canary checks fail in the Check phase, the pipeline exits and you must fix the context issue before retrying
  d: Failed canary checks trigger an auto-repair loop that modifies CLAUDE.md
doc_reference:
  file: guide/core/context-engineering.md
  section: The ACE Pipeline
  anchor: '#the-ace-pipeline'
---

In the ACE pipeline, what happens when canary checks fail in the "Check" phase?

---

When canary checks fail, the ACE pipeline **exits immediately** and prompts you to fix the context issue before retrying. The script design is explicit: if `CANARY_EXIT -ne 0`, print "Canary checks failed. Fix context issues before executing." and exit with code 1. This is intentional — running Claude with broken context causes downstream failures that are harder to debug. The canary set should be 3-5 test prompts that verify key behavioral requirements of your CLAUDE.md before each automated run.
---
