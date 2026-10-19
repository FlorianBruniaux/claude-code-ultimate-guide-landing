// Compares the served /releases/ page with src/data/releases.ts. Between
// 2026-10-07 and 2026-10-18 the page stayed on an old version while every
// automatic deploy failed at startup, and nothing reported it.

export function expectedLatestVersion(releasesSource) {
  const list = releasesSource.slice(releasesSource.indexOf('export const releases'))
  const version = list.match(/version:\s*['"](v?\d+\.\d+\.\d+)['"]/)?.[1]
  if (!version) throw new Error('No version found in releases data')
  return version
}

function text(html, pattern) {
  return html.match(pattern)?.[1]?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() ?? ''
}

function announces(value, version) {
  return new RegExp(`(?:^|[^\\w.])${version.replaceAll('.', '\\.')}(?![\\w.]*\\d)`).test(value)
}

export function checkReleasePage(html, version) {
  const failures = []
  const title = text(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i)
  const h1 = text(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)
  if (!announces(title, version)) failures.push(`/releases/ title does not announce ${version}: "${title}"`)
  if (!announces(h1, version)) failures.push(`/releases/ H1 does not announce ${version}: "${h1}"`)
  return failures
}

export function lastSuccessAgeHours(runsResponse, now = Date.now()) {
  const latest = runsResponse.workflow_runs?.[0]?.updated_at
  return latest ? (now - Date.parse(latest)) / 3_600_000 : Number.POSITIVE_INFINITY
}
