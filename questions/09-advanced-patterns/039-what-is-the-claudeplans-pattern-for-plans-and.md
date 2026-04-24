---
id: 09-039
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: A folder for auto-generated session summaries created by /recap
  b: A directory where Claude stores intermediate task states during long runs
  c: A git-ignored workspace for draft planning documents that aren't committed
  d: A convention for committing specs and plans as versioned artifacts alongside code, making them first-class project documents
doc_reference:
  file: guide/ultimate-guide.md
  section: Plans as Artifacts
  anchor: '#plans-as-artifacts'
---

What is the `.claude/plans/` pattern for Plans/Specs as committed artifacts?

---

The `.claude/plans/` pattern treats implementation plans and specs as **committed, versioned files** rather than ephemeral chat context. Workflow: create a plan file (`/plan` or manually), commit it to `.claude/plans/feature-name.md`, reference it in future sessions with `@.claude/plans/feature-name.md`. Benefits: plans survive session resets, appear in git history with the code they drove, enable async review (teammates can comment on plans in PRs), and serve as the authoritative spec for multi-session implementations. Contrast with git-ignored scratch docs — `.claude/plans/` files are permanent project artifacts.
