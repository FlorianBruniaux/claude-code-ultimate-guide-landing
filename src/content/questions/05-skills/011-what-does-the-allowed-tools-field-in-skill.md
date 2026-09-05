---
id: 05-011
category_id: 5
difficulty: power
profiles:
- power
correct: b
options:
  a: Tools the skill documents
  b: Tools or command patterns pre-approved for the turn that invokes the skill
  c: Tools that can activate the skill
  d: A permanent sandbox that blocks every unlisted tool
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.2 Creating Skills
  anchor: '#skillmd-frontmatter'
---

What does the `allowed-tools` field in skill frontmatter control?

---

The `allowed-tools` field pre-approves matching tools or scoped commands for the turn that invokes the skill. For example, `allowed-tools: Read Grep Bash(npm run *)` narrows what runs without another permission prompt. It is not an exclusive allowlist or sandbox: other tools remain governed by session permissions. Use `disallowed-tools` for turn-scoped removal and project deny rules for persistent restrictions.
