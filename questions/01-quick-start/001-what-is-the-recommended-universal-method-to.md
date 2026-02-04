---
id: 01-001
category_id: 1
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: d
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

The recommended installation method is `curl -fsSL https://claude.ai/install.sh | sh` which works across all platforms. npm is deprecated - use `claude install` to migrate if you installed via npm. While Homebrew is available for macOS, the shell script is the universal method recommended in official docs.
