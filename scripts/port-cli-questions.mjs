#!/usr/bin/env node
/**
 * port-cli-questions.mjs
 *
 * One-time-reproducible port: takes the CLI-only quiz questions that survived
 * triage and writes them into the canonical web bank as Markdown files.
 *
 * Why fresh ids: the two banks forked and reused the same NN-YYY id slots for
 * different questions. A CLI question with id 09-030 cannot keep that id in web,
 * because web already has a *different* 09-030. So each ported question gets the
 * next free numeric suffix in its target web category. Team-metrics (category
 * 17) is empty in web, so those keep their 17-0NN ids.
 *
 * Inputs:
 *   - Triage verdicts: <guide>/claudedocs/quiz-triage-verdicts.json
 *     (only verdict === "keep" rows are ported; each row carries
 *      target_web_category_id).
 *   - Full CLI content: <guide>/quiz/questions/*.yaml
 *
 * Output: web Markdown under src/content/questions/<NN-slug>/<suffix>-<slug>.md
 *
 * Usage:
 *   node scripts/port-cli-questions.mjs [--dry]
 *     --dry   Report what would be written, touch nothing.
 */

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import yaml from 'js-yaml'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const LANDING_ROOT = path.resolve(__dirname, '..')
const GUIDE_ROOT = path.resolve(LANDING_ROOT, '..', 'claude-code-ultimate-guide')
const VERDICTS = path.join(GUIDE_ROOT, 'claudedocs', 'quiz-triage-verdicts.json')
const CLI_QUESTIONS = path.join(GUIDE_ROOT, 'quiz', 'questions')
const WEB_QUESTIONS = path.join(LANDING_ROOT, 'src', 'content', 'questions')

const DRY = process.argv.includes('--dry')

// Load web categories (id -> slug) straight from the TS source, without importing
// it: a tiny regex over the array literal keeps this script dependency-light.
function loadCategorySlugs() {
  const src = fs.readFileSync(path.join(LANDING_ROOT, 'src', 'utils', 'categories.ts'), 'utf8')
  const map = new Map()
  const re = /\{\s*id:\s*(\d+),\s*name:\s*'[^']*',\s*slug:\s*'([^']+)'/g
  let m
  while ((m = re.exec(src))) map.set(Number(m[1]), m[2])
  return map
}

function slugify(text, maxWords = 8) {
  return text
    .toLowerCase()
    .replace(/`[^`]*`/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, maxWords)
    .join('-')
    .slice(0, 70)
    .replace(/-+$/, '')
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

// All CLI questions, keyed by id, with their category_id.
function loadCliById() {
  const byId = new Map()
  for (const f of fs.readdirSync(CLI_QUESTIONS)) {
    if (!/\.ya?ml$/.test(f)) continue
    const doc = yaml.load(fs.readFileSync(path.join(CLI_QUESTIONS, f), 'utf8'))
    for (const q of doc.questions || []) byId.set(String(q.id), { ...q, cli_category_id: doc.category_id })
  }
  return byId
}

// Current maximum numeric id suffix per web category, so new ids never collide.
function currentMaxSuffix() {
  const max = new Map()
  for (const dir of fs.readdirSync(WEB_QUESTIONS)) {
    const cdir = path.join(WEB_QUESTIONS, dir)
    if (!fs.statSync(cdir).isDirectory()) continue
    for (const f of fs.readdirSync(cdir)) {
      const mm = f.match(/^(\d+)-/)
      if (!mm) continue
      // read the file's category_id from frontmatter id (NN-YYY)
      const raw = fs.readFileSync(path.join(cdir, f), 'utf8').slice(0, 200)
      const idm = raw.match(/id:\s*"?(\d+)-(\d+)"?/)
      if (!idm) continue
      const cat = Number(idm[1])
      const suffix = Number(idm[2])
      max.set(cat, Math.max(max.get(cat) || 0, suffix))
    }
  }
  return max
}

function toFrontmatterObject(q, newId, categoryId) {
  const obj = {
    id: newId,
    category_id: categoryId,
    difficulty: q.difficulty,
    profiles: q.profiles,
    correct: String(q.correct),
    options: { a: q.options.a, b: q.options.b, c: q.options.c, d: q.options.d },
  }
  if (q.doc_reference) {
    obj.doc_reference = {}
    if (q.doc_reference.file != null) obj.doc_reference.file = q.doc_reference.file
    if (q.doc_reference.section != null) obj.doc_reference.section = q.doc_reference.section
    if (q.doc_reference.anchor != null) obj.doc_reference.anchor = q.doc_reference.anchor
    if (q.doc_reference.line != null) obj.doc_reference.line = q.doc_reference.line
  }
  if (q.official_doc) obj.official_doc = q.official_doc
  return obj
}

function main() {
  if (!fs.existsSync(VERDICTS)) {
    console.error(`Triage verdicts not found: ${VERDICTS}`)
    console.error('Run the triage step first.')
    process.exit(2)
  }
  const verdicts = JSON.parse(fs.readFileSync(VERDICTS, 'utf8'))
  const keeps = verdicts.verdicts.filter((v) => v.verdict === 'keep')
  const slugs = loadCategorySlugs()
  const cliById = loadCliById()
  const maxSuffix = currentMaxSuffix()

  // Group keeps by target web category, port in stable id order for determinism.
  keeps.sort((a, b) => String(a.id).localeCompare(String(b.id)))

  const written = []
  const missing = []

  for (const v of keeps) {
    const q = cliById.get(String(v.id))
    if (!q) {
      missing.push(v.id)
      continue
    }
    const cat = v.target_web_category_id
    const slug = slugs.get(cat)
    if (!slug) {
      console.error(`No web category slug for target_web_category_id ${cat} (from ${v.id}). Add it to categories.ts.`)
      process.exit(3)
    }
    const dir = path.join(WEB_QUESTIONS, `${pad2(cat)}-${slug}`)

    // Team-metrics (17) is empty in web: preserve original 17-0NN ids. Every
    // other category gets a fresh suffix after the current max.
    let newId
    if (cat === 17 && String(v.id).startsWith('17-')) {
      newId = String(v.id)
    } else {
      const next = (maxSuffix.get(cat) || 0) + 1
      maxSuffix.set(cat, next)
      newId = `${pad2(cat)}-${String(next).padStart(3, '0')}`
    }

    const fm = toFrontmatterObject(q, newId, cat)
    const frontmatter = yaml.dump(fm, { lineWidth: -1, quotingType: '"', forceQuotes: false }).trimEnd()
    const body = `${String(q.question).trim()}\n\n---\n\n${String(q.explanation).trim()}\n`
    const fileText = `---\n${frontmatter}\n---\n\n${body}`

    const suffix = newId.split('-')[1]
    const fileName = `${suffix}-${slugify(q.question)}.md`
    const outPath = path.join(dir, fileName)

    written.push({ from: v.id, to: newId, file: path.relative(LANDING_ROOT, outPath) })
    if (!DRY) {
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(outPath, fileText)
    }
  }

  const byCat = {}
  for (const w of written) {
    const c = w.to.split('-')[0]
    byCat[c] = (byCat[c] || 0) + 1
  }

  console.log(`${DRY ? 'DRY RUN — ' : ''}Ported ${written.length} of ${keeps.length} kept questions.`)
  console.log('By target web category:', JSON.stringify(byCat))
  if (missing.length) console.log(`WARNING: ${missing.length} kept ids not found in CLI yaml:`, missing.join(', '))
  for (const w of written) console.log(`  ${w.from} -> ${w.to}  ${w.file}`)
}

main()
