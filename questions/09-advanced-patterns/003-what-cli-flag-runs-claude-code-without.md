---
id: 09-003
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: --ci
  b: --headless
  c: --batch
  d: --automated
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.3 CI/CD Integration
  anchor: '#headless-mode'
---

What CLI flag runs Claude Code without interactive prompts for CI/CD?

---

The `--headless` flag runs Claude Code without interactive prompts:

```bash
# Basic headless execution
claude --headless "Run the tests and report results"

# With timeout
claude --headless --timeout 300 "Build the project"
```

Essential for CI/CD integration, automated pipelines, and scripted workflows.
