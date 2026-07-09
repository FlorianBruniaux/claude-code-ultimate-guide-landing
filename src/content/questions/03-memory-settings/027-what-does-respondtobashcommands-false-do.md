---
id: 03-027
category_id: 3
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: It disables the ! bash command shortcut entirely, forcing you to use the Bash
    tool instead
  b: It stops Claude from automatically responding to ! bash command output, restoring
    the earlier context-only behavior
  c: It requires manual approval before every ! bash command runs, even in auto mode
  d: It forces all ! bash commands to run inside a sandboxed subshell
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.186
---

What does setting "respondToBashCommands": false in settings.json do, introduced in Claude Code v2.1.186?

---

v2.1.186 made ! bash commands automatically trigger a Claude response to their output. Setting "respondToBashCommands": false opts back into the earlier behavior, where ! output is added to context but doesn't prompt a reply. It doesn't disable the ! shortcut, doesn't add an approval step, and has nothing to do with sandboxing.
