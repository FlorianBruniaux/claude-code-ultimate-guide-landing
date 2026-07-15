/**
 * Resolves a quiz question's doc_reference to a URL.
 * Prefers a same-site /guide/ deep link when the referenced file is published
 * on cc.bruniaux.com with a matching heading anchor; falls back to the
 * GitHub source otherwise (unpublished file, or anchor with no real match).
 *
 * Mirrors the guide-repo file layout produced by prepare-guide-content.mjs
 * and the anchor classification logic in scripts/check-quiz-doc-links.mjs —
 * keep the three in sync if that build script changes.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Anchored on cwd, not import.meta.url: this module is bundled into dist/ for the
// SSR build, which would move __dirname and break both reads below.
// `astro build` always runs from the project root, locally and in CI.
const ROOT = process.cwd()
const anchorMap: Record<string, string> = JSON.parse(
  readFileSync(resolve(ROOT, 'src/data/guide-anchor-map.json'), 'utf-8')
)
const GUIDE_REPO = resolve(ROOT, '../claude-code-ultimate-guide')
const GUIDE_DIR = resolve(GUIDE_REPO, 'guide')
const GITHUB_BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/'

const GUIDE_SUBDIRS = ['core', 'security', 'ecosystem', 'roles', 'ops']
const SKIP_FILES = new Set(['ultimate-guide.md', 'ultimate-guide.md.bak', 'README.md'])

function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~[\](){}|\\]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractHeadingAnchors(content: string): Set<string> {
  const anchors = new Set<string>()
  let inFence = false
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const heading = line.match(/^#{1,6}\s+(.+?)\s*$/)
    if (heading) anchors.add(toAnchor(heading[1]))
  }
  return anchors
}

interface FlatEntry {
  slug: string
  anchors: Set<string>
}

const flatGuideFiles = new Map<string, FlatEntry>()

if (existsSync(GUIDE_DIR)) {
  for (const f of readdirSync(GUIDE_DIR)) {
    if (!f.endsWith('.md') || SKIP_FILES.has(f)) continue
    const content = readFileSync(resolve(GUIDE_DIR, f), 'utf-8')
    flatGuideFiles.set(f, { slug: f.replace(/\.md$/, ''), anchors: extractHeadingAnchors(content) })
  }

  for (const sub of GUIDE_SUBDIRS) {
    const subDir = resolve(GUIDE_DIR, sub)
    if (!existsSync(subDir)) continue
    for (const f of readdirSync(subDir)) {
      if (!f.endsWith('.md')) continue
      const content = readFileSync(resolve(subDir, f), 'utf-8')
      const entry = { slug: f.replace(/\.md$/, ''), anchors: extractHeadingAnchors(content) }
      flatGuideFiles.set(f, entry)
      flatGuideFiles.set(`${sub}/${f}`, entry)
    }
  }

  const workflowsDir = resolve(GUIDE_DIR, 'workflows')
  if (existsSync(workflowsDir)) {
    for (const f of readdirSync(workflowsDir)) {
      if (!f.endsWith('.md')) continue
      const content = readFileSync(resolve(workflowsDir, f), 'utf-8')
      flatGuideFiles.set(`workflows/${f}`, {
        slug: `workflows/${f.replace(/\.md$/, '')}`,
        anchors: extractHeadingAnchors(content),
      })
    }
  }
}

export interface DocReference {
  file: string
  section?: string
  anchor?: string
  line?: number
}

export function resolveDocUrl(ref: DocReference): string {
  const normalizedFile = ref.file.replace(/^guide\//, '')
  const anchor = ref.anchor ? ref.anchor.replace(/^#/, '') : ''
  const githubUrl = `${GITHUB_BASE}${ref.file}${ref.anchor || ''}`

  if (normalizedFile === 'ultimate-guide.md') {
    if (!anchor) return githubUrl
    const chapterSlug = anchorMap[anchor]
    return chapterSlug ? `/guide/${chapterSlug}/#${anchor}` : githubUrl
  }

  const entry = flatGuideFiles.get(normalizedFile)
  if (!entry) return githubUrl
  if (anchor && !entry.anchors.has(anchor)) return githubUrl
  return `/guide/${entry.slug}/${anchor ? '#' + anchor : ''}`
}
