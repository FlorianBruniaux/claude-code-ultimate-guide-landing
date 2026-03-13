---
id: 03-024
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
correct: a
options:
  a: Customize the rotating action words and tips shown in the terminal spinner while Claude works
  b: Configure how Claude describes its reasoning steps in responses
  c: Set the verbs Claude uses in commit messages
  d: Define the progress bar style for long-running bash commands
doc_reference:
  file: guide/ultimate-guide.md
  section: Terminal Personalization Settings
  anchor: '#terminal-personalization-settings'
---

What do the `spinnerVerbs` and `spinnerTipsOverride` settings control in `settings.json`?

---

`spinnerVerbs` replaces or extends the rotating action words shown in the terminal while Claude is working (e.g. "Analyzing…", "Caffeinating…"). Set `"mode": "replace"` to fully replace the defaults or `"mode": "add"` to extend them. `spinnerTipsOverride` customizes the tips shown alongside the spinner; use `"excludeDefault": true` to remove built-in tips entirely. These settings have zero functional effect — they are purely UX personalization for developers who want a more personal or fun terminal experience.
---
