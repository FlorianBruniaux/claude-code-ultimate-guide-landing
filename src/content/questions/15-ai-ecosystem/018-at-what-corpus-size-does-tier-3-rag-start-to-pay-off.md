---
id: 15-018
category_id: 15
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: c
options:
  a: 10 to 50 documents
  b: There is no size threshold; RAG should be the default from day one for any team
    knowledge base
  c: Roughly 100 to 1,000 documents
  d: 5,000 to 10,000 documents
doc_reference:
  file: guide/ecosystem/team-knowledge-base.md
  section: 'Tier 3: RAG at Scale'
  anchor: '#tier-3-rag-at-scale'
---

In the team knowledge base guide's three-tier model, at roughly what corpus size does adding a Tier 3 RAG layer, exposed to the agent as an MCP server, start to outweigh reading files directly or connecting to a live source?

---

The guide places the crossover at roughly 100 to 1,000 documents, depending on document size and how much each query needs to span. Below that range, direct file reads or a live connector keep the accuracy of reading the actual document. The guide explicitly warns against adding RAG by default, since it is infrastructure with a maintenance cost, which rules out option b.
