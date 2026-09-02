import assert from 'node:assert/strict'
import test from 'node:test'

test('selects only featured Build and Scale projects from generated route data', async () => {
  const { getEcosystemMenuProjects } = await import('./ecosystem-discovery.ts')

  assert.deepEqual(
    getEcosystemMenuProjects('build').map((project) => project.id),
    ['cc-copilot-bridge', 'rtk'],
  )
  assert.deepEqual(
    getEcosystemMenuProjects('scale').map((project) => project.id),
    ['ccboard', 'cc-skill-usage'],
  )
})

test('keeps every enabled ecosystem menu strip within its supported project range', async () => {
  const { ecosystemMenuProjects } = await import('./ecosystem-discovery.ts')

  for (const projects of Object.values(ecosystemMenuProjects)) {
    assert.ok(projects.length >= 1 && projects.length <= 3)
  }
})

test('describes each external ecosystem project link with its title, format, and new-tab behavior', async () => {
  const { getEcosystemProjectAccessibleLabel, getEcosystemMenuProjects } = await import('./ecosystem-discovery.ts')
  const [project] = getEcosystemMenuProjects('build')

  assert.equal(
    getEcosystemProjectAccessibleLabel(project),
    'CC-Copilot Bridge, CLI router. Opens in a new tab.',
  )
})
