---
id: 13-036
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: A supply chain attack that poisoned MCP server npm packages with malicious tool definitions
  b: A social engineering campaign impersonating Anthropic support to steal API keys
  c: URL prompt injection delivered via Google Ads targeting Claude Code users — injecting malicious instructions through search result URLs
  d: A CLAUDE.md poisoning attack delivered through compromised GitHub repositories
doc_reference:
  file: guide/security/security-hardening.md
  section: Claudy Day Attack
  anchor: '#claudy-day-attack'
---

What was the Claudy Day attack and what made it novel?

---

Claudy Day was a **URL-based prompt injection attack** delivered through Google Ads. Attackers purchased search ads targeting Claude Code users; the ad URLs contained encoded prompt injection payloads. When Claude Code or Claude Desktop fetched these URLs (e.g., via web search or link preview), the malicious instructions executed in the agent's context — redirecting behavior, exfiltrating data, or installing backdoors. Novel because: the attack surface was the search advertising ecosystem, not the software itself. Defense: treat all URL content as untrusted input; add prompt injection detection to PostToolUse hooks for WebSearch/WebFetch tool results.
