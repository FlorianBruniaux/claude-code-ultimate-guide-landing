---
id: 09-028
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Documentation debt - missing docs
  b: Code you shipped but don't fully understand - distinct from technical debt
  c: Review debt - unreviewed PRs
  d: Design debt - skipped design phase
doc_reference:
  file: guide/ultimate-guide.md
  section: Practitioner Insights
  anchor: '#practitioner-insights'
---

What is 'comprehension debt' according to Addy Osmani's '80% Problem'?

---

**Comprehension debt** (from Osmani's "80% Problem" article): Code you shipped but don't fully understand, distinct from technical debt (code you understand but know is suboptimal).

Osmani synthesizes research showing that when AI generates 80%+ of code, developers risk accumulating comprehension debt by accepting suggestions without deep understanding.

**The guide connects this to "Vibe Coding Trap"**: accepting code based on "feels right" intuition rather than verified understanding.

**The fix**: Always be able to explain WHY the solution works, not just WHAT it does.
