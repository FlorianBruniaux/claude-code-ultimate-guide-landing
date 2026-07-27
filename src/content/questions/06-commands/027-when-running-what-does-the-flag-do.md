---
id: 06-027
category_id: 6
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Outputs the authentication token to stdout instead of storing it in the keychain
  b: Authenticates via Anthropic Console (API billing) instead of the default claude.ai OAuth flow
  c: Opens a browser console debug view for troubleshooting authentication issues
  d: Enables structured JSON output for the login command
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.79 (2026-03-19)
  anchor: "#v2179-2026-03-19"
---

When running `claude auth login`, what does the `--console` flag do?

---

The `--console` flag routes authentication through the Anthropic Console, which is the API billing path. This is the correct choice for teams and developers who access Claude Code via API keys managed in console.anthropic.com, as opposed to the standard claude.ai subscription OAuth flow. If your organization manages API credentials through the Anthropic Console rather than individual claude.ai accounts, use `claude auth login --console` to authenticate correctly.
