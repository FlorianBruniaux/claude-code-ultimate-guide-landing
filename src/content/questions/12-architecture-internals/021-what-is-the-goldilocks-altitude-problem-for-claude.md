---
id: 12-021
category_id: 12
difficulty: intermediate
profiles:
  - senior
  - power
correct: b
options:
  a: Finding the right file size for CLAUDE.md — not too large (context waste) nor too small (insufficient guidance)
  b: "The challenge of writing rules at the right abstraction level: too high-level (ignored/mis-applied) vs too low-level (brittle, over-specified)"
  c: Choosing the right directory depth for nested CLAUDE.md files in a monorepo
  d: Balancing rule strictness — too strict causes Claude to refuse valid tasks, too loose provides no guidance
doc_reference:
  file: guide/core/architecture.md
  section: Goldilocks Altitude
---

What is the 'Goldilocks altitude problem' for CLAUDE.md project rules?

---

The Goldilocks altitude problem: rules written too high ("write good code") are too abstract to apply consistently. Rules written too low ("always add a blank line after function declarations") are brittle — they conflict with context or become stale. The sweet spot is mid-altitude: specific enough to be actionable, abstract enough to generalize across similar situations. Example of right altitude: "prefer functional style for data transformations; use classes only when you need stateful lifecycle management."
