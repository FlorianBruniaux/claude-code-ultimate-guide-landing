import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import {
  initEcosystemAnalytics,
  type EcosystemAnalyticsWindow,
  type EcosystemClickPayload,
} from './ecosystem-analytics.ts'

interface EventRecord {
  name: string
  payload: EcosystemClickPayload
}

function fixture(markup: string, url = 'https://cc.bruniaux.com/guide/getting-started/') {
  const window = new Window({ url })
  window.document.body.innerHTML = markup
  return { window, document: window.document as unknown as Document }
}

test('emits one ecosystem event with the required click context', () => {
  const { window, document } = fixture(`
    <a href="https://example.com/project" data-ecosystem-project-id="project-alpha" data-ecosystem-placement="header" data-ecosystem-menu="resources">
      <span>Project Alpha</span>
    </a>`)
  const events: EventRecord[] = []
  const analyticsWindow = window as unknown as EcosystemAnalyticsWindow
  analyticsWindow.gtag = (command, eventName, payload) => {
    if (command === 'event') events.push({ name: eventName, payload })
  }

  initEcosystemAnalytics(document, analyticsWindow)
  document.querySelector('span')?.dispatchEvent(new window.Event('click', { bubbles: true }) as unknown as Event)

  assert.deepEqual(events, [{
    name: 'ecosystem_project_click',
    payload: {
      project_id: 'project-alpha',
      placement: 'header',
      menu: 'resources',
      source_page: '/guide/getting-started/',
    },
  }])
})

test('does not duplicate an event when initialized more than once', () => {
  const { window, document } = fixture('<a href="/project" data-ecosystem-project-id="project-alpha" data-ecosystem-placement="header" data-ecosystem-menu="resources">Project Alpha</a>')
  const events: EventRecord[] = []
  const analyticsWindow = window as unknown as EcosystemAnalyticsWindow
  analyticsWindow.gtag = (command, eventName, payload) => {
    if (command === 'event') events.push({ name: eventName, payload })
  }

  initEcosystemAnalytics(document, analyticsWindow)
  initEcosystemAnalytics(document, analyticsWindow)
  document.querySelector('a')?.click()

  assert.equal(events.length, 1)
})

test('uses the forwarded data layer when gtag is unavailable', () => {
  const { window, document } = fixture('<a href="/project" data-ecosystem-project-id="project-alpha" data-ecosystem-placement="header" data-ecosystem-menu="resources">Project Alpha</a>')
  const dataLayer: Array<['event', string, EcosystemClickPayload]> = []
  const analyticsWindow = window as unknown as EcosystemAnalyticsWindow
  analyticsWindow.dataLayer = dataLayer

  initEcosystemAnalytics(document, analyticsWindow)
  document.querySelector('a')?.click()

  assert.deepEqual(dataLayer, [[
    'event',
    'ecosystem_project_click',
    {
      project_id: 'project-alpha',
      placement: 'header',
      menu: 'resources',
      source_page: '/guide/getting-started/',
    },
  ]])
})

test('ignores links without complete ecosystem metadata and missing analytics', () => {
  const { window, document } = fixture(`
    <a href="/missing" data-ecosystem-project-id="project-alpha" data-ecosystem-placement="header">Missing menu</a>
    <a href="/irrelevant">Irrelevant</a>
    <a href="/valid" data-ecosystem-project-id="project-beta" data-ecosystem-placement="menu" data-ecosystem-menu="tools">Valid</a>`)
  const events: EventRecord[] = []
  const analyticsWindow = window as unknown as EcosystemAnalyticsWindow
  analyticsWindow.gtag = (command, eventName, payload) => {
    if (command === 'event') events.push({ name: eventName, payload })
  }

  initEcosystemAnalytics(document, analyticsWindow)
  document.querySelector<HTMLAnchorElement>('[href="/missing"]')?.click()
  document.querySelector<HTMLAnchorElement>('[href="/irrelevant"]')?.click()
  delete analyticsWindow.gtag
  document.querySelector<HTMLAnchorElement>('[href="/valid"]')?.click()

  assert.deepEqual(events, [])
})

test('does not throw when the analytics collector is blocked', () => {
  const { window, document } = fixture('<a href="/project" data-ecosystem-project-id="project-alpha" data-ecosystem-placement="header" data-ecosystem-menu="resources">Project Alpha</a>')
  const analyticsWindow = window as unknown as EcosystemAnalyticsWindow
  analyticsWindow.gtag = () => { throw new Error('blocked') }
  let clickHandler: ((event: Event) => void) | undefined
  const root = {
    addEventListener(_type: string, handler: (event: Event) => void) {
      clickHandler = handler
    },
  } as unknown as Document

  initEcosystemAnalytics(root, analyticsWindow)

  assert.doesNotThrow(() => clickHandler?.({ target: document.querySelector('a') } as Event))
})
