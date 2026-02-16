---
id: 09-008
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Just run tests
  b: Build -> Lint -> Test -> Type-check -> THEN create PR
  c: Create PR first, then fix issues
  d: Manual review only
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.3 CI/CD Integration
  anchor: '#verify-gate-pattern'
---

What is the Verify Gate Pattern before creating a PR?

---

The Verify Gate Pattern ensures all checks pass before PR creation:

```
Build -> Lint -> Test -> Type-check -> THEN create PR
```

If ANY step fails:
- Stop immediately
- Report what failed and why
- Suggest fixes
- Do NOT proceed to PR creation

This prevents wasted CI cycles and review time.
