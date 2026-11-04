import assert from 'node:assert/strict'
import test from 'node:test'

// Every href the menu exposed before the Essentials / Go further redesign
// (November 2026). The new menu must keep each of them reachable.
const PREVIOUS_MENU_HREFS = [
  '/guide/', '/guide/mistral-large-4/', '/guide/translations/', '/guide/agent-harness-landscape/',
  '/guide/practitioner-insights/', '/guide/workflows/monitor-event-delegation/',
  '/guide/workflows/agentic-software-factories/', '/guide/workflows/team-ai-instructions/',
  '/guide/ultimate-guide/01-quick-start/', '/learning/', '/quiz/', '/roles/',
  '/guide/for-product-managers/', '/guide/for-tech-leads/', '/guide/for-cto/', '/guide/for-cio-ceo/',
  '/learning/#security-practitioner', '/guide/loop-graph-engineering/', '/ai-design-patterns/', '/context/',
  '/context-engineering/', '/memory-systems/', '/guide/workflows/', '/methodologies/', '/mcp/',
  '/guide/claude-code-guide-mcp/', '/mcp-or-cli/', '/ecosystem/mcp-vs-cli/', '/ecosystem/',
  '/claude-md-best-practices/', '/compare/', '/security/', '/guide/agent-harness/', '/guide/agent-evaluation/',
  '/guide/observability/', '/guide/production-safety/', '/guide/data-privacy/', '/guide/enterprise-governance/',
  '/guide/adoption-approaches/', '/team-metrics/', '/lean-ai/', '/guide/team-knowledge-base/', '/finops/',
  '/token-savings/', '/guide/subscription-strategy/', '/guide/ai-unit-economics/', '/resources/', '/cheatsheet/',
  '/cheatsheets/', '/examples/', '/diagrams/', '/glossary/', '/whitepapers/', '/downloads/', '/faq/', '/projects/',
  'https://www.florian.bruniaux.com/blog/', '/changelog/', '/releases/', '/rss.xml',
]

test('routes each page to the section that owns it in the bar', async () => {
  const { getActiveNavigation } = await import('./header-navigation.ts')

  const cases = [
    ['/', null],
    ['/guide/', 'guide'],
    ['/guide/known-issues/', 'guide'],
    ['/guide/ultimate-guide/01-quick-start/', 'start'],
    ['/roles/', 'start'],
    ['/learning/', 'start'],
    ['/mcp/', 'build'],
    ['/guide/claude-code-guide-mcp/', 'build'],
    ['/context/', 'build'],
    ['/guide/workflows/', 'build'],
    ['/guide/workflows/monitor-event-delegation/', 'build'],
    ['/guide/agent-harness/', 'scale'],
    ['/team-metrics/', 'scale'],
    ['/security/', 'security'],
    ['/security/cves/', 'security'],
    ['/guide/production-safety/', 'security'],
    ['/resources/', 'resources'],
    ['/whitepapers/', 'resources'],
    ['/changelog/', 'resources'],
    ['/releases/', 'resources'],
    ['/guide/translations/', 'resources'],
  ] as const

  for (const [path, expected] of cases) {
    assert.equal(getActiveNavigation(path), expected, path)
  }
})

test('the bar reads Guide, Start, Build, Scale, Security, Resources', async () => {
  const { guideNavigationLink, navigationSections } = await import('./header-navigation.ts')
  assert.deepEqual(
    [guideNavigationLink.label, ...navigationSections.map((section) => section.label)],
    ['Guide', 'Start', 'Build', 'Scale', 'Security', 'Resources'],
  )
  assert.equal(guideNavigationLink.href, '/guide/')
})

test('every panel opens on four Essentials', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  for (const section of navigationSections) {
    assert.equal(section.essentials.length, 4, section.id)
  }
})

test('every link of the previous menu stays reachable, and no destination is listed twice', async () => {
  const { getSectionLinks, guideNavigationLink, navigationSections } = await import('./header-navigation.ts')
  const hrefs = [guideNavigationLink.href, ...navigationSections.flatMap((section) => getSectionLinks(section).map((link) => link.href))]

  for (const href of PREVIOUS_MENU_HREFS) assert.ok(hrefs.includes(href), `${href} is still in the menu`)
  assert.equal(new Set(hrefs).size, hrefs.length, 'a destination appears once')
})

test('Updates live in Resources as a What\'s new column', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const resources = navigationSections.find((section) => section.id === 'resources')
  const whatsNew = resources?.groups.find((group) => group.label === "What's new")
  assert.deepEqual(whatsNew?.links.map((link) => link.href), ['/changelog/', '/releases/', '/rss.xml'])
})

test('canonical labels: Cheat Sheet, Recap Cards, Ebooks', async () => {
  const { getSectionLinks, navigationSections } = await import('./header-navigation.ts')
  const labels = new Map(navigationSections.flatMap(getSectionLinks).map((link) => [link.href, link.label]))
  assert.equal(labels.get('/cheatsheet/'), 'Cheat Sheet')
  assert.equal(labels.get('/cheatsheets/'), 'Recap Cards')
  assert.equal(labels.get('/whitepapers/'), 'Ebooks')
  assert.equal(labels.get('/mcp/'), 'Claude Code Guide MCP Server')
  assert.equal(labels.get('/guide/agent-harness/'), 'Agent Harness Engineering')
  assert.equal(labels.get('/compare/'), 'AI Coding Tools Comparison')
})

test('Security has its own panel with the hub as overview', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const security = navigationSections.find((section) => section.id === 'security')
  assert.equal(security?.overview?.href, '/security/')
  assert.deepEqual(security?.essentials.map((link) => link.href), [
    '/security/threats/', '/security/cves/', '/security/hardening/', '/security/sandbox/',
  ])
})

test('Go further fills four columns without stacking a long group', async () => {
  const { getFurtherSpans, navigationSections } = await import('./header-navigation.ts')
  const spans = Object.fromEntries(navigationSections.map((section) => [section.id, getFurtherSpans(section.groups)]))
  assert.deepEqual(spans, {
    start: [4],
    build: [1, 2, 1],
    scale: [1, 3],
    security: [2],
    resources: [1, 1, 1, 1],
  })
  for (const section of navigationSections) {
    const columns = getFurtherSpans(section.groups)
    section.groups.forEach((group, index) => {
      assert.ok(Math.ceil(group.links.length / columns[index]) <= 5, `${section.id} / ${group.label} stays short`)
    })
  }
})

test('project strips stay on Build, Scale and Resources', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  assert.deepEqual(
    navigationSections.filter((section) => section.projects).map((section) => [section.id, section.projects]),
    [['build', 'build'], ['scale', 'scale'], ['resources', 'resources']],
  )
})

test('exposes Sponsor as a primary navigation action', async () => {
  const navigation = await import('./header-navigation.ts')
  assert.deepEqual(navigation.getHeaderActionLinks('navigation'), [
    {
      href: 'https://www.florian.bruniaux.com/sponsor/',
      label: 'Sponsor',
      external: true,
    },
  ])
})
