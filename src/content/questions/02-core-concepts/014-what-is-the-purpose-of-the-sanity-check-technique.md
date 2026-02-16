---
id: 02-014
category_id: 2
difficulty: power
profiles:
- power
correct: b
options:
  a: To verify code compiles correctly
  b: To verify Claude has loaded your CLAUDE.md configuration correctly
  c: To check for memory leaks
  d: To validate test coverage
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.2 Context Management
  anchor: '#sanity-check-technique'
---

What is the purpose of the 'Sanity Check Technique'?

---

The Sanity Check Technique verifies Claude loaded your configuration. Add identifiable info to CLAUDE.md (like your name, project name, tech stack), then ask Claude "What is my name? What project am I working on?" Correct answers confirm configuration is loaded. For advanced checking, add multiple checkpoints throughout long CLAUDE.md files.
