import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'

import { checkBuiltSeo } from '../../scripts/lib/seo-contracts.mjs'
import { LATEST_CLAUDE_CODE_RELEASE_DATE_ISO } from './seo-editorial-contract.mjs'

const ROUTE = '/guide/architecture/'

function validHtml(route = ROUTE) {
  return `<!doctype html>
<html lang="en">
  <head>
    <title>Claude Code Architecture Reference</title>
    <meta name="description" content="A practical Claude Code architecture reference for reliable agent engineering decisions.">
    <link rel="canonical" href="https://cc.bruniaux.com${route}">
    <meta property="og:image" content="https://cc.bruniaux.com/og-image.png">
  </head>
  <body><main><h1 id="_top">Claude Code Architecture</h1></main></body>
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
    await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc><lastmod>${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}</lastmod></url></urlset>`)
    await run(root)
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
}

function check(root: string, guideDates?: Map<string, string>) {
  return checkBuiltSeo({ distDir: root, routes: [ROUTE], guideDates })
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
      '<main><h1 id="_top">Claude Code Architecture</h1></main>',
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
      '<main><h1 id="_top">Claude Code Architecture</h1></main>',
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
    await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc><lastmod>${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}</lastmod></url><url><loc>https://cc.bruniaux.com/guide/claude-code-releases/</loc></url></urlset>`)

    const failures = check(root)

    assert.deepEqual(failures, ['sitemap: legacy release URL appears in sitemap-0.xml'])
  })
})

test('accepts a valid audited page and sitemap', async () => {
  await withValidFixture(async (root) => {
    assert.deepEqual(check(root), [])
  })
})

for (const route of ['/guide/ai-ecosystem/', '/guide/ai-roles/', '/guide/context-engineering/', '/guide/another-redirect/']) {
  test(`rejects the redirect document ${route} in sitemap XML`, async () => {
    await withValidFixture(async (root) => {
      await writeFixtureFile(root, `${route.slice(1)}index.html`, '<!doctype html><html><head><meta http-equiv="refresh" content="0;url=/ecosystem/"></head><body></body></html>')
      await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc><lastmod>${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}</lastmod></url><url><loc>https://cc.bruniaux.com${route}</loc></url></urlset>`)

      assert.deepEqual(check(root), [`sitemap: redirect route ${route} appears in sitemap`])
    })
  })
}

test('accepts redirect compatibility pages omitted from sitemap XML', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/ai-ecosystem/index.html', '<!doctype html><html><head><meta http-equiv="refresh" content="0;url=/ecosystem/"></head><body></body></html>')

    assert.deepEqual(check(root), [])
  })
})

test('checks every rendered Starlight document for exactly one H1', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/devops-sre/index.html', validHtml('/guide/devops-sre/').replace(
      '</main>',
      '<h1>Duplicate generated heading</h1></main>',
    ))

    const failures = check(root)

    assert.ok(failures.includes('/guide/devops-sre/: expected exactly one rendered H1, found 2'))
  })
})

test('does not use the page title H1 itself to identify a generated document', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/devops-sre/index.html', validHtml('/guide/devops-sre/').replace(
      '<h1 id="_top">Claude Code Architecture</h1>',
      '<p>Missing page title</p>',
    ))

    const failures = check(root)

    assert.ok(failures.includes('/guide/devops-sre/: expected exactly one rendered H1, found 0'))
  })
})

test('rejects rendered links to the legacy release route outside its compatibility page', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/devops-sre/index.html', validHtml('/guide/devops-sre/').replace(
      '</main>',
      '<a href="/guide/claude-code-releases/#v2">Old releases</a></main>',
    ))

    const failures = check(root)

    assert.ok(failures.includes('/guide/devops-sre/: rendered href targets legacy release route'))
  })
})

test('rejects a releases sitemap lastmod that differs from the displayed release date', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'sitemap-0.xml', '<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc><lastmod>2026-06-25</lastmod></url></urlset>')

    const failures = check(root)

    assert.ok(failures.includes(`sitemap: expected /releases/ lastmod ${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}, found 2026-06-25`))
  })
})

test('accepts the stable release date serialized as midnight UTC', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc><lastmod>${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}T00:00:00.000Z</lastmod></url></urlset>`)

    assert.deepEqual(check(root), [])
  })
})

function distinctPage(route: string, title: string, description: string) {
  return validHtml(route)
    .replace('Claude Code Architecture Reference', title)
    .replace('A practical Claude Code architecture reference for reliable agent engineering decisions.', description)
}

test('rejects two indexable pages that share a title', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'team-metrics/index.html', distinctPage('/team-metrics/', 'Claude Code Architecture Reference', 'A landing page that summarises team metrics for engineering leads.'))

    assert.deepEqual(check(root), ['title: "Claude Code Architecture Reference" is shared by /guide/architecture/, /team-metrics/'])
  })
})

test('rejects guide pages that share a description, such as the site default', async () => {
  await withValidFixture(async (root) => {
    const shared = 'A practical Claude Code architecture reference for reliable agent engineering decisions.'
    await writeFixtureFile(root, 'guide/tools-reference/index.html', distinctPage('/guide/tools-reference/', 'Built-in tools reference | Claude Code Guide', shared))

    assert.deepEqual(check(root), [`description: "${shared}" is shared by /guide/architecture/, /guide/tools-reference/`])
  })
})

test('ignores shared metadata on noindex compatibility pages', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/old-architecture/index.html', validHtml('/guide/old-architecture/').replace('<head>', '<head><meta name="robots" content="noindex">'))

    assert.deepEqual(check(root), [])
  })
})

test('rejects a guide page without a social image', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'guide/architecture/index.html', validHtml().replace(/\s*<meta property="og:image"[^>]*>/, ''))

    assert.deepEqual(check(root), [`${ROUTE}: missing og:image`])
  })
})

test('rejects a guide sitemap lastmod that differs from the page source date', async () => {
  await withValidFixture(async (root) => {
    await writeFixtureFile(root, 'sitemap-0.xml', `<?xml version="1.0"?><urlset><url><loc>https://cc.bruniaux.com/releases/</loc><lastmod>${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}</lastmod></url><url><loc>https://cc.bruniaux.com/guide/architecture/</loc><lastmod>2026-10-19T00:00:00.000Z</lastmod></url></urlset>`)

    assert.deepEqual(check(root, new Map([[ROUTE, '2026-10-17']])), [`sitemap: expected ${ROUTE} lastmod 2026-10-17, found 2026-10-19T00:00:00.000Z`])
    assert.deepEqual(check(root, new Map([[ROUTE, '2026-10-19']])), [])
  })
})

test('rejects a releases H1 that does not announce the version in its title', async () => {
  await withValidFixture(async (root) => {
    const releases = (h1: string) => validHtml('/releases/')
      .replace('Claude Code Architecture Reference', 'Claude Code Latest Version v2.1.302 | Release History')
      .replace('A practical Claude Code architecture reference for reliable agent engineering decisions.', 'Claude Code v2.1.302 release notes, history and breaking changes.')
      .replace('<h1 id="_top">Claude Code Architecture</h1>', `<h1>${h1}</h1>`)

    await writeFixtureFile(root, 'releases/index.html', releases('Claude Code releases'))
    assert.deepEqual(check(root), ['/releases/: H1 does not announce v2.1.302'])

    await writeFixtureFile(root, 'releases/index.html', releases('Claude Code latest version: v2.1.302'))
    assert.deepEqual(check(root), [])
  })
})

test('rejects the French full guide declared in English', async () => {
  await withValidFixture(async (root) => {
    const french = (lang: string) => distinctPage('/guide/ultimate-guidefr/', 'Le guide ultime de Claude Code | Claude Code Guide', 'Guide complet et autonome pour maîtriser Claude Code, du débutant au power user.')
      .replace('<html lang="en">', `<html lang="${lang}">`)

    await writeFixtureFile(root, 'guide/ultimate-guidefr/index.html', french('en'))
    assert.deepEqual(check(root), ['/guide/ultimate-guidefr/: expected lang="fr", found "en"'])

    await writeFixtureFile(root, 'guide/ultimate-guidefr/index.html', french('fr').replace('</main>', '</main><script type="application/ld+json">{"inLanguage":"en"}</script>'))
    assert.deepEqual(check(root), ['/guide/ultimate-guidefr/: JSON-LD inLanguage is "en", expected "fr"'])

    await writeFixtureFile(root, 'guide/ultimate-guidefr/index.html', french('fr').replace('</main>', '</main><script type="application/ld+json">{"inLanguage":"fr"}</script>'))
    assert.deepEqual(check(root), [])
  })
})

test('rejects source dates that no built page uses, which signals a slug mapping drift', async () => {
  await withValidFixture(async (root) => {
    assert.deepEqual(check(root, new Map([['/guide/architecture/', '2026-10-17']])), [])
    assert.deepEqual(check(root, new Map([['/guide/architecture.fr/', '2026-10-17']])), [
      'guide dates: /guide/architecture.fr/ has a source date but no built page',
    ])
    assert.deepEqual(check(root, new Map()), ['guide dates: no source dates were read from the generated guide content'])
  })
})
