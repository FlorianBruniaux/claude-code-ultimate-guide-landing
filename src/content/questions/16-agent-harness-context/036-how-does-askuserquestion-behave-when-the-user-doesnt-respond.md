---
id: 16-036
category_id: 16
difficulty: senior
profiles:
- power
- senior
correct: a
options:
  a: It waits indefinitely; auto-continuing after an idle timeout is now opt-in via
    /config
  b: It auto-continues with the first listed option after 30 seconds, the same behavior
    as before
  c: It cancels the current turn entirely and returns control to the user prompt
  d: It escalates to a background agent, which answers on the user's behalf using
    session history
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.200
---

Starting in v2.1.200, how does an AskUserQuestion dialog behave by default when the user doesn't respond?

---

The release note is explicit: AskUserQuestion dialogs no longer auto-continue by default, and you opt back into an idle timeout through /config if you want the old behavior. Option b describes the pre-v2.1.200 default, which this release removed. Options c and d describe behaviors that don't exist in the release notes.
