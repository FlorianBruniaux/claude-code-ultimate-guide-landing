#!/usr/bin/env python3
"""Fix 7 confirmed factual errors in questions.json"""

import json
import sys
from pathlib import Path

def main():
    repo_root = Path(__file__).parent.parent
    questions_file = repo_root / "questions.json"

    with open(questions_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    questions = data['questions']

    # Track changes
    changes = []

    # 1. Fix 01-001: npm is deprecated, curl install.sh is recommended
    q = next((q for q in questions if q['id'] == '01-001'), None)
    if q:
        q['correct'] = 'd'
        q['options']['d'] = 'curl -fsSL https://claude.ai/install.sh | sh'
        q['explanation'] = (
            "The recommended installation method is `curl -fsSL https://claude.ai/install.sh | sh` "
            "which works across all platforms. npm is deprecated - use `claude install` to migrate "
            "if you installed via npm. While Homebrew is available for macOS, the shell script is "
            "the universal method recommended in official docs."
        )
        changes.append("01-001: Changed install method from npm (deprecated) to curl install.sh")

    # 2. Fix 01-014: MCP server state NOT preserved
    q = next((q for q in questions if q['id'] == '01-014'), None)
    if q:
        q['options']['b'] = 'Full conversation history, files read/edited, CLAUDE.md settings'
        q['explanation'] = (
            "When you resume a session, Claude retains: full conversation history, "
            "files previously read/edited, CLAUDE.md and project settings, and "
            "uncommitted code changes awareness. MCP servers restart on each session - "
            "their state is NOT preserved. Session-scoped permissions also don't carry over."
        )
        changes.append("01-014: Removed MCP server state from preserved context")

    # 3. Fix 03-008: Correct syntax is 'Bash(git *)' not 'Bash(git status:*)'
    q = next((q for q in questions if q['id'] == '03-008'), None)
    if q:
        q['explanation'] = (
            "The pattern 'Bash(git *)' matches any git command. Permission patterns use wildcards: "
            "'Bash(git *)' matches any git command, 'Bash(pnpm *)' matches any pnpm command, "
            "'mcp__serena__*' matches all Serena MCP tools. The space-based syntax is current - "
            "colon syntax like 'Bash(git status:*)' is deprecated."
        )
        changes.append("03-008: Corrected permission syntax (space not colon)")

    # 4. Fix 03-011: .claude/CLAUDE.md should be committed (project memory)
    q = next((q for q in questions if q['id'] == '03-011'), None)
    if q:
        q['correct'] = 'c'
        q['options']['c'] = '.claude/settings.local.json and CLAUDE.local.md'
        q['explanation'] = (
            "Files that should be gitignored are: CLAUDE.local.md (local personal instructions) "
            "and .claude/settings.local.json (personal permissions). The .claude/CLAUDE.md file "
            "is project memory and should be committed. Files to commit include: agents/, commands/, "
            "hooks/, skills/, rules/, and settings.json. This separation allows personal "
            "customization while sharing team configurations."
        )
        changes.append("03-011: Corrected gitignore - .claude/CLAUDE.md should be committed")

    # 5. Fix 03-012: Syntax and file path corrections
    q = next((q for q in questions if q['id'] == '03-012'), None)
    if q:
        q['options']['b'] = 'Provides granular control with tool-specific patterns in .claude/settings.json'
        q['explanation'] = (
            "The allowedTools configuration in .claude/settings.json or .claude/settings.local.json "
            "provides granular control with specific patterns. For example: 'Read(*)' allows all reads, "
            "'Bash(git status *)' allows git status commands, 'Bash(pnpm *)' allows pnpm commands. "
            "You can set progressive permission levels from beginner (very restrictive) to advanced. "
            "Never use --dangerously-skip-permissions."
        )
        changes.append("03-012: Fixed path (~/.claude.json → .claude/settings.json) and syntax")

    # 6. Fix 10-014: Same gitignore issue as 03-011
    q = next((q for q in questions if q['id'] == '10-014'), None)
    if q:
        q['options']['b'] = 'Ignore settings.local.json and CLAUDE.local.md, keep agents/commands/hooks'
        q['explanation'] = (
            "Recommended .gitignore:\n\n"
            "```gitignore\n"
            "# Claude Code - Personal (ignore)\n"
            ".claude/settings.local.json\n"
            "CLAUDE.local.md\n"
            ".claude/.serena/\n\n"
            "# Claude Code - Team (keep/commit)\n"
            "# .claude/CLAUDE.md (project memory)\n"
            "# .claude/agents/\n"
            "# .claude/commands/\n"
            "# .claude/hooks/\n"
            "# .claude/settings.json\n"
            "```\n\n"
            "This keeps team workflows shared while personal settings stay private."
        )
        changes.append("10-014: Corrected gitignore pattern - keep .claude/CLAUDE.md")

    # 7. Delete 10-005: Duplicate of 01-010
    questions_before = len(questions)
    questions[:] = [q for q in questions if q['id'] != '10-005']
    if len(questions) < questions_before:
        changes.append("10-005: Deleted (duplicate of 01-010)")

    # Update questions count
    data['questions'] = questions

    # Write back
    with open(questions_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Fixed {len(changes)} issues in questions.json")
    for change in changes:
        print(f"  • {change}")
    print(f"\n📊 Questions: {questions_before} → {len(questions)}")

if __name__ == "__main__":
    main()
