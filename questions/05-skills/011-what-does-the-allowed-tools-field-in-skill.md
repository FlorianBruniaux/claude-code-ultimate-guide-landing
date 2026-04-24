---
id: 05-011
category_id: 5
difficulty: power
profiles:
- power
correct: b
options:
  a: Tools the skill documents
  b: Tools the skill can use when activated
  c: Tools that can activate the skill
  d: Tools to install
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.2 Creating Skills
  anchor: '#skillmd-frontmatter'
---

What does the 'allowed-tools' field in skill frontmatter control?

---

eThe `allowed-tools` field specifies which tools the skill can use when activated. For example, a security-guardian skill might have `allowed-tools: Read, Grep, Bash` — allowing it to read files, search for patterns, and run security scanning commands, but not modify files. This provides security boundaries for each skill.

**As of v2.1.118+:** Hooks within a skill context can also invoke MCP tools directly using `type: "mcp_tool"` in the hook definition — extending the skill's reach beyond the `allowed-tools` list for hook-triggered actions.
