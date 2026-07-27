---
id: 06-024
category_id: 6
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: "`/investigate` = post-deploy monitoring; `/qa` = root-cause debugging; `/canary` = quality assurance testing"
  b: "`/investigate` = root-cause debugging before any fix; `/qa` = diff-aware web app QA testing; `/canary` = post-deploy production monitoring"
  c: "`/investigate` = code review workflow; `/qa` = canary deployment rollout; `/canary` = automated test generation"
  d: "`/investigate` = security vulnerability scan; `/qa` = test coverage report; `/canary` = gradual traffic rollout"
doc_reference:
  file: examples/commands/
  section: Custom Command Templates
  anchor: "#command-examples"
---

Among the guide's example commands `/investigate`, `/qa`, and `/canary`, which pairing of command to purpose is correct?

---

All three are custom command templates in `examples/commands/`. `/investigate` enforces systematic root-cause analysis before writing any fix. `/qa` runs diff-aware, tiered quality assurance on a web app by identifying affected routes from the current branch's changes. `/canary` monitors a live application after deployment and compares against a pre-deploy baseline. These commands show how structured workflows can be encoded beyond simple prompts.
