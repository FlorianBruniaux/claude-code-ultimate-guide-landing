export interface GuideChangelogItem {
  title: string
  description: string
}

export interface GuideChangelogLink {
  label: string
  href: string
}

export interface GuideChangelogInlineSegment {
  kind: 'text' | 'code' | 'link'
  text: string
  href?: string
}

export interface GuideChangelogSection {
  title: string
  items: GuideChangelogItem[]
}

export interface GuideChangelogRelease {
  version: string
  date: string | null
  anchor: string
  sections: GuideChangelogSection[]
}

export interface GuideChangelogDisplayRelease extends GuideChangelogRelease {
  status: 'unreleased' | 'current' | 'published'
}

function releaseAnchor(version: string, date: string | null): string {
  if (version === 'Unreleased') return 'unreleased'
  return `${version}---${date ?? ''}`.replace(/\./g, '')
}

function parseItem(line: string): GuideChangelogItem | null {
  const bullet = line.match(/^-\s+(.+)$/)
  if (!bullet) return null

  const text = bullet[1].trim()
  const boldTitle = text.match(/^\*\*(.+?)\*\*(.*)$/)
  if (!boldTitle) return { title: text, description: '' }

  return {
    title: boldTitle[1].trim(),
    description: boldTitle[2].replace(/^\s*(?::|[-–])\s*/, '').trim(),
  }
}

const PUBLIC_GUIDE_ROUTE_OVERRIDES: Record<string, string> = {
  'guide/core/claude-code-releases.md': '/releases/',
  'guide/core/context-engineering.md': '/context-engineering/',
  'guide/ecosystem/ai-ecosystem.md': '/ecosystem/',
  'guide/roles/ai-roles.md': '/roles/',
}

const DIAGRAM_LANDING_ANCHORS: Record<string, string> = {
  '01-foundations': 'foundations',
  '02-context-and-sessions': 'context-sessions',
  '03-configuration-system': 'configuration',
  '04-architecture-internals': 'architecture',
  '05-mcp-ecosystem': 'mcp',
  '06-development-workflows': 'workflows',
  '07-multi-agent-patterns': 'multi-agent',
  '08-security-and-production': 'security',
  '09-cost-and-optimization': 'cost',
  '10-adoption-and-learning': 'adoption',
}

const LANDING_PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/compare/': 'Comparisons',
  '/context-engineering/': 'Context Engineering',
  '/ecosystem/mcp-vs-cli/': 'MCP vs CLI',
  '/faq/': 'FAQ',
  '/memory-systems/': 'Memory Systems Overview',
  '/methodologies/': 'Methodologies Explorer',
  '/rss.xml': 'RSS Feed',
  '/sitemap/': 'Sitemap',
}

const GUIDE_SOURCE_LABEL_OVERRIDES: Record<string, string> = {
  'guide/README.md': 'Guide',
  'guide/diagrams/README.md': 'Diagrams',
  'guide/learning-path/README.md': 'Learning Path',
  'guide/ultimate-guide.fr.md': 'Ultimate Guide FR',
  'guide/workflows/README.md': 'Workflows',
}

function guidePathUrl(path: string): string | null {
  if (PUBLIC_GUIDE_ROUTE_OVERRIDES[path]) return PUBLIC_GUIDE_ROUTE_OVERRIDES[path]
  if (path === 'guide/README.md') return '/guide/'
  if (path === 'guide/ultimate-guide.md') return '/guide/ultimate-guide/'
  if (path === 'guide/ultimate-guide.fr.md') return '/guide/ultimate-guidefr/'
  if (path === 'guide/workflows/README.md') return '/guide/workflows/'
  if (path === 'guide/learning-path/README.md') return '/guide/learning-path/'

  if (path.startsWith('guide/diagrams/')) {
    const basename = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
    if (basename === 'README') return '/diagrams/'
    const anchor = DIAGRAM_LANDING_ANCHORS[basename]
    return anchor ? `/diagrams/#${anchor}` : '/diagrams/'
  }

  const basename = path.split('/').pop()?.replace(/\.md$/, '') ?? path
  if (path.startsWith('guide/workflows/')) return `/guide/workflows/${basename}/`
  if (path.startsWith('guide/learning-path/')) return `/guide/learning-path/${basename}/`
  return `/guide/${basename}/`
}

function humanizeSlug(slug: string): string {
  const acronyms = new Set(['ai', 'api', 'cli', 'dora', 'llm', 'mcp', 'sre'])

  return slug
    .split('-')
    .map((word) => acronyms.has(word) ? word.toUpperCase() : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

function humanizeGuidePath(path: string): string {
  if (GUIDE_SOURCE_LABEL_OVERRIDES[path]) return GUIDE_SOURCE_LABEL_OVERRIDES[path]
  const basename = path.split('/').pop()?.replace(/\.md$/, '') ?? path
  return humanizeSlug(basename)
}

function landingPageLink(path: string): GuideChangelogLink | null {
  const relativePath = path.replace(/^src\/pages\//, '')

  if (relativePath === 'rss.xml.ts') {
    return { label: LANDING_PAGE_LABELS['/rss.xml'], href: '/rss.xml' }
  }
  if (!relativePath.endsWith('.astro') || relativePath.startsWith('api/')) return null

  const routeSegments = relativePath.replace(/\.astro$/, '').split('/')
  const lastSegment = routeSegments.at(-1)
  if (lastSegment === 'index') routeSegments.pop()
  else if (lastSegment?.startsWith('[')) routeSegments.pop()

  if (routeSegments.some((segment) => segment.startsWith('['))) return null
  if (routeSegments.length === 0 && lastSegment !== 'index') return null

  const href = routeSegments.length > 0 ? `/${routeSegments.join('/')}/` : '/'
  const fallbackLabel = routeSegments.length > 0
    ? humanizeSlug(routeSegments.at(-1) ?? '')
    : 'Home'

  return {
    label: LANDING_PAGE_LABELS[href] ?? fallbackLabel,
    href,
  }
}

export function guideChangelogItemLinks(
  item: GuideChangelogItem,
  publishedGuidePaths?: ReadonlySet<string>,
): GuideChangelogLink[] {
  const text = `${item.title} ${item.description}`.replace(
    /(guide\/(?:[a-z0-9._-]+\/)*?)\{([^}]+)\}/gi,
    (_match, prefix: string, filenames: string) => filenames
      .split(',')
      .map((filename) => `${prefix}${filename.trim()}`)
      .join(' '),
  )
  const sourcePaths = text.match(
    /guide\/(?:[a-z0-9._-]+\/)*[a-z0-9._-]+\.md|src\/pages\/(?:[a-z0-9._\[\]-]+\/)*[a-z0-9._\[\]-]+\.(?:astro|ts)/gi,
  ) ?? []
  const links = new Map<string, GuideChangelogLink>()

  for (const path of sourcePaths) {
    let link: GuideChangelogLink | null = null

    if (path.startsWith('guide/')) {
      if (publishedGuidePaths && !publishedGuidePaths.has(path)) continue
      const href = guidePathUrl(path)
      if (href) link = { label: humanizeGuidePath(path), href }
    } else {
      link = landingPageLink(path)
    }

    if (link && !links.has(link.href)) links.set(link.href, link)
  }

  return [...links.values()]
}

function plainInlineText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function serializeInlineSegment(segment: GuideChangelogInlineSegment, text = segment.text): string {
  if (segment.kind === 'code') return `\`${text}\``
  if (segment.kind === 'link') return `[${text}](${segment.href})`
  return text
}

function truncateInlineMarkdown(text: string, maxLength: number): string {
  if (plainInlineText(text).length <= maxLength) return text

  let visibleLength = 0
  let truncated = ''

  for (const segment of parseGuideChangelogInline(text)) {
    const remaining = maxLength - visibleLength
    if (remaining <= 0) break

    if (segment.text.length <= remaining) {
      truncated += serializeInlineSegment(segment)
      visibleLength += segment.text.length
      continue
    }

    if (segment.kind === 'text' || truncated.length === 0) {
      const candidate = segment.text.slice(0, remaining + 1)
      const lastWord = candidate.lastIndexOf(' ')
      const cutoff = lastWord > remaining * 0.4 ? lastWord : remaining
      truncated += serializeInlineSegment(segment, candidate.slice(0, cutoff).trimEnd())
    }
    break
  }

  return `${truncated.trimEnd()}...`
}

export function summarizeGuideChangelogDescription(description: string, maxLength = 260): string {
  const normalized = description.replace(/\s+/g, ' ').trim()
  const parenthesizedPrefix = normalized.match(/^\(([^)]+)\)\s*:\s*/)
  const fileReferencePattern = /(?:^|[\s,])(?:(?:[a-z0-9._-]+\/)+)?[a-z0-9._-]+\.(?:astro|css|epub|html?|js|json|md|mdx|mjs|pdf|py|sh|toml|ts|tsx|txt|xml|ya?ml)\b/i
  const summary = parenthesizedPrefix && fileReferencePattern.test(plainInlineText(parenthesizedPrefix[1]))
    ? normalized.slice(parenthesizedPrefix[0].length).trimStart()
    : normalized

  return truncateInlineMarkdown(summary, maxLength)
}

export function parseGuideChangelogInline(text: string): GuideChangelogInlineSegment[] {
  const segments: GuideChangelogInlineSegment[] = []
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)|`([^`]+)`/g
  let cursor = 0

  for (const match of text.matchAll(tokenPattern)) {
    const index = match.index ?? 0
    if (index > cursor) segments.push({ kind: 'text', text: text.slice(cursor, index) })

    if (match[1] && match[2]) {
      segments.push({ kind: 'link', text: match[1], href: match[2] })
    } else if (match[3]) {
      segments.push({ kind: 'code', text: match[3] })
    }

    cursor = index + match[0].length
  }

  if (cursor < text.length) segments.push({ kind: 'text', text: text.slice(cursor) })
  return segments.length > 0 ? segments : [{ kind: 'text', text }]
}

export function parseGuideChangelog(markdown: string): GuideChangelogRelease[] {
  const releases: GuideChangelogRelease[] = []
  let currentRelease: GuideChangelogRelease | null = null
  let currentSection: GuideChangelogSection | null = null

  const flushSection = () => {
    if (currentRelease && currentSection && currentSection.items.length > 0) {
      currentRelease.sections.push(currentSection)
    }
    currentSection = null
  }

  const flushRelease = () => {
    flushSection()
    if (currentRelease && currentRelease.sections.length > 0) {
      currentRelease.sections = currentRelease.sections.reduce<GuideChangelogSection[]>((sections, section) => {
        const existingSection = sections.find((candidate) => candidate.title === section.title)
        if (existingSection) existingSection.items.push(...section.items)
        else sections.push(section)
        return sections
      }, [])

      const existingRelease = releases.find((release) => (
        release.version === currentRelease?.version && release.date === currentRelease?.date
      ))

      if (existingRelease) {
        for (const section of currentRelease.sections) {
          const existingSection = existingRelease.sections.find((candidate) => candidate.title === section.title)
          if (existingSection) existingSection.items.push(...section.items)
          else existingRelease.sections.push(section)
        }
      }
      else releases.push(currentRelease)
    }
    currentRelease = null
  }

  for (const line of markdown.split(/\r?\n/)) {
    const releaseMatch = line.match(/^## \[(Unreleased|\d+\.\d+\.\d+)\](?: - (\d{4}-\d{2}-\d{2}))?(?:\s+\([^)]+\))?\s*$/)
    if (releaseMatch) {
      flushRelease()
      const version = releaseMatch[1]
      const date = releaseMatch[2] ?? null
      currentRelease = { version, date, anchor: releaseAnchor(version, date), sections: [] }
      continue
    }

    if (line.startsWith('## [')) {
      throw new Error(`Unsupported changelog release heading: ${line}`)
    }

    if (!currentRelease) continue

    const sectionMatch = line.match(/^###\s+(.+)$/)
    if (sectionMatch) {
      flushSection()
      currentSection = { title: sectionMatch[1].trim(), items: [] }
      continue
    }

    if (!currentSection) continue
    const item = parseItem(line)
    if (item) currentSection.items.push(item)
  }

  flushRelease()
  return releases
}

export function buildGuideChangelogDisplay(
  releases: GuideChangelogRelease[],
  currentVersion: string,
): GuideChangelogDisplayRelease[] {
  return releases
    .map((release) => ({
      ...release,
      status: release.version === 'Unreleased'
        ? 'unreleased' as const
        : release.version === currentVersion
          ? 'current' as const
          : 'published' as const,
    }))
    .sort((a, b) => {
      if (a.status === 'unreleased') return -1
      if (b.status === 'unreleased') return 1

      const dateOrder = (b.date ?? '').localeCompare(a.date ?? '')
      if (dateOrder !== 0) return dateOrder
      return b.version.localeCompare(a.version, undefined, { numeric: true })
    })
}

export function guideChangelogGitHubUrl(release: GuideChangelogRelease): string {
  return `https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/CHANGELOG.md#${release.anchor}`
}
