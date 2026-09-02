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

test('adds three canonical galaxy projects only to Build, Scale, and Resources', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const { PERSONAL_PROJECTS } = await import('./personal-projects.generated.ts')
  const expected = {
    build: ['ctxharness', 'flow-lean', 'cc-copilot-bridge'],
    scale: ['cc-skill-usage', 'ccboard', 'agentsec-triage'],
    resources: ['cc-sessions', 'rtk', 'claude-code-plugins'],
  } as const
  const canonicalById = new Map(PERSONAL_PROJECTS.map(project => [project.id, project]))

  for (const section of navigationSections) {
    const galaxy = 'galaxy' in section ? section.galaxy : undefined
    const expectedIds = section.id in expected
      ? expected[section.id as keyof typeof expected]
      : undefined

    if (!expectedIds) {
      assert.equal(galaxy, undefined, `${section.id} must not carry an unrelated galaxy block`)
      continue
    }

    assert.ok(galaxy)
    assert.equal(galaxy.label, "From Florian's open-source galaxy")
    assert.deepEqual(galaxy.projects.map(project => project.id), expectedIds)
    assert.ok(galaxy.projects.length <= 3)
    assert.equal(new Set(galaxy.projects.map(project => project.id)).size, galaxy.projects.length)

    for (const project of galaxy.projects) {
      assert.equal(project.href, canonicalById.get(project.id)?.href)
    }
  }
})

test('puts skill usage first in Scale with decision-ready facets', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const scale = navigationSections.find(section => section.id === 'scale')

  assert.ok(scale && 'galaxy' in scale && scale.galaxy)
  assert.deepEqual(scale.galaxy.projects[0], {
    id: 'cc-skill-usage',
    label: 'cc-skill-usage',
    href: 'https://github.com/FlorianBruniaux/cc-skill-usage',
    facets: ['Skill Analytics', 'Local-first', 'Observability'],
  })
})

test('links Team Adoption directly to the shared Start Build Scale explanation', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const scale = navigationSections.find(section => section.id === 'scale')
  const adoption = scale?.groups.flatMap(group => group.links).find(link => link.label === 'Team Adoption')

  assert.equal(
    adoption?.href,
    '/guide/adoption-approaches/#start-build-scale-a-practical-navigation-layer',
  )
})
