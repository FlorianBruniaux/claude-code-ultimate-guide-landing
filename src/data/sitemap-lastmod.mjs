// Sitemap lastmod resolution. A page without a known content date gets no
// lastmod: a build-date fallback would mark every undated page as changed on
// each deploy and make the whole sitemap's dates untrustworthy.

/**
 * @param {string} url
 * @param {Record<string, string>} pageDates
 * @param {Map<string, string>} guideDates
 * @returns {string | undefined}
 */
export function resolveLastmod(url, pageDates, guideDates) {
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`
  return pageDates[normalizedUrl] ?? guideDates.get(new URL(normalizedUrl).pathname)
}

/**
 * @template {Record<string, unknown>} T
 * @param {T} entry
 * @param {string | undefined} lastmod
 */
export function withLastmod(entry, lastmod) {
  return lastmod ? { ...entry, lastmod } : entry
}
