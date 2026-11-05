import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { SUPERSEDED_GUIDE_PAGES, rewriteSupersededGuideLinks } from './superseded-guide-pages.mjs'

const config = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')
const prepare = readFileSync(new URL('../../scripts/prepare-guide-content.mjs', import.meta.url), 'utf8')

test('rewrites links to a superseded guide page, fragment included', () => {
  assert.equal(
    rewriteSupersededGuideLinks('See [Roles](/guide/ai-roles/) and [ACE](/guide/context-engineering/#6-the-ace-pipeline).'),
    'See [Roles](/roles/) and [ACE](/context-engineering/).',
  )
})

test('leaves other guide links and look-alike paths untouched', () => {
  const content = '[Tools](/guide/context-engineering-tools/#3-output) [Arch](/guide/architecture/) [Eco](/guide/ai-ecosystem-extra/)'
  assert.equal(rewriteSupersededGuideLinks(content), content)
})

test('the redirects, the sitemap exclusions and the guide sidebar use the same superseded pages', () => {
  assert.match(config, /\.\.\.SUPERSEDED_GUIDE_PAGES/)
  assert.match(config, /\.\.\.Object\.keys\(SUPERSEDED_GUIDE_PAGES\)/)
  for (const path of Object.keys(SUPERSEDED_GUIDE_PAGES)) {
    const slug = path.slice(1, -1)
    assert.doesNotMatch(config, new RegExp(`slug: '${slug}'`), `sidebar still links ${path}`)
  }
  for (const target of Object.values(SUPERSEDED_GUIDE_PAGES).filter((target) => target !== '/context-engineering/')) {
    assert.match(config, new RegExp(`link: '${target}'`), `sidebar links ${target}`)
  }
})

test('the guide content preparation rewrites superseded links in every output path', () => {
  assert.equal(prepare.match(/rewriteSupersededGuideLinks\(/g)?.length, 2)
})

test('redirects ending on a superseded guide page go straight to its landing page', async () => {
  const { collapseSupersededRedirects } = await import('./superseded-guide-pages.mjs')
  assert.deepEqual(
    collapseSupersededRedirects({ '/guide/roles/ai-roles/': '/guide/ai-roles/', '/guide/old/': '/guide/architecture/', '/guide/ai-roles/': '/roles/' }),
    { '/guide/roles/ai-roles/': '/roles/', '/guide/old/': '/guide/architecture/', '/guide/ai-roles/': '/roles/' },
  )
  assert.match(config, /redirects: collapseSupersededRedirects\(\{/)
})
