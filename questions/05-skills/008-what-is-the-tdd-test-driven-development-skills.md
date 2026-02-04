---
id: 05-008
category_id: 5
difficulty: power
profiles:
- power
correct: b
options:
  a: Write tests after code
  b: RED (failing test) -> GREEN (minimal code to pass) -> REFACTOR (improve while
    green)
  c: Write all tests first, then all code
  d: Skip tests for speed
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.4 Skill Examples
  anchor: '#example-2-tdd-skill'
---

What is the TDD (Test-Driven Development) skill's core methodology?

---

The TDD skill follows: 1) RED - write a failing test for desired behavior BEFORE code, 2) GREEN - write MINIMUM code to make the test pass, 3) REFACTOR - improve implementation while keeping tests green, then repeat. This cycle ensures tests actually verify behavior by requiring failure first, then incremental improvement.
