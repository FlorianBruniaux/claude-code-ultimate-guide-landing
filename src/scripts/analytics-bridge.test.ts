import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
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
