---
id: 03-018
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: 3 domains (lint, test, build)
  b: '8 domains: frontend, backend, types, style, performance, accessibility, security,
    UX'
  c: '5 domains: syntax, logic, performance, security, style'
  d: 12 domains covering every possible check
doc_reference:
  file: guide/ultimate-guide.md
  section: Verification Loops
  anchor: '#verification-loops'
---

How many verification domains does the guide recommend for comprehensive quality checks?

---

**The guide's 8 verification domains** (WHAT to check):

1. Frontend (UI renders correctly)
2. Backend (API responds correctly)
3. Types (TypeScript/type checks pass)
4. Style (linting passes)
5. Performance (no regressions)
6. Accessibility (WCAG compliance)
7. Security (no vulnerabilities)
8. UX (user flows work end-to-end)

**Separate concept - Boris Cherny's 4 verification methods** (HOW to check):
1. CLI tools (bash scripts)
2. Backend (automated tests)
3. Frontend (browser verification)
4. Mobile (simulator testing)

**Key distinction**: The guide's **8 domains** define comprehensive quality dimensions to verify. Boris's **4 methods** describe the technical approaches to perform verification. CLAUDE.md should define which domains apply to each change type.
