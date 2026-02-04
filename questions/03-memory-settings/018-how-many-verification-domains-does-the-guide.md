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

The Claude Code guide extends verification loops to 8 comprehensive domains for quality checks:

1. Frontend (UI renders correctly)
2. Backend (API responds correctly)
3. Types (TypeScript/type checks pass)
4. Style (linting passes)
5. Performance (no regressions)
6. Accessibility (WCAG compliance)
7. Security (no vulnerabilities)
8. UX (user flows work end-to-end)

Note: Boris Cherny (Claude Code creator) emphasizes verification loops with 4 core methods: CLI tools (bash), Backend (tests), Frontend (browser), Mobile (simulator). The 8-domain taxonomy is the guide's expanded framework (v3.13.0).

CLAUDE.md should define which domains to check for each type of change.
