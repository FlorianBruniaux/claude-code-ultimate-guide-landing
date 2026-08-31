import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

function createHeaderFixture() {
  const window = new Window({ url: 'https://cc.bruniaux.com/' })
  window.document.body.innerHTML = `
    <header data-site-header>
      <nav id="primary-navigation" class="hidden">
        <a href="/guide/">Guide</a>
        <details data-nav-section="build">
          <summary data-nav-trigger="build" aria-expanded="false" aria-controls="nav-panel-build">Build</summary>
          <section id="nav-panel-build" data-nav-panel="build">
            <a href="/mcp/">Claude Code Guide MCP Server</a>
            <a href="/context/">Context</a>
          </section>
        </details>
        <details data-nav-section="scale">
          <summary data-nav-trigger="scale" aria-expanded="false" aria-controls="nav-panel-scale">Scale</summary>
          <section id="nav-panel-scale" data-nav-panel="scale">
            <a href="/security/">AI Agent Security</a>
            <a href="/team-metrics/">Team metrics</a>
          </section>
        </details>
      </nav>
      <button id="mobile-menu-toggle" aria-expanded="false" aria-controls="primary-navigation">Menu</button>
      <span id="menu-icon"></span>
      <span id="close-icon" class="hidden"></span>
    </header>
  `
  return window
}

test('opening a desktop intent closes the previously open intent', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const buildTrigger = window.document.querySelector('[data-nav-trigger="build"]') as unknown as HTMLButtonElement
  const scaleTrigger = window.document.querySelector('[data-nav-trigger="scale"]') as unknown as HTMLButtonElement
  const buildSection = window.document.querySelector('[data-nav-section="build"]') as unknown as HTMLDetailsElement
  const scaleSection = window.document.querySelector('[data-nav-section="scale"]') as unknown as HTMLDetailsElement

  buildTrigger.click()
  assert.equal(buildTrigger.getAttribute('aria-expanded'), 'true')
  assert.equal(buildSection.open, true)

  scaleTrigger.click()
  assert.equal(buildTrigger.getAttribute('aria-expanded'), 'false')
  assert.equal(buildSection.open, false)
  assert.equal(scaleTrigger.getAttribute('aria-expanded'), 'true')
  assert.equal(scaleSection.open, true)
})

test('keyboard users can enter and dismiss a desktop mega menu', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const buildTrigger = window.document.querySelector('[data-nav-trigger="build"]') as unknown as HTMLButtonElement
  const buildSection = window.document.querySelector('[data-nav-section="build"]') as unknown as HTMLDetailsElement
  const buildPanel = window.document.querySelector('[data-nav-panel="build"]') as unknown as HTMLElement
  const firstLink = buildPanel.querySelector('a') as HTMLAnchorElement

  buildTrigger.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }) as unknown as Event)
  assert.equal(buildSection.open, true)
  assert.equal(window.document.activeElement, firstLink)

  window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  assert.equal(buildSection.open, false)
  assert.equal(window.document.activeElement, buildTrigger)
})

test('the mobile trigger exposes the same navigation tree and locks page scroll only while open', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const toggle = window.document.querySelector('#mobile-menu-toggle') as unknown as HTMLButtonElement
  const menu = window.document.querySelector('#primary-navigation') as unknown as HTMLElement

  assert.equal(menu.querySelectorAll('a[href="/mcp/"]').length, 1)

  toggle.click()
  assert.equal(toggle.getAttribute('aria-expanded'), 'true')
  assert.equal(menu.classList.contains('hidden'), false)
  assert.equal(window.document.body.hasAttribute('data-global-menu-expanded'), true)

  toggle.click()
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
  assert.equal(menu.classList.contains('hidden'), true)
  assert.equal(window.document.body.hasAttribute('data-global-menu-expanded'), false)
})

test('tabbing through mobile links keeps the active accordion section open', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const toggle = window.document.querySelector('#mobile-menu-toggle') as unknown as HTMLButtonElement
  const buildTrigger = window.document.querySelector('[data-nav-trigger="build"]') as unknown as HTMLElement
  const buildSection = window.document.querySelector('[data-nav-section="build"]') as unknown as HTMLDetailsElement
  const firstLink = buildSection.querySelector('a') as HTMLAnchorElement

  toggle.click()
  buildTrigger.click()
  firstLink.focus()
  firstLink.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))

  assert.equal(buildSection.open, true)
})
