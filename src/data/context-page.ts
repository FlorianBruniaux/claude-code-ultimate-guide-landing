export const CONTEXT_GUIDE_HREF = '/guide/context-engineering/'

export const CONTEXT_NAV_ITEMS = [
  { href: '#configure', label: 'Configure' },
  { href: '#understand', label: 'Understand' },
  { href: '#maturity', label: 'Maturity' },
  { href: '#full-guide', label: 'Full guide' },
] as const

export const CONTEXT_SYSTEM_STAGES = [
  {
    id: 'claude-md',
    icon: '📄',
    title: 'CLAUDE.md as a contract',
    description: 'Define the project, its structure, and the rules that apply to every session.',
    guideHref: '/claude-md-best-practices/',
    guideLabel: 'Write a focused CLAUDE.md',
  },
  {
    id: 'modular-rules',
    icon: '🗂️',
    title: 'Modular rules',
    description: 'Move focused instructions into files that can be maintained and scoped independently.',
    guideHref: CONTEXT_GUIDE_HREF,
    guideLabel: 'Structure context modules',
  },
  {
    id: 'role-profiles',
    icon: '👤',
    title: 'Role profiles',
    description: 'Assemble different context for frontend, backend, platform, and staff-level work.',
    guideHref: '/roles/',
    guideLabel: 'Explore AI engineering roles',
  },
  {
    id: 'ci-feedback',
    icon: '🔄',
    title: 'CI feedback',
    description: 'Detect stale rules, test adherence, and feed useful findings back into the system.',
    guideHref: `${CONTEXT_GUIDE_HREF}#10-signal-taxonomy-and-causal-attribution`,
    guideLabel: 'Close the context feedback loop',
  },
] as const
