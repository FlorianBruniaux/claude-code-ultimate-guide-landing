---
id: 16-022
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: c
options:
  a: A plain text report summarizing friction patterns
  b: A Jira ticket for engineering to review
  c: A Git PR with config diff, friction evidence, canary results, and escalation note
  d: An automated commit directly to the config files
doc_reference:
  file: guide/core/context-engineering.md
  section: 11. Loop Closure - PR-Based Curation
  anchor: '#11-loop-closure-pr-based-curation'
---

What does the ACE-v2 Curator generate to close the feedback loop instead of a plain report?

---

The Curator generates a Git PR containing four elements: the exact config diff (a git-diff-ready patch, not prose), 3-5 friction events that drove the suggestion, before/after canary probe results, and an escalation note if this suggestion already appeared in prior reports without action. A human reviews and merges or closes. The Curator never modifies rules directly. The open loop failure on Aristote (same two suggestions proposed ten weeks apart, never merged) motivated this design: a PR is easier to act on than a report.
