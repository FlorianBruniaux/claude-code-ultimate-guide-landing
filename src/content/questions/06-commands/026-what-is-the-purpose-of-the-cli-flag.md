---
id: 06-026
category_id: 6
difficulty: power
profiles:
  - power
correct: c
options:
  a: Specifies which communication channels (Slack, email, webhook) receive Claude's output
  b: Sets the number of parallel tool execution channels for improved performance
  c: Enables a permission relay where MCP channel servers can forward tool approval prompts to an external system
  d: Configures Claude to subscribe to specific event channels from external services
doc_reference:
  file: guide/ultimate-guide.md
  section: Integration
  anchor: "#integration"
---

What is the purpose of the `--channels` CLI flag?

---

`--channels` is a permission relay mechanism. MCP servers that declare the `permission` capability can use it to forward tool approval prompts out of the terminal, for example to your phone, so you can approve or deny tool calls remotely without being at your keyboard. This is distinct from Remote Control (which mirrors the full session). The channels feature is specifically about delegating the permission decision flow to an external system.
