import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEEP_TOPICS,
  FEATURED_PROJECTS,
  FLAGSHIP_RESOURCES,
  GUIDE_DOWNLOADS,
  HOMEPAGE_METRICS,
  RELATED_PROJECTS,
  START_PATHS,
} from './homepage-content.ts'

function assertUnique(values: string[], label: string) {
  assert.equal(new Set(values).size, values.length, `${label} must be unique`)
}

test('homepage resource metrics stay aligned with their canonical datasets', () => {
  assert.deepEqual(HOMEPAGE_METRICS, {
    whitepaperCount: 13,
    recapCardCount: 58,
    diagramCount: 49,
  })
})

test('all four guide downloads remain directly available', () => {
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

test('homepage discovery blocks remain intentionally small', () => {
  assert.equal(FLAGSHIP_RESOURCES.length, 4)
  assert.equal(DEEP_TOPICS.length, 4)
  assertUnique(FLAGSHIP_RESOURCES.map((resource) => resource.href), 'flagship hrefs')
  assertUnique(DEEP_TOPICS.map((topic) => topic.href), 'deep topic hrefs')

  const ultimateGuide = FLAGSHIP_RESOURCES.find((resource) => resource.title === 'Ultimate Guide')
  assert.equal(ultimateGuide?.href, '/guide/')
})

test('the homepage features four canonical projects while the projects hub exposes five routes and 16 projects', () => {
  assert.equal(FEATURED_PROJECTS.length, 4)
  assert.equal(RELATED_PROJECTS.length, 16)
  assert.equal(new Set(RELATED_PROJECTS.map((project) => project.route)).size, 5)
  assert.ok(FEATURED_PROJECTS.every((project) => project.featured))
  assert.ok(FEATURED_PROJECTS.some((project) => project.id === 'cc-skill-usage'))
  assertUnique(RELATED_PROJECTS.map((project) => project.href), 'project hrefs')

  const rtk = RELATED_PROJECTS.find((project) => project.id === 'rtk')
  assert.equal(rtk?.github, 'https://github.com/rtk-ai/rtk')
  assert.equal(rtk?.website, 'https://www.rtk-ai.app/')
})
