---
id: 03-011
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: /project/CLAUDE.md
  b: .claude/agents/
  c: .claude/settings.local.json and CLAUDE.local.md
  d: .claude/hooks/
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.2 The .claude/ Folder Structure
  anchor: '#what-goes-where'
official_doc: https://code.claude.com/docs/en/memory
---

Which of these should be gitignored?

---

Files that should be gitignored are: CLAUDE.local.md (local personal instructions) and .claude/settings.local.json (personal permissions). The .claude/CLAUDE.md file is project memory and should be committed. Files to commit include: agents/, commands/, hooks/, skills/, rules/, and settings.json. This separation allows personal customization while sharing team configurations.
