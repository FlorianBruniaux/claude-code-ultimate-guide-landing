/**
 * Build script: Parse all guide .md files → extract H2 headings → generate search entries
 * Run: node scripts/build-guide-content-index.mjs
 *
 * Output: src/data/guide-content-entries.ts
 * Each H2 heading in each guide file becomes a searchable entry with:
 *   - title: the heading text (cleaned)
 *   - keywords: heading + file title + first paragraph excerpt
 *   - url: /guide/file-slug/#section-anchor
 *   - category: "Ultimate Guide", "Workflows", or "Core Guides"
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { resolve, dirname, relative, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const CONTENT_DIR = resolve(ROOT, 'src/content/docs/guide')
const OUT_PATH = resolve(ROOT, 'src/data/guide-content-entries.ts')

// Headings to skip (navigation artifacts, pure ToC sections)
const SKIP_HEADINGS = new Set([
  'table of contents',
  'toc',
  'contents',
  'overview',  // too generic when used alone
])

/**
 * Slugify a heading to match Starlight / rehype-slug / github-slugger behavior.
 * - Lowercase
 * - Remove everything except letters, numbers, spaces, hyphens
 * - Replace spaces → hyphens
 * - Collapse multiple hyphens
 * - Trim leading/trailing hyphens
 */
function slugify(text) {
  return text
    .toLowerCase()
    // Remove emoji and non-word chars (keep letters, digits, spaces, hyphens)
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Derive URL path from file path relative to CONTENT_DIR.
 * e.g. "architecture.md"                    → "/guide/architecture/"
 *      "ultimate-guide/01-quick-start.md"   → "/guide/ultimate-guide/01-quick-start/"
 *      "workflows/agent-teams.md"           → "/guide/workflows/agent-teams/"
 */
function getPageUrl(relPath) {
  const withoutExt = relPath.replace(/\.md$/, '')
  // Normalize Windows separators
  const normalized = withoutExt.replace(/\\/g, '/')
  return `/guide/${normalized}/`
}

/**
 * Derive category label from relative file path.
 */
function getCategory(relPath) {
  const normalized = relPath.replace(/\\/g, '/')
  if (normalized.startsWith('ultimate-guide/')) return 'Ultimate Guide'
  if (normalized.startsWith('workflows/')) return 'Workflows'
  // Core guides — use a nice label based on filename
  const filename = normalized.replace(/\.md$/, '').replace(/-/g, ' ')
  return `Core Guides`
}

/**
 * Extract frontmatter title from markdown content.
 */
function extractFrontmatterTitle(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return ''
  const fm = match[1]
  const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  return titleMatch ? titleMatch[1].trim() : ''
}

/**
 * Strip markdown formatting from a text excerpt for keyword extraction.
 */
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')   // fenced code blocks
    .replace(/`[^`]+`/g, ' ')          // inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // links → text
    .replace(/!\[.*?\]\(.*?\)/g, ' ')  // images
    .replace(/^#{1,6}\s+/gm, ' ')      // heading markers
    .replace(/[|*_>#~]/g, ' ')         // markdown markers
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Parse a markdown file and extract H2 sections.
 * Returns array of { heading, contentExcerpt, fileTitle }
 */
function extractH2Sections(content) {
  const lines = content.split('\n')
  const fileTitle = extractFrontmatterTitle(content)

  const sections = []
  let inFrontmatter = false
  let frontmatterDone = false
  let fmLineCount = 0

  let currentHeading = null
  let currentLines = []

  for (const line of lines) {
    // Skip frontmatter
    if (!frontmatterDone) {
      if (line.trim() === '---') {
        fmLineCount++
        inFrontmatter = fmLineCount === 1
        if (fmLineCount === 2) frontmatterDone = true
        continue
      }
      if (inFrontmatter) continue
    }

    // Detect H2
    const h2Match = line.match(/^## (.+)$/)
    if (h2Match) {
      // Save previous section
      if (currentHeading !== null) {
        sections.push({
          heading: currentHeading,
          contentExcerpt: currentLines.join('\n'),
          fileTitle,
        })
      }
      currentHeading = h2Match[1].trim()
      currentLines = []
      continue
    }

    // Accumulate content (stop at next H2, already handled above)
    // Also stop after collecting enough for keywords (first 30 lines is plenty)
    if (currentHeading !== null && currentLines.length < 30) {
      currentLines.push(line)
    }
  }

  // Last section
  if (currentHeading !== null) {
    sections.push({
      heading: currentHeading,
      contentExcerpt: currentLines.join('\n'),
      fileTitle,
    })
  }

  return sections
}

/**
 * Build keyword string for a section entry.
 * Combines heading words + file title + first ~200 chars of section content.
 */
function buildKeywords(heading, fileTitle, contentExcerpt) {
  const headingWords = heading.replace(/[^\p{L}\p{N}\s]/gu, ' ').toLowerCase()
  const titleWords = fileTitle.replace(/[^\p{L}\p{N}\s]/gu, ' ').toLowerCase()
  const excerpt = stripMarkdown(contentExcerpt).slice(0, 150).toLowerCase()
  return `${headingWords} ${titleWords} ${excerpt}`.replace(/\s+/g, ' ').trim().slice(0, 200)
}

/**
 * Unique ID for an entry based on file slug + heading slug.
 */
function makeId(relPath, heading) {
  const fileSlug = relPath
    .replace(/\.md$/, '')
    .replace(/[/\\]/g, '-')
  const headingSlug = slugify(heading).slice(0, 50)
  return `gc-${fileSlug}-${headingSlug}`.replace(/-+/g, '-').replace(/^-|-$/g, '')
}

/**
 * Recursively list all .md files under a directory, returning paths relative to baseDir.
 */
function listMdFiles(dir, baseDir = dir) {
  if (!existsSync(dir)) return []
  const results = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      results.push(...listMdFiles(full, baseDir))
    } else if (entry.endsWith('.md') && entry !== 'index.md') {
      results.push(relative(baseDir, full))
    }
  }
  return results
}

function main() {
  if (!existsSync(CONTENT_DIR)) {
    console.warn(`[build-guide-content-index] WARNING: Content dir not found: ${CONTENT_DIR}`)
    console.warn('[build-guide-content-index] Generating empty guide-content-entries.ts')
    writeFileSync(OUT_PATH, generateTS([]), 'utf-8')
    return
  }

  const files = listMdFiles(CONTENT_DIR)
  const entries = []
  let fileCount = 0

  for (const relPath of files) {
    const fullPath = join(CONTENT_DIR, relPath)
    const content = readFileSync(fullPath, 'utf-8')
    const sections = extractH2Sections(content)
    const category = getCategory(relPath)
    const pageUrl = getPageUrl(relPath)

    for (const { heading, contentExcerpt, fileTitle } of sections) {
      // Skip boilerplate headings
      const headingLower = heading.trim().toLowerCase().replace(/^[^\p{L}]+/u, '').trim()
      if (SKIP_HEADINGS.has(headingLower)) continue

      const anchor = '#' + slugify(heading)
      const id = makeId(relPath, heading)
      const keywords = buildKeywords(heading, fileTitle, contentExcerpt)

      entries.push({
        id,
        title: heading,
        keywords,
        category,
        url: pageUrl + anchor,
        source: 'guide',
      })
    }

    fileCount++
  }

  console.log(`[build-guide-content-index] Parsed ${fileCount} files → ${entries.length} section entries`)
  writeFileSync(OUT_PATH, generateTS(entries), 'utf-8')
  console.log(`[build-guide-content-index] Written to ${OUT_PATH}`)
}

function generateTS(entries) {
  const json = JSON.stringify(entries, null, 2)
  return `// Auto-generated by scripts/build-guide-content-index.mjs
// Do not edit directly — run: pnpm build:search-content
// Generated: ${new Date().toISOString().slice(0, 10)}

export interface GuideContentEntry {
  id: string
  title: string
  keywords: string
  category: string
  url: string
  source: 'guide'
}

export const GUIDE_CONTENT_ENTRIES: GuideContentEntry[] = ${json}
`
}

main()
