import assert from 'node:assert/strict'
import test from 'node:test'
import { addFrenchChapterLink, frenchChapterAnchors } from '../../scripts/lib/french-chapter-links.mjs'

// AM-02: each English chapter links to its section of the single French page.

const french = [
  '## 1. Démarrage rapide (jour 1)',
  'Texte.',
  '```bash',
  '# 1. Use Cursor to explore',
  '# 2. Open terminal: claude',
  '```',
  '## 2. Concepts fondamentaux',
  '## 7. Hooks',
  '## 7. Hooks',
  '## 11. Écosystème IA : outils complémentaires',
].join('\n')

test('frenchChapterAnchors maps chapter numbers to the ids the French page renders', () => {
  const anchors = frenchChapterAnchors(french)
  assert.equal(anchors.get(1), '1-démarrage-rapide-jour-1')
  assert.equal(anchors.get(2), '2-concepts-fondamentaux')
  assert.equal(anchors.get(7), '7-hooks')
  assert.equal(anchors.get(11), '11-écosystème-ia--outils-complémentaires')
  assert.equal(anchors.size, 4, 'code comments and repeated headings are not chapters')
})

test('addFrenchChapterLink puts a French link right after the chapter anchor', () => {
  const chapter = '---\ntitle: "7. Hooks"\n---\n\n<span id="7-hooks"></span>\n\nIntro.'
  const out = addFrenchChapterLink(chapter, '7-hooks')
  assert.match(out, /<span id="7-hooks"><\/span>\n\n<p class="chapter-translation"><a href="\/guide\/ultimate-guidefr\/#7-hooks" lang="fr" hreflang="fr">Lire ce chapitre en français<\/a><\/p>\n\nIntro\./)
  assert.equal(addFrenchChapterLink(out, '7-hooks'), out, 'idempotent')
})
