---
id: 09-038
category_id: 9
difficulty: senior
profiles:
- junior
- senior
- power
correct: c
options:
  a: A CLI flag (--style) that changes terminal color scheme and output width
  b: A CLAUDE.md section that defines preferred response length and format
  c: Built-in response modes (Default/Explanatory/Learning) set via outputStyle in settings.json, or custom styles in .claude/styles/
  d: A PostToolUse hook that post-processes Claude's output before display
doc_reference:
  file: guide/ultimate-guide.md
  section: Output Styles
  anchor: '#output-styles'
---

What is the Output Styles feature and where is it configured?

---

Output Styles control **how Claude communicates**, not what it produces. Three built-in modes: `"Default"` (standard balanced responses), `"Explanatory"` (verbose, step-by-step reasoning), `"Learning"` (questions before answers, promotes skill development). Configure in `settings.json`:

```json
{ "outputStyle": "Learning" }
```

Or point to a custom style file: `{ "outputStyle": ".claude/styles/my-team-style.md" }`. Custom styles let teams define specific communication conventions shared across all contributors. This supersedes the older CLAUDE.md `## Learning Mode` header pattern, which still works but is less integrated.
