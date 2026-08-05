import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadTerminalFs, subsetFs, FALLBACK_PAYLOAD, type TerminalFsPayload } from './fs-payload.ts'

test('loadTerminalFs fetches the default URL and returns the parsed payload', async () => {
  const payload: TerminalFsPayload = {
    version: 'abc123',
    generatedAt: '2026-08-04T00:00:00.000Z',
    byteSize: 42,
    cwd: '/home/user',
    files: { '/home/user/README.md': 'hello' },
  }
  let requestedUrl: string | undefined
  const fetchImpl = async (url: string) => {
    requestedUrl = url
    return new Response(JSON.stringify(payload), { status: 200 })
  }

  const result = await loadTerminalFs({ fetchImpl })

  assert.equal(requestedUrl, '/terminal-fs.json')
  assert.deepEqual(result, payload)
})

test('loadTerminalFs accepts a custom url', async () => {
  let requestedUrl: string | undefined
  const fetchImpl = async (url: string) => {
    requestedUrl = url
    return new Response(JSON.stringify(FALLBACK_PAYLOAD), { status: 200 })
  }

  await loadTerminalFs({ url: '/custom-fs.json', fetchImpl })

  assert.equal(requestedUrl, '/custom-fs.json')
})

test('loadTerminalFs rejects when the response is not ok', async () => {
  const fetchImpl = async () => new Response('not found', { status: 404 })

  await assert.rejects(() => loadTerminalFs({ fetchImpl }), /404/)
})

test('subsetFs keeps only files whose path starts with a given prefix', () => {
  const payload: TerminalFsPayload = {
    version: 'v1',
    generatedAt: 'now',
    byteSize: 999,
    cwd: '/home/user',
    files: {
      '/home/user/examples/agents/a.md': 'a',
      '/home/user/examples/hooks/h.sh': 'h',
      '/home/user/README.md': 'r',
    },
  }

  const result = subsetFs(payload, ['/home/user/examples/agents/'])

  assert.deepEqual(Object.keys(result.files), ['/home/user/examples/agents/a.md'])
  assert.equal(result.cwd, payload.cwd)
})

test('subsetFs keeps files matching any of multiple prefixes', () => {
  const payload: TerminalFsPayload = {
    version: 'v1',
    generatedAt: 'now',
    byteSize: 999,
    cwd: '/home/user',
    files: {
      '/home/user/a/x.md': '1',
      '/home/user/b/y.md': '2',
      '/home/user/c/z.md': '3',
    },
  }

  const result = subsetFs(payload, ['/home/user/a/', '/home/user/b/'])

  assert.deepEqual(Object.keys(result.files).sort(), ['/home/user/a/x.md', '/home/user/b/y.md'])
})

test('subsetFs returns an empty files map when nothing matches', () => {
  const payload: TerminalFsPayload = {
    version: 'v1',
    generatedAt: 'now',
    byteSize: 10,
    cwd: '/home/user',
    files: { '/home/user/a.md': '1' },
  }

  const result = subsetFs(payload, ['/home/user/nope/'])

  assert.deepEqual(result.files, {})
})

test('FALLBACK_PAYLOAD is self-contained with a README at cwd', () => {
  assert.equal(FALLBACK_PAYLOAD.cwd, '/home/user')
  assert.ok(FALLBACK_PAYLOAD.files['/home/user/README.md'])
  assert.ok(Object.keys(FALLBACK_PAYLOAD.files).length > 0)
})
