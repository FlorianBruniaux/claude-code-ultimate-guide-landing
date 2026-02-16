---
id: 08-018
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Functions and Routes
  b: Commands and Events
  c: Tools with UI metadata and UI resources (ui:// scheme)
  d: Plugins and Themes
doc_reference:
  file: guide/ultimate-guide.md
  section: MCP Apps
  anchor: '#mcp-apps'
---

What are the 2 core primitives of MCP Apps architecture?

---

MCP Apps (SEP-1865) introduce 2 core primitives:

1. **Tools with UI metadata** - Standard MCP tools annotated with rendering hints (input forms, output displays)
2. **UI resources (ui:// scheme)** - Resources that return UI components instead of data

Together, these allow MCP servers to provide both functionality and user interface, enabling richer agent-to-user interactions.
