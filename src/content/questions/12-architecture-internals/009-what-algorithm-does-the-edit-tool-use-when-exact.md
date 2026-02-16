---
id: 12-009
category_id: 12
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Returns error immediately
  b: Fuzzy match (whitespace normalization, line ending normalization, context expansion)
  c: Regex pattern matching
  d: Semantic similarity search
doc_reference:
  file: guide/architecture.md
  section: Fuzzy Matching Details
  anchor: '#fuzzy-matching-details'
---

What algorithm does the Edit tool use when exact match fails?

---

When exact match fails, Edit attempts fuzzy matching: (1) Whitespace normalization (trailing spaces, indentation), (2) Line ending normalization (CRLF vs LF), (3) Context expansion (surrounding lines). Only if fuzzy match also fails does it return an error.
