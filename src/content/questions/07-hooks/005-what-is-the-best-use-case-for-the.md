---
id: 07-005
category_id: 7
difficulty: power
profiles:
- power
correct: c
options:
  a: Blocking dangerous commands
  b: Auto-formatting code
  c: Adding context like git status to every prompt
  d: Playing notification sounds
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.3 Hook Templates
  anchor: '#template-3-userpromptsubmit-context-enricher'
---

What is the best use case for the `UserPromptSubmit` hook event?

---

The `UserPromptSubmit` event is ideal for context enrichment.

Use cases:
- **UserPromptSubmit**: Add context (git status, current branch, staged files)
- **PreToolUse**: Security validation (block dangerous commands)
- **PostToolUse**: Formatting, logging, quality checks
- **Notification**: Sound alerts, desktop notifications

The context enricher example adds git branch, last commit, and staged/unstaged info.
