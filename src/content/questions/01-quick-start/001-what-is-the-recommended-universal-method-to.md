---
id: 01-001
category_id: 1
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: brew install claude-code
  b: npm install -g @anthropic-ai/claude-code
  c: pip install claude-code
  d: curl -fsSL https://claude.ai/install.sh | sh
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.1 Installation
  anchor: '#11-installation'
official_doc: https://code.claude.com/docs/en/setup
---

What is the recommended universal method to install Claude Code?

---

The universal method is `npm install -g @anthropic-ai/claude-code` which works across all platforms (Windows, macOS, Linux). While shell scripts (curl/PowerShell) and Homebrew are available alternatives, npm is explicitly labeled as the "Universal Method" in the official guide.
