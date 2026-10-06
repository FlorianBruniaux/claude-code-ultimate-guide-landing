import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const component = readFileSync(new URL('../components/global/Analytics.astro', import.meta.url), 'utf8')

test('main-thread gtag forwards the existing event call to dataLayer without a worker gtag', () => {
  const script = component.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script, 'a main-thread inline analytics bridge must be present')

  const window: { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } = {}
  runInNewContext(script, { window })
  assert.equal(typeof window.gtag, 'function')

  const payload = { quiz_name: 'claude_code', score: 80 }
  window.gtag?.('event', 'quiz_complete', payload)

  assert.equal(window.dataLayer?.length, 1)
  assert.deepEqual(Array.from(window.dataLayer![0] as ArrayLike<unknown>), ['event', 'quiz_complete', payload])
})

test('main-thread bridge preserves a pre-existing dataLayer and does not configure GA4', () => {
  const script = component.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script)

  const prior = ['prior']
  const dataLayer: unknown[] = [prior]
  const window: { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void } = { dataLayer }
  runInNewContext(script, { window })

  assert.equal(window.dataLayer, dataLayer)
  assert.deepEqual(dataLayer, [prior])
})

test('main-thread custom events arrive at worker gtag as positional calls', async () => {
  const require = createRequire(import.meta.url)
  const partytownRequire = createRequire(require.resolve('@astrojs/partytown'))
  const { partytownSnippet } = await import(partytownRequire.resolve('@qwik.dev/partytown/integration'))
  const config = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')
  const paths = config.match(/forward:\s*\[([^\]]+)\]/)?.[1].match(/'([^']+)'/g)?.map(path => path.slice(1, -1))
  assert.ok(paths)
  const window: { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; _ptf?: unknown[]; addEventListener: () => void } = { addEventListener() {} }
  runInNewContext(partytownSnippet({ forward: paths }), { window, top: window, document: { readyState: 'loading' }, navigator: { serviceWorker: {} } })
  const script = component.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script)
  runInNewContext(script, { window })
  const payload = { client: 'claude-code', package_version: '1.3.6', cta_position: 'client-setup' }
  window.gtag?.('event', 'mcp_install_copy', payload)

  assert.ok(window._ptf, 'Partytown queues the main-thread event for its worker')
  assert.deepEqual(Array.from(window._ptf[0] as ArrayLike<unknown>), ['gtag'])
  const transferred = JSON.parse(JSON.stringify(Array.from(window._ptf![1] as ArrayLike<unknown>)))
  const worker: { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void } = { dataLayer: [] }
  const workerScript = component.match(/<script is:inline type="text\/partytown" define:vars=\{\{ gaId \}\}>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(workerScript)
  runInNewContext(workerScript, { window: worker, dataLayer: worker.dataLayer, gaId: 'G-WH1C8CM79E' })
  assert.equal(worker.dataLayer.length, 2, 'initializes js and config once')
  worker.gtag?.(...transferred)
  const entry = worker.dataLayer[2] as ArrayLike<unknown>
  assert.equal(Object.prototype.toString.call(entry), '[object Arguments]')
  assert.deepEqual(Array.from(entry), ['event', 'mcp_install_copy', payload])
})

test('a blocked dataLayer does not interrupt the action that emitted the event', () => {
  const script = component.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script)

  const window = {
    dataLayer: { push() { throw new Error('blocked') } },
    gtag: undefined as undefined | ((...args: unknown[]) => void),
  }
  runInNewContext(script, { window })

  assert.doesNotThrow(() => window.gtag?.('event', 'ebook_subscribe', { guide: '02-personnalisation.fr' }))
})
