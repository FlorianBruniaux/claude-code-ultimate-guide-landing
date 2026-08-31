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
const optionValue = (name) => {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}
const GUIDE_REPO = resolve(optionValue('--guide-root') ?? process.env.GUIDE_REPO_PATH ?? resolve(ROOT, '..', 'claude-code-ultimate-guide'))
const YAML_PATH = resolve(GUIDE_REPO, 'machine-readable/reference.yaml')
const OUT_PATH = resolve(optionValue('--out') ?? resolve(ROOT, 'src/data/guide-search-entries.ts'))
const GITHUB_BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/'
const LOCAL_GUIDE_BASE = '/guide/'

// Guide files that are accessible locally at /guide/SLUG/
// Files in guide/ directory (not ultimate-guide, not workflows)
const LOCAL_GUIDE_FILES = new Set([
  // Root-level guide files
  'guide/cheatsheet.md',
  'guide/cowork.md',
  // core/
  'guide/core/agent-harness.md',
  'guide/core/architecture.md',
  'guide/core/claude-code-releases.md',
  'guide/core/known-issues.md',
  'guide/core/loop-graph-engineering.md',
  'guide/core/methodologies.md',
  'guide/core/translations.md',
  'guide/core/visual-reference.md',
  // security/
  'guide/security/data-privacy.md',
  'guide/security/enterprise-governance.md',
  'guide/security/production-safety.md',
  'guide/security/sandbox-isolation.md',
  'guide/security/sandbox-native.md',
  'guide/security/security-hardening.md',
  // ecosystem/
  'guide/ecosystem/agent-harness-landscape.md',
  'guide/ecosystem/agentic-tools.md',
  'guide/ecosystem/ai-ecosystem.md',
  'guide/ecosystem/mcp-servers-ecosystem.md',
  'guide/ecosystem/practitioner-insights.md',
  'guide/ecosystem/remarkable-ai.md',
  'guide/ecosystem/third-party-tools.md',
  // roles/
  'guide/roles/adoption-approaches.md',
  'guide/roles/agent-evaluation.md',
  'guide/roles/ai-roles.md',
  'guide/roles/learning-with-ai.md',
  // ops/
  'guide/ops/ai-traceability.md',
  'guide/ops/devops-sre.md',
  'guide/ops/observability.md',
  'guide/ops/team-metrics.md',
])

// Three of the files above resolve to a basename-derived URL that is only a
// client-side redirect stub, not the real page ("cannibalization fix" entries
// in astro.config.mjs's `redirects` map). Verified against the actual
// `pnpm build` output by grepping `dist/guide/<slug>/index.html` for
// "Redirecting to:". Kept as an explicit override rather than parsing
// astro.config.mjs at build time (a live ESM config with functions, not
// static data), and this only needs to track 3 known moves.
//
// All three real destinations are hand-authored landing pages (src/pages/ecosystem/,
// src/pages/releases/, ClaudeEcosystem.astro and similar), not a render of the guide
// markdown at all. No guide heading slug exists on any of them: grepping each built
// page for its ids turns up only UI chrome (dropdowns, theme toggle) plus, for
// /releases/, its own version-number ids (v2-1-220), unrelated to the guide's
// heading slugs. Keeping the guide's anchor on any of these would silently produce
// a dead in-page fragment on a page that DOES load, the quietest kind of broken
// link, so the anchor is dropped for all three.
const LOCAL_GUIDE_REDIRECT_TARGETS = {
  'guide/ecosystem/ai-ecosystem.md': '/ecosystem/',
  'guide/roles/ai-roles.md': '/roles/',
  'guide/core/claude-code-releases.md': '/releases/',
}


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
    console.error(`[build-guide-index] ERROR: Could not read ${YAML_PATH}`)
    process.exitCode = 1
    return
  }

  let parsed
  try {
    parsed = yaml.load(raw)
  } catch (err) {
    console.error(`[build-guide-index] ERROR: Failed to parse YAML: ${err.message}`)
    process.exitCode = 1
    return
  }

  const deepDive = parsed?.deep_dive
  if (!deepDive || typeof deepDive !== 'object') {
    console.error('[build-guide-index] ERROR: No deep_dive section found in YAML')
    process.exitCode = 1
    return
  }

  const entriesByUrl = new Map()

  for (const [key, value] of Object.entries(deepDive)) {
    // Only keep string values that are actual file paths starting with a known directory
    // Exclude: external URLs (https://), description strings, numbers, arrays, objects
    if (typeof value !== 'string') continue
    if (value.startsWith('http://') || value.startsWith('https://')) continue
    const PATH_PREFIXES = ['guide/', 'examples/', 'machine-readable/', 'whitepapers/']
    if (!PATH_PREFIXES.some(prefix => value.startsWith(prefix))) continue

    const cleanPath = stripLineNumber(value)

    const id = `guide-${key.replace(/_/g, '-')}`
    const title = humanize(key)
    const category = getCategory(cleanPath)

    // Use local /guide/ URL if the file is served locally, else fall back to GitHub.
    // NOTE: guide files in subdirs (guide/core/arch.md) are served flat at /guide/arch/.
    //
    // The anchor is kept, not stripped, for locally-served files. It used to be
    // dropped on the claim that reference.yaml's GitHub-format anchors ("2-the-tool-arsenal")
    // don't match what Starlight renders. Verified false: @astrojs/markdown-remark stamps
    // heading ids via the github-slugger package, the exact same one GitHub itself uses, so
    // the ids match. Dropping the anchor instead collapsed every deep_dive key pointing into
    // one file down to a single "page top" entry: 698 entries resolved to only 464 distinct
    // URLs, 234 of them redundant (agent-teams.md alone had 22 entries all linking to the
    // same page top). Keeping the anchor turns those into genuinely distinct deep links.
    const filePathOnly = cleanPath.split('#')[0]
    const anchor = cleanPath.includes('#') ? cleanPath.slice(cleanPath.indexOf('#')) : ''
    let url
    if (LOCAL_GUIDE_REDIRECT_TARGETS[filePathOnly]) {
      url = LOCAL_GUIDE_REDIRECT_TARGETS[filePathOnly]
    } else if (LOCAL_GUIDE_FILES.has(filePathOnly)) {
      // Extract basename only — all guide files served flat at /guide/<slug>/
      const basename = filePathOnly.split('/').pop().replace(/\.md$/, '')
      url = `${LOCAL_GUIDE_BASE}${basename}/${anchor}`
    } else if (filePathOnly.startsWith('guide/workflows/') && filePathOnly.endsWith('.md')) {
      const slug = filePathOnly.replace(/^guide\//, '').replace(/\.md$/, '')
      url = `${LOCAL_GUIDE_BASE}${slug}/${anchor}`
    } else {
      url = `${GITHUB_BASE}${cleanPath}`
    }

    const keywords = extractKeywords(key, cleanPath)

    // Two deep_dive keys can still legitimately resolve to the exact same URL (a bare
    // ultimate-guide.md line ref pointing at the same paragraph as an anchored one, or two
    // aliases for the same section). Merge their keywords into one entry rather than keep
    // both — search should surface one result per real destination, findable under every
    // key that named it.
    const existing = entriesByUrl.get(url)
    if (existing) {
      existing.keywords = `${existing.keywords} ${keywords}`.trim()
    } else {
      entriesByUrl.set(url, { id, title, keywords, category, url, source: 'guide' })
    }
  }

  const entries = [...entriesByUrl.values()]

  console.log(`[build-guide-index] Generated ${entries.length} guide entries`)

  const content = generateTS(entries)
  writeFileSync(OUT_PATH, content, 'utf-8')
  console.log(`[build-guide-index] Written to ${OUT_PATH}`)
}

function generateTS(entries) {
  const json = JSON.stringify(entries, null, 2)
  return `// Auto-generated by scripts/build-guide-index.mjs
// Do not edit directly, run: pnpm build:search

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
