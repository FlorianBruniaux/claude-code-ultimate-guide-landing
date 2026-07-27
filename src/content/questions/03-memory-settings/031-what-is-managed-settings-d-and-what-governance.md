---
id: 03-031
category_id: 3
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: A directory for storing backup copies of settings.json
  b: An enterprise governance layer where admins drop config fragments that merge with project settings, overriding team-level settings
  c: A directory for version-controlled settings history
  d: A staging area for settings changes that need approval before applying
doc_reference:
  file: guide/ultimate-guide.md
  section: "Policy fragment deployment with managed-settings.d/ (v2.1.83+)"
  anchor: "#policy-fragment-deployment-with-managed-settingsd-v2183"
---

What is managed-settings.d/ and what governance problem does it solve?

---

managed-settings.d/ is an enterprise governance mechanism: administrators drop JSON config fragments into this directory, and Claude Code merges them with (and overrides) project-level settings.json. This solves the problem of enforcing org-wide security policies (banned tools, required hooks, blocked paths) without modifying each team's repo. IT/Security teams control the managed layer; developers control their project layer; managed always wins conflicts.
