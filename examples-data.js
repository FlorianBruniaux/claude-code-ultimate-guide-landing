/**
 * Examples data - Shared across all pages for global search
 * Source of truth for 49+ templates
 */
const EXAMPLES = {
    agents: {
        icon: "🤖",
        description: "Custom AI personas for specialized tasks. Place in .claude/agents/ or ~/.claude/agents/",
        files: [
            { name: "code-reviewer.md", path: "agents/code-reviewer.md", description: "Thorough code review with best practices", favorite: true },
            { name: "test-writer.md", path: "agents/test-writer.md", description: "TDD/BDD test generation specialist" },
            { name: "security-auditor.md", path: "agents/security-auditor.md", description: "Security vulnerability detection (OWASP)" },
            { name: "refactoring-specialist.md", path: "agents/refactoring-specialist.md", description: "Clean code refactoring expert" },
            { name: "output-evaluator.md", path: "agents/output-evaluator.md", description: "LLM-as-a-Judge quality gate" }
        ]
    },
    skills: {
        icon: "📚",
        description: "Reusable knowledge modules. Place in .claude/skills/ or ~/.claude/skills/",
        files: [
            { name: "tdd-workflow.md", path: "skills/tdd-workflow.md", description: "Test-Driven Development process" },
            { name: "security-checklist.md", path: "skills/security-checklist.md", description: "OWASP Top 10 security checks", favorite: true }
        ]
    },
    commands: {
        icon: "⚡",
        description: "Custom slash commands. Place in .claude/commands/ or ~/.claude/commands/",
        files: [
            { name: "commit.md", path: "commands/commit.md", description: "/commit - Conventional commit messages", favorite: true },
            { name: "pr.md", path: "commands/pr.md", description: "/pr - Create well-structured PRs", favorite: true },
            { name: "review-pr.md", path: "commands/review-pr.md", description: "/review-pr - PR review workflow" },
            { name: "release-notes.md", path: "commands/release-notes.md", description: "/release-notes - Generate in 3 formats", favorite: true },
            { name: "sonarqube.md", path: "commands/sonarqube.md", description: "/sonarqube - Analyze SonarCloud issues" },
            { name: "generate-tests.md", path: "commands/generate-tests.md", description: "/generate-tests - Test generation" },
            { name: "git-worktree.md", path: "commands/git-worktree.md", description: "/git-worktree - Isolated worktree setup", favorite: true },
            { name: "diagnose.md", path: "commands/diagnose.md", description: "/diagnose - Interactive troubleshooting" },
            { name: "validate-changes.md", path: "commands/validate-changes.md", description: "/validate-changes - Pre-commit validation" }
        ]
    },
    "hooks-bash": {
        icon: "🔒",
        label: "Hooks (Bash)",
        description: "Event-driven automation scripts for macOS/Linux. Place in .claude/hooks/",
        files: [
            { name: "dangerous-actions-blocker.sh", path: "hooks/bash/dangerous-actions-blocker.sh", description: "Block dangerous commands/edits", favorite: true },
            { name: "security-check.sh", path: "hooks/bash/security-check.sh", description: "Block secrets in commands" },
            { name: "prompt-injection-detector.sh", path: "hooks/bash/prompt-injection-detector.sh", description: "Detect injection attempts" },
            { name: "unicode-injection-scanner.sh", path: "hooks/bash/unicode-injection-scanner.sh", description: "Detect zero-width, RTL, ANSI escape" },
            { name: "repo-integrity-scanner.sh", path: "hooks/bash/repo-integrity-scanner.sh", description: "Scan README/package.json for injection" },
            { name: "mcp-config-integrity.sh", path: "hooks/bash/mcp-config-integrity.sh", description: "Verify MCP config hash (CVE)" },
            { name: "output-secrets-scanner.sh", path: "hooks/bash/output-secrets-scanner.sh", description: "Detect secrets in output" },
            { name: "auto-format.sh", path: "hooks/bash/auto-format.sh", description: "Auto-format after edits" },
            { name: "notification.sh", path: "hooks/bash/notification.sh", description: "macOS sound alerts" },
            { name: "output-validator.sh", path: "hooks/bash/output-validator.sh", description: "Heuristic output validation" },
            { name: "session-logger.sh", path: "hooks/bash/session-logger.sh", description: "Log operations for monitoring" },
            { name: "pre-commit-evaluator.sh", path: "hooks/bash/pre-commit-evaluator.sh", description: "LLM-as-a-Judge pre-commit" },
            { name: "privacy-warning.sh", path: "hooks/bash/privacy-warning.sh", description: "Warn on privacy-sensitive ops" },
            { name: "claudemd-scanner.sh", path: "hooks/bash/claudemd-scanner.sh", description: "Scan CLAUDE.md for issues" }
        ]
    },
    "hooks-powershell": {
        icon: "🪟",
        label: "Hooks (PowerShell)",
        description: "Event-driven automation scripts for Windows",
        files: [
            { name: "security-check.ps1", path: "hooks/powershell/security-check.ps1", description: "Block secrets in commands" },
            { name: "auto-format.ps1", path: "hooks/powershell/auto-format.ps1", description: "Auto-format after edits" }
        ]
    },
    config: {
        icon: "⚙️",
        description: "Configuration file templates. Place in .claude/ or ~/.claude/",
        files: [
            { name: "settings.json", path: "config/settings.json", description: "Hooks and preferences config" },
            { name: "mcp.json", path: "config/mcp.json", description: "MCP servers configuration" },
            { name: ".gitignore-claude", path: "config/.gitignore-claude", description: "Git ignore patterns for Claude files" }
        ]
    },
    memory: {
        icon: "🧠",
        description: "CLAUDE.md memory file templates for persistent context",
        files: [
            { name: "CLAUDE.md.project-template", path: "memory/CLAUDE.md.project-template", description: "Team project memory template" },
            { name: "CLAUDE.md.personal-template", path: "memory/CLAUDE.md.personal-template", description: "Personal global memory template" }
        ]
    },
    scripts: {
        icon: "🛠️",
        description: "Utility scripts for setup, diagnostics, and monitoring",
        files: [
            { name: "audit-scan.sh", path: "scripts/audit-scan.sh", description: "Fast setup audit scanner" },
            { name: "check-claude.sh", path: "scripts/check-claude.sh", description: "Health check (macOS/Linux)" },
            { name: "check-claude.ps1", path: "scripts/check-claude.ps1", description: "Health check (Windows)" },
            { name: "clean-reinstall-claude.sh", path: "scripts/clean-reinstall-claude.sh", description: "Clean reinstall (macOS/Linux)" },
            { name: "clean-reinstall-claude.ps1", path: "scripts/clean-reinstall-claude.ps1", description: "Clean reinstall (Windows)" },
            { name: "session-stats.sh", path: "scripts/session-stats.sh", description: "Analyze session logs & costs" },
            { name: "session-search.sh", path: "scripts/session-search.sh", description: "Search & resume sessions" }
        ]
    },
    "github-actions": {
        icon: "🚀",
        label: "GitHub Actions",
        description: "CI/CD workflows for GitHub Actions automation",
        files: [
            { name: "claude-pr-auto-review.yml", path: "github-actions/claude-pr-auto-review.yml", description: "Auto code review on PRs" },
            { name: "claude-security-review.yml", path: "github-actions/claude-security-review.yml", description: "Security-focused PR scan" },
            { name: "claude-issue-triage.yml", path: "github-actions/claude-issue-triage.yml", description: "Auto-triage issues with labels" }
        ]
    },
    workflows: {
        icon: "📋",
        description: "Advanced development workflow guides",
        files: [
            { name: "database-branch-setup.md", path: "workflows/database-branch-setup.md", description: "Isolated feature dev with DB branches" }
        ]
    },
    modes: {
        icon: "🎭",
        description: "Behavioral modes for Claude (SuperClaude framework). Place in ~/.claude/",
        files: [
            { name: "MODE_Learning.md", path: "modes/MODE_Learning.md", description: "Just-in-time explanations mode", favorite: true }
        ]
    }
};

// Expose globally for search
window.EXAMPLES = EXAMPLES;
