---
id: 14-016
category_id: 14
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: It blocks any tool call that was not pre-approved by a manager, and rejected
    calls are emailed to the security team
  b: It writes a structured JSONL log of tool calls to a daily activity file, which
    a GitHub Actions workflow collects and uploads as an artifact when the PR is opened
    or updated
  c: It rewrites the commit message to include a full transcript of the session
  d: It uploads the entire conversation history to a public compliance dashboard automatically
doc_reference:
  file: guide/ops/ai-traceability.md
  section: PR Audit Trail
  anchor: '#pr-audit-trail'
---

In the PR audit trail pattern described in the guide's traceability page, what does the PreToolUse session-logger hook do, and how does that data reach the pull request?

---

The session-logger hook fires on PreToolUse and appends one JSON line per tool call, including the tool name, timestamp, session ID, and repository path, to a daily file under .claude/logs/. A GitHub Actions workflow triggered on pull request events then collects that log, along with the list of files modified and session metadata, and uploads it as a build artifact. That gives a regulated or compliance-conscious team a structured answer to what Claude did during a change, without relying on anyone's memory of the session. It doesn't block tool calls, email anyone, or publish anything to a public dashboard.
