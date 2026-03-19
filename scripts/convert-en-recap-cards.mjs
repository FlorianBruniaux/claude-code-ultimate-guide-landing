/**
 * convert-en-recap-cards.mjs
 *
 * Phase 1: Replace 57 French cheatsheet MD files with English content from guide repo.
 * Reads EN QMD files, maps by card-number, writes new landing MD files preserving order.
 *
 * Usage: node scripts/convert-en-recap-cards.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LANDING_ROOT = join(__dirname, '..')
const GUIDE_ROOT = join(__dirname, '../../claude-code-ultimate-guide')

const EN_QMD_DIR = join(GUIDE_ROOT, 'whitepapers/recap-cards/en')
const LANDING_MD_DIR = join(LANDING_ROOT, 'src/content/cheatsheets')

// Category mapping: QMD category → landing MD category (all EN, C series becomes "Design")
const CATEGORY_MAP = {
  Technical: 'Technical',
  Methodology: 'Methodology',
  Conceptual: 'Design',
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
    body: parsed.body.trim(),
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
  const guideVersion = parsed.get('guideVersion') || '3.36.0'

  if (!cardNum) { console.warn(`No cardNumber in ${f}`); skipped++; continue }

  const qmd = qmdMap[cardNum]
  if (!qmd) {
    console.warn(`No EN QMD found for cardNumber ${cardNum} (file: ${f})`)
    skipped++
    continue
  }

  // Write new MD file with EN content
  const newContent = `---
title: ${qmd.titleRaw}
subtitle: ${qmd.subtitleRaw}
cardNumber: ${cardNum}
category: ${qmd.category}
difficulty: ${qmd.difficulty}
guideVersion: ${guideVersion}
order: ${order}
---

${qmd.body}
`

  writeFileSync(join(LANDING_MD_DIR, f), newContent, 'utf-8')
  converted++
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped (out of ${mdFiles.length} total).`)