/**
 * Build script: Parse reference.yaml → generate src/data/guide-search-entries.ts
 * Run: node scripts/build-guide-index.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = '/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide'
const YAML_PATH = resolve(GUIDE_REPO, 'machine-readable/reference.yaml')
const OUT_PATH = resolve(ROOT, 'src/data/guide-search-entries.ts')
const GITHUB_BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/'
const LOCAL_GUIDE_BASE = '/guide/'

// Guide files that are accessible locally at /guide/SLUG/
// Files in guide/ directory (not ultimate-guide, not workflows)
const LOCAL_GUIDE_FILES = new Set([
  'guide/adoption-approaches.md',
  'guide/agent-evaluation.md',
  'guide/ai-ecosystem.md',
  'guide/ai-traceability.md',
  'guide/architecture.md',
  'guide/cheatsheet.md',
  'guide/claude-code-releases.md',
  'guide/cowork.md',
  'guide/data-privacy.md',
  'guide/devops-sre.md',
  'guide/known-issues.md',
  'guide/learning-with-ai.md',
  'guide/mcp-servers-ecosystem.md',
  'guide/methodologies.md',
  'guide/observability.md',
  'guide/production-safety.md',
  'guide/sandbox-isolation.md',
  'guide/sandbox-native.md',
  'guide/search-tools-cheatsheet.md',
  'guide/security-hardening.md',
  'guide/third-party-tools.md',
  'guide/visual-reference.md',
])

/**
 * Convert snake_case key to Title Case human label
 * e.g. mcp_secrets_management → "MCP Secrets Management"
 */
function humanize(key) {
  const acronyms = new Set(['mcp', 'api', 'ci', 'cd', 'cli', 'pr', 'url', 'id', 'ai', 'cve', 'llm', 'tdd', 'bdd', 'owasp', 'iam', 'aws', 'gcp', 'sdk', 'lsp', 'vsc', 'vscode', 'rtk', 'rag'])
  return key
    .split('_')
    .map(word => acronyms.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Derive category from the file path
 * e.g. "guide/workflows/foo.md" → "Guide > Workflows"
 *      "examples/hooks/bar.sh" → "Examples > Hooks"
 */
function getCategory(path) {
  const parts = path.split('/')
  if (parts.length === 0) return 'Reference'

  const top = parts[0]
  const sub = parts.length > 2 ? parts[1] : null

  if (top === 'guide') {
    if (sub === 'workflows') return 'Guide > Workflows'
    if (sub === 'architecture') return 'Guide > Architecture'
    if (sub === 'adoption') return 'Guide > Adoption'
    return 'Guide'
  }
  if (top === 'examples') {
    if (sub === 'hooks') return 'Examples > Hooks'
    if (sub === 'commands') return 'Examples > Commands'
    if (sub === 'agents') return 'Examples > Agents'
    if (sub === 'skills') return 'Examples > Skills'
    if (sub === 'rules') return 'Examples > Rules'
    return 'Examples'
  }
  if (top === 'machine-readable') return 'Reference'
  return 'Guide'
}

/**
 * Extract keywords from path segments and key segments
 */
function extractKeywords(key, path) {
  const keyWords = key.split('_').join(' ')
  const pathWords = path.split(/[/_.-]/).filter(w => w.length > 2 && !['md', 'sh', 'yaml', 'json', 'ts', 'js', 'mjs'].includes(w)).join(' ')
  return `${keyWords} ${pathWords}`.toLowerCase().trim()
}

/**
 * Strip :lineNumber suffix from a path
 * e.g. "guide/architecture.md:272" → "guide/architecture.md"
 */
function stripLineNumber(path) {
  return path.replace(/:\d+$/, '')
}

function main() {
  // Try to read reference.yaml
  let raw
  try {
    raw = readFileSync(YAML_PATH, 'utf-8')
  } catch (err) {
    console.warn(`[build-guide-index] WARNING: Could not read ${YAML_PATH}`)
    console.warn(`[build-guide-index] Generating empty guide-search-entries.ts`)
    writeEmpty()
    return
  }

  let parsed
  try {
    parsed = yaml.load(raw)
  } catch (err) {
    console.error(`[build-guide-index] ERROR: Failed to parse YAML: ${err.message}`)
    writeEmpty()
    return
  }

  const deepDive = parsed?.deep_dive
  if (!deepDive || typeof deepDive !== 'object') {
    console.warn('[build-guide-index] WARNING: No deep_dive section found in YAML')
    writeEmpty()
    return
  }

  const entries = []
  const seen = new Set()

  for (const [key, value] of Object.entries(deepDive)) {
    // Only keep string values that are file paths (contain '/' or '.md')
    // Exclude: external URLs (https://), numbers, arrays, objects
    if (typeof value !== 'string') continue
    if (value.startsWith('http://') || value.startsWith('https://')) continue
    if (!value.includes('/') && !value.includes('.md') && !value.includes('.yaml')) continue

    const cleanPath = stripLineNumber(value)

    // Deduplicate by path
    if (seen.has(cleanPath)) continue
    seen.add(cleanPath)

    const id = `guide-${key.replace(/_/g, '-')}`
    const title = humanize(key)
    const category = getCategory(cleanPath)

    // Use local /guide/ URL if the file is served locally, else fall back to GitHub
    let url
    if (LOCAL_GUIDE_FILES.has(cleanPath)) {
      const slug = cleanPath.replace(/^guide\//, '').replace(/\.md$/, '')
      url = `${LOCAL_GUIDE_BASE}${slug}/`
    } else if (cleanPath.startsWith('guide/workflows/') && cleanPath.endsWith('.md')) {
      const slug = cleanPath.replace(/^guide\//, '').replace(/\.md$/, '')
      url = `${LOCAL_GUIDE_BASE}${slug}/`
    } else {
      url = `${GITHUB_BASE}${cleanPath}`
    }

    const keywords = extractKeywords(key, cleanPath)

    entries.push({ id, title, keywords, category, url, source: 'guide' })
  }

  console.log(`[build-guide-index] Generated ${entries.length} guide entries`)

  const content = generateTS(entries)
  writeFileSync(OUT_PATH, content, 'utf-8')
  console.log(`[build-guide-index] Written to ${OUT_PATH}`)
}

function writeEmpty() {
  writeFileSync(OUT_PATH, generateTS([]), 'utf-8')
}

function generateTS(entries) {
  const json = JSON.stringify(entries, null, 2)
  return `// Auto-generated by scripts/build-guide-index.mjs
// Do not edit directly — run: pnpm build:search

export interface GuideSearchEntry {
  id: string
  title: string
  keywords: string
  category: string
  url: string
  source: 'guide'
}

export const GUIDE_ENTRIES: GuideSearchEntry[] = ${json}
`
}

main()
