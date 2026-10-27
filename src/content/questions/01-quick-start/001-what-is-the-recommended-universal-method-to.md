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
  d: curl -fsSL https://claude.ai/install.sh | bash
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.1 Installation
  anchor: '#11-installation'
official_doc: https://code.claude.com/docs/en/setup
---

Which installation method does Anthropic recommend for Claude Code on macOS, Linux, and WSL?

---

Anthropic recommends the **native installer**: `curl -fsSL https://claude.ai/install.sh | bash` (PowerShell: `irm https://claude.ai/install.ps1 | iex`). It auto-updates in the background. Homebrew (`brew install --cask claude-code`, note the cask), WinGet, Linux packages, and npm (`npm install -g @anthropic-ai/claude-code`, Node.js 22+) remain available but do not auto-update. There is no pip package.
