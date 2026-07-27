---
id: 09-040
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: Use /agent-teams command
  b: Set CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 or add to settings.json
  c: Install agent-teams plugin from skills.sh
  d: Use --teams CLI flag
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Setup & Configuration
  anchor: "#3-setup-configuration"
---

How do you enable agent teams in Claude Code v2.1.32+?

---

Agent teams require experimental feature flag. Two methods:

1. **Environment variable**: `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
2. **Settings file**: Add `{"experimental": {"agentTeams": true}}` to ~/.claude/settings.json

Also requires Opus 4.6 model minimum. Feature is experimental (research preview).
