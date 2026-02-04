---
id: 12-015
category_id: 12
difficulty: power
profiles:
- power
correct: b
options:
  a: Production-ready multi-agent framework
  b: Experimental multi-agent coordination (spawnTeam, discoverTeams, requestJoin,
    approveJoin) - unstable, no official support
  c: Official Anthropic tool for team collaboration
  d: Deprecated feature replaced by Tasks API
doc_reference:
  file: guide/ultimate-guide.md
  section: TeammateTool
  anchor: '#teammatetool'
---

What is TeammateTool and what is its status?

---

TeammateTool is an experimental multi-agent coordination tool with 4 operations: spawnTeam, discoverTeams, requestJoin, approveJoin. Status: unstable, not officially supported by Anthropic. It allows Claude instances to form teams and coordinate, but the API is subject to change without notice. Not recommended for production use.
