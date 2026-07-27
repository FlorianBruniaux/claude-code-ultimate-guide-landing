---
id: 06-023
category_id: 6
difficulty: power
profiles:
  - power
correct: b
options:
  a: Provides a fallback value for `$ARGUMENTS` when the user invokes the command with no arguments
  b: Displays placeholder text in the slash command picker UI showing the expected argument format
  c: Validates the arguments against a schema before the command runs
  d: Sets the default effort level when the command is invoked with arguments
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.3 Variable Interpolation
  anchor: "#variable-interpolation"
---

What does the `argument-hint` frontmatter field do in a custom command or skill file?

---

`argument-hint` is a frontmatter field that controls what placeholder text appears in the slash command picker when a command or skill accepts `$ARGUMENTS`. When a user types the command name, the picker shows the hint as a visual guide to the expected argument format. Example: `argument-hint: "<env> [--skip-tests] [--dry-run]"`. This field has no effect on argument validation or default values — it is purely a UI affordance for discoverability.
