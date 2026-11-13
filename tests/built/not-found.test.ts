import assert from 'node:assert/strict'
import test from 'node:test'
import { hasDist, page } from './dist.ts'

// UX-02: GitHub Pages serves dist/404.html for unknown URLs.
test('the site ships a 404 page with the site header, search and recovery links', { skip: !hasDist }, () => {
  const html = page('/404.html')
  assert.ok(html, 'dist/404.html is missing')
  assert.match(html, /id="search-trigger"/, 'site header with the search trigger')
  assert.match(html, /<h1[^>]*>/, 'a heading')
  for (const href of ['/', '/guide/', '/sitemap/']) {
    assert.ok(html.includes(`href="${href}"`), `recovery link to ${href}`)
  }
  assert.match(html, /name="robots" content="noindex/, 'not indexed')
})
