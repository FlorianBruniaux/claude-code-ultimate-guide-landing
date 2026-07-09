---
id: 11-021
category_id: 11
difficulty: intermediate
profiles:
- senior
- power
correct: a
options:
  a: 94% of compilation errors were type errors, which is why strictly typed languages
    and strict architectural patterns act as a safety net for agent-generated code
  b: 94% of compilation errors were syntax errors, which is why linting should run
    before every agent commit
  c: LLM-generated code compiled successfully 94% of the time across all languages
    tested, with no meaningful gap between typed and untyped languages
  d: The study found no correlation between language typing and agent code quality,
    contradicting the field observations in the guide
doc_reference:
  file: guide/roles/adoption-approaches.md
  section: What We Do Know (Empirical Data)
---

A 2025 PLDI study from ETH Zurich and UC Berkeley analyzed compilation errors in LLM-generated code. What did it find, and what practical lesson does the guide draw from it?

---

The study found that 94% of compilation errors in LLM-generated code were type errors. The guide's practical takeaway is that strictly typed languages and strict architectural patterns, like hexagonal architecture or domain-driven design, act as a safety net because the compiler automatically rejects a large class of agent mistakes. A team's field notes cited in the guide observed this directly: the more structure a codebase imposes, the more consistently agents work within it, which rules out option d's claim of contradiction.
