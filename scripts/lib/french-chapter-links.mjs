/**
 * Links from each English chapter to its section of the French edition (AM-02).
 * The French edition is one page, /guide/ultimate-guidefr/ (CX-04).
 */
import { createHeadingSlugger } from './heading-slug.mjs'

export const FRENCH_GUIDE_URL = '/guide/ultimate-guidefr/'

/**
 * Chapter number → heading id on the generated French page.
 * Walks every heading outside code fences in document order with the same
 * slugger as Astro, so duplicate headings get the same `-1` suffixes.
 * The first "N. Title" heading of level 1 or 2 opens chapter N.
 * @param {string} markdown generated French page
 * @returns {Map<number, string>}
 */
export function frenchChapterAnchors(markdown) {
  const slug = createHeadingSlugger()
  const anchors = new Map()
  let fenceMarker = ''
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  for (const line of body.split(/\r?\n/)) {
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
    if (fence) {
      if (!fenceMarker) fenceMarker = fence[1]
      else if (fence[1][0] === fenceMarker[0] && fence[1].length >= fenceMarker.length && fence[2].trim() === '') fenceMarker = ''
      continue
    }
    if (fenceMarker) continue
    const heading = line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*$/)
    if (!heading) continue
    const id = slug(heading[2])
    const chapter = heading[1].length <= 2 && /^(\d{1,2})\.\s/.exec(heading[2])
    if (chapter && !anchors.has(Number(chapter[1]))) anchors.set(Number(chapter[1]), id)
  }
  return anchors
}

/**
 * Insert the French link right after the chapter anchor span.
 * @param {string} chapterMarkdown generated English chapter
 * @param {string} frenchId heading id on the French page
 */
export function addFrenchChapterLink(chapterMarkdown, frenchId) {
  if (chapterMarkdown.includes('class="chapter-translation"')) return chapterMarkdown
  const link = `<p class="chapter-translation"><a href="${FRENCH_GUIDE_URL}#${frenchId}" lang="fr" hreflang="fr">Lire ce chapitre en français</a></p>`
  return chapterMarkdown.replace(/(<span id="[^"]+"><\/span>\n\n)/, `$1${link}\n\n`)
}
