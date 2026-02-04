---
id: 09-014
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Simple natural language
  b: WHAT, WHERE, HOW, VERIFY
  c: Subject, Body, Footer
  d: Title, Description, Acceptance Criteria
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.11 Common Pitfalls & Best Practices
  anchor: '#effective-prompt-format'
---

What prompt format does the guide recommend for effective requests?

---

The recommended prompt format:

- **WHAT**: Concrete deliverable
- **WHERE**: File paths/locations
- **HOW**: Constraints/approach
- **VERIFY**: Success criteria

Example:
```
WHAT: Add input validation to the login form
WHERE: src/components/LoginForm.tsx, src/schemas/auth.ts
HOW: Use Zod schema validation, display errors inline
VERIFY: Empty email shows error, invalid format shows error
```
