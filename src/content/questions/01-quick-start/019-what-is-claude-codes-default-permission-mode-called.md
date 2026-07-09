---
id: 01-019
category_id: 1
difficulty: junior
profiles:
- junior
- pm
correct: c
options:
  a: Plan mode, meaning Claude can only describe a plan and never touch files
  b: Bypass mode, meaning all permission checks are turned off from the start
  c: Manual mode, meaning Claude asks for approval before taking each action until
    you grant broader permissions
  d: Auto mode, meaning Claude executes every action without asking
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.200
---

What is Claude Code's default permission mode called as of v2.1.200, and what does it mean for someone using it for the first time?

---

As of v2.1.200, the mode previously labeled "default" is now called "Manual" across the CLI, --help, VS Code, and JetBrains (--permission-mode manual and "defaultMode": "manual" are accepted alongside the old value). For a first-time user this means Claude stops and asks before each file edit or command, the safest starting point. Auto mode and bypass permissions skip those prompts, and plan mode is a separate read-only planning state, not the default.
