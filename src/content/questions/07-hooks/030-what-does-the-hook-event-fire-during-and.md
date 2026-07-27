---
id: 07-030
category_id: 7
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: After the first user message, to initialize project-specific tooling
  b: During the environment setup phase at session start, for installing tools or validating prerequisites before the session accepts prompts
  c: When a CLAUDE.md file is first loaded, to audit instruction content
  d: Before each tool call, to prepare the execution environment
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.1 The Event System
  anchor: "#event-types"
---

What does the `Setup` hook event fire during, and what is its primary use case?

---

The `Setup` event fires during the environment setup phase at session start (not after the first user message). It cannot block operations. Its primary use case is installing tools, validating prerequisites, or running any initialization logic that should complete before the session begins accepting user prompts. This is different from `SessionStart` (fires when the session begins or resumes) and from `InstructionsLoaded` (fires when a CLAUDE.md file is loaded).
