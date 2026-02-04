---
id: 03-017
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Personal permissions
  b: Hook configurations that are committed to the repo
  c: API keys
  d: Cost tracking data
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.3 Settings & Permissions
  anchor: '#settingsjson-team-configuration'
---

What is stored in settings.json (not settings.local.json)?

---

settings.json stores hook configurations and is committed to the repo for team sharing. It defines hooks for PreToolUse, PostToolUse, UserPromptSubmit events - specifying matchers and hook scripts. Personal permission overrides go in settings.local.json (gitignored). This separation allows team automation while respecting personal preferences.
