---
id: 12-013
category_id: 12
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: ProjectManager API
  b: Kanban tool
  c: Tasks API (TaskCreate, TaskGet, TaskList, TaskUpdate)
  d: AgendaWrite tool
doc_reference:
  file: guide/ultimate-guide.md
  section: Tasks API
  anchor: '#tasks-api'
---

What tool replaced TodoWrite for task management in Claude Code v2.1.16+?

---

The Tasks API (v2.1.16+) replaced TodoWrite with 4 tools: TaskCreate (create tasks with descriptions), TaskGet (fetch full task details), TaskList (list all tasks with status), TaskUpdate (update status, dependencies, metadata). Key improvement: task dependencies via blockedBy/blocks fields.
