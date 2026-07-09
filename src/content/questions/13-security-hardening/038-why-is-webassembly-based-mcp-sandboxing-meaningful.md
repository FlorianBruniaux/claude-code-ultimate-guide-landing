---
id: 13-038
category_id: 13
difficulty: power
profiles:
- power
correct: a
options:
  a: It compiles MCP servers into .wasm components with runtime-enforced capability
    grants, so a tool only gets the filesystem paths, network hosts, and env vars
    explicitly declared, rather than relying on the tool's own code to self-restrict
  b: It makes MCP tool calls run faster than native binaries by skipping the permission
    system entirely
  c: It automatically patches known CVEs in MCP servers at runtime without requiring
    updates
  d: It replaces the need for reviewing MCP server source code before installation
doc_reference:
  file: guide/security/sandbox-isolation.md
  section: 7b. WebAssembly-based MCP Tool Sandboxing (Experimental)
  anchor: '#7b-webassembly-based-mcp-tool-sandboxing-experimental'
---

Why does the guide describe WebAssembly-based sandboxing, via tools like Wassette, as a meaningful alternative to process-level isolation for MCP tools?

---

WASM-based sandboxing addresses a specific threat: a compromised or careless MCP server with unpredictable filesystem or network access. Wassette compiles an MCP server to a Wasm component and enforces a YAML-declared capability grant at the runtime level, so the deny-by-default boundary doesn't depend on the tool's own code behaving correctly. The guide calls this browser-grade isolation, a meaningful guarantee but not a certified enterprise security boundary, and notes Wassette itself isn't yet production-ready. It doesn't speed up calls by skipping permissions, patch CVEs automatically, or remove the need for a code review.
