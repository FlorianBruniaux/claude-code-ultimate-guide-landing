import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const quiz = readFileSync(new URL('../pages/quiz/index.astro', import.meta.url), 'utf8')
const whitepapers = readFileSync(new URL('../pages/whitepapers/index.astro', import.meta.url), 'utf8')

function eventGuard(source: string, eventName: string): string {
  const eventAt = source.indexOf(`'${eventName}'`)
  assert.notEqual(eventAt, -1, `${eventName} event must exist`)

  const before = source.slice(0, eventAt)
  const guarded = [...before.matchAll(/try\s*\{\s*if\s*\(typeof (?:window|analyticsWindow)\.gtag === 'function'\)/g)]
  const start = guarded.at(-1)?.index ?? -1
  assert.notEqual(start, -1, `${eventName} must be isolated from the user action by a local try`)

  const remaining = source.slice(start)
  const end = remaining.indexOf('} catch {}')
  assert.notEqual(end, -1, `${eventName} must absorb tracking failures`)
  const snippet = remaining.slice(0, end + '} catch {}'.length)
  assert.ok(snippet.includes(`'${eventName}'`), `${eventName} must be inside the isolated guard`)
  return snippet
}

test('quiz start and completion survive a pre-existing broken gtag', () => {
  for (const name of ['quiz_start', 'quiz_complete']) {
    const snippet = eventGuard(quiz, name)
    let reached = false
    const context = {
      window: { gtag() { throw new Error('analytics unavailable') } },
      filteredQuestions: [1, 2],
      selectedDifficulty: 'all',
      selectedRole: 'all',
      percentage: 80,
      correct: 2,
      total: 2,
      badge: 'Expert',
      elapsed: 12,
      reached() { reached = true },
    }
    assert.doesNotThrow(() => runInNewContext(`${snippet}\nreached()`, context))
    assert.equal(reached, true, `${name} must allow the next user-visible step`)

    const calls: unknown[][] = []
    runInNewContext(snippet, {
      ...context,
      window: { gtag(...args: unknown[]) { calls.push(args) } },
    })
    assert.equal(calls.length, 1, `${name} must be emitted once`)
    assert.equal(calls[0]![1], name)
    const payload = calls[0]![2] as Record<string, unknown>
    assert.equal('email' in payload || 'firstName' in payload || 'linkedin' in payload, false)
  }
})

test('whitepaper success survives a pre-existing broken gtag without leaking contact data', () => {
  const snippet = eventGuard(whitepapers, 'ebook_subscribe')
  let reached = false
  const events: unknown[][] = []
  const context = {
    analyticsWindow: { gtag(...args: unknown[]) { events.push(args); throw new Error('analytics unavailable') } },
    filename: '02-personnalisation.fr',
    isEpub: false,
    utmSource: 'private@example.com',
    utmCampaign: 'https://example.com/?token=private-token',
    email: 'private@example.com',
    firstName: 'Private',
    linkedin: 'private-profile',
    reached() { reached = true },
  }
  assert.doesNotThrow(() => runInNewContext(`${snippet}\nreached()`, context))
  assert.equal(reached, true, 'analytics failure must not enter the subscription error path')
  assert.equal(events.length, 1)
  const payload = events[0]![2] as Record<string, unknown>
  assert.deepEqual(Object.keys(payload).sort(), ['format', 'guide'])
  assert.doesNotMatch(JSON.stringify(payload), /private@example\.com|private-token/)
})
