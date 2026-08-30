export interface GuideChangelogItem {
  title: string
  description: string
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
    if (currentRelease && currentRelease.sections.length > 0) releases.push(currentRelease)
    currentRelease = null
  }

  for (const line of markdown.split(/\r?\n/)) {
    const releaseMatch = line.match(/^## \[(Unreleased|\d+\.\d+\.\d+)\](?: - (\d{4}-\d{2}-\d{2}))?\s*$/)
    if (releaseMatch) {
      flushRelease()
      const version = releaseMatch[1]
      const date = releaseMatch[2] ?? null
      currentRelease = { version, date, anchor: releaseAnchor(version, date), sections: [] }
      continue
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

export function guideChangelogGitHubUrl(release: GuideChangelogRelease): string {
  return `https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/CHANGELOG.md#${release.anchor}`
}
