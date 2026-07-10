---
id: 09-002
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Use 'ultrathink' keyword in your prompt
  b: Alt+T (or Option+T on macOS)
  c: --think CLI flag
  d: /thinking command
doc_reference:
  file: guide/ultimate-guide.md
  section: Extended Thinking (Opus 4.5+) & Adaptive Thinking (Opus 4.6+)
  anchor: '#extended-thinking-opus-45-adaptive-thinking-opus-46'
---

How do you toggle thinking mode in Claude Code (Opus 4.5+)?

---

With Opus 4.5 (v2.0.67+), thinking mode is enabled by default at maximum budget.

**Controlling Thinking Mode:**
| Method | Action | Persistence |
|--------|--------|-------------|
| **Alt+T** | Toggle on/off | Session |
| **/config** | Enable/disable globally | Permanent |

**Note**: Keywords like "ultrathink" are now cosmetic only - they no longer control thinking behavior.

Use Alt+T to disable thinking for simple tasks (faster, cheaper).
