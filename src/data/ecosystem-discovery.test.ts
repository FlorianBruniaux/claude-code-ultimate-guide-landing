import assert from 'node:assert/strict'
import test from 'node:test'

test('selects only featured Build and Scale projects from generated route data', async () => {
  const { getEcosystemMenuProjects } = await import('./ecosystem-discovery.ts')

  assert.deepEqual(
    getEcosystemMenuProjects('build').map((project) => project.id),
    ['cc-copilot-bridge', 'agent-router', 'rtk'],
  )
  assert.deepEqual(
    getEcosystemMenuProjects('scale').map((project) => project.id),
    ['ccboard', 'cc-skill-usage'],
  )
})

test('keeps the Build and Scale menu strips within their supported project range', async () => {
  const { ecosystemMenuProjects } = await import('./ecosystem-discovery.ts')

  for (const projects of [ecosystemMenuProjects.build, ecosystemMenuProjects.scale]) {
    assert.ok(projects.length >= 1 && projects.length <= 3)
  }
})

test('lists every other author project in the Resources menu, once, without the guide itself', async () => {
  const { ecosystemMenuProjects } = await import('./ecosystem-discovery.ts')
  const { PERSONAL_PROJECTS } = await import('./personal-projects.generated.ts')
  const resources = ecosystemMenuProjects.resources.map((project) => project.id)
  const featured = [...ecosystemMenuProjects.build, ...ecosystemMenuProjects.scale].map((project) => project.id)

  assert.ok(resources.includes('wt-sweep'))
  assert.ok(resources.includes('agentsec-triage'))
  assert.ok(!resources.includes('claude-code-guide'))
  assert.ok(resources.every((id) => !featured.includes(id)))
  assert.deepEqual(
    [...resources, ...featured, 'claude-code-guide'].sort(),
    PERSONAL_PROJECTS.map((project) => project.id).sort(),
  )
})

test('describes each external ecosystem project link with its title, format, and new-tab behavior', async () => {
  const { getEcosystemProjectAccessibleLabel, getEcosystemMenuProjects } = await import('./ecosystem-discovery.ts')
  const [project] = getEcosystemMenuProjects('build')

  assert.equal(
    getEcosystemProjectAccessibleLabel(project),
    'CC-Copilot Bridge, CLI router. Opens in a new tab.',
  )
})

test('Agent Router is released: it links to its repository without the Soon mark', async () => {
  const { getEcosystemProjectAccessibleLabel, getEcosystemMenuProjects, isComingSoon } = await import('./ecosystem-discovery.ts')
  const project = getEcosystemMenuProjects('build').find((candidate) => candidate.id === 'agent-router')

  assert.ok(project)
  assert.equal(isComingSoon(project), false)
  assert.equal(project.href, 'https://github.com/FlorianBruniaux/agent-router')
  assert.equal(getEcosystemProjectAccessibleLabel(project), 'Agent Router, CLI. Opens in a new tab.')
})

test('a project marked soon in the manifest says so in its label', async () => {
  const { getEcosystemProjectAccessibleLabel, getEcosystemMenuProjects, isComingSoon } = await import('./ecosystem-discovery.ts')
  const released = getEcosystemMenuProjects('build')[0]
  const upcoming = { ...released, status: 'soon' } as unknown as typeof released

  assert.equal(isComingSoon(released), false)
  assert.equal(isComingSoon(upcoming), true)
  assert.match(getEcosystemProjectAccessibleLabel(upcoming), /, coming soon, /)
})
