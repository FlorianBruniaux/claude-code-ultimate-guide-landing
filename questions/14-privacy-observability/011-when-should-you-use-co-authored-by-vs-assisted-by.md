---
id: 14-011
category_id: 14
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Always use Co-Authored-By for any AI involvement
  b: Co-Authored-By when AI generated significant code, Assisted-By when AI only advised
    or reviewed
  c: Never attribute AI in commits
  d: Use both on every commit
doc_reference:
  file: guide/ultimate-guide.md
  section: AI Traceability
  anchor: '#ai-traceability'
---

When should you use 'Co-Authored-By' vs 'Assisted-By' in git commits?

---

AI traceability in git commits:

- **Co-Authored-By**: When AI generated significant portions of code (implementation, refactoring)
- **Assisted-By**: When AI only advised, reviewed, or suggested minor changes

This distinction matters for code ownership, audit trails, and understanding who (or what) actually wrote the code. Some teams add this to CLAUDE.md as a mandatory commit convention.
