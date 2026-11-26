import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'
import { hasDist, page } from './dist.ts'

const origin = process.env.SEO_TEST_ORIGIN

test('downloads keeps the four direct artifacts before offering self-study and team training', { skip: !origin && !hasDist }, async () => {
  const html = origin ? await (await fetch(new URL('/downloads/', origin))).text() : page('/downloads/')
  assert.ok(html, 'downloads page is rendered')
  const window = new Window()
  window.document.write(html)
  const document = window.document
  const downloads = [...document.querySelectorAll('.download-actions a')]
  assert.equal(downloads.length, 4, 'both language editions keep PDF and EPUB downloads')
  assert.deepEqual(downloads.map(link => new URL(link.getAttribute('href')!).pathname.split('/').at(-1)), [
    'guide-export.pdf', 'guide-export.epub', 'guide-export-fr.pdf', 'guide-export-fr.epub',
  ])
  const next = document.querySelector('[aria-labelledby="after-download-title"]')
  assert.ok(next, 'readers can choose a next step after downloading')
  assert.ok(downloads.at(-1)!.compareDocumentPosition(next) & 4, 'downloads remain before the optional next steps')
  assert.ok(next.querySelector('a[href="/learning/"]'), 'self-study opens the existing learning paths')
  const training = [...next.querySelectorAll('a')].filter(link => link.getAttribute('href')?.startsWith('https://www.florian.bruniaux.com/'))
  assert.equal(training.length, 2, 'one team training destination per language')
  assert.deepEqual(training.map(link => new URL(link.getAttribute('href')!).pathname), ['/fr/prestations/formation/', '/services/training/'])
  for (const link of training) {
    const url = new URL(link.getAttribute('href')!)
    assert.deepEqual(Object.fromEntries(url.searchParams), { utm_source: 'cc-guide', utm_medium: 'cta', utm_campaign: 'consulting', utm_content: 'downloads' })
  }
  assert.equal(next.querySelectorAll('.btn-primary').length, 0, 'optional paths do not compete with the download primary actions')
  window.happyDOM.abort()
})
