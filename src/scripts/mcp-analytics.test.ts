import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import test from 'node:test'
import ts from 'typescript'
import { Window } from 'happy-dom'
import { trackMcpEvent, initMcpPageActions } from './mcp-analytics.ts'

const terminal = readFileSync(new URL('../components/mcp/McpTerminal.astro', import.meta.url), 'utf8')

test('a successful MCP install copy emits metadata without command content', async () => {
  const window = new Window()
  window.document.body.innerHTML = `<div data-command-shell data-command="private-command" data-mcp-client="claude-code" data-mcp-version="1.3.5" data-mcp-position="client-setup">
    <button data-copy-command hidden>Copy command</button><p class="copy-status"></p></div>`
  const events: unknown[][] = []
  const code = terminal.match(/<script>([\s\S]*?)<\/script>/)![1]
  runInNewContext(ts.transpile(code.replace(/import .*mcp-analytics.ts'\n/, '')), {
    trackMcpEvent: (name: string, element: HTMLElement) => trackMcpEvent(name, element, { gtag: (...args: unknown[]) => events.push(args) }),
    document: window.document,
    navigator: { clipboard: { writeText: async () => undefined } },
    window: { gtag: (...args: unknown[]) => events.push(args) },
  })
  window.document.querySelector('[data-copy-command]')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
  await new Promise(resolve => setTimeout(resolve, 0))
  assert.deepEqual(events, [['event', 'mcp_install_copy', {
    client: 'claude-code', package_version: '1.3.5', cta_position: 'client-setup',
  }]])
})

function queryFixture() {
  const window = new Window()
  window.document.body.innerHTML = `<div data-mcp-query data-mcp-client="any" data-mcp-version="1.3.5" data-mcp-position="first-query">
    <blockquote>Private query text</blockquote><button data-copy-query hidden>Copy query</button><p data-query-status></p></div>
    <a href="https://example.com/?token=private" data-mcp-link-event="mcp_npm_click" data-mcp-client="any" data-mcp-version="1.3.5" data-mcp-position="hero">npm <span>open</span></a>`
  return window.document as unknown as Document
}

test('first-query copying succeeds once after repeated initialization and excludes query text', async () => {
  const document = queryFixture()
  const copied: string[] = []
  const events: unknown[][] = []
  const clipboard = { writeText: async (text: string) => { copied.push(text) } }
  const analytics = { gtag: (...args: unknown[]) => { events.push(args) } }
  initMcpPageActions(document, clipboard, analytics)
  initMcpPageActions(document, clipboard, analytics)
  document.querySelector<HTMLButtonElement>('[data-copy-query]')!.click()
  await new Promise(resolve => setTimeout(resolve, 0))
  assert.deepEqual(copied, ['Private query text'])
  assert.equal(document.querySelector('[data-query-status]')!.textContent, 'Query copied.')
  assert.deepEqual(events, [['event', 'mcp_first_query_copy', { client: 'any', package_version: '1.3.5', cta_position: 'first-query' }]])
})

test('clipboard failure reports failure without recording first-query activation', async () => {
  const document = queryFixture()
  const events: unknown[][] = []
  initMcpPageActions(document, { writeText: async () => { throw new Error('denied') } }, { gtag: (...args: unknown[]) => events.push(args) })
  document.querySelector<HTMLButtonElement>('[data-copy-query]')!.click()
  await new Promise(resolve => setTimeout(resolve, 0))
  assert.match(document.querySelector('[data-query-status]')!.textContent!, /Copy failed/)
  assert.equal(events.length, 0)
})

test('analytics failure leaves query success and ordinary outbound navigation intact', async () => {
  const document = queryFixture()
  initMcpPageActions(document, { writeText: async () => undefined }, { gtag: () => { throw new Error('blocked') } })
  document.querySelector<HTMLButtonElement>('[data-copy-query]')!.click()
  await new Promise(resolve => setTimeout(resolve, 0))
  assert.equal(document.querySelector('[data-query-status]')!.textContent, 'Query copied.')
  const event = new (document.defaultView!.MouseEvent)('click', { bubbles: true, cancelable: true })
  document.querySelector('a span')!.dispatchEvent(event)
  assert.equal(event.defaultPrevented, false)
})

test('outbound and source links send only fixed metadata, ignoring URL contents', () => {
  const document = queryFixture()
  const events: unknown[][] = []
  initMcpPageActions(document, undefined, { gtag: (...args: unknown[]) => events.push(args) })
  const link = document.querySelector<HTMLAnchorElement>('a')!
  link.click()
  link.dataset.mcpLinkEvent = 'mcp_source_open'
  link.click()
  assert.deepEqual(events, [
    ['event', 'mcp_npm_click', { client: 'any', package_version: '1.3.5', cta_position: 'hero' }],
    ['event', 'mcp_source_open', { client: 'any', package_version: '1.3.5', cta_position: 'hero' }],
  ])
  assert.doesNotMatch(JSON.stringify(events), /private|token|example.com/)
})

for (const clipboardFails of [false, true]) {
  test('install copy ' + (clipboardFails ? 'failure emits no activation' : 'success survives blocked tracking'), async () => {
    const window = new Window()
    window.document.body.innerHTML = `<div data-command-shell data-command="npx package@1.3.5" data-mcp-client="codex" data-mcp-version="1.3.5" data-mcp-position="client-setup">
      <button data-copy-command hidden>Copy command</button><p class="copy-status"></p></div>`
    let eventCount = 0
    const analytics = { gtag: () => { eventCount++; throw new Error('blocked') } }
    const code = terminal.match(/<script>([\s\S]*?)<\/script>/)![1]
    runInNewContext(ts.transpile(code.replace(/import .*mcp-analytics.ts'\n/, '')), {
      trackMcpEvent: (name: string, element: HTMLElement) => trackMcpEvent(name, element, analytics),
      document: window.document,
      navigator: { clipboard: { writeText: async () => { if (clipboardFails) throw new Error('denied') } } },
      window: analytics,
    })
    window.document.querySelector('[data-copy-command]')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
    await new Promise(resolve => setTimeout(resolve, 0))
    assert.equal(eventCount, clipboardFails ? 0 : 1)
    assert.equal(window.document.querySelector('.copy-status')!.textContent,
      clipboardFails ? 'Copy failed. Select the command and copy it manually.' : 'Command copied.')
  })
}
