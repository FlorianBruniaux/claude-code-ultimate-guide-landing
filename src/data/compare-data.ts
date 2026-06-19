export interface ComparisonTool {
  slug: string
  name: string
  tagline: string
  type: string
  pricingFree: boolean
  pricingMonthly: string
  openSource: boolean
  modelAgnostic: boolean
  agenticMode: boolean
  ideIntegration: string
  strengths: string[]
  weaknesses: string[]
  bestFor: string
  verdict: string
  complementsClaudeCode: boolean
  complementReason?: string
}

export const COMPARISON_TOOLS: ComparisonTool[] = [
  {
    slug: 'cursor',
    name: 'Cursor',
    tagline: 'AI-native IDE built on VS Code with Composer agent mode',
    type: 'AI-native IDE',
    pricingFree: true,
    pricingMonthly: '$20/month Pro',
    openSource: false,
    modelAgnostic: false,
    agenticMode: true,
    ideIntegration: 'VS Code fork (all VS Code extensions work)',
    strengths: [
      'Deep IDE integration with no setup',
      'Tab autocomplete quality',
      'Composer handles multi-file edits in one session',
      'Large community and extensions ecosystem',
    ],
    weaknesses: [
      'Subscription required for serious use',
      'Model choice controlled by Cursor',
      'Heavier than a CLI for agentic workflows',
    ],
    bestFor: 'Developers wanting autocomplete and agent mode in a single IDE with zero configuration',
    verdict:
      'Cursor excels at IDE-native autocomplete and has a capable Composer agent. Where Claude Code differs: Claude Code runs in the terminal and handles longer, multi-turn agentic tasks with full context control. Many developers use both: Cursor for quick edits and autocomplete, Claude Code for deeper refactors and multi-file agentic workflows.',
    complementsClaudeCode: true,
    complementReason:
      'Cursor handles inline autocomplete and IDE-native editing; Claude Code handles terminal-driven, multi-step agentic sessions. Different interaction surfaces.',
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: "Microsoft's AI pair programmer with broad IDE support and Copilot Workspace",
    type: 'IDE Extension',
    pricingFree: true,
    pricingMonthly: '$10/month individual, $19/month Business',
    openSource: false,
    modelAgnostic: false,
    agenticMode: true,
    ideIntegration: 'VS Code, JetBrains, Vim, Neovim, Xcode, Eclipse',
    strengths: [
      'Broadest IDE support of any tool',
      'Enterprise-grade with audit logs, SSO, compliance',
      'Deep GitHub integration (PRs, issues, workflows)',
      'Inline autocomplete is mature and reliable',
    ],
    weaknesses: [
      'Agent mode (Workspace) less capable than Claude Code',
      'Pricing stacks with seat count for large teams',
      'No way to use Claude directly through Copilot',
    ],
    bestFor:
      'Enterprise teams already invested in the GitHub ecosystem needing broad IDE support and compliance features',
    verdict:
      'GitHub Copilot dominates in enterprise adoption for good reason: it integrates everywhere, has compliance features, and pairs tightly with GitHub workflows. Its agent mode lags behind Claude Code for complex multi-step tasks. The two serve different moments: Copilot for the edit loop inside an IDE, Claude Code for driving longer agentic sessions from the terminal.',
    complementsClaudeCode: true,
    complementReason:
      'Copilot handles inline completions inside your IDE; Claude Code handles terminal-based agentic sessions requiring deep context management.',
  },
  {
    slug: 'aider',
    name: 'Aider',
    tagline: 'Open source terminal AI coding assistant with native git integration',
    type: 'Terminal CLI',
    pricingFree: true,
    pricingMonthly: 'Free (pay per token to your chosen LLM provider)',
    openSource: true,
    modelAgnostic: true,
    agenticMode: true,
    ideIntegration: 'Terminal (works with any editor via file-based edits)',
    strengths: [
      'Fully open source, MIT license',
      'Use any LLM including local models',
      'Git-native: all edits committed with clean diffs',
      'Cost-transparent: you see and control exact API costs',
    ],
    weaknesses: [
      'Terminal only, no IDE integration',
      'Requires more setup than Claude Code',
      'Less polished permission and approval flow than Claude Code',
      'Smaller context window management compared to Claude Code auto-compact',
    ],
    bestFor:
      'Developers who prioritize open source tooling, model flexibility, and want to avoid vendor lock-in',
    verdict:
      'Aider and Claude Code have the most overlap: both are terminal-based agentic coding tools. The key differences: Aider is fully open source and model-agnostic (run it with Ollama locally, zero API cost); Claude Code is tightly integrated with Anthropic\'s Claude models and has more mature multi-agent orchestration features. If you need model flexibility or air-gapped environments, Aider is the stronger choice.',
    complementsClaudeCode: false,
    complementReason:
      'Significant overlap — both are terminal CLI agents. Choose based on model preference and open source requirements.',
  },
  {
    slug: 'windsurf',
    name: 'Windsurf',
    tagline: 'AI IDE by Codeium with Cascade agentic mode and a free tier',
    type: 'AI-native IDE',
    pricingFree: true,
    pricingMonthly: '$15/month Pro',
    openSource: false,
    modelAgnostic: false,
    agenticMode: true,
    ideIntegration: 'VS Code fork',
    strengths: [
      'Generous free tier with agent mode included',
      'Cascade handles complex multi-file tasks',
      'Active development with frequent updates',
      'Familiar VS Code feel',
    ],
    weaknesses: [
      'Newer player, smaller community than Cursor or Copilot',
      'Proprietary Codeium models, less community feedback on model quality',
      'VS Code fork means occasional extension compatibility issues',
    ],
    bestFor:
      'Developers wanting a free-tier agentic coding IDE without committing to a subscription',
    verdict:
      'Windsurf competes with Cursor at a lower price point. Its Cascade agent is genuinely capable for multi-file tasks inside an IDE. Compared to Claude Code: Windsurf is IDE-native (good for visual workflows), Claude Code is terminal-native (better for scripted, repeatable agentic sessions). The Codeium models are less battle-tested than Claude, but the free tier makes Windsurf worth evaluating.',
    complementsClaudeCode: true,
    complementReason:
      'Windsurf covers the IDE-native experience; Claude Code handles terminal-driven agentic workflows with deeper model context control.',
  },
  {
    slug: 'continue',
    name: 'Continue',
    tagline: 'Open source VS Code and JetBrains extension supporting any LLM including local models',
    type: 'Open Source Extension',
    pricingFree: true,
    pricingMonthly: 'Free',
    openSource: true,
    modelAgnostic: true,
    agenticMode: false,
    ideIntegration: 'VS Code, JetBrains',
    strengths: [
      '100% open source, Apache 2.0',
      'Run on local models (Ollama, LM Studio) for full privacy',
      'Team config via .continue/config.yaml committed to repo',
      'No data sent to third parties when using local models',
    ],
    weaknesses: [
      'Not an autonomous agent — requires human in the loop for each step',
      'Requires more configuration than plug-and-play tools',
      'Chat interface, not a coding agent — closer to an IDE chat panel than Claude Code',
    ],
    bestFor:
      'Teams with data privacy requirements, self-hosting mandates, or wanting local LLM support inside VS Code or JetBrains',
    verdict:
      'Continue fills a niche that Claude Code does not: fully private, local-first AI coding assistance inside your IDE. It does not compete on autonomous agentic workflows — it is an IDE chat panel that you can point at any LLM. If your team needs data privacy or wants to run Llama 3 locally, Continue is a strong option. Most Claude Code users will find Continue complementary rather than competitive.',
    complementsClaudeCode: true,
    complementReason:
      'Continue covers local/private LLM chat inside the IDE; Claude Code covers cloud-powered agentic sessions in the terminal.',
  },
  {
    slug: 'cody',
    name: 'Cody by Sourcegraph',
    tagline: 'Enterprise AI coding assistant with cross-repository codebase awareness',
    type: 'Enterprise IDE Extension',
    pricingFree: true,
    pricingMonthly: 'Enterprise pricing (contact sales)',
    openSource: false,
    modelAgnostic: true,
    agenticMode: false,
    ideIntegration: 'VS Code, JetBrains',
    strengths: [
      'Cross-repository code understanding, not just current file',
      'Enterprise compliance features (audit, SSO, data residency)',
      'Sourcegraph code search integration',
      'Multi-LLM backend support',
    ],
    weaknesses: [
      'Advanced features require enterprise tier',
      'Not an autonomous coding agent',
      'Better at code search and explanation than agentic task execution',
      'Heavier setup for enterprise deployment',
    ],
    bestFor:
      'Large engineering teams with multiple repositories needing AI assistance with deep codebase awareness and compliance requirements',
    verdict:
      'Cody targets a different problem than Claude Code: understanding large, multi-repo codebases at enterprise scale. Where Claude Code excels at autonomous, multi-step task execution in a single repo, Cody excels at answering questions about a sprawling codebase. For enterprise teams with compliance needs and multi-repo code understanding requirements, Cody is worth evaluating alongside Claude Code.',
    complementsClaudeCode: true,
    complementReason:
      'Cody provides codebase-wide search and explanation; Claude Code handles autonomous agentic task execution.',
  },
]
