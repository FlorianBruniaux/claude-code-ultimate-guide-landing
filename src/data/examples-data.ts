/**
 * Examples data - Shared across all pages for global search
 * Source of truth for indexed templates (219 of 247 total)
 * Last synced: 2026-04-22
 * Note: remaining gap = support files within skill collections (yamls, install scripts, reference material)
 */

export interface ExampleFile {
  readonly name: string;
  readonly path: string;
  readonly description: string;
  readonly favorite?: boolean;
}

export interface ExampleCategory {
  readonly icon: string;
  readonly label?: string;
  readonly description: string;
  readonly files: readonly ExampleFile[];
}

export type ExamplesData = Record<string, ExampleCategory>;

export const EXAMPLES = {
    agents: {
        icon: "\u{1F916}",
        description: "Custom AI personas for specialized tasks. Place in .claude/agents/ or ~/.claude/agents/",
        files: [
            { name: "code-reviewer.md", path: "agents/code-reviewer.md", description: "Thorough code review with best practices", favorite: true },
            { name: "test-writer.md", path: "agents/test-writer.md", description: "TDD/BDD test generation specialist" },
            { name: "security-auditor.md", path: "agents/security-auditor.md", description: "Security vulnerability detection (OWASP)" },
            { name: "refactoring-specialist.md", path: "agents/refactoring-specialist.md", description: "Clean code refactoring expert" },
            { name: "output-evaluator.md", path: "agents/output-evaluator.md", description: "LLM-as-a-Judge quality gate" },
            { name: "devops-sre.md", path: "agents/devops-sre.md", description: "Infrastructure troubleshooting with FIRE framework" },
            { name: "planner.md", path: "agents/planner.md", description: "Strategic planning agent — read-only, Opus, use before implementation", favorite: true },
            { name: "implementer.md", path: "agents/implementer.md", description: "Mechanical execution agent — Haiku, bounded scope" },
            { name: "architecture-reviewer.md", path: "agents/architecture-reviewer.md", description: "Architecture & design review — read-only, Opus, never modifies code", favorite: true },
            { name: "adr-writer.md", path: "agents/adr-writer.md", description: "Architecture Decision Record generator — read-only, Opus" },
            { name: "integration-reviewer.md", path: "agents/integration-reviewer.md", description: "Runtime integration validator — read-only" },
            { name: "plan-challenger.md", path: "agents/plan-challenger.md", description: "Adversarial plan review across 5 dimensions — read-only" },
            { name: "planning-coordinator.md", path: "agents/planning-coordinator.md", description: "Synthesis agent for dynamic research teams — read-only" },
            { name: "security-patcher.md", path: "agents/security-patcher.md", description: "Apply security patches from audit findings — proposes for review" },
            { name: "loop-monitor.md", path: "agents/loop-monitor.md", description: "Detect and interrupt runaway agent loops — read-only watchdog" },
            { name: "analytics-with-eval/", path: "agents/analytics-with-eval/", description: "Collection: analytics agent + evaluation hooks" },
            { name: "analytics-agent.md", path: "agents/analytics-with-eval/analytics-agent.md", description: "Analytics agent with LLM-as-a-judge evaluation loop for output quality" },
            { name: "cyber-defense/", path: "agents/cyber-defense/", description: "Collection: anomaly detector, log ingestor, risk classifier, threat reporter" },
            { name: "anomaly-detector.md", path: "agents/cyber-defense/anomaly-detector.md", description: "Detect security log anomalies using statistical baselines" },
            { name: "log-ingestor.md", path: "agents/cyber-defense/log-ingestor.md", description: "Ingest and normalize logs from multiple sources for threat analysis" },
            { name: "risk-classifier.md", path: "agents/cyber-defense/risk-classifier.md", description: "Classify security events by severity using CVSS framework" },
            { name: "threat-reporter.md", path: "agents/cyber-defense/threat-reporter.md", description: "Generate structured threat reports from classified security events" }
        ]
    },
    skills: {
        icon: "\u{1F4DA}",
        description: "Reusable knowledge modules. Place in .claude/skills/ or ~/.claude/skills/",
        files: [
            { name: "git-ai-archaeology/", path: "skills/git-ai-archaeology/SKILL.md", description: "Analyze AI config evolution in a git repo — first commits, monthly distribution, maturity phases" },
            { name: "tdd-workflow.md", path: "skills/tdd-workflow.md", description: "Test-Driven Development process" },
            { name: "security-checklist.md", path: "skills/security-checklist.md", description: "OWASP Top 10 security checks", favorite: true },
            { name: "pdf-generator.md", path: "skills/pdf-generator.md", description: "Professional PDF generation (Quarto/Typst)", favorite: true },
            { name: "ast-grep-patterns.md", path: "skills/ast-grep-patterns.md", description: "AST-based code search patterns" },
            { name: "design-patterns/", path: "skills/design-patterns/", description: "Detect and analyze GoF design patterns" },
            { name: "voice-refine/", path: "skills/voice-refine/", description: "Writing voice refinement with before/after examples" },
            { name: "rtk-optimizer/", path: "skills/rtk-optimizer/", description: "RTK token optimization analysis" },
            { name: "audit-agents-skills/", path: "skills/audit-agents-skills/", description: "Quality audit for agents, skills, and commands" },
            { name: "skill-creator/", path: "skills/skill-creator/", description: "Create new skills with proper structure and best practices" },
            { name: "landing-page-generator/", path: "skills/landing-page-generator/", description: "Generate deploy-ready landing pages from any repository" },
            { name: "ccboard/", path: "skills/ccboard/", description: "TUI/Web dashboard for Claude Code session monitoring" },
            { name: "guide-recap/", path: "skills/guide-recap/", description: "Transform CHANGELOG entries into social content", favorite: true },
            { name: "release-notes-generator/", path: "skills/release-notes-generator/", description: "Generate release notes in 3 formats from git commits" },
            { name: "pr-triage/", path: "skills/pr-triage/", description: "4-phase PR backlog management with worktree setup", favorite: true },
            { name: "issue-triage/", path: "skills/issue-triage/", description: "3-phase issue backlog management" },
            { name: "cyber-defense-team/", path: "skills/cyber-defense-team/", description: "Multi-agent cyber defense team orchestration" },
            { name: "talk-pipeline/", path: "skills/talk-pipeline/", description: "6-stage pipeline: raw material to slides via Kimi" },
            { name: "smart-explore.md", path: "skills/smart-explore.md", description: "Progressive code exploration via tree-sitter AST — 86-92% token reduction", favorite: true },
            { name: "token-audit/", path: "skills/token-audit/", description: "Measure fixed-context token overhead, classify rules by usage frequency, audit hook cost" },
            { name: "eval-skills/", path: "skills/eval-skills/SKILL.md", description: "Audit all skills for frontmatter completeness and effort-level inference" },
            { name: "eval-rules/", path: "skills/eval-rules/SKILL.md", description: "Audit .claude/rules/ — resolves glob patterns against real files, interactive usefulness review", favorite: true },
            { name: "mcp-integration-reference/", path: "skills/mcp-integration-reference/SKILL.md", description: "MCP integration reference with Sentry patterns and multi-tool query examples" }
        ]
    },
    commands: {
        icon: "\u26A1",
        description: "Custom slash commands. Place in .claude/commands/ or ~/.claude/commands/",
        files: [
            { name: "commit.md", path: "commands/commit.md", description: "/commit - Conventional commit messages", favorite: true },
            { name: "pr.md", path: "commands/pr.md", description: "/pr - Create well-structured PRs", favorite: true },
            { name: "review-pr.md", path: "commands/review-pr.md", description: "/review-pr - PR review workflow" },
            { name: "release-notes.md", path: "commands/release-notes.md", description: "/release-notes - Generate in 3 formats", favorite: true },
            { name: "sonarqube.md", path: "commands/sonarqube.md", description: "/sonarqube - Analyze SonarCloud issues" },
            { name: "generate-tests.md", path: "commands/generate-tests.md", description: "/generate-tests - Test generation" },
            { name: "git-worktree.md", path: "commands/git-worktree.md", description: "/git-worktree - Isolated worktree setup", favorite: true },
            { name: "git-worktree-status.md", path: "commands/git-worktree-status.md", description: "/git-worktree-status - Check background verification tasks" },
            { name: "git-worktree-remove.md", path: "commands/git-worktree-remove.md", description: "/git-worktree-remove - Safe worktree removal with merge checks" },
            { name: "git-worktree-clean.md", path: "commands/git-worktree-clean.md", description: "/git-worktree-clean - Batch cleanup of stale worktrees" },
            { name: "diagnose.md", path: "commands/diagnose.md", description: "/diagnose - Interactive troubleshooting" },
            { name: "validate-changes.md", path: "commands/validate-changes.md", description: "/validate-changes - Pre-commit validation" },
            { name: "catchup.md", path: "commands/catchup.md", description: "/catchup - Restore context after /clear" },
            { name: "security.md", path: "commands/security.md", description: "/security - Quick OWASP security audit" },
            { name: "security-check.md", path: "commands/security-check.md", description: "/security-check - Config scan vs known threats (~30s)", favorite: true },
            { name: "security-audit.md", path: "commands/security-audit.md", description: "/security-audit - Full 6-phase audit with score /100" },
            { name: "update-threat-db.md", path: "commands/update-threat-db.md", description: "/update-threat-db - Research & update threat intelligence" },
            { name: "audit-agents-skills.md", path: "commands/audit-agents-skills.md", description: "/audit-agents-skills - Quality audit for .claude/ config" },
            { name: "sandbox-status.md", path: "commands/sandbox-status.md", description: "/sandbox-status - Sandbox isolation status check" },
            { name: "check-cache-bugs.md", path: "commands/check-cache-bugs.md", description: "/check-cache-bugs - Audit for cache bugs CC#40524 (sentinel, --resume, attribution header)", favorite: true },
            { name: "refactor.md", path: "commands/refactor.md", description: "/refactor - SOLID-based code improvements" },
            { name: "explain.md", path: "commands/explain.md", description: "/explain - Code explanations (3 depth levels)" },
            { name: "optimize.md", path: "commands/optimize.md", description: "/optimize - Performance analysis and roadmap" },
            { name: "ship.md", path: "commands/ship.md", description: "/ship - Pre-deploy checklist" },
            { name: "learn/quiz.md", path: "commands/learn/quiz.md", description: "/learn:quiz - Self-testing for learning concepts" },
            { name: "learn/teach.md", path: "commands/learn/teach.md", description: "/learn:teach - Step-by-step concept explanations" },
            { name: "learn/alternatives.md", path: "commands/learn/alternatives.md", description: "/learn:alternatives - Compare different approaches" },
            { name: "audit-codebase.md", path: "commands/audit-codebase.md", description: "/audit-codebase - Codebase health audit scoring 7 categories" },
            { name: "plan-start.md", path: "commands/plan-start.md", description: "/plan-start - 5-phase planning with dynamic research team", favorite: true },
            { name: "plan-validate.md", path: "commands/plan-validate.md", description: "/plan-validate - 2-layer validation with specialist agents", favorite: true },
            { name: "plan-execute.md", path: "commands/plan-execute.md", description: "/plan-execute - Execute plan with TDD, parallel agents, PR creation", favorite: true },
            { name: "review-plan.md", path: "commands/review-plan.md", description: "/review-plan - Structured plan review across 4 axes" },
            { name: "autoresearch.md", path: "commands/autoresearch.md", description: "/autoresearch - Autonomous improvement loop: scan metrics, scaffold, run agent iterations", favorite: true },
            { name: "investigate.md", path: "commands/investigate.md", description: "/investigate - Systematic root-cause debugging before writing any fix", favorite: true },
            { name: "qa.md", path: "commands/qa.md", description: "/qa - Diff-aware browser QA: 3 tiers with fix-and-verify loop" },
            { name: "canary.md", path: "commands/canary.md", description: "/canary - Post-deploy monitoring with regression alerts vs baseline" },
            { name: "land-and-deploy.md", path: "commands/land-and-deploy.md", description: "/land-and-deploy - Merge PR → CI → verify deploy → canary pipeline", favorite: true },
            { name: "scaffold.md", path: "commands/scaffold.md", description: "/scaffold - Interactive coach: generates agent/command/skill/hook/rule template", favorite: true },
            { name: "routines-discover.md", path: "commands/routines-discover.md", description: "/routines-discover - Scan project and surface high-value Routines use cases (schedule/API/GitHub triggers)" },
            { name: "session-save.md", path: "commands/session-save.md", description: "/session-save - Save session state (decisions, files, next steps) to handoff file" },
            { name: "methodology-advisor.md", path: "commands/methodology-advisor.md", description: "/methodology-advisor - Analyze codebase + 3 questions → recommended AI dev methodology stack" },
            { name: "plan-ceo-review.md", path: "commands/plan-ceo-review.md", description: "/plan-ceo-review - Strategic product gate: find the 10-star product before writing code (gstack)" },
            { name: "plan-eng-review.md", path: "commands/plan-eng-review.md", description: "/plan-eng-review - Engineering gate: lock architecture, diagrams, edge cases before coding (gstack)" },
            { name: "ci/all.md", path: "commands/ci/all.md", description: "/ci:all - Full CI: local tests + type check + push + pipeline URL", favorite: true },
            { name: "ci/pipeline.md", path: "commands/ci/pipeline.md", description: "/ci:pipeline - Push branch and return pipeline tracking URL (GitLab/GitHub Actions)" },
            { name: "ci/status.md", path: "commands/ci/status.md", description: "/ci:status - Current pipeline status for active branch" },
            { name: "ci/tests.md", path: "commands/ci/tests.md", description: "/ci:tests - Auto-detect and run test suite (pytest/vitest/cargo test)" },
            { name: "handoff/create-handoff.md", path: "commands/handoff/create-handoff.md", description: "/create-handoff - Generate structured handoff: scope, files, discoveries, next steps" },
            { name: "handoff/resume-handoff.md", path: "commands/handoff/resume-handoff.md", description: "/resume-handoff - Load handoff doc and resume work from previous session" },
            { name: "handoff/update-handoff.md", path: "commands/handoff/update-handoff.md", description: "/update-handoff - Update handoff with append-only Work Done history" },
            { name: "recipe-template.md", path: "commands/recipe-template.md", description: "Template for recipe-style commands with precondition validation pattern" },
            { name: "resources/threat-db.yaml", path: "commands/resources/threat-db.yaml", description: "Threat intelligence database for security commands" }
        ]
    },
    "hooks-bash": {
        icon: "\u{1F512}",
        label: "Hooks (Bash)",
        description: "Event-driven automation scripts for macOS/Linux. Place in .claude/hooks/",
        files: [
            { name: "dangerous-actions-blocker.sh", path: "hooks/bash/dangerous-actions-blocker.sh", description: "Block dangerous commands/edits", favorite: true },
            { name: "security-check.sh", path: "hooks/bash/security-check.sh", description: "Block secrets in commands" },
            { name: "prompt-injection-detector.sh", path: "hooks/bash/prompt-injection-detector.sh", description: "Detect injection attempts", favorite: true },
            { name: "unicode-injection-scanner.sh", path: "hooks/bash/unicode-injection-scanner.sh", description: "Detect zero-width, RTL, ANSI escape" },
            { name: "repo-integrity-scanner.sh", path: "hooks/bash/repo-integrity-scanner.sh", description: "Scan README/package.json for injection" },
            { name: "mcp-config-integrity.sh", path: "hooks/bash/mcp-config-integrity.sh", description: "Verify MCP config hash (CVE protection)" },
            { name: "claudemd-scanner.sh", path: "hooks/bash/claudemd-scanner.sh", description: "Scan CLAUDE.md for injection attacks" },
            { name: "output-secrets-scanner.sh", path: "hooks/bash/output-secrets-scanner.sh", description: "Detect secrets in tool outputs" },
            { name: "file-guard.sh", path: "hooks/bash/file-guard.sh", description: "Protect sensitive files from modification" },
            { name: "sandbox-validation.sh", path: "hooks/bash/sandbox-validation.sh", description: "Validate sandbox isolation" },
            { name: "permission-request.sh", path: "hooks/bash/permission-request.sh", description: "Explicit permission flow for risky ops" },
            { name: "pre-commit-secrets.sh", path: "hooks/bash/pre-commit-secrets.sh", description: "Block secrets from entering commits" },
            { name: "security-gate.sh", path: "hooks/bash/security-gate.sh", description: "Detect vulnerable code patterns before writing" },
            { name: "auto-format.sh", path: "hooks/bash/auto-format.sh", description: "Auto-format after edits (Prettier, Black, go fmt)" },
            { name: "rtk-auto-wrapper.sh", path: "hooks/bash/rtk-auto-wrapper.sh", description: "Auto-wrap commands with RTK for token savings" },
            { name: "rtk-baseline.sh", path: "hooks/bash/rtk-baseline.sh", description: "Save RTK baseline for session savings tracking" },
            { name: "setup-init.sh", path: "hooks/bash/setup-init.sh", description: "Initialize session environment" },
            { name: "auto-checkpoint.sh", path: "hooks/bash/auto-checkpoint.sh", description: "Auto-checkpoint work at intervals" },
            { name: "typecheck-on-save.sh", path: "hooks/bash/typecheck-on-save.sh", description: "Run TypeScript checks on save" },
            { name: "test-on-change.sh", path: "hooks/bash/test-on-change.sh", description: "Run tests on file changes" },
            { name: "subagent-stop.sh", path: "hooks/bash/subagent-stop.sh", description: "Clean up sub-agent resources" },
            { name: "auto-rename-session.sh", path: "hooks/bash/auto-rename-session.sh", description: "AI-powered session title generation (Haiku)", favorite: true },
            { name: "velocity-governor.sh", path: "hooks/bash/velocity-governor.sh", description: "Rate-limit tool calls to avoid API throttling" },
            { name: "output-validator.sh", path: "hooks/bash/output-validator.sh", description: "Heuristic output validation" },
            { name: "session-logger.sh", path: "hooks/bash/session-logger.sh", description: "Log operations for monitoring" },
            { name: "session-summary.sh", path: "hooks/bash/session-summary.sh", description: "Full session analytics (15 configurable sections)", favorite: true },
            { name: "session-summary-config.sh", path: "hooks/bash/session-summary-config.sh", description: "Configure session-summary sections and display" },
            { name: "learning-capture.sh", path: "hooks/bash/learning-capture.sh", description: "Prompt for daily learning capture" },
            { name: "privacy-warning.sh", path: "hooks/bash/privacy-warning.sh", description: "Warn on privacy-sensitive ops" },
            { name: "tts-selective.sh", path: "hooks/bash/tts-selective.sh", description: "Text-to-speech for selected outputs" },
            { name: "notification.sh", path: "hooks/bash/notification.sh", description: "macOS contextual sound alerts" },
            { name: "pre-commit-evaluator.sh", path: "hooks/bash/pre-commit-evaluator.sh", description: "LLM-as-a-Judge pre-commit validation" },
            { name: "smart-suggest.sh", path: "hooks/bash/smart-suggest.sh", description: "Suggest relevant commands/agents based on prompt intent", favorite: true },
            { name: "governance-enforcement-hook.sh", path: "hooks/bash/governance-enforcement-hook.sh", description: "Enforce project config, MCP registry, and data classification policies" },
            { name: "identity-reinjection.sh", path: "hooks/bash/identity-reinjection.sh", description: "Re-inject agent identity after context compaction" }
        ]
    },
    "hooks-powershell": {
        icon: "\u{1FA9F}",
        label: "Hooks (PowerShell)",
        description: "Event-driven automation scripts for Windows",
        files: [
            { name: "security-check.ps1", path: "hooks/powershell/security-check.ps1", description: "Block secrets in commands" },
            { name: "auto-format.ps1", path: "hooks/powershell/auto-format.ps1", description: "Auto-format after edits" }
        ]
    },
    config: {
        icon: "\u2699\uFE0F",
        description: "Configuration file templates. Place in .claude/ or ~/.claude/",
        files: [
            { name: "settings.json", path: "config/settings.json", description: "Hooks and preferences config" },
            { name: "mcp.json", path: "config/mcp.json", description: "MCP servers configuration" },
            { name: ".gitignore-claude", path: "config/.gitignore-claude", description: "Git ignore patterns for Claude files" },
            { name: "CONTRIBUTING-ai-disclosure.md", path: "config/CONTRIBUTING-ai-disclosure.md", description: "AI disclosure template for CONTRIBUTING.md" },
            { name: "PULL_REQUEST_TEMPLATE-ai.md", path: "config/PULL_REQUEST_TEMPLATE-ai.md", description: "PR template with AI attribution" },
            { name: "sandbox-native.json", path: "config/sandbox-native.json", description: "Native Claude Code sandbox configuration", favorite: true },
            { name: "settings-personalization.json", path: "config/settings-personalization.json", description: "UI personalization: spinner verbs, custom tips" },
            { name: "settings.local.json.example", path: "config/settings.local.json.example", description: "Local overrides example (gitignored)" }
        ]
    },
    memory: {
        icon: "\u{1F9E0}",
        description: "CLAUDE.md memory file templates for persistent context",
        files: [
            { name: "CLAUDE.md.project-template", path: "memory/CLAUDE.md.project-template", description: "Team project memory template" },
            { name: "CLAUDE.md.personal-template", path: "memory/CLAUDE.md.personal-template", description: "Personal global memory template" },
            { name: "icm-session-starter.md", path: "memory/icm-session-starter.md", description: "ICM session bootstrap — recall past decisions and store new ones" }
        ]
    },
    "claude-md": {
        icon: "\u{1F4C4}",
        label: "CLAUDE.md Configs",
        description: "Ready-to-use CLAUDE.md configuration profiles. Add to ~/.claude/CLAUDE.md or project CLAUDE.md",
        files: [
            { name: "session-naming.md", path: "claude-md/session-naming.md", description: "Auto-rename sessions with descriptive titles for parallel work", favorite: true },
            { name: "rtk-optimized.md", path: "claude-md/rtk-optimized.md", description: "RTK token-optimized configuration" },
            { name: "learning-mode.md", path: "claude-md/learning-mode.md", description: "Learning-focused development configuration" },
            { name: "devops-sre.md", path: "claude-md/devops-sre.md", description: "DevOps/SRE project configuration" },
            { name: "tts-enabled.md", path: "claude-md/tts-enabled.md", description: "Text-to-speech enabled configuration" },
            { name: "product-designer.md", path: "claude-md/product-designer.md", description: "Product designer workflow configuration" },
            { name: "design-reference-file.md", path: "claude-md/design-reference-file.md", description: "Brand-book and UI kit context for consistent UI generation" }
        ]
    },
    rules: {
        icon: "\u{1F4CB}",
        label: "Rules",
        description: "Behavioral rules auto-loaded by Claude for common review patterns. Place in .claude/rules/",
        files: [
            { name: "architecture-review.md", path: "rules/architecture-review.md", description: "Rules for architecture review sessions" },
            { name: "code-quality-review.md", path: "rules/code-quality-review.md", description: "Rules for code quality review" },
            { name: "first-principles.md", path: "rules/first-principles.md", description: "First-principles reasoning rules", favorite: true },
            { name: "performance-review.md", path: "rules/performance-review.md", description: "Rules for performance review sessions" },
            { name: "test-review.md", path: "rules/test-review.md", description: "Rules for test review sessions" }
        ]
    },
    scripts: {
        icon: "\u{1F6E0}\uFE0F",
        description: "Utility scripts for setup, diagnostics, and monitoring",
        files: [
            { name: "audit-scan.sh", path: "scripts/audit-scan.sh", description: "Fast setup audit scanner" },
            { name: "check-claude.sh", path: "scripts/check-claude.sh", description: "Health check (macOS/Linux)" },
            { name: "check-claude.ps1", path: "scripts/check-claude.ps1", description: "Health check (Windows)" },
            { name: "clean-reinstall-claude.sh", path: "scripts/clean-reinstall-claude.sh", description: "Clean reinstall (macOS/Linux)" },
            { name: "clean-reinstall-claude.ps1", path: "scripts/clean-reinstall-claude.ps1", description: "Clean reinstall (Windows)" },
            { name: "session-stats.sh", path: "scripts/session-stats.sh", description: "Analyze session logs & costs" },
            { name: "session-search.sh", path: "scripts/session-search.sh", description: "Search & resume sessions" },
            { name: "cc-sessions.py", path: "scripts/cc-sessions.py", description: "Advanced session search with incremental indexing", favorite: true },
            { name: "fresh-context-loop.sh", path: "scripts/fresh-context-loop.sh", description: "Auto-restart sessions at context limits" },
            { name: "bridge.py", path: "scripts/bridge.py", description: "Bridge: Claude Code plan → LM Studio execution" },
            { name: "bridge-plan-schema.json", path: "scripts/bridge-plan-schema.json", description: "JSON Schema for bridge plan v1 format" },
            { name: "migrate-arguments-syntax.sh", path: "scripts/migrate-arguments-syntax.sh", description: "Migrate v1 → v2 slash command argument syntax (bash)" },
            { name: "migrate-arguments-syntax.ps1", path: "scripts/migrate-arguments-syntax.ps1", description: "Migrate v1 → v2 slash command argument syntax (PowerShell)" },
            { name: "rtk-benchmark.sh", path: "scripts/rtk-benchmark.sh", description: "Benchmark RTK token savings vs raw commands" },
            { name: "sync-claude-config.sh", path: "scripts/sync-claude-config.sh", description: "Sync Claude config files across machines" },
            { name: "sonnetplan.sh", path: "scripts/sonnetplan.sh", description: "Run Claude with Sonnet replacing Opus (cost optimization)" },
            { name: "smart-suggest-roi.py", path: "scripts/smart-suggest-roi.py", description: "Measure SmartSuggest hook ROI — track suggestion follow-through rates", favorite: true },
            { name: "ai-usage-charter-template.md", path: "scripts/ai-usage-charter-template.md", description: "Team AI usage charter template — principles, scope, review cadence" },
            { name: "mcp-registry-template.yaml", path: "scripts/mcp-registry-template.yaml", description: "MCP server registry template for team governance" },
            { name: "og-image-astro.ts", path: "scripts/og-image-astro.ts", description: "Generate OG images for Astro static sites" },
            { name: "pptx-to-pdf.sh", path: "scripts/pptx-to-pdf.sh", description: "Batch convert PPTX to PDF via Keynote (macOS/AppleScript)" },
            { name: "statusline.py", path: "scripts/statusline.py", description: "Terminal statusline for Claude Code session monitoring" },
            { name: "test-prompt-caching.ts", path: "scripts/test-prompt-caching.ts", description: "Test prompt caching implementation and measure savings" }
        ]
    },
    "team-config": {
        icon: "\u{1F465}",
        label: "Team Config",
        description: "Templates for scaling Claude Code across teams. Place in .claude/",
        files: [
            { name: "claude-skeleton.md", path: "team-config/claude-skeleton.md", description: "Minimal CLAUDE.md skeleton for new team members" },
            { name: "profile-template.yaml", path: "team-config/profile-template.yaml", description: "Profile assembly template for multi-tool teams" },
            { name: "sync-script.ts", path: "team-config/sync-script.ts", description: "Sync Claude config across team machines" }
        ]
    },
    templates: {
        icon: "\u{1F4DD}",
        label: "Templates",
        description: "Session and workflow templates for context continuity",
        files: [
            { name: "session-handoff-lorenz.md", path: "templates/session-handoff-lorenz.md", description: "Session handoff template for context continuity across sessions" }
        ]
    },
    "github-actions": {
        icon: "\u{1F680}",
        label: "GitHub Actions",
        description: "CI/CD workflows for GitHub Actions automation",
        files: [
            { name: "claude-code-review.yml", path: "github-actions/claude-code-review.yml", description: "Prompt-based review with anti-hallucination protocol", favorite: true },
            { name: "claude-pr-auto-review.yml", path: "github-actions/claude-pr-auto-review.yml", description: "Auto code review on PRs" },
            { name: "claude-security-review.yml", path: "github-actions/claude-security-review.yml", description: "Security-focused PR scan" },
            { name: "claude-issue-triage.yml", path: "github-actions/claude-issue-triage.yml", description: "Auto-triage issues with labels" },
            { name: ".coderabbit.yaml", path: "github-actions/.coderabbit.yaml", description: "CodeRabbit AI code review configuration — copy to repo root" },
            { name: "prompts/code-review.md", path: "github-actions/prompts/code-review.md", description: "Code review prompt template for GitHub Actions workflows" }
        ]
    },
    workflows: {
        icon: "\u{1F4CB}",
        description: "Advanced development workflow guides",
        files: [
            { name: "database-branch-setup.md", path: "workflows/database-branch-setup.md", description: "Isolated feature dev with DB branches (Neon/PlanetScale)" },
            { name: "memory-stack-integration.md", path: "workflows/memory-stack-integration.md", description: "Multi-day workflow with memory tools (claude-mem + Serena + grepai)" },
            { name: "remotion-quickstart.md", path: "workflows/remotion-quickstart.md", description: "Video generation workflow with Remotion" }
        ]
    },
    plugins: {
        icon: "\u{1F9E9}",
        description: "Community plugins extending Claude Code capabilities",
        files: [
            { name: "se-cove.md", path: "plugins/se-cove.md", description: "Chain-of-Verification for independent code review (Meta AI, ACL 2024)" },
            { name: "claude-mem.md", path: "plugins/claude-mem.md", description: "Persistent memory management plugin" },
            { name: "security-suite/", path: "plugins/security-suite/", description: "Complete security scanning bundle: auditor agent, security-check/security-audit commands, security-gate hook", favorite: true },
            { name: "pr-workflow/", path: "plugins/pr-workflow/", description: "Automated PR review bundle: code-reviewer agent, review-pr and pr commands, pre-pr-check hook" },
            { name: "devops-pipeline/", path: "plugins/devops-pipeline/", description: "CI/CD automation bundle: devops-sre agent, ship and deploy commands, GitHub Actions workflow" },
            { name: "code-quality/", path: "plugins/code-quality/", description: "Code analysis bundle: refactoring-specialist and clean-code-reviewer agents, refactor and optimize commands" },
            { name: "release-automation/", path: "plugins/release-automation/", description: "Release management bundle: release and changelog commands, release-notes-generator skill, version-sync hook" }
        ]
    },
    integrations: {
        icon: "\u{1F50C}",
        label: "Integrations",
        description: "Community integrations and MCP server extensions for Claude Code",
        files: [
            { name: "agent-vibes/README.md", path: "integrations/agent-vibes/README.md", description: "Agent Vibes: text-to-speech MCP server overview and features" },
            { name: "agent-vibes/installation.md", path: "integrations/agent-vibes/installation.md", description: "Install Agent Vibes TTS on macOS step-by-step" },
            { name: "agent-vibes/troubleshooting.md", path: "integrations/agent-vibes/troubleshooting.md", description: "Troubleshoot Agent Vibes TTS installation issues" },
            { name: "agent-vibes/voice-catalog.md", path: "integrations/agent-vibes/voice-catalog.md", description: "Agent Vibes voice catalog reference" }
        ]
    },
    "mcp-configs": {
        icon: "\u{1F527}",
        label: "MCP Configs",
        description: "MCP server configuration files",
        files: [
            { name: "figma.json", path: "mcp-configs/figma.json", description: "Figma MCP server configuration" }
        ]
    },
    modes: {
        icon: "\u{1F3AD}",
        description: "Behavioral modes for Claude (SuperClaude framework). Place in ~/.claude/",
        files: [
            { name: "MODE_Learning.md", path: "modes/MODE_Learning.md", description: "Just-in-time explanations mode", favorite: true }
        ]
    },
    "context-engineering": {
        icon: "\u{1F9EC}",
        label: "Context Engineering",
        description: "Templates for structuring Claude's context: code maps, budgets, eval questions, CI drift checks",
        files: [
            { name: "skeleton-template.md", path: "context-engineering/skeleton-template.md", description: "Minimal context skeleton — project structure, key files, current focus", favorite: true },
            { name: "code-map-template.yaml", path: "context-engineering/code-map-template.yaml", description: "Structural metadata file — codebase shape in ~1K tokens" },
            { name: "context-budget-calculator.sh", path: "context-engineering/context-budget-calculator.sh", description: "Calculate token budget across all context sources" },
            { name: "eval-questions.yaml", path: "context-engineering/eval-questions.yaml", description: "Evaluation questions for context quality scoring" },
            { name: "profile-template.yaml", path: "context-engineering/profile-template.yaml", description: "Context profile template — env, stack, constraints" },
            { name: "canary-check.sh", path: "context-engineering/canary-check.sh", description: "Verify context integrity between sessions" },
            { name: "ci-drift-check.yml", path: "context-engineering/ci-drift-check.yml", description: "CI workflow to detect context drift on each push" },
            { name: "context-bench.sh", path: "context-engineering/context-bench.sh", description: "Benchmark structural metadata impact on context quality" },
            { name: "assembler.ts", path: "context-engineering/assembler.ts", description: "Assemble CLAUDE.md from profile YAML + shared module markdown files" },
            { name: "rules/knowledge-feeding.md", path: "context-engineering/rules/knowledge-feeding.md", description: "Knowledge feeding protocol — inject domain context systematically" },
            { name: "rules/update-loop-retro.md", path: "context-engineering/rules/update-loop-retro.md", description: "Session retrospective template for capturing and persisting learnings" }
        ]
    },
    styles: {
        icon: "\u{1F3A8}",
        label: "Styles",
        description: "Custom style templates for consistent AI output tone and formatting",
        files: [
            { name: "custom-style-template.md", path: "styles/custom-style-template.md", description: "Define a custom writing style for Claude — tone, vocabulary, formatting rules" }
        ]
    },
    "semantic-anchors": {
        icon: "\u{1F517}",
        label: "Semantic Anchors",
        description: "Precise vocabulary for better LLM outputs",
        files: [
            { name: "anchor-catalog.md", path: "semantic-anchors/anchor-catalog.md", description: "Comprehensive catalog of precise technical terms for prompting", favorite: true }
        ]
    }
} as const satisfies ExamplesData;