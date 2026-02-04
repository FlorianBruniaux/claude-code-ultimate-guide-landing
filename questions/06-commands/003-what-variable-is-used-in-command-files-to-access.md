---
id: 06-003
category_id: 6
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: $ARGS
  b: $INPUT
  c: $ARGUMENTS
  d: $PARAMS
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.2 Creating Custom Commands
  anchor: '#variable-interpolation'
official_doc: https://code.claude.com/docs/en/slash-commands
---

What variable is used in command files to access arguments passed to the command?

---

The `$ARGUMENTS` variable contains any text passed after the command invocation.

For example, when you run `/tech:deploy production`, the variable `$ARGUMENTS`
will contain `production`.

This enables dynamic commands that can adapt based on user input.
Commands should document how they handle arguments and what happens if none are provided.
