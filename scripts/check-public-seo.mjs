import { pathToFileURL } from 'node:url'

export const LEGACY_RELEASE_PATH = '/guide/claude-code-releases/'
export const RELEASE_PATH = '/releases/'
export const STATIC_ASSET_PATH = '/favicon.svg'
export const SECURITY_PATHS = ['/', RELEASE_PATH, STATIC_ASSET_PATH]

function normalizedBaseUrl(baseUrl) {
  let url

  try {
    url = new URL(baseUrl)
  }
  catch {
    throw new TypeError('checkPublicSeo requires a valid HTTP(S) baseUrl')
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new TypeError('checkPublicSeo requires a valid HTTP(S) baseUrl')
  }

  url.pathname = '/'
  url.search = ''
  url.hash = ''
  return url
}

function pathUrl(baseUrl, path) {
  return new URL(path, baseUrl)
}

function header(response, name) {
  return response.headers.get(name)?.trim()
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error)
}

function hasFramingPolicy(response) {
  const csp = header(response, 'content-security-policy')
  const xFrameOptions = header(response, 'x-frame-options')?.toUpperCase()
  const frameAncestors = (csp ?? '')
    .split(';')
    .map((directive) => directive.trim().split(/\s+/))
    .filter(([name]) => name?.toLowerCase() === 'frame-ancestors')

  if (frameAncestors.length > 0) {
    return frameAncestors.every(([, ...sources]) => (
      sources.length === 1 && sources[0].toLowerCase() === "'none'"
    ))
  }

  return xFrameOptions === 'DENY'
    || xFrameOptions === 'SAMEORIGIN'
}

function checkRequiredHeaders(path, response) {
  const failures = []
  const nosniff = header(response, 'x-content-type-options')
  const referrerPolicy = header(response, 'referrer-policy')

  if (nosniff?.toLowerCase() !== 'nosniff') {
    failures.push(`${path}: expected X-Content-Type-Options: nosniff, found ${nosniff ?? 'none'}`)
  }

  if (referrerPolicy?.toLowerCase() !== 'strict-origin-when-cross-origin') {
    failures.push(`${path}: expected Referrer-Policy: strict-origin-when-cross-origin, found ${referrerPolicy ?? 'none'}`)
  }

  if (!hasFramingPolicy(response)) {
    failures.push(`${path}: expected Content-Security-Policy frame-ancestors 'none' or X-Frame-Options DENY/SAMEORIGIN`)
  }

  return failures
}

/**
 * Performs only GET requests. It does not change DNS, hosting, GSC, or GA4.
 *
 * @typedef {object} PublicSeoOptions
 * @property {string | URL} [baseUrl]
 * @property {typeof globalThis.fetch} [fetchImpl]
 *
 * @param {PublicSeoOptions} [options]
 */
export async function checkPublicSeo(options = {}) {
  const { baseUrl, fetchImpl = globalThis.fetch } = options
  if (!baseUrl) throw new TypeError('checkPublicSeo requires a baseUrl')
  if (typeof fetchImpl !== 'function') throw new TypeError('checkPublicSeo requires a fetch implementation')

  const base = normalizedBaseUrl(baseUrl)
  const failures = []
  const legacyUrl = pathUrl(base, LEGACY_RELEASE_PATH)
  let legacyResponse

  try {
    legacyResponse = await fetchImpl(legacyUrl, { redirect: 'manual' })
  }
  catch (error) {
    failures.push(`legacy release redirect: request failed: ${errorMessage(error)}`)
  }

  if (legacyResponse) {
    if (legacyResponse.status !== 301 && legacyResponse.status !== 308) {
      failures.push(`legacy release redirect: expected HTTP 301 or 308, found ${legacyResponse.status}`)
    }

    const location = header(legacyResponse, 'location')
    if (!location) {
      failures.push('legacy release redirect: missing Location header')
    }
    else {
      let destination
      try {
        destination = new URL(location, legacyUrl)
      }
      catch {
        failures.push(`legacy release redirect: expected a direct destination of ${RELEASE_PATH}, found ${location}`)
        destination = undefined
      }

      if (destination && (destination.origin !== base.origin || destination.pathname !== RELEASE_PATH || destination.search || destination.hash)) {
        failures.push(`legacy release redirect: expected a direct destination of ${RELEASE_PATH}, found ${location}`)
      }
    }
  }

  for (const path of SECURITY_PATHS) {
    let response

    try {
      response = await fetchImpl(pathUrl(base, path), { redirect: 'manual' })
    }
    catch (error) {
      failures.push(`${path}: request failed: ${errorMessage(error)}`)
      continue
    }

    if (response.status !== 200) {
      failures.push(`${path}: expected HTTP 200, found ${response.status}`)
      continue
    }

    failures.push(...checkRequiredHeaders(path, response))
  }

  return failures
}

async function main() {
  const args = process.argv.slice(2)
  if (args[0] === '--') args.shift()
  const [baseUrl] = args

  if (!baseUrl) {
    console.error('Usage: pnpm check:public-seo -- https://cc.bruniaux.com')
    process.exitCode = 1
    return
  }

  let failures
  try {
    failures = await checkPublicSeo({ baseUrl })
  }
  catch (error) {
    console.error(`Invalid base URL: ${errorMessage(error)}`)
    process.exitCode = 1
    return
  }
  if (failures.length === 0) {
    console.log(`Public SEO smoke check passed for ${baseUrl}.`)
    return
  }

  console.error(`Public SEO smoke check failed for ${baseUrl}:`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
