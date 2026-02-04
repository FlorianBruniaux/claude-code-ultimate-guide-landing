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

The `$ARGUMENTS` variable contains text passed after the command invocation.

**Syntax options**:
- `$ARGUMENTS` → Full argument string
- `$ARGUMENTS[0]` → First argument
- `$ARGUMENTS[1]` → Second argument
- **Shorthand**: `$0`, `$1`, `$2` → Equivalent to `$ARGUMENTS[0]`, `$ARGUMENTS[1]`, `$ARGUMENTS[2]`

**Example**: `/tech:deploy production staging`
- `$ARGUMENTS` = `"production staging"`
- `$0` or `$ARGUMENTS[0]` = `"production"`
- `$1` or `$ARGUMENTS[1]` = `"staging"`

Commands should document expected arguments and handle missing values gracefully.
