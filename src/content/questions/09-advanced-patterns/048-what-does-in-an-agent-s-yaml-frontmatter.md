---
id: 09-048
category_id: 9
difficulty: intermediate
profiles:
  - senior
  - power
correct: c
options:
  a: Sets the agent's communication style to be more concise
  b: Forces the agent to use Haiku for all its sub-agent spawning
  c: Configures the agent to run on the Haiku model instead of the session default
  d: Enables cost-saving mode that reduces tool calls
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Model per Agent Patterns
  anchor: "#model-per-agent-patterns"
---

What does `model: haiku` in an agent's YAML frontmatter do?

---

`model: haiku` in agent frontmatter sets the **model used for that specific agent**,
overriding the session default.

This is how you implement the planner/implementer pattern:
```yaml
# planner.md
model: opus    # Deep reasoning for strategy

# implementer.md
model: haiku   # Cost-effective for mechanical execution
```

Each agent runs independently with its configured model.
The session model (your default Sonnet) is unaffected.
