---
id: 09-003
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: -p (prompt flag for non-interactive execution)
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

The `-p` flag provides a prompt directly on the command line, running Claude Code without interactive prompts:

```bash
# Basic headless execution
claude -p "Run the tests and report results"

# With timeout
claude -p --timeout 300 "Build the project"

# With specific model
claude -p --model sonnet "Analyze code quality"
```

Note: There is no `--headless` flag. The `-p` flag inherently makes execution non-interactive by accepting the prompt as a CLI argument. Essential for CI/CD integration, automated pipelines, and scripted workflows.
