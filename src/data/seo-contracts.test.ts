import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'

import { checkBuiltSeo } from '../../scripts/lib/seo-contracts.mjs'

const ROUTE = '/guide/architecture/'

function validHtml(route = ROUTE) {
  return `<!doctype html>
<html lang="en">
  <head>
    <title>Claude Code Architecture Reference</title>
    <meta name="description" content="A practical Claude Code architecture reference for reliable agent engineering decisions.">
    <link rel="canonical" href="https://cc.bruniaux.com${route}">
  </head>
  <body><main><h1>Claude Code Architecture</h1></main></body>
</html>`
}

async function writeFixtureFile(root: string, relativePath: string, contents: string) {
  const target = join(root, relativePath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, contents)
}

async function withValidFixture(run: (root: string) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), 'seo-contracts-'))

  try {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml())
    await writeFixtureFile(root, 'sitemap-index.xml', `<?xml version="1.0"?><sitemapindex><sitemap><loc>https://cc.bruniaux.com/sitemap-0.xml</loc></sitemap></sitemapindex>`)
    await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc></url></urlset>`)
    await run(root)
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
}

function check(root: string) {
  return checkBuiltSeo({ distDir: root, routes: [ROUTE] })
}

test('rejects two rendered H1 elements', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml().replace('</main>', '<h1>Duplicate heading</h1></main>'))

    const failures = check(root)

    assert.deepEqual(failures, [`${ROUTE}: expected exactly one rendered H1, found 2`])
  })
})

test('does not let inert H1 markup satisfy the rendered H1 contract', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml().replace(
      '<main><h1>Claude Code Architecture</h1></main>',
      `<main>
        <!-- <h1>Comment heading</h1> -->
        <template><h1>Template heading</h1></template>
        <script>const example = '<h1>Script heading</h1>'</script>
        <style>.example::before { content: '<h1>Style heading</h1>'; }</style>
      </main>`,
    ))

    const failures = check(root)

    assert.deepEqual(failures, [`${ROUTE}: expected exactly one rendered H1, found 0`])
  })
})

test('does not let nested template H1 markup satisfy the rendered H1 contract', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml().replace(
      '<main><h1>Claude Code Architecture</h1></main>',
      '<main><template><template><p>Nested inert content</p></template><h1>Outer template heading</h1></template></main>',
    ))

    const failures = check(root)

    assert.deepEqual(failures, [`${ROUTE}: expected exactly one rendered H1, found 0`])
  })
})

test('rejects an HTTP canonical', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml().replace('https://cc.bruniaux.com/guide/architecture/', 'http://cc.bruniaux.com/guide/architecture/'))

    const failures = check(root)

    assert.ok(failures.includes(`${ROUTE}: expected HTTPS self-canonical https://cc.bruniaux.com${ROUTE}, found http://cc.bruniaux.com${ROUTE}`))
  })
})

test('rejects metadata outside the configured bounds', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml()
      .replace('Claude Code Architecture Reference', 'Short')
      .replace('A practical Claude Code architecture reference for reliable agent engineering decisions.', 'Too short.'))

    const failures = check(root)

    assert.deepEqual(failures, [
      `${ROUTE}: title length 5 is outside 30-60 characters`,
      `${ROUTE}: description length 10 is outside 50-160 characters`,
    ])
  })
})

test('rejects the legacy release URL in sitemap XML', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc></url><url><loc>https://cc.bruniaux.com/guide/claude-code-releases/</loc></url></urlset>`)

    const failures = check(root)

    assert.deepEqual(failures, ['sitemap: legacy release URL appears in sitemap-0.xml'])
  })
})

test('accepts a valid audited page and sitemap', async () => {
  await withValidFixture(async (root) => {
    assert.deepEqual(check(root), [])
  })
})
