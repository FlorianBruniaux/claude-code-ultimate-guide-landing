/**
 * Cmd+K search model: scores index entries, then groups the hits by page and
 * by site section, so one page shows once with its matching sections below
 * instead of one row per heading. Pure functions, no DOM.
 */

export interface SearchEntry {
  id: string
  title: string
  keywords: string
  category: string
  url: string
  source: 'landing' | 'guide'
}

export type SearchGroupId = 'start' | 'build' | 'scale' | 'security' | 'resources' | 'guide' | 'github' | 'other'
export type SearchFilter = SearchGroupId | 'all'

export interface SearchPageInfo {
  title: string
  description?: string
}

export interface SearchRoute {
  href: string
  group: SearchGroupId
}

export interface SearchPayload {
  entries: SearchEntry[]
  pages: Record<string, SearchPageInfo>
  routes: SearchRoute[]
}

export const SEARCH_GROUPS: ReadonlyArray<{ id: SearchGroupId; label: string }> = [
  { id: 'start', label: 'Start' },
  { id: 'build', label: 'Build' },
  { id: 'scale', label: 'Scale' },
  { id: 'security', label: 'Security' },
  { id: 'resources', label: 'Resources' },
  { id: 'guide', label: 'Guide chapters' },
  { id: 'github', label: 'On GitHub' },
  { id: 'other', label: 'Other pages' },
]

const GROUP_LABEL = new Map(SEARCH_GROUPS.map((group) => [group.id, group.label]))

export function groupLabel(id: SearchFilter): string {
  return id === 'all' ? 'All' : GROUP_LABEL.get(id) ?? id
}

export const isOffSite = (url: string): boolean => /^https?:\/\//.test(url)

/**
 * Score an entry against the query. Returns 0 if no match.
 * Higher = more relevant.
 */
/** Lowercase without diacritics, so "securite" finds "sécurité" (UX-16). */
export function fold(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function score(entry: Pick<SearchEntry, 'title' | 'keywords' | 'category'>, query: string): number {
  const q = fold(query).trim()
  if (!q) return 0

  const title = fold(entry.title)
  const keywords = fold(entry.keywords)
  const category = fold(entry.category)

  if (title === q) return 100
  if (title.startsWith(q)) return 90

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (new RegExp(`\\b${escaped}`).test(title)) return 80
  if (title.includes(q)) return 70

  const words = q.split(/\s+/).filter(Boolean)
  if (words.length > 1) {
    if (words.every((w) => title.includes(w))) return 65
    if (words.every((w) => keywords.includes(w))) return 55
  }

  if (keywords.includes(q)) return 50
  if (category.includes(q)) return 40

  if (words.some((w) => w.length > 2 && title.includes(w))) return 30
  if (words.some((w) => w.length > 2 && keywords.includes(w))) return 20

  return 0
}

/**
 * Reorders matches toward the most readable destination: a dedicated landing
 * page first, then other landing entries (glossary, cheat sheet), then guide
 * pages rendered on this site, then raw files on GitHub. Applied only to an
 * entry that already matched, so it never turns a miss into a result.
 * The page bonus exceeds the exact-title gap (100 - 90) plus the landing
 * bonus, so "memory system" opens /memory-systems/ before the cheat sheet row.
 */
function sourceBonus(entry: SearchEntry): number {
  if (entry.source === 'landing') return entry.id.startsWith('page-') ? 20 : 5
  return isOffSite(entry.url) ? -5 : 0
}

/** Flat ranking, kept for callers that want the 15 best entries. */
export function searchEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  if (!query.trim()) return []

  return entries
    .map((entry) => {
      const base = score(entry, query)
      return { entry, s: base > 0 ? base + sourceBonus(entry) : 0 }
    })
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.entry.title.localeCompare(b.entry.title))
    .slice(0, 15)
    .map((r) => r.entry)
}

/** Off-site files keep their fragment: one GitHub anchor is one topic. */
export function pageKey(url: string): string {
  if (isOffSite(url)) return url
  return url.split('#', 1)[0] || '/'
}

function longestRoute(path: string, routes: SearchRoute[], prefixOnly: boolean): SearchRoute | undefined {
  let found: SearchRoute | undefined
  for (const route of routes) {
    if (isOffSite(route.href) || route.href === '/') continue
    const matches = prefixOnly ? path.startsWith(route.href) : path === route.href
    if (matches && (!found || route.href.length > found.href.length)) found = route
  }
  return found
}

export function classifyUrl(url: string, routes: SearchRoute[]): SearchGroupId {
  if (isOffSite(url)) return 'github'
  const path = pageKey(url)
  if (path.startsWith('/security/')) return 'security'
  const exact = longestRoute(path, routes, false)
  if (exact) return exact.group
  if (path.startsWith('/guide/')) return 'guide'
  const prefix = longestRoute(path, routes, true)
  if (prefix) return prefix.group
  if (path === '/') return 'start'
  return 'other'
}

export function badgeFor(url: string, category: string, group: SearchGroupId): string {
  if (isOffSite(url)) return 'GH'
  if (group === 'security') return 'SEC'
  if (category.startsWith('Examples')) return 'TPL'
  if (category.startsWith('Glossary') || category.startsWith('Cheat Sheet')) return 'REF'
  if (pageKey(url).startsWith('/guide/')) return 'DOC'
  return 'PAGE'
}

function humanizePath(path: string): string {
  const slug = path.replace(/\/+$/, '').split('/').pop() ?? path
  const words = slug.replace(/^\d+-/, '').replace(/[-_]+/g, ' ').trim()
  return words ? words[0].toUpperCase() + words.slice(1) : path
}

export interface SearchSectionHit {
  title: string
  url: string
  score: number
}

export interface SearchPageHit {
  key: string
  /** Where Enter goes: the page itself, or its best section when only a section matched. */
  url: string
  title: string
  description?: string
  category: string
  group: SearchGroupId
  badge: string
  offSite: boolean
  score: number
  /** Score of the page title alone, used to pick the best matches. */
  titleScore: number
  matches: number
  sections: SearchSectionHit[]
}

export interface SearchViewGroup {
  id: SearchGroupId | 'best'
  label: string
  pageCount: number
  matchCount: number
  pages: SearchPageHit[]
  /** Pages of this group not shown in the All view. */
  hidden: number
}

export interface SearchView {
  query: string
  tokens: string[]
  filter: SearchFilter
  totalPages: number
  totalMatches: number
  counts: Record<SearchFilter, number>
  groups: SearchViewGroup[]
  /** Rows in display order, for keyboard navigation. */
  rows: SearchPageHit[]
}

export const ALL_VIEW_PAGES_PER_GROUP = 4
export const BEST_MATCH_PAGES = 3
export const FILTERED_VIEW_PAGES = 60
const BEST_MATCH_TITLE_SCORE = 80

export function queryTokens(query: string): string[] {
  return [...new Set(query.toLowerCase().split(/\s+/).filter((w) => w.length >= 2))]
}

interface MutablePage extends SearchPageHit {
  root: boolean
}

export function groupHits(payload: SearchPayload, query: string): SearchPageHit[] {
  const q = query.trim()
  if (!q) return []
  const pages = new Map<string, MutablePage>()

  for (const entry of payload.entries) {
    const base = score(entry, q)
    if (base === 0) continue
    const s = base + sourceBonus(entry)
    const key = pageKey(entry.url)
    const info = payload.pages[key]
    // A topic entry that links to a known page without a fragment (a template on
    // /examples/, a release note on /releases/) is a section of that page, not
    // the page itself; only the page's own entry or an unknown page is its root.
    const isRoot = isOffSite(entry.url) || (!entry.url.includes('#') && (!info || entry.id.startsWith('page-')))

    let page = pages.get(key)
    if (!page) {
      const group = classifyUrl(entry.url, payload.routes)
      page = {
        key,
        url: entry.url,
        title: info?.title ?? '',
        description: info?.description || undefined,
        category: entry.category,
        group,
        badge: badgeFor(entry.url, entry.category, group),
        offSite: isOffSite(entry.url),
        score: 0,
        titleScore: 0,
        matches: 0,
        sections: [],
        root: false,
      }
      pages.set(key, page)
    }

    page.matches++
    if (isRoot) {
      if (!page.root || s > page.score) {
        page.title = info?.title ?? entry.title
        page.category = entry.category
        page.url = entry.url
        page.badge = badgeFor(entry.url, entry.category, page.group)
      }
      page.root = true
      page.titleScore = Math.max(page.titleScore, base)
    } else if (!page.sections.some((section) => section.title === entry.title)) {
      page.sections.push({ title: entry.title, url: entry.url, score: s })
    }
    page.score = Math.max(page.score, s)
  }

  const result: SearchPageHit[] = []
  for (const page of pages.values()) {
    page.sections.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    if (!page.title) page.title = humanizePath(page.key)
    if (!page.root) {
      page.titleScore = score({ title: page.title, keywords: '', category: '' }, q)
      // A section-only hit opens the section the visitor searched for, unless
      // one of the matching topics points at the page itself.
      const topLevel = page.sections.some((section) => !section.url.includes('#'))
      if (topLevel) page.url = page.key
      else if (page.sections[0]) page.url = page.sections[0].url
    }
    const { root: _root, ...hit } = page
    result.push(hit)
  }

  return result.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
}

export function emptyCounts(): Record<SearchFilter, number> {
  return { all: 0, start: 0, build: 0, scale: 0, security: 0, resources: 0, guide: 0, github: 0, other: 0 }
}

function summarize(id: SearchViewGroup['id'], pages: SearchPageHit[], shown: SearchPageHit[]): SearchViewGroup {
  return {
    id,
    label: id === 'best' ? 'Best match' : groupLabel(id),
    pageCount: pages.length,
    matchCount: pages.reduce((n, page) => n + page.matches, 0),
    pages: shown,
    hidden: pages.length - shown.length,
  }
}

export function buildSearchView(payload: SearchPayload, query: string, filter: SearchFilter = 'all'): SearchView {
  const hits = groupHits(payload, query)
  const counts = emptyCounts()
  counts.all = hits.length
  for (const hit of hits) counts[hit.group]++

  const groups: SearchViewGroup[] = []
  if (filter === 'all') {
    const best = hits.filter((hit) => !hit.offSite && hit.titleScore >= BEST_MATCH_TITLE_SCORE).slice(0, BEST_MATCH_PAGES)
    if (best.length) groups.push(summarize('best', best, best))
    const used = new Set(best.map((hit) => hit.key))
    const byGroup: SearchViewGroup[] = []
    for (const { id } of SEARCH_GROUPS) {
      const pages = hits.filter((hit) => hit.group === id && !used.has(hit.key))
      if (pages.length) byGroup.push(summarize(id, pages, pages.slice(0, ALL_VIEW_PAGES_PER_GROUP)))
    }
    // Hits are sorted by score, so the first page of a group is its best one.
    // Raw GitHub files and unfiled pages come after every site section.
    const trailing = (id: SearchViewGroup['id']) => (id === 'github' || id === 'other' ? 1 : 0)
    byGroup.sort((a, b) => trailing(a.id) - trailing(b.id) || b.pages[0].score - a.pages[0].score)
    groups.push(...byGroup)
  } else {
    const pages = hits.filter((hit) => hit.group === filter)
    if (pages.length) groups.push(summarize(filter, pages, pages.slice(0, FILTERED_VIEW_PAGES)))
  }

  return {
    query: query.trim(),
    tokens: queryTokens(query),
    filter,
    totalPages: hits.length,
    totalMatches: hits.reduce((n, hit) => n + hit.matches, 0),
    counts,
    groups,
    rows: groups.flatMap((group) => group.pages),
  }
}

/** Filters reachable with Tab: All, then every group that has results. */
export function cycleFilters(counts: Record<SearchFilter, number>): SearchFilter[] {
  return ['all', ...SEARCH_GROUPS.map((group) => group.id).filter((id) => counts[id] > 0)]
}

/** Splits text into plain and matched parts, case-insensitive. */
export function highlightParts(text: string, tokens: string[]): Array<{ text: string; match: boolean }> {
  if (!tokens.length) return [{ text, match: false }]
  const pattern = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text
    .split(pattern)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, match: tokens.includes(part.toLowerCase()) }))
}

export function normalizePayload(data: SearchPayload | SearchEntry[]): SearchPayload {
  if (Array.isArray(data)) return { entries: data, pages: {}, routes: [] }
  return { entries: data.entries ?? [], pages: data.pages ?? {}, routes: data.routes ?? [] }
}
