---
id: 10-011
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: --cost-limit
  b: --max-budget-usd
  c: --spending-cap
  d: --budget
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.3 Configuration Reference
  anchor: '#cli-flags-reference'
---

What flag limits maximum API spend in headless mode?

---

The `--max-budget-usd` flag sets maximum API spend (only with `--print`):

```bash
claude -p "analyze" --max-budget-usd 5.00
```

This prevents runaway costs in automated pipelines. The operation stops if the budget is exceeded.

**Note:** Budget calibration depends on the model in use. Opus 4.7 (`claude-opus-4-7`) costs $5/$25 per MTok (input/output), significantly higher than Sonnet. Set your budget ceiling accordingly when running headless pipelines with heavier models.
