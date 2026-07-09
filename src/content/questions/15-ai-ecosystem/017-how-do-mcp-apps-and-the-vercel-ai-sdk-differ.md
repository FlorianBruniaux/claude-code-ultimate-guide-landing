---
id: 15-017
category_id: 15
difficulty: intermediate
profiles:
- power
- pm
correct: b
options:
  a: The Vercel AI SDK requires a schema and a client-side renderer, while MCP Apps
    has no validation step at all
  b: MCP Apps carries a rendered HTML/iframe payload back through a tool response,
    while the Vercel AI SDK streams React components directly from the server so the
    client never parses an intermediate format
  c: MCP Apps is React-only like the Vercel AI SDK; the only difference is which company
    authored the spec
  d: MCP Apps only works inside Claude Desktop, while the Vercel AI SDK approach works
    across every MCP client
doc_reference:
  file: guide/ecosystem/ai-ecosystem.md
  section: '7.1 Generative UI: Agent-Driven Interactive Output Formats'
  anchor: '#71-generative-ui-agent-driven-interactive-output-formats'
---

Both MCP Apps and the Vercel AI SDK's generative UI pattern let a model produce an interactive interface, but at different layers of the stack. What is the key architectural difference between them?

---

MCP Apps is a protocol-level extension: a tool response carries an HTML/iframe payload that the client renders. The Vercel AI SDK pattern skips that intermediate format entirely, the server picks and streams React components directly, so there is nothing for the client to parse. Option c is false, the Vercel SDK is React-only while MCP Apps already ships across multiple clients including Claude Desktop, VS Code, ChatGPT, and Goose. Option d reverses which one is multi-client.
