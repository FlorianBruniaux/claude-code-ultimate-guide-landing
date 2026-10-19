import assert from 'node:assert/strict'
import test from 'node:test'

import { adjustGuideRoute } from './guide-route-head.mjs'

function route(title: string) {
  return {
    lang: 'en',
    entry: { data: { title } },
    head: [
      { tag: 'title', content: `${title} | Claude Code Guide` },
      { tag: 'meta', attrs: { property: 'og:title', content: title } },
      { tag: 'meta', attrs: { property: 'og:locale', content: 'en' } },
    ],
  }
}

const meta = (r: ReturnType<typeof route>, key: string) =>
  r.head.find((entry: { attrs?: Record<string, string> }) => entry.attrs?.property === key || entry.attrs?.name === key)?.attrs?.content

test('every guide page gets the site social image', () => {
  const r = route('Architecture')
  adjustGuideRoute(r, '/guide/architecture/')
  assert.equal(meta(r, 'og:image'), 'https://cc.bruniaux.com/og-image.png')
  assert.equal(meta(r, 'twitter:image'), 'https://cc.bruniaux.com/og-image.png')
})

test('the French full guide declares French in its language, titles and H1', () => {
  const r = route('The Ultimate Claude Code Guide')
  adjustGuideRoute(r, '/guide/ultimate-guidefr/')
  assert.equal(r.lang, 'fr')
  assert.equal(meta(r, 'og:locale'), 'fr_FR')
  assert.equal(r.head.find((entry: { tag: string }) => entry.tag === 'title')?.content, 'Le guide ultime de Claude Code | Claude Code Guide')
  assert.equal(meta(r, 'og:title'), 'Le guide ultime de Claude Code')
  // The rendered H1 and the JSON-LD headline read the entry title.
  assert.equal(r.entry.data.title, 'Le guide ultime de Claude Code')
})

test('other guide pages keep their language and title', () => {
  const r = route('The Ultimate Claude Code Guide')
  adjustGuideRoute(r, '/guide/ultimate-guide/')
  assert.equal(r.lang, 'en')
  assert.equal(meta(r, 'og:title'), 'The Ultimate Claude Code Guide')
  assert.equal(r.entry.data.title, 'The Ultimate Claude Code Guide')
})

test('an existing social image is kept', () => {
  const r = route('Custom')
  r.head.push({ tag: 'meta', attrs: { property: 'og:image', content: 'https://cc.bruniaux.com/custom.png' } })
  adjustGuideRoute(r, '/guide/custom/')
  const images = r.head.filter((entry: { attrs?: Record<string, string> }) => entry.attrs?.property === 'og:image')
  assert.deepEqual(images.map((entry: { attrs?: Record<string, string> }) => entry.attrs?.content), ['https://cc.bruniaux.com/custom.png'])
})
