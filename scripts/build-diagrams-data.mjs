/**
 * build-diagrams-data.mjs
 *
 * Parses guide/diagrams/*.md → renders SVG via mmdc → generates src/data/diagrams-data.ts
 *
 * Run: node scripts/build-diagrams-data.mjs
 * CI:  runs after 'git clone' of guide repo, before astro build
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { renderSVG, mmdcAvailable } from './lib/render-mermaid.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = resolve(ROOT, '../claude-code-ultimate-guide')
const DIAGRAMS_DIR = resolve(GUIDE_REPO, 'guide/diagrams')
const OUT_PATH = resolve(ROOT, 'src/data/diagrams-data.ts')

// Theme ordering + icons (matches VisualDiagrams.astro)
const THEME_META = {
  '01-foundations':            { icon: '🏗️',  id: 'foundations' },
  '02-context-and-sessions':   { icon: '🧠',  id: 'context-sessions' },
  '03-configuration-system':   { icon: '⚙️',  id: 'configuration' },
  '04-architecture-internals': { icon: '🔧',  id: 'architecture' },
  '05-mcp-ecosystem':          { icon: '🔌',  id: 'mcp' },
  '06-development-workflows':  { icon: '🔄',  id: 'workflows' },
  '07-multi-agent-patterns':   { icon: '🤖',  id: 'multi-agent' },
  '08-security-and-production':{ icon: '🛡️',  id: 'security' },
  '09-cost-and-optimization':  { icon: '💰',  id: 'cost' },
  '10-adoption-and-learning':  { icon: '📚',  id: 'adoption' },
}

// ─── Graceful stub if guide repo absent ──────────────────────────────────────
if (!existsSync(DIAGRAMS_DIR)) {
  console.warn(`[build-diagrams] WARNING: Diagrams dir not found at ${DIAGRAMS_DIR}`)
  console.warn('[build-diagrams] Generating empty stub...')
  writeStub()
  process.exit(0)
}

// ─── Parse helpers ────────────────────────────────────────────────────────────

/**
 * Parse YAML frontmatter from markdown content.
 * Returns { title, description } or defaults.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return { title: '', description: '' }

  const fm = match[1]
  const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  const descMatch = fm.match(/^description:\s*["']?(.+?)["']?\s*$/m)

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : '',
  }
}

/**
 * Extract diagram blocks from markdown content.
 * Each block = { title, description, mermaidCode, asciiFallback, sourceRef }
 */
function extractDiagramBlocks(content) {
  // Strip frontmatter
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')

  const blocks = []

  // Split on ### headings
  // Match: ### Title\n\nDescription paragraph\n\n```mermaid...```\n\n<details>...(optional)</details>\n\n> Source
  const sectionRegex = /### (.+?)\n\n([\s\S]*?)```mermaid\n([\s\S]*?)```([\s\S]*?)(?=\n---|\n### |$)/g

  let match
  while ((match = sectionRegex.exec(body)) !== null) {
    const title = match[1].trim()
    const description = match[2].trim()
    const mermaidCode = match[3].trim()
    const afterMermaid = match[4]

    // Extract ASCII fallback from <details> block
    let asciiFallback = ''
    const asciiMatch = afterMermaid.match(/<details>[\s\S]*?```\n([\s\S]*?)```\n[\s\S]*?<\/details>/)
    if (asciiMatch) {
      asciiFallback = asciiMatch[1].trim()
    }

    // Extract source ref from blockquote
    let sourceRef = ''
    const sourceMatch = afterMermaid.match(/>\s*\*\*Source\*\*:\s*(.+?)(?:\n|$)/)
    if (sourceMatch) {
      // Strip markdown links from source ref
      sourceRef = sourceMatch[1].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '')
    }

    blocks.push({ title, description, mermaidCode, asciiFallback, sourceRef })
  }

  return blocks
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('[build-diagrams] Starting diagram data generation...')
console.log(`[build-diagrams] Source: ${DIAGRAMS_DIR}`)
console.log(`[build-diagrams] mmdc available: ${mmdcAvailable}`)

const files = readdirSync(DIAGRAMS_DIR)
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .sort()

const themes = []
let totalDiagrams = 0
let totalSVGs = 0

for (const file of files) {
  const slug = file.replace('.md', '')
  const meta = THEME_META[slug]

  if (!meta) {
    console.warn(`[build-diagrams] Unknown theme slug: ${slug} — skipping`)
    continue
  }

  const filePath = resolve(DIAGRAMS_DIR, file)
  const content = readFileSync(filePath, 'utf-8')
  const { title, description } = parseFrontmatter(content)
  const blocks = extractDiagramBlocks(content)

  console.log(`[build-diagrams] ${slug}: ${blocks.length} diagrams found`)

  const diagrams = []
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const diagramId = `${slug}-${i}`
    const svg = renderSVG(block.mermaidCode, diagramId)

    if (svg) totalSVGs++
    totalDiagrams++

    diagrams.push({
      title: block.title,
      description: block.description,
      svg: svg ?? null,
      asciiFallback: block.asciiFallback,
      sourceRef: block.sourceRef,
    })
  }

  themes.push({
    id: meta.id,
    title: title.replace(/^Claude Code — /, '').replace(/ Diagrams$/, ''),
    description,
    icon: meta.icon,
    diagrams,
  })
}

console.log(`[build-diagrams] Total: ${totalDiagrams} diagrams, ${totalSVGs} SVGs rendered`)

// ─── Generate TypeScript output ───────────────────────────────────────────────

const tsContent = generateTS(themes)
writeFileSync(OUT_PATH, tsContent, 'utf-8')
console.log(`[build-diagrams] Written to ${OUT_PATH}`)

// ─── Report ───────────────────────────────────────────────────────────────────
console.log('')
console.log('[build-diagrams] ══════════════════════════════════')
console.log('[build-diagrams] Done! Summary:')
console.log(`[build-diagrams]   Themes          : ${themes.length}`)
console.log(`[build-diagrams]   Total diagrams  : ${totalDiagrams}`)
console.log(`[build-diagrams]   SVGs rendered   : ${totalSVGs}`)
console.log(`[build-diagrams]   ASCII fallback  : ${totalDiagrams - totalSVGs}`)
console.log('[build-diagrams] ══════════════════════════════════')

// ─── Helpers ──────────────────────────────────────────────────────────────────

function writeStub() {
  writeFileSync(OUT_PATH, generateTS([]), 'utf-8')
}

function generateTS(themes) {
  // Serialize themes to TS — SVG strings need special handling (raw string, no JSON escaping issues)
  const themesJson = JSON.stringify(themes, null, 2)

  return `// Auto-generated by scripts/build-diagrams-data.mjs
// Do not edit directly — run: node scripts/build-diagrams-data.mjs

export interface DiagramEntry {
  title: string
  description: string
  svg: string | null
  asciiFallback: string
  sourceRef: string
}

export interface DiagramTheme {
  id: string
  title: string
  description: string
  icon: string
  diagrams: DiagramEntry[]
}

export const DIAGRAM_THEMES: DiagramTheme[] = ${themesJson}
`
}
