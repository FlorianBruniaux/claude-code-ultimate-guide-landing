import assert from 'node:assert/strict'
import { createServer, type ServerResponse } from 'node:http'
import test from 'node:test'

import { checkPublicSeo } from '../../scripts/check-public-seo.mjs'

type ResponseOptions = {
  headers?: Record<string, string>
  status?: number
}

function send(response: ServerResponse, body: string, { headers = {}, status = 200 }: ResponseOptions = {}) {
  response.writeHead(status, headers)
  response.end(body)
}

function requiredHeaders(overrides: Record<string, string> = {}) {
  return {
    'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    ...overrides,
  }
}

async function withServer(
  handler: (request: { url?: string }, response: ServerResponse) => void,
  run: (baseUrl: string) => Promise<void>,
) {
  const server = createServer(handler)
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  assert.ok(address && typeof address !== 'string')

  try {
    await run(`http://127.0.0.1:${address.port}`)
  }
  finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  }
}

function directReleaseSite(request: { url?: string }, response: ServerResponse) {
  switch (request.url) {
    case '/guide/claude-code-releases/':
      send(response, '', { status: 308, headers: { Location: '/releases/' } })
      return
    case '/':
    case '/releases/':
      send(response, 'ok', { headers: requiredHeaders() })
      return
    case '/favicon.svg':
      send(response, 'ok', {
        headers: {
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
        },
      })
      return
    default:
      send(response, 'missing', { status: 404 })
  }
}

test('accepts a direct permanent release redirect and required headers', async () => {
  await withServer(directReleaseSite, async (baseUrl) => {
    assert.deepEqual(await checkPublicSeo({ baseUrl }), [])
  })
})

test('accepts a direct HTTP 301 release redirect with required headers', async () => {
  await withServer((request, response) => {
    if (request.url === '/guide/claude-code-releases/') {
      send(response, '', { status: 301, headers: { Location: '/releases/' } })
      return
    }
    directReleaseSite(request, response)
  }, async (baseUrl) => {
    assert.deepEqual(await checkPublicSeo({ baseUrl }), [])
  })
})

test('rejects an HTML 200 redirect stub', async () => {
  await withServer((request, response) => {
    if (request.url === '/guide/claude-code-releases/') {
      send(response, '<meta http-equiv="refresh" content="0; url=/releases/">', { headers: requiredHeaders() })
      return
    }
    directReleaseSite(request, response)
  }, async (baseUrl) => {
    const failures = await checkPublicSeo({ baseUrl })

    assert.ok(failures.includes('legacy release redirect: expected HTTP 301 or 308, found 200'))
  })
})

test('rejects an intermediate redirect destination without following it', async () => {
  let intermediateDestinationRequested = false

  await withServer((request, response) => {
    if (request.url === '/guide/claude-code-releases/') {
      send(response, '', { status: 301, headers: { Location: '/legacy-releases/' } })
      return
    }
    if (request.url === '/legacy-releases/') {
      intermediateDestinationRequested = true
      send(response, '', { status: 308, headers: { Location: '/releases/' } })
      return
    }
    directReleaseSite(request, response)
  }, async (baseUrl) => {
    const failures = await checkPublicSeo({ baseUrl })

    assert.ok(failures.includes('legacy release redirect: expected a direct destination of /releases/, found /legacy-releases/'))
    assert.equal(intermediateDestinationRequested, false)
  })
})

test('rejects missing nosniff, referrer, or framing policy', async () => {
  await withServer((request, response) => {
    if (request.url === '/guide/claude-code-releases/') {
      send(response, '', { status: 301, headers: { Location: '/releases/' } })
      return
    }

    if (request.url === '/') {
      send(response, 'ok', { headers: requiredHeaders({ 'X-Content-Type-Options': 'none' }) })
      return
    }

    if (request.url === '/releases/') {
      send(response, 'ok', { headers: requiredHeaders({ 'Referrer-Policy': 'no-referrer' }) })
      return
    }

    if (request.url === '/favicon.svg') {
      send(response, 'ok', { headers: { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' } })
      return
    }

    send(response, 'missing', { status: 404 })
  }, async (baseUrl) => {
    const failures = await checkPublicSeo({ baseUrl })

    assert.deepEqual(failures, [
      '/: expected X-Content-Type-Options: nosniff, found none',
      '/releases/: expected Referrer-Policy: strict-origin-when-cross-origin, found no-referrer',
      '/favicon.svg: expected Content-Security-Policy frame-ancestors or X-Frame-Options DENY/SAMEORIGIN',
    ])
  })
})
