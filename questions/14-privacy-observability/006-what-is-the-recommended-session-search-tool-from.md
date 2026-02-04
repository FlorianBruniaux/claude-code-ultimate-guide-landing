---
id: 14-006
category_id: 14
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: claude-conversation-extractor
  b: session-search.sh (zero-dependency bash script)
  c: ran CLI (npm)
  d: Built-in /search command
doc_reference:
  file: guide/observability.md
  section: 'Recommended: session-search.sh'
  anchor: '#recommended-session-searchsh'
---

What is the recommended session search tool from the guide?

---

session-search.sh is the recommended tool: zero dependencies (bash only), fast (~10ms list, ~400ms search), displays ready-to-use 'claude --resume' commands. Install with alias 'cs' for quick access. Alternative Python tools exist but are slower.
