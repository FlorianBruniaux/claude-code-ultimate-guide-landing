---
id: 05-014
category_id: 5
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Ask, Answer, Assert
  b: Arrange, Act, Assert
  c: Analyze, Apply, Approve
  d: Accept, Adjust, Acknowledge
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.4 Skill Examples
  anchor: '#test-structure-aaa-pattern'
---

What is the AAA pattern in TDD testing?

---

AAA stands for Arrange, Act, Assert: 1) Arrange - set up test data and preconditions, 2) Act - execute the code being tested, 3) Assert - verify the result matches expectations. Example: Arrange items array, Act by calling calculateTotal(items), Assert that total equals expected value. This structure makes tests readable and maintainable.
