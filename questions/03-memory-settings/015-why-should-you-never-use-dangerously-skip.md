---
id: 03-015
category_id: 3
difficulty: power
profiles:
- power
correct: b
options:
  a: It's deprecated
  b: It can lead to destructive operations like rm -rf, force push to main, or DROP
    TABLE
  c: It costs more
  d: It's slower
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.3 Settings & Permissions
  anchor: '#-warning-never-use---dangerously-skip-permissions'
---

Why should you NEVER use --dangerously-skip-permissions?

---

Never use --dangerously-skip-permissions because it can lead to destructive operations. Horror stories include: `rm -rf node_modules` followed by `rm -rf .` (path error), `git push --force` to main unintentionally, `DROP TABLE users` in poorly generated migrations, and deletion of .env files with credentials. Always prefer granular allowedTools instead.
