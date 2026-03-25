/**
 * prepare-guide-content.mjs
 *
 * Prepares guide content for Starlight:
 *   1. Copies guide/*.md → src/content/docs/guide/
 *   2. Copies guide/workflows/*.md → src/content/docs/guide/workflows/
 *   3. Splits ultimate-guide.md by chapter → src/content/docs/guide/ultimate-guide/
 *   4. Copies guide/images/* → public/guide/images/
 *   5. Generates src/data/guide-anchor-map.json for link rewriting
 *
 * Run: node scripts/prepare-guide-content.mjs
 * CI:  runs after 'git clone' of guide repo
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, readdirSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { renderSVG, mmdcAvailable } from './lib/render-mermaid.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// Clear Astro's content layer data store so stale entries don't cause
// duplicate ID warnings after guide files are regenerated.
const DATA_STORE = resolve(ROOT, '.astro/data-store.json')
if (existsSync(DATA_STORE)) {
  rmSync(DATA_STORE)
}
const GUIDE_REPO = resolve(ROOT, '../claude-code-ultimate-guide')
const GUIDE_DIR = resolve(GUIDE_REPO, 'guide')

// Graceful fail if guide repo absent
if (!existsSync(GUIDE_DIR)) {
  console.warn(`[prepare-guide] WARNING: Guide repo not found at ${GUIDE_DIR}`)
  console.warn(`[prepare-guide] Skipping — expected path: ${GUIDE_DIR}`)
  console.warn(`[prepare-guide] In CI, ensure guide repo is cloned before running this script.`)
  // Create stub so Starlight can still build (empty guide section)
  const stubDir = resolve(ROOT, 'src/content/docs/guide/ultimate-guide')
  mkdirSync(stubDir, { recursive: true })
  writeFileSync(
    resolve(ROOT, 'src/content/docs/guide/index.md'),
    '---\ntitle: "Guide"\ndescription: "Guide content not available in this build."\n---\n\nGuide content is generated during CI from the [guide repository](https://github.com/FlorianBruniaux/claude-code-ultimate-guide).\n',
    'utf-8'
  )
  writeFileSync(resolve(ROOT, 'src/data/guide-anchor-map.json'), '{}', 'utf-8')
  process.exit(0)
}

// --- Paths ---
const OUT_GUIDE = resolve(ROOT, 'src/content/docs/guide')
const OUT_ULTIMATE = resolve(ROOT, 'src/content/docs/guide/ultimate-guide')
const OUT_WORKFLOWS = resolve(ROOT, 'src/content/docs/guide/workflows')
const OUT_IMAGES = resolve(ROOT, 'public/guide/images')
const ANCHOR_MAP_PATH = resolve(ROOT, 'src/data/guide-anchor-map.json')

// --- Chapter definitions ---
const CHAPTERS = [
  { num: 0,  slug: '00-introduction',      title: 'Introduction',           order: 0,  desc: 'Overview, TL;DR, and full table of contents for the Claude Code Ultimate Guide.' },
  { num: 1,  slug: '01-quick-start',       title: '1. Quick Start',         order: 1,  desc: 'Install Claude Code and complete your first AI-assisted task in 15 minutes. Essential slash commands, permission modes, context management basics, and 8 beginner mistakes to avoid.' },
  { num: 2,  slug: '02-core-workflow',     title: '2. Core Workflow',       order: 2,  desc: 'Master the Claude Code workflow: context window zones (50/70/90%), Plan Mode for safe exploration, WHAT/WHERE/HOW/VERIFY prompting formula, Rewind to undo changes, and trust calibration.' },
  { num: 3,  slug: '03-memory-files',      title: '3. Memory & Files',      order: 3,  desc: 'Configure CLAUDE.md project memory files and .claude/ folder structure. Settings hierarchy, permissions, hooks config, personal vs team settings — give Claude persistent project context.' },
  { num: 4,  slug: '04-agents',            title: '4. Agents',              order: 4,  desc: 'Create custom Claude Code agents: backend-architect, code-reviewer, security-auditor, devops-sre. Tool SEO for routing, sub-agent orchestration, and multi-agent coordination with TeamCreate.' },
  { num: 5,  slug: '05-skills',            title: '5. Skills',              order: 5,  desc: 'Build reusable Claude Code skills: Capability Uplift vs Encoded Preference. Skills 2.0 with Benchmark Mode, A/B testing, Trigger Tuning, lifecycle management, and 17 production templates.' },
  { num: 6,  slug: '06-commands',          title: '6. Slash Commands',      order: 6,  desc: 'Create custom slash commands for Claude Code: /pr, /commit, /generate-tests, /diagnose, /git-worktree. Variable interpolation with $ARGUMENTS syntax and 19 production-ready command templates.' },
  { num: 7,  slug: '07-hooks',             title: '7. Hooks',               order: 7,  desc: 'Automate Claude Code with event hooks: block dangerous commands, scan for secrets, auto-format code, run tests after edits. PreToolUse, PostToolUse, UserPromptSubmit — Bash and PowerShell.' },
  { num: 8,  slug: '08-mcp',              title: '8. MCP Servers',         order: 8,  desc: 'Extend Claude Code with MCP servers: Serena (codebase indexation + memory), Context7 (library docs), grepai (semantic search), Playwright (browser automation), Postgres. Config and security vetting.' },
  { num: 9,  slug: '09-advanced-patterns', title: '9. Advanced Patterns',   order: 9,  desc: 'Advanced Claude Code patterns: Trinity workflow (Plan+Thinking+MCP), GitHub Actions CI/CD, multi-agent Teams API, Tasks API for cross-session state, git worktree isolation, feedback loops.' },
  { num: 10, slug: '10-reference',         title: '10. Reference',          order: 10, desc: 'Complete Claude Code reference: 45+ CLI flags, keyboard shortcuts, /compact context management, CLAUDE.md starter templates, troubleshooting guide, and cost optimization by model.' },
  { num: 11, slug: '11-ai-ecosystem',      title: '11. AI Ecosystem',       order: 11, desc: 'Claude Code in the broader AI ecosystem: complementary tools, model comparisons, multi-provider setups, and community resources.' },
  { num: 12, slug: '12-appendices',        title: 'Appendices',             order: 12, desc: 'Claude Code appendices: file locations reference, FAQ, resource evaluations, myths vs reality, and glossary.' },
]

const CHAPTER_BY_NUM = new Map(CHAPTERS.map(c => [c.num, c]))

// --- Helpers ---

/**
 * Convert heading text to GitHub/Astro-compatible anchor.
 * Matches rehype-slug behavior used by Starlight.
 */
function toAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\](){}|\\]/g, '')  // strip markdown formatting
    .replace(/[^\w\s-]/g, '')           // keep alphanumeric, _, space, hyphen
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Detect if this H2 line starts a new chapter.
 * Returns the chapter number, or null if no chapter boundary.
 * Only called when NOT inside a code fence.
 */
function detectChapterBoundary(line, currentChapter) {
  // ## N.M — numbered section (e.g., ## 1.1 Installation)
  const numMatch = line.match(/^## (\d+)\./)
  if (numMatch) return parseInt(numMatch[1], 10)

  // ## 📌 Section N — section TL;DR
  const tldrMatch = line.match(/^## 📌 Section (\d+)/)
  if (tldrMatch) return parseInt(tldrMatch[1], 10)

  // ## A.1, A.2 ... — appendix templates (keep in Reference ch10)
  if (currentChapter >= 9 && /^## [A-G]\.\d+/.test(line)) return 10

  // ## Appendix X: — named appendix sections → ch12
  if (/^## Appendix [A-Z]:/.test(line)) return 12

  // ## About This Guide → ch12
  if (/^## About\b/.test(line)) return 12

  return null
}

/**
 * Transform frontmatter: remove tags, add sidebar.order.
 * Supports both inline (tags: [...]) and block (tags:\n  - ...) YAML forms.
 */
function addStarlightFm(content, meta) {
  const sidebarYaml = `sidebar:\n  order: ${meta.order}`
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---/

  const match = content.match(fmRegex)
  if (!match) {
    // No frontmatter — prepend new one
    return `---\ntitle: "${meta.title}"\ndescription: "${meta.desc}"\n${sidebarYaml}\n---\n\n${content.trimStart()}`
  }

  let fm = match[1]
  // Remove tags: field (inline form: "tags: [...]")
  fm = fm.replace(/^tags:.*\n?/m, '')
  // Remove tags: block form (tags:\n followed by indented items)
  fm = fm.replace(/^tags:\n([ \t]+-[^\n]*\n)*/m, '')
  fm = fm.trim()
  if (fm) fm += '\n'
  fm += sidebarYaml

  return content.replace(fmRegex, `---\n${fm}\n---`)
}

/**
 * Normalize code fence language identifiers to ones Shiki/Expressive Code knows.
 * Runs on the full file content, only touches the opening fence line.
 */
function normalizeLangs(content) {
  return content.replace(/^(```|~~~)(\S+)/gm, (match, fence, lang) => {
    const normalized = {
      'gitignore': 'bash',
      'C':         'c',
      'C++':       'cpp',
      'Dockerfile': 'docker',
    }[lang] ?? (lang.startsWith('[') ? '' : lang.toLowerCase() === lang ? lang : lang.toLowerCase())
    return `${fence}${normalized}`
  })
}

/**
 * Rewrite bare anchor links that point to a different chapter.
 *
 * Replaces `[text](#anchor)` with `[text](/guide/{targetSlug}/#anchor)`
 * when anchorMap[anchor] exists and differs from currentSlug.
 *
 * @param {string} content - Markdown content to process
 * @param {string|null} currentSlug - e.g. 'ultimate-guide/00-introduction' (null = no same-chapter protection)
 * @param {object} anchorMap - anchor → chapter slug mapping
 * @returns {string} - processed content
 */
function rewriteCrossChapterAnchors(content, currentSlug, anchorMap) {
  // Match markdown links with bare anchors: [text](#anchor)
  // Skip anchors inside code fences by only replacing outside of them.
  return content.replace(/\[([^\]]*)\]\(#([^)]+)\)/g, (match, text, anchor) => {
    const targetSlug = anchorMap[anchor]
    if (targetSlug && targetSlug !== currentSlug) {
      return `[${text}](/guide/${targetSlug}/#${anchor})`
    }
    return match
  })
}

/**
 * Replace ```mermaid blocks with pre-rendered SVG HTML.
 * Renders two SVGs per block: neutral (light) and dark theme.
 * Falls back to original code block if mmdc unavailable or fails.
 *
 * @param {string} content - Markdown content
 * @param {string} fileSlug - Unique file slug for diagram IDs (e.g. 'ai-ecosystem')
 * @returns {string} - Content with mermaid blocks replaced by SVG HTML
 */
function renderMermaidBlocks(content, fileSlug) {
  if (!mmdcAvailable) return content

  let blockIndex = 0
  return content.replace(/^```mermaid\n([\s\S]*?)^```/gm, (match, code) => {
    const id = `${fileSlug}-${blockIndex++}`
    const lightSvg = renderSVG(code.trim(), `${id}-light`, 'neutral')
    const darkSvg  = renderSVG(code.trim(), `${id}-dark`,  'dark')

    if (!lightSvg && !darkSvg) return match

    return `<div class="mermaid-diagram">
<div class="mermaid-light">${lightSvg ?? ''}</div>
<div class="mermaid-dark">${darkSvg ?? ''}</div>
</div>`
  })
}

// --- Directory helpers ---
function ensureDir(dir) {
  mkdirSync(dir, { recursive: true })
}

function cleanAndCreate(dir) {
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
}

// =====================================================================
// Main
// =====================================================================

console.log('[prepare-guide] Starting guide content preparation...')
console.log(`[prepare-guide] Source: ${GUIDE_DIR}`)
console.log(`[prepare-guide] Output: ${OUT_GUIDE}`)

// Clean output directories
cleanAndCreate(OUT_GUIDE)
ensureDir(OUT_IMAGES)

const stats = { files: 0, chapters: 0, workflows: 0, images: 0 }
const anchorMap = {}  // anchor slug → 'ultimate-guide/chapter-slug'

// -----------------------------------------------------------------------
// 1. Regular guide files (all .md except ultimate-guide, README, .bak)
// -----------------------------------------------------------------------
const SKIP_FILES = new Set(['ultimate-guide.md', 'ultimate-guide.md.bak', 'README.md'])
// Subdirectories that contain guide files (served flat at /guide/slug/)
const GUIDE_SUBDIRS = ['core', 'security', 'ecosystem', 'roles', 'ops']

// Collect guide files: root-level + known subdirectories (written flat to OUT_GUIDE)
const guideFileSources = []
// Root-level guide files
readdirSync(GUIDE_DIR)
  .filter(f => f.endsWith('.md') && !SKIP_FILES.has(f) && !f.endsWith('.bak'))
  .sort()
  .forEach(f => guideFileSources.push({ file: f, srcDir: GUIDE_DIR }))
// Subdirectory guide files
for (const sub of GUIDE_SUBDIRS) {
  const subDir = resolve(GUIDE_DIR, sub)
  if (!existsSync(subDir)) continue
  readdirSync(subDir)
    .filter(f => f.endsWith('.md') && !f.endsWith('.bak'))
    .sort()
    .forEach(f => guideFileSources.push({ file: f, srcDir: subDir }))
}

// Buffer guide file content — anchors will be rewritten after anchorMap is built (step 3)
const guideFileBuffer = []

for (let i = 0; i < guideFileSources.length; i++) {
  const { file, srcDir } = guideFileSources[i]
  const src = resolve(srcDir, file)
  let content = readFileSync(src, 'utf-8')

  // Extract existing title/desc for fallback
  const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)
    || content.match(/^# (.+)/m)
  const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')

  const descMatch = content.match(/^description:\s*["']?(.+?)["']?\s*$/m)
  const desc = descMatch ? descMatch[1].trim() : ''

  // order: 100 + index (keeps all guide files after ultimate-guide chapters in sidebar)
  content = addStarlightFm(content, { title, desc, order: 100 + i })
  content = normalizeLangs(content)

  guideFileBuffer.push({ file, content })
  stats.files++
}

console.log(`[prepare-guide] ✓ Regular guide files: ${stats.files}`)

// -----------------------------------------------------------------------
// 2. Workflow files
// -----------------------------------------------------------------------
const WORKFLOWS_DIR = resolve(GUIDE_DIR, 'workflows')

if (existsSync(WORKFLOWS_DIR)) {
  ensureDir(OUT_WORKFLOWS)

  const workflowFiles = readdirSync(WORKFLOWS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .sort()

  // Buffer workflow content — anchors will be rewritten after anchorMap is built (step 3)
  for (let i = 0; i < workflowFiles.length; i++) {
    const file = workflowFiles[i]
    const src = resolve(WORKFLOWS_DIR, file)
    let content = readFileSync(src, 'utf-8')

    const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)
      || content.match(/^# (.+)/m)
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')

    const descMatch = content.match(/^description:\s*["']?(.+?)["']?\s*$/m)
    const desc = descMatch ? descMatch[1].trim() : ''

    content = addStarlightFm(content, { title, desc, order: 200 + i })
    content = normalizeLangs(content)

    guideFileBuffer.push({ file: `workflows/${file}`, content, isWorkflow: true })
    stats.workflows++
  }

  console.log(`[prepare-guide] ✓ Workflow files: ${stats.workflows}`)
}

// -----------------------------------------------------------------------
// 3. Split ultimate-guide.md by chapter
// -----------------------------------------------------------------------
const ULTIMATE_SRC = resolve(GUIDE_DIR, 'ultimate-guide.md')
const ultimateRaw = readFileSync(ULTIMATE_SRC, 'utf-8')

// Strip original frontmatter
let ultimateBody = ultimateRaw
const fmEnd = ultimateRaw.indexOf('\n---', 3)
if (ultimateRaw.startsWith('---') && fmEnd !== -1) {
  ultimateBody = ultimateRaw.slice(fmEnd + 4).trimStart()
}

const lines = ultimateBody.split('\n')

// Initialize chapter accumulators
const chapterLines = new Map()
CHAPTERS.forEach(c => chapterLines.set(c.num, []))

let currentChapter = 0
let inCodeFence = false
let fenceMarker = ''

for (const line of lines) {
  // -- Code fence tracking --
  // A fence opens/closes when a line starts with 3+ backticks or tildes.
  // Opening fence may have a language identifier (e.g., ```bash).
  // Closing fence must be ONLY fence characters (e.g., ```) — no language tag.
  const trimLine = line.trim()
  const fenceMatch = trimLine.match(/^(`{3,}|~{3,})/)
  if (fenceMatch) {
    const fenceType = fenceMatch[1][0]       // '`' or '~'
    const fenceLen  = fenceMatch[1].length   // number of backtick/tilde chars

    if (!inCodeFence) {
      // Opening fence
      inCodeFence = true
      fenceMarker = fenceMatch[1]
    } else {
      // Potential closing fence: same fence type, only fence chars, length >= opener
      const isClosingFence =
        trimLine[0] === fenceMarker[0] &&          // same char type
        fenceLen >= fenceMarker.length &&           // at least as many chars
        /^[`~]+$/.test(trimLine)                   // ONLY fence chars (no language tag)
      if (isClosingFence) {
        inCodeFence = false
        fenceMarker = ''
      }
    }
  }

  // -- Chapter detection & anchor map (outside code fences only) --
  if (!inCodeFence && line.startsWith('#')) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const headingText = headingMatch[2].trim()

      // Chapter boundary detection only for H2
      if (level === 2) {
        const newChapter = detectChapterBoundary(line, currentChapter)
        if (newChapter !== null && CHAPTER_BY_NUM.has(newChapter)) {
          currentChapter = newChapter
        }
      }

      // Build anchor map for ALL heading levels
      const anchor = toAnchor(headingText)
      if (anchor) {
        const meta = CHAPTER_BY_NUM.get(currentChapter)
        if (meta && !anchorMap[anchor]) {
          // First occurrence wins (handles duplicate headings across chapters)
          anchorMap[anchor] = `ultimate-guide/${meta.slug}`
        }
      }
    }
  }

  // Accumulate line in current chapter
  const chLines = chapterLines.get(currentChapter)
  if (chLines) chLines.push(line)
}

// Write chapter files
ensureDir(OUT_ULTIMATE)

for (const { num, slug, title, desc, order } of CHAPTERS) {
  let content = chapterLines.get(num)?.join('\n') ?? ''
  // Skip nearly-empty chapters (fewer than 5 non-blank lines)
  const nonBlank = content.split('\n').filter(l => l.trim()).length
  if (nonBlank < 5) continue

  // Rewrite cross-chapter bare anchors before writing
  const currentSlug = `ultimate-guide/${slug}`
  content = rewriteCrossChapterAnchors(content, currentSlug, anchorMap)

  const fm = `---\ntitle: "${title}"\ndescription: "${desc}"\nsidebar:\n  order: ${order}\n---`
  let output = normalizeLangs(`${fm}\n\n${content.trimStart()}`)
  output = renderMermaidBlocks(output, slug)

  writeFileSync(resolve(OUT_ULTIMATE, `${slug}.md`), output, 'utf-8')
  stats.chapters++
}

console.log(`[prepare-guide] ✓ Ultimate Guide chapters: ${stats.chapters}`)

// -----------------------------------------------------------------------
// 3b. Flush buffered guide/workflow files now that anchorMap is complete
// -----------------------------------------------------------------------
for (const { file, content: rawContent, isWorkflow } of guideFileBuffer) {
  let rewritten = rewriteCrossChapterAnchors(rawContent, null, anchorMap)
  const fileSlug = file.replace(/\.md$/, '').replace(/\//g, '-')
  rewritten = renderMermaidBlocks(rewritten, fileSlug)
  const outPath = isWorkflow
    ? resolve(OUT_WORKFLOWS, file.replace('workflows/', ''))
    : resolve(OUT_GUIDE, file)
  writeFileSync(outPath, rewritten, 'utf-8')
}

// Generate the /guide/ landing index page
const guideIndexContent = `---
title: "Claude Code Guide"
description: "Comprehensive documentation for Claude Code — from quick start to advanced patterns, workflows, MCP servers, and more."
sidebar:
  order: -1
template: splash
hero:
  tagline: Everything you need to master Claude Code — from zero to power user.
  actions:
    - text: Start with Quick Start
      link: /guide/ultimate-guide/01-quick-start/
      icon: right-arrow
      variant: primary
    - text: Cheatsheet
      link: /guide/cheatsheet/
      icon: open-book
---

## Core Reference

| Guide | Description | Time |
|-------|-------------|------|
| [Ultimate Guide](/guide/ultimate-guide/) | Complete reference — 22K+ lines covering everything | ~3 hours |
| [Cheatsheet](/guide/cheatsheet/) | 1-page printable quick reference | 5 min |
| [Architecture](/guide/architecture/) | How Claude Code works internally | 25 min |
| [Methodologies](/guide/methodologies/) | 15 dev methodologies (TDD, SDD, BDD...) | 20 min |
| [Visual Reference](/guide/visual-reference/) | ASCII diagrams for key concepts | 5 min |
| [Claude Code Releases](/guide/claude-code-releases/) | Official release history (condensed) | 10 min |
| [Known Issues](/guide/known-issues/) | Critical bugs tracker | 15 min |

## Security

| Guide | Description | Time |
|-------|-------------|------|
| [Security Hardening](/guide/security-hardening/) | Threats, MCP vetting, injection defense | 25 min |
| [Sandbox Isolation](/guide/sandbox-isolation/) | Docker sandboxes, cloud alternatives | 10 min |
| [Native Sandbox](/guide/sandbox-native/) | Native Claude Code sandbox | 10 min |
| [Production Safety](/guide/production-safety/) | Guardrails, review gates, rollback | 15 min |
| [Data Privacy](/guide/data-privacy/) | Data retention and privacy | 10 min |
| [Enterprise Governance](/guide/enterprise-governance/) | **Org-level governance**: usage charters, MCP approval workflow, guardrail tiers (Starter/Standard/Strict/Regulated), compliance | 25 min |

## Ecosystem

| Guide | Description | Time |
|-------|-------------|------|
| [AI Ecosystem](/guide/ai-ecosystem/) | Perplexity, Gemini, Kimi, NotebookLM, TTS | 30 min |
| [MCP Servers Ecosystem](/guide/mcp-servers-ecosystem/) | 8 validated community MCP servers | 25 min |
| [Third-Party Tools](/guide/third-party-tools/) | GUIs, TUIs, config managers, token trackers | 15 min |
| [Remarkable AI](/guide/remarkable-ai/) | Power-user patterns | 10 min |

## Roles & Adoption

| Guide | Description | Time |
|-------|-------------|------|
| [AI Roles](/guide/ai-roles/) | When to use CC vs Desktop vs API | 10 min |
| [Adoption Approaches](/guide/adoption-approaches/) | Team rollout strategies | 15 min |
| [Learning with AI](/guide/learning-with-ai/) | For juniors using AI without losing skills | 15 min |
| [Agent Evaluation](/guide/agent-evaluation/) | Agent quality metrics & feedback loops | 20 min |

## Operations

| Guide | Description | Time |
|-------|-------------|------|
| [DevOps & SRE](/guide/devops-sre/) | FIRE framework for infra diagnosis | 30 min |
| [Observability](/guide/observability/) | Session monitoring, cost tracking | 15 min |
| [AI Traceability](/guide/ai-traceability/) | Attribution, disclosure policies, compliance | 20 min |

## Workflows

| Workflow | Description |
|----------|-------------|
| [TDD with Claude](/guide/workflows/tdd-with-claude/) | Test-Driven Development |
| [Spec-First](/guide/workflows/spec-first/) | Specification-Driven Development |
| [Agent Teams](/guide/workflows/agent-teams/) | Multi-agent orchestration |
| [Plan-Driven](/guide/workflows/plan-driven/) | Using /plan mode effectively |
| [Search Tools Mastery](/guide/workflows/search-tools-mastery/) | rg, grepai, Serena, ast-grep |
| [All Workflows →](/guide/workflows/agent-teams/) | 19 total workflow guides |
`
writeFileSync(resolve(OUT_GUIDE, 'index.md'), guideIndexContent, 'utf-8')

// Generate the ultimate-guide index page
const indexContent = `---
title: "The Ultimate Claude Code Guide"
description: "Comprehensive guide to mastering Claude Code — from zero to power user."
sidebar:
  order: -1
---

# The Ultimate Claude Code Guide

> A comprehensive, self-contained guide to mastering Claude Code — from zero to power user.

**Over 22,000 lines** covering everything from installation to advanced agent architectures.

## Chapters

| Chapter | Description |
|---------|-------------|
| [Introduction](/guide/ultimate-guide/00-introduction/) | Overview, TL;DR, table of contents |
| [1. Quick Start](/guide/ultimate-guide/01-quick-start/) | Installation, first workflow, essential commands |
| [2. Core Workflow](/guide/ultimate-guide/02-core-workflow/) | Interaction loop, context, plan mode |
| [3. Memory & Files](/guide/ultimate-guide/03-memory-files/) | CLAUDE.md, .claude/ folder, settings |
| [4. Agents](/guide/ultimate-guide/04-agents/) | Custom agents, patterns, best practices |
| [5. Skills](/guide/ultimate-guide/05-skills/) | Skills system, creation, community repos |
| [6. Slash Commands](/guide/ultimate-guide/06-commands/) | Commands, custom commands, templates |
| [7. Hooks](/guide/ultimate-guide/07-hooks/) | Event system, hook creation, security |
| [8. MCP Servers](/guide/ultimate-guide/08-mcp/) | Servers, config, selection guide |
| [9. Advanced Patterns](/guide/ultimate-guide/09-advanced-patterns/) | CI/CD, scaling, agent teams |
| [10. Reference](/guide/ultimate-guide/10-reference/) | Commands table, shortcuts, troubleshooting |
| [11. AI Ecosystem](/guide/ultimate-guide/11-ai-ecosystem/) | Complementary tools, integrations |
| [Appendices](/guide/ultimate-guide/12-appendices/) | Templates, FAQ, myths vs reality |
`

writeFileSync(resolve(OUT_ULTIMATE, 'index.md'), indexContent, 'utf-8')

// -----------------------------------------------------------------------
// 4. Copy images
// -----------------------------------------------------------------------
const IMAGES_SRC = resolve(GUIDE_DIR, 'images')
if (existsSync(IMAGES_SRC)) {
  cpSync(IMAGES_SRC, OUT_IMAGES, { recursive: true })
  stats.images = readdirSync(OUT_IMAGES).length
  console.log(`[prepare-guide] ✓ Images copied: ${stats.images}`)
}

// -----------------------------------------------------------------------
// 5. Write anchor map
// -----------------------------------------------------------------------
writeFileSync(ANCHOR_MAP_PATH, JSON.stringify(anchorMap, null, 2), 'utf-8')
console.log(`[prepare-guide] ✓ Anchor map: ${Object.keys(anchorMap).length} entries`)

// -----------------------------------------------------------------------
// Report
// -----------------------------------------------------------------------
console.log('')
console.log('[prepare-guide] ══════════════════════════════════')
console.log('[prepare-guide] Done! Summary:')
console.log(`[prepare-guide]   Guide files     : ${stats.files}`)
console.log(`[prepare-guide]   UG chapters     : ${stats.chapters}`)
console.log(`[prepare-guide]   Workflow files  : ${stats.workflows}`)
console.log(`[prepare-guide]   Images          : ${stats.images}`)
console.log(`[prepare-guide]   Anchor entries  : ${Object.keys(anchorMap).length}`)
console.log('[prepare-guide] ══════════════════════════════════')
