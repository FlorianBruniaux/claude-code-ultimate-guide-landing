import assert from 'node:assert/strict'
import test from 'node:test'

test('the footer Ecosystem column lists every project of the manifest except this site', async () => {
  const { PERSONAL_PROJECTS } = await import('./personal-projects.generated.ts')
  const { getFooterEcosystemProjects } = await import('./footer-ecosystem.ts')
  const listed = getFooterEcosystemProjects().map((project) => project.id)
  const expected: string[] = PERSONAL_PROJECTS.map((project) => project.id).filter((id) => id !== 'claude-code-guide')

  for (const id of ['agent-router', 'agent-router-core', 'claude-code-plugins', 'wt-sweep', 'agentsec-triage', 'paper-insights']) {
    assert.ok(listed.includes(id), `${id} is in the footer`)
  }
  assert.deepEqual(listed, expected)
})

test('footer project names share one lowercase style', async () => {
  const { getFooterEcosystemProjects } = await import('./footer-ecosystem.ts')
  for (const project of getFooterEcosystemProjects()) {
    assert.equal(project.label, project.label.toLowerCase(), project.id)
  }
})

test('the Soon flag mirrors the manifest status, and Agent Router is released', async () => {
  const { PERSONAL_PROJECTS } = await import('./personal-projects.generated.ts')
  const { getFooterEcosystemProjects } = await import('./footer-ecosystem.ts')
  const status = new Map<string, unknown>(PERSONAL_PROJECTS.map((project) => [project.id, 'status' in project ? project.status : undefined]))

  for (const project of getFooterEcosystemProjects()) {
    assert.equal(project.soon, status.get(project.id) === 'soon', project.id)
  }
  const router = getFooterEcosystemProjects().find((project) => project.id === 'agent-router')
  assert.equal(router?.soon, false)
  assert.equal(router?.href, 'https://github.com/FlorianBruniaux/agent-router')
})
