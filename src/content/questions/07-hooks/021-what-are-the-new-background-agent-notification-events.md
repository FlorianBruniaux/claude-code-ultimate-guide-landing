---
id: 07-021
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: BackgroundStart and BackgroundStop, fired only for agents launched with --background
  b: PermissionRequest and PermissionGranted, fired when a background agent hits a
    permission prompt
  c: SubagentStart and SubagentStop, fired whenever any subagent is spawned or finishes
  d: agent_needs_input and agent_completed, fired when a background agent needs input
    or finishes its work
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

Since background subagents began running in the background by default, the Notification hook gained two new event types tied to agent lifecycle. What are they, and when do they fire?

---

agent_needs_input fires when a background session launched from claude agents stops and needs the user to respond, and agent_completed fires when it finishes its work. Both were added in v2.1.198 alongside subagents becoming background-by-default, so a hook script can react to these events instead of the user polling the agents panel. SubagentStart/SubagentStop is a separate, older pair tracking the whole subagent lifecycle, not specifically background-agent notifications, which is why option c is wrong. Options a and b name event types that don't exist.
