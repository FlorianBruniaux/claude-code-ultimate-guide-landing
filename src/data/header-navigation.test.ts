import assert from 'node:assert/strict'
import test from 'node:test'

test('routes product goals to the matching top-level navigation intent', async () => {
  const { getActiveNavigation } = await import('./header-navigation.ts')

  const cases = [
    ['/', null],
    ['/guide/', 'guide'],
    ['/guide/ultimate-guide/01-quick-start/', 'start'],
    ['/roles/', 'start'],
    ['/mcp/', 'build'],
    ['/guide/claude-code-guide-mcp/', 'build'],
    ['/context/', 'build'],
    ['/security/', 'scale'],
    ['/guide/agent-harness/', 'scale'],
    ['/team-metrics/', 'scale'],
    ['/resources/', 'resources'],
    ['/whitepapers/', 'resources'],
    ['/changelog/', 'updates'],
    ['/releases/', 'updates'],
    ['/guide/known-issues/', 'guide'],
    ['/guide/translations/', 'guide'],
    ['/guide/agent-harness-landscape/', 'guide'],
    ['/guide/workflows/monitor-event-delegation/', 'build'],
  ] as const

  for (const [path, expected] of cases) {
    assert.equal(getActiveNavigation(path), expected, path)
  }
})

test('builds Guide from noteworthy pages not already exposed by another menu', async () => {
  const { guideNavigationSection, navigationSections } = await import('./header-navigation.ts')

  assert.ok(guideNavigationSection)
  assert.equal(guideNavigationSection.id, 'guide')
  assert.deepEqual(guideNavigationSection.overview, {
    href: '/guide/',
    label: 'Browse the complete guide',
  })
  assert.deepEqual(
    guideNavigationSection.groups.map((group) => ({
      label: group.label,
      hrefs: group.links.map((link) => link.href),
    })),
    [
      {
        label: 'Latest references',
        hrefs: [
          '/guide/translations/',
          '/guide/agent-harness-landscape/',
          '/guide/practitioner-insights/',
        ],
      },
      {
        label: 'New workflows',
        hrefs: [
          '/guide/workflows/monitor-event-delegation/',
          '/guide/workflows/agentic-software-factories/',
          '/guide/workflows/team-ai-instructions/',
        ],
      },
    ],
  )

  const occupiedHrefs = new Set(
    navigationSections.flatMap((section) =>
      section.groups.flatMap((group) => group.links.map((link) => link.href)),
    ),
  )
  for (const link of guideNavigationSection.groups.flatMap((group) => group.links)) {
    assert.equal(occupiedHrefs.has(link.href), false, `${link.href} must only appear in Guide`)
  }
})

test('keeps reliability separate from organization and economics inside Scale', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const scale = navigationSections.find((section) => section.id === 'scale')

  assert.ok(scale)
  assert.deepEqual(scale.groups.map((group) => group.label), [
    'Reliability',
    'Organization & Economics',
  ])
  assert.deepEqual(scale.groups[0].links.map((link) => link.href), [
    '/security/',
    '/guide/agent-harness/',
    '/guide/agent-evaluation/',
    '/guide/observability/',
    '/guide/production-safety/',
    '/guide/data-privacy/',
  ])
})

test('exposes the MCP product and technical guide from Build without duplicate destinations', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const build = navigationSections.find((section) => section.id === 'build')

  assert.ok(build)
  const buildLinks = build.groups.flatMap((group) => group.links)
  assert.ok(buildLinks.some((link) => link.href === '/mcp/' && link.label === 'Claude Code Guide MCP Server'))
  assert.ok(buildLinks.some((link) => link.href === '/guide/claude-code-guide-mcp/' && link.label === 'MCP Technical Guide'))

  const allInternalHrefs = navigationSections
    .flatMap((section) => section.groups)
    .flatMap((group) => group.links)
    .filter((link) => !link.external)
    .map((link) => link.href)

  assert.equal(new Set(allInternalHrefs).size, allInternalHrefs.length)
})

test('uses destination-specific anchor text for priority menu links', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const links = navigationSections.flatMap((section) =>
    section.groups.flatMap((group) => group.links),
  )
  const labelsByHref = new Map(links.map((link) => [link.href, link.label]))

  assert.equal(labelsByHref.get('/security/'), 'AI Agent Security')
  assert.equal(labelsByHref.get('/mcp/'), 'Claude Code Guide MCP Server')
  assert.equal(labelsByHref.get('/guide/agent-harness/'), 'Agent Harness Engineering')
  assert.equal(labelsByHref.get('/compare/'), 'AI Coding Tools Comparison')
})

test('exposes Sponsor as a primary navigation action', async () => {
  const navigation = await import('./header-navigation.ts')

  assert.equal(typeof navigation.getHeaderActionLinks, 'function')

  const expected = [
    {
      href: 'https://www.florian.bruniaux.com/sponsor/',
      label: 'Sponsor',
      external: true,
    },
  ]

  assert.deepEqual(navigation.getHeaderActionLinks('navigation'), expected)
})
