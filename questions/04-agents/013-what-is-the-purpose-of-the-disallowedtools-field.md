---
id: 04-013
category_id: 4
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: To list tools the agent must use
  b: To block specific tools from being used by the agent
  c: To disable the agent
  d: To list deprecated tools
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.2 Creating Custom Agents
  anchor: '#agent-file-structure'
---

What is the purpose of the 'disallowedTools' field in agent frontmatter?

---

The disallowedTools field blocks specific tools from being used by the agent. For example, a code reviewer agent might have `disallowedTools: [WebSearch]` to ensure it focuses on the actual code rather than searching the web. This provides security boundaries and focuses the agent on its core purpose.
