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
    },

    // === AI ECOSYSTEM ===
    {
        id: 'ecosystem-overview',
        type: 'guide',
        title: 'AI Ecosystem Overview',
        content: 'complementary tools workflow perplexity gemini notebooklm kimi chain combine',
        url: GUIDE_BASE + 'ai-ecosystem.md'
    },
    {
        id: 'ecosystem-perplexity',
        type: 'guide',
        title: 'Perplexity Integration',
        content: 'research deep research sources spec.md websearch perplexity ai',
        url: GUIDE_BASE + 'ai-ecosystem.md#1-perplexity-ai-research--sourcing'
    },
    {
        id: 'ecosystem-gemini',
        type: 'guide',
        title: 'Gemini for Visual Understanding',
        content: 'gemini visual image screenshot design figma code google',
        url: GUIDE_BASE + 'ai-ecosystem.md#2-google-gemini-visual-understanding'
    },
    {
        id: 'ecosystem-notebooklm',
        type: 'guide',
        title: 'NotebookLM for Audio & Synthesis',
        content: 'notebooklm audio podcast documentation synthesis onboarding google',
        url: GUIDE_BASE + 'ai-ecosystem.md#4-notebooklm-synthesis--audio'
    },
    {
        id: 'ecosystem-kimi',
        type: 'guide',
        title: 'Kimi for Presentations',
        content: 'kimi pptx slides presentation stakeholder powerpoint',
        url: GUIDE_BASE + 'ai-ecosystem.md#3-kimi-pptx--long-document-generation'
    },
    {
        id: 'ecosystem-ide',
        type: 'guide',
        title: 'IDE Tools (Cursor, Windsurf, Cline)',
        content: 'cursor windsurf cline copilot ide autocomplete inline typing',
        url: GUIDE_BASE + 'ai-ecosystem.md#5-ide-based-tools-cursor-windsurf-cline'
    },
    {
        id: 'ecosystem-prototypers',
        type: 'guide',
        title: 'UI Prototypers (v0, Bolt, Lovable)',
        content: 'v0 bolt lovable ui prototype rapid preview vercel frontend',
        url: GUIDE_BASE + 'ai-ecosystem.md#6-ui-prototypers-v0-bolt-lovable'
    },
    {
        id: 'ecosystem-cost',
        type: 'guide',
        title: 'AI Subscription Strategy',
        content: 'cost subscription pricing budget minimal balanced power stack money',
        url: GUIDE_BASE + 'ai-ecosystem.md#8-cost--subscription-strategy'
    },

    // === COWORK ===
    {
        id: 'guide-cowork',
        type: 'guide',
        title: 'Cowork (Desktop App for Non-Devs)',
        content: 'cowork desktop app knowledge workers excel word pdf pm analyst writer non-developer claude desktop',
        url: GUIDE_BASE + 'cowork.md'
    },

    // === IMAGES & DESIGN ===
    {
        id: 'guide-wireframing',
        type: 'guide',
        title: 'Wireframing Tools Integration',
        content: 'wireframe mockup excalidraw tldraw draw.io diagram sketch ui design',
        url: GUIDE_BASE + 'ultimate-guide.md#wireframing-tools'
    },
    {
        id: 'guide-figma-mcp',
        type: 'guide',
        title: 'Figma MCP Integration',
        content: 'figma mcp design tokens components styles official plugin',
        url: GUIDE_BASE + 'ultimate-guide.md#figma-mcp'
    },
    {
        id: 'guide-image-optimization',
        type: 'guide',
        title: 'Image Optimization',
        content: 'image optimization compression resize webp png jpg screenshot',
        url: GUIDE_BASE + 'ultimate-guide.md#image-optimization'
    },

    // === CONTEXT ADVANCED ===
    {
        id: 'guide-context-triage',
        type: 'guide',
        title: 'Context Triage Strategies',
        content: 'context triage priority what to include exclude optimize tokens',
        url: GUIDE_BASE + 'ultimate-guide.md#context-triage'
    },
    {
        id: 'guide-fresh-context',
        type: 'guide',
        title: 'Fresh Context Pattern',
        content: 'fresh context pattern reset autonomous long sessions clean slate',
        url: GUIDE_BASE + 'ultimate-guide.md#fresh-context-pattern'
    },
    {
        id: 'guide-session-memory',
        type: 'guide',
        title: 'Session vs Memory (When to Use)',
        content: 'session memory difference when persist ephemeral context',
        url: GUIDE_BASE + 'ultimate-guide.md#session-vs-memory'
    },

    // === ADVANCED FEATURES ===
    {
        id: 'guide-rewind',
        type: 'guide',
        title: 'Rewind & Undo Changes',
        content: 'rewind undo rollback esc escape restore previous state',
        url: GUIDE_BASE + 'ultimate-guide.md#rewind'
    },
    {
        id: 'guide-xml-prompting',
        type: 'guide',
        title: 'XML Prompting Techniques',
        content: 'xml prompting tags structure format anthropic best practices',
        url: GUIDE_BASE + 'ultimate-guide.md#xml-prompting'
    },
    {
        id: 'guide-semantic-anchors',
        type: 'guide',
        title: 'Semantic Anchors',
        content: 'semantic anchors navigation code markers landmarks structure',
        url: GUIDE_BASE + 'ultimate-guide.md#semantic-anchors'
    },

    // === CONFIGURATION ===
    {
        id: 'guide-settings',
        type: 'guide',
        title: 'Settings.json Configuration',
        content: 'settings.json configuration options preferences local global',
        url: GUIDE_BASE + 'ultimate-guide.md#settings'
    },
    {
        id: 'guide-precedence',
        type: 'guide',
        title: 'Precedence Rules (Config Priority)',
        content: 'precedence priority order config override global project local',
        url: GUIDE_BASE + 'ultimate-guide.md#precedence-rules'
    },

    // === WORKFLOWS ===
    {
        id: 'guide-cicd',
        type: 'guide',
        title: 'CI/CD Integration',
        content: 'cicd ci cd github actions pipeline automation deploy continuous integration',
        url: GUIDE_BASE + 'ultimate-guide.md#cicd'
    },
    {
        id: 'guide-batch-operations',
        type: 'guide',
        title: 'Batch Operations',
        content: 'batch operations bulk multi-file parallel processing efficiency',
        url: GUIDE_BASE + 'ultimate-guide.md#batch-operations'
    },
    {
        id: 'guide-git',
        type: 'guide',
        title: 'Git Best Practices',
        content: 'git best practices commit branch workflow version control',
        url: GUIDE_BASE + 'ultimate-guide.md#git-best-practices'
    },
    {
        id: 'guide-daily-workflow',
        type: 'guide',
        title: 'Daily Workflow Routine',
        content: 'daily workflow routine morning session productivity habits',
        url: GUIDE_BASE + 'ultimate-guide.md#daily-workflow'
    },

    // === COSTS & LIMITS ===
    {
        id: 'guide-subscription',
        type: 'guide',
        title: 'Subscription Limits & Tiers',
        content: 'subscription limits tiers pro max team enterprise pricing quota',
        url: GUIDE_BASE + 'ultimate-guide.md#subscription-limits'
    },

    // === DEBUG & TROUBLESHOOTING ===
    {
        id: 'guide-troubleshooting',
        type: 'guide',
        title: 'Troubleshooting Common Issues',
        content: 'troubleshooting fix error problem issue debug solve',
        url: GUIDE_BASE + 'ultimate-guide.md#troubleshooting'
    },
    {
        id: 'guide-debug-commands',
        type: 'guide',
        title: 'Debug Commands Reference',
        content: 'debug commands --debug --mcp-debug verbose doctor diagnostic',
        url: GUIDE_BASE + 'cheatsheet.md#debug-commands'
    },

    // === ONBOARDING & PDF ===
    {
        id: 'guide-onboarding',
        type: 'guide',
        title: 'Interactive Onboarding',
        content: 'onboarding getting started beginner interactive prompt personalized',
        url: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/tools/onboarding-prompt.md'
    },
    {
        id: 'guide-pdf-generation',
        type: 'guide',
        title: 'PDF Generation Workflow',
        content: 'pdf generation quarto typst document report whitepaper export',
        url: GUIDE_BASE + 'workflows/pdf-generation.md'
    },

    // === RELEASES & SESSION ===
    {
        id: 'guide-releases',
        type: 'guide',
        title: 'Claude Code Release Notes',
        content: 'releases changelog versions updates breaking changes anthropic',
        url: GUIDE_BASE + 'claude-code-releases.md'
    },
    {
        id: 'guide-session-search',
        type: 'guide',
        title: 'Session Search Script',
        content: 'session search find history grep logs past conversations',
        url: GUIDE_BASE + 'observability.md#session-search'
    },

    // === NEW v3.9.x ENTRIES ===
    {
        id: 'guide-voice-to-text',
        type: 'guide',
        title: 'Voice-to-Text Integration',
        content: 'wispr flow superwhisper voice dictate speech 4x faster macwhisper vibe coding hands-free',
        url: GUIDE_BASE + 'ai-ecosystem.md#7-voice-to-text-wispr-flow'
    },
    {
        id: 'guide-trust-calibration',
        type: 'guide',
        title: 'Trust Calibration: When to Verify AI Code',
        content: 'trust verification review security critical boilerplate risk acm research addy osmani when to check',
        url: GUIDE_BASE + 'ultimate-guide.md#trust-calibration'
    },
    {
        id: 'guide-session-teleportation',
        type: 'guide',
        title: 'Session Teleportation',
        content: 'teleport session transfer device continue web cli vscode cursor cross-device',
        url: GUIDE_BASE + 'ultimate-guide.md#session-teleportation'
    },
    {
        id: 'guide-semantic-anchors-prompting',
        type: 'guide',
        title: 'Semantic Anchors for Better Prompts',
        content: 'semantic anchors vocabulary precise prompting llm patterns better instructions',
        url: GUIDE_BASE + 'ultimate-guide.md#semantic-anchors'
    },
    {
        id: 'guide-vibe-coding-trap',
        type: 'guide',
        title: 'The Vibe Coding Trap',
        content: 'vibe coding trap anti-pattern karpathy dependency accept without understanding learning danger',
        url: GUIDE_BASE + 'learning-with-ai.md#the-vibe-coding-trap'
    }
];
