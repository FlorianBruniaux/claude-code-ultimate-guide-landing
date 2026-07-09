---
id: 09-039
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: Running the judge synchronously would penalize every user with added latency
    to catch a failure rate that only affects a minority of interactions; instead
    the response is served immediately and judged afterward on the logged data
  b: Asynchronous judging is required because the judge model is always smaller and
    slower than the production model, so it cannot keep up with real-time traffic
  c: Synchronous judging is technically impossible because LLM-as-judge only works
    on batches of at least 50 requests at a time
  d: Asynchronous judging avoids the cost of logging inputs and outputs, since only
    flagged responses need to be stored
doc_reference:
  file: guide/roles/agent-evaluation.md
  section: 'LLM-as-Judge: Run Asynchronously'
  anchor: '#llm-as-judge-run-asynchronously'
---

The guide describes running LLM-as-judge evaluation asynchronously rather than synchronously on every user request. What is the reasoning behind that pattern?

---

The guide lays out the production pattern directly: serve the agent response immediately, log the input and output, run the judge model asynchronously on the logged data, then use the verdicts to update the dataset and flag regressions. Option b is wrong on the facts, the judge model is typically larger than the production model, not smaller, for example using Opus to judge Sonnet outputs. Options c and d invent constraints the guide never states.
