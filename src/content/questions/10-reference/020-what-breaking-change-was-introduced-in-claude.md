---
id: 10-020
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Arguments removed entirely
  b: Migration from $ARGUMENTS.0 (dot syntax) to $ARGUMENTS[0] (bracket syntax)
  c: New $PARAMS variable replaced $ARGUMENTS
  d: Arguments now require JSON format
doc_reference:
  file: guide/ultimate-guide.md
  section: Breaking Changes
  anchor: '#breaking-changes'
---

What breaking change was introduced in Claude Code v2.1.19 for hook/command arguments?

---

Claude Code v2.1.19 changed argument access syntax from dot notation (`$ARGUMENTS.0`) to bracket notation (`$ARGUMENTS[0]`). This breaking change affects all custom commands and hooks that reference arguments. Update your scripts to use the new bracket syntax.
