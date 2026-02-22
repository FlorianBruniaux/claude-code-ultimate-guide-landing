/**
 * Guide URLs for each diagram — indexed by theme ID and diagram position.
 * Maps to GitHub source files with section anchors.
 * Maintained manually to match the order in guide/diagrams/*.md
 */

const BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/'

export const DIAGRAM_GUIDE_URLS: Record<string, string[]> = {
  'foundations': [
    BASE + 'ultimate-guide.md#how-claude-code-works',
    BASE + 'ultimate-guide.md#getting-started',
    BASE + 'ultimate-guide.md#quick-start',
    BASE + 'ultimate-guide.md#permission-system',
  ],
  'context-sessions': [
    BASE + 'ultimate-guide.md#context-management',
    BASE + 'ultimate-guide.md#memory-system',
    BASE + 'ultimate-guide.md#session-management',
    BASE + 'ultimate-guide.md#context-best-practices',
  ],
  'configuration': [
    BASE + 'ultimate-guide.md#configuration',
    BASE + 'ultimate-guide.md#extensibility',
    BASE + 'ultimate-guide.md#sub-agents',
    BASE + 'ultimate-guide.md#hooks',
  ],
  'architecture': [
    BASE + 'architecture.md#master-loop',
    BASE + 'architecture.md#tools',
    BASE + 'architecture.md#system-prompt',
    BASE + 'architecture.md#sub-agents',
  ],
  'mcp': [
    BASE + 'mcp-servers-ecosystem.md',
    BASE + 'architecture.md#mcp-architecture',
    BASE + 'security-hardening.md#mcp-threats',
    BASE + 'ultimate-guide.md#mcp-configuration',
  ],
  'workflows': [
    BASE + 'workflows/tdd-with-claude.md',
    BASE + 'workflows/spec-first.md',
    BASE + 'workflows/plan-driven.md',
    BASE + 'workflows/iterative-refinement.md',
  ],
  'multi-agent': [
    BASE + 'workflows/agent-teams.md',
    BASE + 'ultimate-guide.md#git-worktrees',
    BASE + 'workflows/dual-instance-planning.md',
    BASE + 'ultimate-guide.md#horizontal-scaling',
    BASE + 'ultimate-guide.md#multi-instance-patterns',
  ],
  'security': [
    BASE + 'security-hardening.md',
    BASE + 'sandbox-native.md',
    BASE + 'production-safety.md',
    BASE + 'ultimate-guide.md#cicd-integration',
  ],
  'cost': [
    BASE + 'ultimate-guide.md#model-selection',
    BASE + 'ultimate-guide.md#cost-optimization',
    BASE + 'ultimate-guide.md#subscription-tiers',
    BASE + 'ultimate-guide.md#token-optimization',
  ],
  'adoption': [
    BASE + 'adoption-approaches.md',
    BASE + 'learning-with-ai.md',
    BASE + 'ultimate-guide.md#trust-verification',
  ],
}
