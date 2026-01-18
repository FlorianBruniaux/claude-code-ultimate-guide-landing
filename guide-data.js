/**
 * Guide content index for global search
 * Source: https://github.com/FlorianBruniaux/claude-code-ultimate-guide/tree/main/guide
 */

const GUIDE_BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/';

window.SEARCH_GUIDE = [
    // === ULTIMATE GUIDE - Quick Start ===
    {
        id: 'guide-install',
        type: 'guide',
        title: 'Installation & Setup',
        content: 'npm install -g @anthropic-ai/claude-code Node.js 18+ setup first launch verify installation update',
        url: GUIDE_BASE + 'ultimate-guide.md#11-installation'
    },
    {
        id: 'guide-first-workflow',
        type: 'guide',
        title: 'First Workflow Tutorial',
        content: 'describe problem analyze review diff accept reject verify commit step by step beginner',
        url: GUIDE_BASE + 'ultimate-guide.md#12-first-workflow'
    },
    {
        id: 'guide-essential-commands',
        type: 'guide',
        title: 'Essential Commands Reference',
        content: '/help /clear /compact /status /context /model /plan /execute slash commands',
        url: GUIDE_BASE + 'ultimate-guide.md#13-essential-commands'
    },
    {
        id: 'guide-permission-modes',
        type: 'guide',
        title: 'Permission Modes',
        content: 'default auto-accept plan mode yolo --dangerously-skip-permissions trust security',
        url: GUIDE_BASE + 'ultimate-guide.md#14-permission-modes'
    },
    {
        id: 'guide-images',
        type: 'guide',
        title: 'Working with Images',
        content: 'screenshot mockup Figma diagram paste image visual UI design accessibility audit',
        url: GUIDE_BASE + 'ultimate-guide.md#13-essential-commands'
    },
    {
        id: 'guide-session-resume',
        type: 'guide',
        title: 'Session Resume & Continuity',
        content: 'resume session continue later --resume --continue session picker persist context',
        url: GUIDE_BASE + 'ultimate-guide.md#13-essential-commands'
    },

    // === ULTIMATE GUIDE - Memory & Context ===
    {
        id: 'guide-claudemd',
        type: 'guide',
        title: 'CLAUDE.md Memory File',
        content: 'CLAUDE.md project memory persistent context instructions conventions team knowledge',
        url: GUIDE_BASE + 'ultimate-guide.md#memory-hierarchy'
    },
    {
        id: 'guide-context-management',
        type: 'guide',
        title: 'Context Window Management',
        content: 'context window tokens /compact /context limit 200k summarization overflow',
        url: GUIDE_BASE + 'ultimate-guide.md#context-management-critical'
    },
    {
        id: 'guide-memory-hierarchy',
        type: 'guide',
        title: 'Memory Hierarchy (3 Levels)',
        content: 'global personal project memory ~/.claude .claude settings.json hierarchy scope',
        url: GUIDE_BASE + 'ultimate-guide.md#memory-hierarchy'
    },

    // === ULTIMATE GUIDE - Customization ===
    {
        id: 'guide-custom-commands',
        type: 'guide',
        title: 'Custom Slash Commands',
        content: 'slash commands /commit /pr custom commands .claude/commands markdown yaml',
        url: GUIDE_BASE + 'ultimate-guide.md#creating-custom-components'
    },
    {
        id: 'guide-agents',
        type: 'guide',
        title: 'Custom Agents',
        content: 'agents personas code-reviewer test-writer security-auditor .claude/agents specialist',
        url: GUIDE_BASE + 'ultimate-guide.md#agents'
    },
    {
        id: 'guide-hooks',
        type: 'guide',
        title: 'Hooks (Event-Driven Automation)',
        content: 'hooks bash powershell PreToolUse PostToolUse Notification event automation script',
        url: GUIDE_BASE + 'ultimate-guide.md#hooks'
    },
    {
        id: 'guide-skills',
        type: 'guide',
        title: 'Skills (Reusable Knowledge)',
        content: 'skills knowledge modules tdd-workflow security-checklist reusable documentation',
        url: GUIDE_BASE + 'ultimate-guide.md#skills'
    },
    {
        id: 'guide-mcp',
        type: 'guide',
        title: 'MCP Servers Integration',
        content: 'MCP Model Context Protocol servers tools external integrations mcp.json configuration',
        url: GUIDE_BASE + 'ultimate-guide.md#mcp-servers'
    },

    // === ULTIMATE GUIDE - Advanced ===
    {
        id: 'guide-prompting',
        type: 'guide',
        title: 'Prompting Best Practices',
        content: 'prompting formula WHAT WHERE HOW VERIFY clear instructions effective prompts',
        url: GUIDE_BASE + 'ultimate-guide.md#quick-prompting-formula'
    },
    {
        id: 'guide-plan-mode',
        type: 'guide',
        title: 'Plan Mode & Thinking',
        content: 'plan mode /plan thinking extended-thinking Alt+T toggle architecture design',
        url: GUIDE_BASE + 'ultimate-guide.md#plan-mode--thinking-depth'
    },
    {
        id: 'guide-subagents',
        type: 'guide',
        title: 'Sub-Agents & Task Delegation',
        content: 'sub-agents Task tool parallel delegation orchestration complex tasks',
        url: GUIDE_BASE + 'ultimate-guide.md#sub-agent-architecture'
    },
    {
        id: 'guide-anti-patterns',
        type: 'guide',
        title: 'Anti-patterns to Avoid',
        content: 'anti-patterns mistakes avoid wrong bad practices common errors pitfalls',
        url: GUIDE_BASE + 'ultimate-guide.md#anti-patterns'
    },

    // === ARCHITECTURE ===
    {
        id: 'guide-architecture',
        type: 'guide',
        title: 'How Claude Code Works (Architecture)',
        content: 'architecture internals master loop tool arsenal how it works under the hood source code',
        url: GUIDE_BASE + 'architecture.md'
    },
    {
        id: 'guide-tools',
        type: 'guide',
        title: 'Tool Arsenal (Read, Write, Bash...)',
        content: 'tools Read Write Edit Bash Grep Glob WebFetch WebSearch internal tools',
        url: GUIDE_BASE + 'architecture.md#2-the-tool-arsenal'
    },
    {
        id: 'guide-edit-tool',
        type: 'guide',
        title: 'The Edit Tool Explained',
        content: 'Edit tool how it works old_string new_string replace search replace mechanism',
        url: GUIDE_BASE + 'architecture.md#7-the-edit-tool-how-it-actually-works'
    },
    {
        id: 'guide-vs-alternatives',
        type: 'guide',
        title: 'Claude Code vs Alternatives',
        content: 'comparison Cursor Copilot Windsurf Cline alternatives differences pros cons',
        url: GUIDE_BASE + 'architecture.md#10-claude-code-vs-alternatives'
    },

    // === SECURITY ===
    {
        id: 'guide-security',
        type: 'guide',
        title: 'Security Hardening Guide',
        content: 'security hardening prevention detection response hooks protection prompt injection',
        url: GUIDE_BASE + 'security-hardening.md'
    },
    {
        id: 'guide-prompt-injection',
        type: 'guide',
        title: 'Prompt Injection Protection',
        content: 'prompt injection attack defense detection hidden instructions malicious unicode',
        url: GUIDE_BASE + 'security-hardening.md#part-2-detection-while-you-work'
    },
    {
        id: 'guide-secrets',
        type: 'guide',
        title: 'Secrets & Credentials Safety',
        content: 'secrets credentials API keys tokens passwords gitleaks scanning protection',
        url: GUIDE_BASE + 'security-hardening.md#part-1-prevention-before-you-start'
    },

    // === DATA PRIVACY ===
    {
        id: 'guide-privacy',
        type: 'guide',
        title: 'Data Privacy & Retention',
        content: 'privacy data retention Anthropic policy what is sent stored deleted GDPR',
        url: GUIDE_BASE + 'data-privacy.md'
    },
    {
        id: 'guide-data-flow',
        type: 'guide',
        title: 'Understanding Data Flow',
        content: 'data flow what is sent to Anthropic API requests logs telemetry',
        url: GUIDE_BASE + 'data-privacy.md#1-understanding-the-data-flow'
    },
    {
        id: 'guide-enterprise',
        type: 'guide',
        title: 'Enterprise Considerations',
        content: 'enterprise team corporate compliance SOC2 security requirements business',
        url: GUIDE_BASE + 'data-privacy.md#6-enterprise-considerations'
    },

    // === LEARNING ===
    {
        id: 'guide-learning',
        type: 'guide',
        title: 'Learning to Code with AI',
        content: 'learning education beginner conscious developer skill building understanding',
        url: GUIDE_BASE + 'learning-with-ai.md'
    },
    {
        id: 'guide-uval',
        type: 'guide',
        title: 'UVAL Protocol (Understand-Verify-Apply-Learn)',
        content: 'UVAL protocol understand verify apply learn methodology conscious coding',
        url: GUIDE_BASE + 'learning-with-ai.md#the-uval-protocol'
    },
    {
        id: 'guide-learning-mode',
        type: 'guide',
        title: 'Learning Mode Configuration',
        content: 'learning mode explain teach educational configuration quiz me challenges',
        url: GUIDE_BASE + 'learning-with-ai.md#learning-mode'
    },

    // === METHODOLOGIES ===
    {
        id: 'guide-methodologies',
        type: 'guide',
        title: 'Development Methodologies',
        content: 'methodologies TDD BDD DDD SDD spec-driven test-driven workflow patterns',
        url: GUIDE_BASE + 'methodologies.md'
    },
    {
        id: 'guide-tdd',
        type: 'guide',
        title: 'Test-Driven Development (TDD)',
        content: 'TDD test-driven development red green refactor tests first methodology',
        url: GUIDE_BASE + 'methodologies.md#the-15-methodologies'
    },
    {
        id: 'guide-sdd',
        type: 'guide',
        title: 'Spec-Driven Development (SDD)',
        content: 'SDD spec-driven development specification markdown requirements design first',
        url: GUIDE_BASE + 'methodologies.md#sdd-tools-reference'
    },

    // === OBSERVABILITY ===
    {
        id: 'guide-observability',
        type: 'guide',
        title: 'Session Observability & Monitoring',
        content: 'observability monitoring logging session logs analytics metrics costs tracking',
        url: GUIDE_BASE + 'observability.md'
    },
    {
        id: 'guide-session-logging',
        type: 'guide',
        title: 'Setting Up Session Logging',
        content: 'session logging hook log operations audit trail activity monitoring',
        url: GUIDE_BASE + 'observability.md#setting-up-session-logging'
    },
    {
        id: 'guide-session-stats',
        type: 'guide',
        title: 'Session Statistics & Costs',
        content: 'session stats costs tokens usage analytics spending budget tracking',
        url: GUIDE_BASE + 'observability.md#analyzing-session-data'
    },

    // === ADOPTION ===
    {
        id: 'guide-adoption',
        type: 'guide',
        title: 'Choosing Your Adoption Approach',
        content: 'adoption approach getting started team solo quickstart turnkey autonomous',
        url: GUIDE_BASE + 'adoption-approaches.md'
    },
    {
        id: 'guide-quickstart',
        type: 'guide',
        title: 'Turnkey Quickstart Template',
        content: 'quickstart template CLAUDE.md starter boilerplate project setup',
        url: GUIDE_BASE + 'adoption-approaches.md#turnkey-quickstart'
    },
    {
        id: 'guide-team',
        type: 'guide',
        title: 'Team Size Considerations',
        content: 'team size solo small medium large enterprise scaling adoption',
        url: GUIDE_BASE + 'adoption-approaches.md#team-size-considerations'
    },

    // === CHEATSHEET ===
    {
        id: 'guide-cheatsheet',
        type: 'guide',
        title: 'Complete Cheatsheet',
        content: 'cheatsheet reference quick commands shortcuts keyboard summary overview',
        url: GUIDE_BASE + 'cheatsheet.md'
    },
    {
        id: 'guide-keyboard',
        type: 'guide',
        title: 'Keyboard Shortcuts',
        content: 'keyboard shortcuts Ctrl+C Ctrl+D Shift+Tab Esc hotkeys keybindings',
        url: GUIDE_BASE + 'cheatsheet.md#keyboard-shortcuts'
    },
    {
        id: 'guide-cli-flags',
        type: 'guide',
        title: 'CLI Flags Reference',
        content: 'CLI flags --print --output-format --verbose --allowedTools command line options',
        url: GUIDE_BASE + 'cheatsheet.md#cli-flags-quick-reference'
    },

    // === MIGRATION ===
    {
        id: 'guide-migrate-copilot',
        type: 'guide',
        title: 'Migrate from GitHub Copilot',
        content: 'migrate migration GitHub Copilot switch from differences comparison',
        url: GUIDE_BASE + 'ultimate-guide.md#migration-guide-github-copilot--claude-code'
    },
    {
        id: 'guide-migrate-cursor',
        type: 'guide',
        title: 'Migrate from Cursor',
        content: 'migrate migration Cursor switch from differences comparison workflow',
        url: GUIDE_BASE + 'ultimate-guide.md#migration-guide-cursor--claude-code'
    },

    // === IDE INTEGRATIONS ===
    {
        id: 'guide-vscode',
        type: 'guide',
        title: 'VS Code Integration',
        content: 'VS Code Visual Studio Code IDE integration terminal extension',
        url: GUIDE_BASE + 'ultimate-guide.md#ide-integration'
    },
    {
        id: 'guide-jetbrains',
        type: 'guide',
        title: 'JetBrains Integration',
        content: 'JetBrains IntelliJ WebStorm PyCharm IDE integration terminal',
        url: GUIDE_BASE + 'ultimate-guide.md#ide-integration'
    }
];
