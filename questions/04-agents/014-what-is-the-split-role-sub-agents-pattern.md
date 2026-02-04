---
id: 04-014
category_id: 4
difficulty: power
profiles:
- power
correct: b
options:
  a: Dividing one agent into multiple files
  b: Multi-perspective analysis using parallel agents with different expert roles
  c: Splitting code review into phases
  d: Assigning agents to different team members
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.6 Advanced Agent Patterns
  anchor: '#split-role-sub-agents'
---

What is the 'Split Role Sub-Agents' pattern?

---

Split Role Sub-Agents provide multi-perspective analysis in parallel. Process: 1) Activate Plan Mode (thinking enabled by default in Opus 4.5), 2) Ask "What expert roles would analyze this?", 3) Select roles (e.g., Security Expert, Senior Dev, Code Reviewer), 4) Run parallel analysis from each perspective, 5) Consolidate reports into recommendations. Great for comprehensive code and UX reviews.
