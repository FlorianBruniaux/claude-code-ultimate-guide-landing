export interface Category {
  id: number
  name: string
  slug: string
  emoji: string
}

export const categories: Category[] = [
  { id: 1, name: 'Quick Start', slug: 'quick-start', emoji: '\u{1F4DA}' },
  { id: 2, name: 'Core Concepts', slug: 'core-concepts', emoji: '\u{1F4DA}' },
  { id: 3, name: 'Memory & Settings', slug: 'memory-settings', emoji: '\u{1F4DA}' },
  { id: 4, name: 'Agents', slug: 'agents', emoji: '\u{1F4DA}' },
  { id: 5, name: 'Skills', slug: 'skills', emoji: '\u{1F4DA}' },
  { id: 6, name: 'Commands', slug: 'commands', emoji: '\u{1F4DA}' },
  { id: 7, name: 'Hooks', slug: 'hooks', emoji: '\u{1F4DA}' },
  { id: 8, name: 'MCP Servers', slug: 'mcp-servers', emoji: '\u{1F4DA}' },
  { id: 9, name: 'Advanced Patterns', slug: 'advanced-patterns', emoji: '\u{1F4DA}' },
  { id: 10, name: 'Reference', slug: 'reference', emoji: '\u{1F4DA}' },
  { id: 11, name: 'Learning with AI', slug: 'learning-with-ai', emoji: '\u{1F4DA}' },
  { id: 12, name: 'Architecture Internals', slug: 'architecture-internals', emoji: '\u{1F4DA}' },
  { id: 13, name: 'Security Hardening', slug: 'security-hardening', emoji: '\u{1F4DA}' },
  { id: 14, name: 'Privacy & Observability', slug: 'privacy-observability', emoji: '\u{1F4DA}' },
  { id: 15, name: 'AI Ecosystem', slug: 'ai-ecosystem', emoji: '\u{1F4DA}' },
]

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
