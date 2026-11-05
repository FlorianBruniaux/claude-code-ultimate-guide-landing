// Sitemap lastmod resolution. A page without a known content date gets no
// lastmod: a build-date fallback would mark every undated page as changed on
// each deploy and make the whole sitemap's dates untrustworthy.

/**
 * @param {string} url
 * @param {Record<string, string>} pageDates
 * @param {Map<string, string>} guideDates
 * @param {Record<string, string>} [sectionDates] path prefix -> date shared by the whole section
 * @returns {string | undefined}
 */
export function resolveLastmod(url, pageDates, guideDates, sectionDates = {}) {
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`
  const pathname = new URL(normalizedUrl).pathname
  const section = Object.keys(sectionDates).find((prefix) => pathname.startsWith(prefix))
  return pageDates[normalizedUrl] ?? guideDates.get(pathname) ?? (section ? sectionDates[section] : undefined)
}

/**
 * @template {Record<string, unknown>} T
 * @param {T} entry
 * @param {string | undefined} lastmod
 */
export function withLastmod(entry, lastmod) {
  return lastmod ? { ...entry, lastmod } : entry
}
