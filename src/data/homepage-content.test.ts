import assert from 'node:assert/strict'
import test from 'node:test'

import {
  FEATURED_PROJECTS,
  GUIDE_DOWNLOADS,
  HOMEPAGE_ESSENTIALS,
  HOMEPAGE_GO_FURTHER,
  HOMEPAGE_METRICS,
  RELATED_PROJECTS,
  RESOURCE_CATALOG,
  START_PATHS,
} from './homepage-content.ts'

function assertUnique(values: string[], label: string) {
  assert.equal(new Set(values).size, values.length, `${label} must be unique`)
}

test('homepage resource metrics stay aligned with their canonical datasets', () => {
  assert.deepEqual(HOMEPAGE_METRICS, {
    whitepaperCount: 13,
    recapCardCount: 58,
    diagramCount: 50,
  })
})

test('only published guide editions expose download links', () => {
  assert.equal(GUIDE_DOWNLOADS.length, 4)
  assertUnique(GUIDE_DOWNLOADS.map((download) => download.id), 'download ids')
  assert.deepEqual(
    new Set(GUIDE_DOWNLOADS.map((download) => download.language)),
    new Set(['EN', 'FR']),
  )
  assert.deepEqual(
    new Set(GUIDE_DOWNLOADS.map((download) => download.format)),
    new Set(['PDF', 'EPUB']),
  )
  for (const download of GUIDE_DOWNLOADS) {
    assert.match(download.href, /^https:\/\/github\.com\//)
  }
})

test('the homepage exposes three distinct start paths', () => {
  assert.equal(START_PATHS.length, 3)
  assertUnique(START_PATHS.map((path) => path.id), 'start path ids')
  assertUnique(START_PATHS.map((path) => path.href), 'start path hrefs')
  for (const path of START_PATHS) assert.equal(path.steps.length, 3)
})

test('the "Find one answer fast" path opens the cheat sheet, not the resource hub', () => {
  const answer = START_PATHS.find((path) => path.id === 'answer')
  assert.equal(answer?.href, '/cheatsheet/')
})

test('homepage Essentials hold four cards with Security once and the Quiz included', () => {
  assert.equal(HOMEPAGE_ESSENTIALS.length, 4)
  assertUnique(HOMEPAGE_ESSENTIALS.map((resource) => resource.href), 'essential hrefs')
  assert.deepEqual(HOMEPAGE_ESSENTIALS.map((resource) => resource.href), ['/guide/', '/examples/', '/quiz/', '/security/'])
  assert.equal(HOMEPAGE_GO_FURTHER.length, 4)
  const all = [...HOMEPAGE_ESSENTIALS, ...HOMEPAGE_GO_FURTHER].map((item) => item.href)
  assert.equal(all.filter((href) => href === '/security/').length, 1)
  assertUnique(all, 'homepage discovery hrefs')
})

test('the resources hub catalog still lists the cheat sheet and the security database', () => {
  const hrefs: string[] = RESOURCE_CATALOG.map((resource) => resource.href)
  assertUnique(hrefs, 'resource catalog hrefs')
  for (const href of ['/guide/', '/cheatsheet/', '/examples/', '/security/', '/quiz/']) assert.ok(hrefs.includes(href), href)
})

test('the homepage features five canonical projects while the projects hub exposes five routes and 20 projects', () => {
  assert.equal(FEATURED_PROJECTS.length, 5)
  assert.equal(RELATED_PROJECTS.length, 20)
  assert.equal(new Set(RELATED_PROJECTS.map((project) => project.route)).size, 5)
  assert.ok(FEATURED_PROJECTS.every((project) => project.featured))
  assert.ok(FEATURED_PROJECTS.some((project) => project.id === 'cc-skill-usage'))
  assert.ok(FEATURED_PROJECTS.some((project) => project.id === 'agent-router'))
  assertUnique(RELATED_PROJECTS.map((project) => project.href), 'project hrefs')

  const rtk = RELATED_PROJECTS.find((project) => project.id === 'rtk')
  assert.equal(rtk?.github, 'https://github.com/rtk-ai/rtk')
  assert.equal(rtk?.website, 'https://www.rtk-ai.app/')
})
