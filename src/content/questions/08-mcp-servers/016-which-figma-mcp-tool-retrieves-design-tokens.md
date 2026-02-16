---
id: 08-016
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: get_design_context
  b: get_variable_defs
  c: get_metadata
  d: get_screenshot
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.3 Figma MCP Integration
  anchor: '#available-tools-via-figma-mcp'
---

Which Figma MCP tool retrieves design tokens (colors, spacing, typography)?

---

`get_variable_defs` retrieves design tokens like colors (--color-primary: #3B82F6), spacing (--spacing-md: 16px), and typography. Recommended workflow: get_metadata → get_design_context → get_variable_defs (once per project) → get_screenshot (only when visual reference needed).
