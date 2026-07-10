#!/usr/bin/env node
/**
 * check-quiz-doc-links.mjs
 *
 * Verifies whether each quiz question's doc_reference can resolve to a page
 * on cc.bruniaux.com/guide/ (instead of the current GitHub blob link) and
 * whether the target anchor actually exists on that page.
 *
 * Read-only analysis — does not modify anything. Exit code 1 if any
 * doc_reference is unresolvable to either GitHub or the guide site.
 *
 * Run: node scripts/check-quiz-doc-links.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = resolve(ROOT, '../claude-code-ultimate-guide')
const GUIDE_DIR = resolve(GUIDE_REPO, 'guide')
const QUESTIONS_DIR = resolve(ROOT, 'src/content/questions')
const ANCHOR_MAP_PATH = resolve(ROOT, 'src/data/guide-anchor-map.json')

if (!existsSync(GUIDE_DIR)) {
  console.error(`Guide repo not found at ${GUIDE_DIR}`)
  process.exit(1)
}
if (!existsSync(ANCHOR_MAP_PATH)) {
  console.error(`${ANCHOR_MAP_PATH} not found — run: node scripts/prepare-guide-content.mjs`)
  process.exit(1)
}

const anchorMap = JSON.parse(readFileSync(ANCHOR_MAP_PATH, 'utf-8'))

// Same slugger as prepare-guide-content.mjs (must match rehype-slug output on the site)
function toAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\](){}|\\]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// GitHub's own heading-anchor algorithm (what the *current* GitHub blob links rely
// on): does NOT collapse consecutive hyphens the way rehype-slug does. Used here
// only to tell apart "anchor is fine on GitHub today, will break on the site" from
// "anchor is already stale, doesn't match any heading anywhere".
function toGithubAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^\wÀ-￿ \-]/g, '')
    .trim()
    .replace(/ /g, '-')
}

// --- Self-test: guard the two slugger functions above against regressions ---
// (no test framework in this repo — this is the equivalent of a small unit test,
// run every time this script runs, before it trusts the sluggers on real data)
function selfTest() {
  const cases = [
    // [fn, input, expected, note]
    [toAnchor, 'The Ultimate Claude Code Guide', 'the-ultimate-claude-code-guide', 'matches guide-anchor-map.json entry'],
    [toAnchor, 'Before You Start', 'before-you-start', 'matches guide-anchor-map.json entry'],
    [toAnchor, '1.2 First Workflow', '12-first-workflow', 'matches a real doc_reference.anchor (01-002)'],
    [toGithubAnchor, 'TL;DR - Retention Summary', 'tldr---retention-summary', 'GitHub keeps consecutive hyphens; matches doc_reference 14-001'],
    [toAnchor, 'TL;DR - Retention Summary', 'tldr-retention-summary', 'rehype-slug collapses consecutive hyphens — the two sluggers must diverge here'],
  ]
  const failures = cases.filter(([fn, input, expected]) => fn(input) !== expected)
  if (failures.length) {
    console.error('Self-test FAILED — slugger functions no longer match known-good cases:')
    for (const [fn, input, expected, note] of failures) {
      console.error(`  ${fn.name}(${JSON.stringify(input)}) = ${JSON.stringify(fn(input))}, expected ${JSON.stringify(expected)} (${note})`)
    }
    process.exit(1)
  }
}
selfTest()

// Same subdir list as prepare-guide-content.mjs — files here are flattened to /guide/<slug>/
const GUIDE_SUBDIRS = ['core', 'security', 'ecosystem', 'roles', 'ops']
const SKIP_FILES = new Set(['ultimate-guide.md', 'ultimate-guide.md.bak', 'README.md'])

// Extract headings from a guide file: site anchors (rehype-slug-style, deduped)
// and the raw heading texts (for the GitHub-anchor cross-check below).
function extractHeadings(content) {
  const anchors = new Set()
  const headingTexts = []
  let inFence = false
  let fenceMarker = ''
  for (const line of content.split('\n')) {
    const trim = line.trim()
    const fenceMatch = trim.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      if (!inFence) { inFence = true; fenceMarker = fenceMatch[1] }
      else if (trim[0] === fenceMarker[0] && /^[`~]+$/.test(trim)) { inFence = false }
      continue
    }
    if (inFence) continue
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const text = headingMatch[2].trim()
      anchors.add(toAnchor(text))
      headingTexts.push(text)
    }
  }
  return { anchors, headingTexts }
}

// Does this GitHub-style anchor correspond to any actual heading in the file?
// (i.e. is the doc_reference anchor stale/wrong independent of the site migration)
function matchesSomeHeading(githubAnchor, headingTexts) {
  return headingTexts.some(t => toGithubAnchor(t) === githubAnchor)
}

// file (basename, e.g. "architecture.md") -> { slug, anchors: Set, headingTexts: [] }
const flatGuideFiles = new Map()

// root-level guide/*.md (excluding ultimate-guide/README) + cheatsheet etc.
readdirSync(GUIDE_DIR)
  .filter(f => f.endsWith('.md') && !SKIP_FILES.has(f) && !f.endsWith('.bak'))
  .forEach(f => {
    const content = readFileSync(resolve(GUIDE_DIR, f), 'utf-8')
    flatGuideFiles.set(f, { slug: f.replace(/\.md$/, ''), ...extractHeadings(content), srcRelPath: f })
  })

for (const sub of GUIDE_SUBDIRS) {
  const subDir = resolve(GUIDE_DIR, sub)
  if (!existsSync(subDir)) continue
  readdirSync(subDir)
    .filter(f => f.endsWith('.md') && !f.endsWith('.bak'))
    .forEach(f => {
      const content = readFileSync(resolve(subDir, f), 'utf-8')
      flatGuideFiles.set(f, { slug: f.replace(/\.md$/, ''), ...extractHeadings(content), srcRelPath: `${sub}/${f}` })
      // also register under "sub/f" key so a doc_reference written as "guide/core/foo.md" resolves
      flatGuideFiles.set(`${sub}/${f}`, flatGuideFiles.get(f))
    })
}

// workflows/*.md -> /guide/workflows/<slug>/
const WORKFLOWS_DIR = resolve(GUIDE_DIR, 'workflows')
if (existsSync(WORKFLOWS_DIR)) {
  readdirSync(WORKFLOWS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .forEach(f => {
      const content = readFileSync(resolve(WORKFLOWS_DIR, f), 'utf-8')
      flatGuideFiles.set(`workflows/${f}`, { slug: `workflows/${f.replace(/\.md$/, '')}`, ...extractHeadings(content), srcRelPath: `workflows/${f}` })
    })
}

// ultimate-guide.md headings, for stale-anchor detection on chapter 1 files too
const ultimateGuideHeadings = extractHeadings(readFileSync(resolve(GUIDE_DIR, 'ultimate-guide.md'), 'utf-8')).headingTexts

// --- Load questions ---
function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else if (entry.name.endsWith('.md')) out.push(p)
  }
}
const questionFiles = []
walk(QUESTIONS_DIR, questionFiles)

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return null
  return yaml.load(m[1])
}

const results = { mapped: [], noReference: [], fallbackGithub: [], brokenSource: [], staleAnchor: [], anchorAlgoMismatch: [] }

for (const file of questionFiles.sort()) {
  const raw = readFileSync(file, 'utf-8')
  const fm = parseFrontmatter(raw)
  const relFile = file.replace(ROOT + '/', '')
  if (!fm) continue
  const id = fm.id ?? relFile
  const ref = fm.doc_reference
  if (!ref) { results.noReference.push({ id, relFile }); continue }

  const normalizedFile = ref.file.replace(/^"|"$/g, '').replace(/^guide\//, '')
  const anchor = (ref.anchor || '').replace(/^#/, '')

  // Case 1: ultimate-guide.md — resolve via anchor map
  if (normalizedFile === 'ultimate-guide.md') {
    if (!anchor) {
      results.fallbackGithub.push({ id, relFile, reason: 'ultimate-guide.md reference with no anchor', file: ref.file })
      continue
    }
    const chapterSlug = anchorMap[anchor]
    if (chapterSlug) {
      results.mapped.push({ id, relFile, url: `/guide/${chapterSlug}/#${anchor}` })
    } else if (matchesSomeHeading(anchor, ultimateGuideHeadings)) {
      results.anchorAlgoMismatch.push({ id, relFile, anchor, file: ref.file })
    } else {
      results.staleAnchor.push({ id, relFile, anchor, file: ref.file, reason: 'anchor does not match any heading in the source file (already broken on GitHub today)' })
    }
    continue
  }

  // Case 2: a file we know gets published flat (core/security/ecosystem/roles/ops/root/workflows)
  const entry = flatGuideFiles.get(normalizedFile)
  if (entry) {
    if (anchor && !entry.anchors.has(anchor)) {
      if (matchesSomeHeading(anchor, entry.headingTexts)) {
        results.anchorAlgoMismatch.push({ id, relFile, anchor, file: ref.file, slug: entry.slug })
      } else {
        results.staleAnchor.push({ id, relFile, anchor, file: ref.file, reason: 'anchor does not match any heading in the source file (already broken on GitHub today)' })
      }
    } else {
      results.mapped.push({ id, relFile, url: `/guide/${entry.slug}/${anchor ? '#' + anchor : ''}` })
    }
    continue
  }

  // Case 3: not part of the published guide tree (examples/, diagrams/, learning-path/, etc.)
  const sourcePath = resolve(GUIDE_REPO, ref.file)
  if (!existsSync(sourcePath)) {
    results.brokenSource.push({ id, relFile, file: ref.file, reason: 'source file does not exist in guide repo at all' })
  } else {
    results.fallbackGithub.push({ id, relFile, reason: 'file not published under /guide/ (e.g. diagrams/, examples/, learning-path/)', file: ref.file })
  }
}

// --- Report ---
const total = questionFiles.length
console.log(`\nQuiz doc_reference link analysis — ${total} question files\n`)
console.log(`  Mapped cleanly to cc.bruniaux.com/guide/         : ${results.mapped.length}`)
console.log(`  Anchor-algorithm mismatch (fixable, see below)    : ${results.anchorAlgoMismatch.length}`)
console.log(`  Stale anchor — already broken on GitHub today     : ${results.staleAnchor.length}`)
console.log(`  Must stay on GitHub (file not published)          : ${results.fallbackGithub.length}`)
console.log(`  BROKEN (source file missing entirely)             : ${results.brokenSource.length}`)
console.log(`  No doc_reference at all                            : ${results.noReference.length}`)

if (results.brokenSource.length) {
  console.log(`\n--- BROKEN doc_reference (source file missing — fix regardless of GitHub vs cc.bruniaux.com) ---`)
  for (const r of results.brokenSource) console.log(`  ${r.id}  ${r.relFile}\n    file: ${r.file}\n    reason: ${r.reason}`)
}

if (results.anchorAlgoMismatch.length) {
  console.log(`\n--- Anchor-algorithm mismatch (${results.anchorAlgoMismatch.length}): heading exists, but GitHub's slugger and the site's rehype-slug disagree on the anchor text ---`)
  console.log(`    These are NOT content bugs. A correct migration must recompute the site anchor from the`)
  console.log(`    heading (or doc_reference.section), not reuse the GitHub-style anchor stored in frontmatter.`)
  for (const r of results.anchorAlgoMismatch) console.log(`  ${r.id}  file: ${r.file}  github-anchor: "${r.anchor}"`)
}

if (results.staleAnchor.length) {
  console.log(`\n--- Stale anchors (${results.staleAnchor.length}): doc_reference.anchor matches no heading at all — the current GitHub link is already broken, independent of this migration ---`)
  for (const r of results.staleAnchor) console.log(`  ${r.id}  file: ${r.file}  anchor: "${r.anchor}"`)
}

if (results.fallbackGithub.length) {
  console.log(`\n--- Will fall back to GitHub, correctly (${results.fallbackGithub.length} entries — file not published on the site) ---`)
  for (const r of results.fallbackGithub) console.log(`  ${r.id}  file: ${r.file}  → ${r.reason}`)
}

console.log('')
process.exit(results.brokenSource.length > 0 ? 1 : 0)
