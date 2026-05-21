---
id: 16-031
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: c
options:
  a: Define, Design, Implement, Validate
  b: Research, Spec, Code, Review
  c: Constitution, Specify, Plan, Tasks
  d: Requirements, Architecture, Implementation, Testing
doc_reference:
  file: guide/roles/ai-roles.md
  section: 17. Spec Engineer
  anchor: '#17-spec-engineer'
---

What are the four phases of GitHub Spec Kit's pipeline?

---

GitHub Spec Kit formalizes spec-driven development as a four-phase pipeline: Constitution (the invariants and constraints that bound the spec), Specify (writing the structured spec itself), Plan (the agent's implementation plan derived from the spec), and Tasks (the atomic implementation tasks). The spec file in `.specify/` is the governing artifact throughout. Factory.ai Missions extends this with behavioral validation contracts written before implementation begins.
