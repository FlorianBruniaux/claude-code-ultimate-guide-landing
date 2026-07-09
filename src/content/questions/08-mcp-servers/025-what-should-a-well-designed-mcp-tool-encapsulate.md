---
id: 08-025
category_id: 8
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: c
options:
  a: One tool per API endpoint, so the agent has maximum flexibility to compose any
    sequence of calls itself
  b: As many tools as possible per server, so the model always has a specialized tool
    for any situation
  c: Tools that encapsulate a complete user intent, such as placing an order including
    the active discount, rather than exposing individual API operations the agent
    must chain itself
  d: Tools that return raw, unprocessed API responses, leaving all interpretation
    to the client model
doc_reference:
  file: guide/ecosystem/mcp-servers-ecosystem.md
  section: Usage Principles (Beyond the Evaluation Checklist)
---

A documented MCP design principle warns against exposing one tool per individual API operation. What should a well-designed MCP tool encapsulate instead?

---

The guide's usage principles argue for designing MCP tools around complete user intents rather than individual API calls. A tool covering a single API operation forces the agent to chain several calls itself, and each call in that chain is an independent point of failure. A tool that wraps a full workflow, like placing an order with its discount already applied, keeps the model on one well-defined path instead of composing several fragile steps. Options a, b, and d describe the fragmented, over-specialized, or under-processed design the principle argues against.
