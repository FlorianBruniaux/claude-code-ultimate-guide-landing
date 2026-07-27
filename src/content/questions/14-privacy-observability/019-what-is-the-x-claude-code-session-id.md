---
id: 14-019
category_id: 14
difficulty: power
profiles:
  - power
correct: b
options:
  a: A header that Claude Code injects to authenticate API requests, should be removed before forwarding
  b: A session correlation header sent on every Claude Code API request, useful for tracing; nginx should pass it through to upstream services
  c: A rate-limiting header that nginx uses to throttle Claude Code traffic
  d: A header that identifies the Claude model version, set by Anthropic servers
doc_reference:
  file: guide/ultimate-guide.md
  section: Proxy-level session tracking with X-Claude-Code-Session-Id (v2.1.86+)
  anchor: "#proxy-level-session-tracking-with-x-claude-code-session-id-v2186"
---

What is the X-Claude-Code-Session-Id header and how should it be handled in nginx?

---

X-Claude-Code-Session-Id is a session correlation header that Claude Code attaches to every outbound API request. It enables distributed tracing: you can correlate a session's tool calls, API requests, and logs across microservices. In nginx, pass it through to upstream: `proxy_pass_header X-Claude-Code-Session-Id;`. In observability stacks, use it as a trace root to group all activity from a single Claude session.
