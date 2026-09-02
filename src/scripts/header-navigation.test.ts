import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

function createHeaderFixture() {
  const window = new Window({ url: 'https://cc.bruniaux.com/' })
  window.document.body.innerHTML = `
    <header data-site-header>
      <div class="mobile-menu-backdrop" data-mobile-menu-close aria-hidden="true"></div>
      <div id="primary-navigation" class="primary-navigation hidden" aria-hidden="true">
        <button type="button" data-mobile-menu-close>Close navigation</button>
        <nav aria-label="Main navigation">
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
      </div>
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

test('the mobile trigger presents the navigation tree as a modal drawer only while open', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const toggle = window.document.querySelector('#mobile-menu-toggle') as unknown as HTMLButtonElement
  const menu = window.document.querySelector('#primary-navigation') as unknown as HTMLElement

  assert.equal(menu.querySelectorAll('a[href="/mcp/"]').length, 1)

  toggle.click()
  assert.equal(toggle.getAttribute('aria-expanded'), 'true')
  assert.equal(toggle.getAttribute('aria-label'), 'Close main navigation')
  assert.equal(menu.classList.contains('hidden'), false)
  assert.equal(menu.getAttribute('role'), 'dialog')
  assert.equal(menu.getAttribute('aria-modal'), 'true')
  assert.equal(menu.getAttribute('aria-hidden'), 'false')
  assert.equal(window.document.body.hasAttribute('data-global-menu-expanded'), true)

  toggle.click()
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
  assert.equal(toggle.getAttribute('aria-label'), 'Open main navigation')
  assert.equal(menu.classList.contains('hidden'), true)
  assert.equal(menu.getAttribute('aria-hidden'), 'true')
  assert.equal(window.document.body.hasAttribute('data-global-menu-expanded'), false)
})

test('mobile drawer dismiss controls and navigation links close it', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const toggle = window.document.querySelector('#mobile-menu-toggle') as unknown as HTMLButtonElement
  const menu = window.document.querySelector('#primary-navigation') as unknown as HTMLElement
  const closeButton = menu.querySelector('[data-mobile-menu-close]') as unknown as HTMLButtonElement
  const backdrop = window.document.querySelector('.mobile-menu-backdrop') as unknown as HTMLElement
  const link = menu.querySelector('a[href="/mcp/"]') as unknown as HTMLAnchorElement

  toggle.click()
  closeButton.click()
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
  assert.equal(window.document.activeElement, toggle)

  toggle.click()
  backdrop.click()
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
  assert.equal(window.document.activeElement, toggle)

  toggle.click()
  link.addEventListener('click', (event) => event.preventDefault(), { once: true })
  link.dispatchEvent(new window.MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }) as unknown as Event)
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
})

test('tabbing cycles between the mobile trigger and the drawer contents', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  initHeaderNavigation(window.document as unknown as Document)

  const toggle = window.document.querySelector('#mobile-menu-toggle') as unknown as HTMLButtonElement
  const menu = window.document.querySelector('#primary-navigation') as unknown as HTMLElement
  const firstControl = menu.querySelector('button') as unknown as HTMLButtonElement

  toggle.click()
  firstControl.focus()
  firstControl.dispatchEvent(new window.KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey: true,
    bubbles: true,
  }) as unknown as Event)
  assert.equal(window.document.activeElement, toggle)

  toggle.dispatchEvent(new window.KeyboardEvent('keydown', {
    key: 'Tab',
    bubbles: true,
  }) as unknown as Event)
  assert.equal(window.document.activeElement === firstControl, true)
})

test('crossing the desktop breakpoint resets the open mobile navigation state', async () => {
  const { initHeaderNavigation } = await import('./header-navigation.ts')
  const window = createHeaderFixture()
  const desktopQuery = new window.EventTarget()

  Object.defineProperty(window, 'matchMedia', {
    value: () => desktopQuery,
  })

  initHeaderNavigation(window.document as unknown as Document)

  const toggle = window.document.querySelector('#mobile-menu-toggle') as unknown as HTMLButtonElement
  const menu = window.document.querySelector('#primary-navigation') as unknown as HTMLElement
  const buildTrigger = window.document.querySelector('[data-nav-trigger="build"]') as unknown as HTMLElement
  const buildSection = window.document.querySelector('[data-nav-section="build"]') as unknown as HTMLDetailsElement

  toggle.click()
  buildTrigger.click()
  assert.equal(menu.classList.contains('hidden'), false)
  assert.equal(buildSection.open, true)

  desktopQuery.dispatchEvent(new window.Event('change'))

  assert.equal(menu.classList.contains('hidden'), true)
  assert.equal(buildSection.open, false)
  assert.equal(buildTrigger.getAttribute('aria-expanded'), 'false')
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
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
  firstLink.dispatchEvent(new window.KeyboardEvent('keydown', {
    key: 'Tab',
    bubbles: true,
  }) as unknown as Event)

  assert.equal(buildSection.open, true)
})
