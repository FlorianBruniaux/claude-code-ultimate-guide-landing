---
id: 04-018
category_id: 4
difficulty: power
profiles:
- power
correct: c
options:
  a: Skills are more reliable than CLAUDE.md
  b: Both have 100% reliability
  c: 'CLAUDE.md: 100% reliable (always loaded) vs Skills: ~56% auto-invoked'
  d: CLAUDE.md is deprecated in favor of Skills
doc_reference:
  file: guide/ultimate-guide.md
  section: AGENTS.md vs Skills Evaluation
  anchor: '#agentsmd-vs-skills-evaluation'
---

What is the invocation reliability difference between CLAUDE.md (eager context) and Skills (lazy invocation)?

---

CLAUDE.md uses eager context loading - always present in Claude's context, so 100% reliable activation. Skills use lazy invocation - auto-detected and invoked only when Claude recognizes the need, achieving ~56% auto-invocation rate according to Gao (2026). Trade-off: CLAUDE.md costs context tokens on every session, Skills save tokens but may miss activations. Use CLAUDE.md for critical behaviors, Skills for optional capabilities.
