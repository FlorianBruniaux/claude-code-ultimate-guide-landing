/**
 * convert-en-recap-cards.mjs
 *
 * Refresh landing cheatsheets from English recap cards in the guide repository.
 * Reads EN QMD files, maps by card-number, writes new landing MD files preserving order.
 *
 * Usage: GUIDE_REPO_PATH=/path/to/guide node scripts/convert-en-recap-cards.mjs
 * Optional landing-note blocks preserve reviewed web-only editorial additions.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LANDING_ROOT = join(__dirname, '..')
const GUIDE_ROOT = process.env.GUIDE_REPO_PATH
  ? resolve(process.env.GUIDE_REPO_PATH)
  : join(__dirname, '../../claude-code-ultimate-guide')

const EN_QMD_DIR = join(GUIDE_ROOT, 'whitepapers/recap-cards/en')
const LANDING_MD_DIR = join(LANDING_ROOT, 'src/content/cheatsheets')

// Category mapping: QMD category → landing MD category (all EN, C series becomes "Design")
const CATEGORY_MAP = {
  Technical: 'Technical',
  Methodology: 'Methodology',
  Conceptual: 'Design',
  Design: 'Design',
}

/**
 * Parse YAML frontmatter — returns raw field values (preserving quotes) and body.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return null

  const fmBlock = match[1]
  const body = match[2]

  // Extract a raw YAML field value (with or without surrounding quotes)
  function getRaw(key) {
    const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm')
    const m = fmBlock.match(re)
    return m ? m[1].trim() : ''
  }

  // Strip surrounding quotes for a clean value (for logic checks)
  function get(key) {
    return getRaw(key).replace(/^["'](.*)["']$/, '$1')
  }

  return { get, getRaw, fmBlock, body }
}

// ── Step 1: Build map of card-number → { title, subtitle, category, difficulty, body } ──

const qmdFiles = readdirSync(EN_QMD_DIR).filter(f => f.endsWith('.qmd'))
const qmdMap = {}

for (const f of qmdFiles) {
  const content = readFileSync(join(EN_QMD_DIR, f), 'utf-8')
  const parsed = parseFrontmatter(content)
  if (!parsed) { console.warn(`Cannot parse frontmatter: ${f}`); continue }

  const cardNum = parsed.get('card-number')
  if (!cardNum) { console.warn(`No card-number in ${f}`); continue }

  const rawCategory = parsed.get('category')
  const mappedCategory = CATEGORY_MAP[rawCategory] || rawCategory

  qmdMap[cardNum] = {
    titleRaw: parsed.getRaw('title'),
    subtitleRaw: parsed.getRaw('subtitle'),
    category: mappedCategory,
    difficulty: parsed.get('difficulty'),
    guideVersion: parsed.get('guide-version') || parsed.get('version'),
    // Print-only column breaks have no meaning in the web edition.
    body: parsed.body.replace(/```\{=typst\}\r?\n#colbreak\(\)\s*```\s*/g, '').trim(),
  }
}

console.log(`Loaded ${Object.keys(qmdMap).length} EN QMD files.`)

// ── Step 2: Convert each landing MD file ──

const mdFiles = readdirSync(LANDING_MD_DIR).filter(f => f.endsWith('.md'))
let converted = 0
let skipped = 0

for (const f of mdFiles) {
  const content = readFileSync(join(LANDING_MD_DIR, f), 'utf-8')
  const parsed = parseFrontmatter(content)
  if (!parsed) { console.warn(`Cannot parse frontmatter: ${f}`); skipped++; continue }

  const cardNum = parsed.get('cardNumber')
  const order = parsed.get('order')

  if (!cardNum) { console.warn(`No cardNumber in ${f}`); skipped++; continue }

  const qmd = qmdMap[cardNum]
  if (!qmd) {
    console.warn(`No EN QMD found for cardNumber ${cardNum} (file: ${f})`)
    skipped++
    continue
  }
  if (!qmd.guideVersion) throw new Error(`No guide version in EN QMD for ${cardNum}`)

  // Only explicitly reviewed additions survive a canonical-content refresh.
  const landingNotes = content.match(/<!-- landing-note:start -->[\s\S]*?<!-- landing-note:end -->/g) || []
  const body = [qmd.body, ...landingNotes].join('\n\n')

  // Write new MD file with EN content
  const newContent = `---
title: ${qmd.titleRaw}
subtitle: ${qmd.subtitleRaw}
cardNumber: ${cardNum}
category: ${qmd.category}
difficulty: ${qmd.difficulty}
guideVersion: ${qmd.guideVersion}
order: ${order}
---

${body}
`

  writeFileSync(join(LANDING_MD_DIR, f), newContent, 'utf-8')
  converted++
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped (out of ${mdFiles.length} total).`)
