---
id: 09-037
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Pro 3/day, Max 10/day, Team 20/day, Enterprise unlimited
  b: Pro 5/day, Max 15/day, Team/Enterprise 25/day
  c: All tiers share a 10/day limit regardless of plan
  d: Pro 10/day, Max 50/day, unlimited for Enterprise
doc_reference:
  file: guide/ultimate-guide.md
  section: Routines
  anchor: '#routines'
---

What are the daily plan limits for Claude Code Routines by subscription tier?

---

Claude Code Routines (cloud automation triggered by HTTP POST or GitHub events) enforce **per-plan daily limits**: Pro = 5/day, Max = 15/day, Team/Enterprise = 25/day. These limits apply per Routine (per plan), not per account total. This means a team with 3 active Routines has a 25/day budget per Routine. Routines are different from Ultraplan — Routines are scheduled/triggered automation; Ultraplan is on-demand planning. Both are cloud-executed but serve distinct workflows.
