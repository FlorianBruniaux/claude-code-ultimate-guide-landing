---
id: 07-011
category_id: 7
difficulty: power
profiles:
- power
correct: b
options:
  a: Run Claude Code and hope it works
  b: Pipe test JSON to the hook script and check the exit code
  c: Deploy to production and monitor
  d: Security hooks cannot be tested
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.4 Security Hooks
  anchor: '#testing-security-hooks'
---

How do you test a security hook before deploying it?

---

Test hooks by piping JSON input and checking the exit code:

```bash
# Test with a blocked command
echo '{"tool_name":"Bash","tool_input":{"command":"rm -rf /"}}' | ./hooks/security-blocker.sh
echo "Exit code: $?"  # Should be 2

# Test with a safe command
echo '{"tool_name":"Bash","tool_input":{"command":"git status"}}' | ./hooks/security-blocker.sh
echo "Exit code: $?"  # Should be 0
```

This ensures your hook correctly blocks dangerous commands before deployment.
