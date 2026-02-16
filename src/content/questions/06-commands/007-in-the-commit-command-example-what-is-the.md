---
id: 06-007
category_id: 6
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Simple description
  b: 'Conventional Commits: type(scope): description'
  c: Date - Author - Message
  d: 'JIRA-123: Message'
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.4 Command Examples
  anchor: '#example-1-commit-command'
---

In the commit command example, what is the recommended commit message format?

---

The guide recommends Conventional Commits format: `type(scope): description`

Common types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `docs`: Documentation
- `test`: Test changes
- `chore`: Maintenance

This provides consistent, parseable commit history useful for changelogs and releases.
