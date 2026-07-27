---
id: 07-028
category_id: 7
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Session-scoped hooks run with elevated permissions and can bypass security gates
  b: Session-scoped hooks are registered at runtime, last only for the current session, and are never written to any config file
  c: Session-scoped hooks only support the `command` type, not `http` or `agent`
  d: Session-scoped hooks fire before settings.json hooks in all events
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: "#session-scoped-hooks"
---

What distinguishes session-scoped hooks from hooks defined in settings.json?

---

Session-scoped hooks are ephemeral: registered at runtime via the programmatic API or by skills at invocation time, they exist only for the duration of that session and disappear when it ends. Nothing is written to `settings.json` or any config file. This is exactly how skills register temporary callbacks during their invocation. Once the skill finishes or the session ends, those hooks are gone. Session-scoped hooks follow the same JSON schema as persistent hooks.
