// Guide pages replaced by a standalone landing page (cannibalization fixes).
// The guide URL stays as a redirect for old links, but the site itself links
// the landing page directly: a GitHub Pages redirect is a meta refresh stub.
// The landing page does not carry the guide's section ids, so a fragment is
// dropped, which is also where the redirect stub sends the reader today.

export const SUPERSEDED_GUIDE_PAGES = {
  '/guide/ai-roles/': '/roles/',
  '/guide/context-engineering/': '/context-engineering/',
  '/guide/ai-ecosystem/': '/ecosystem/',
}

const LINK_TARGET = /\]\((\/guide\/[^)\s#]+\/)(#[^)\s]*)?\)/g

/**
 * Point Markdown links at the landing page that replaced a guide page.
 * @param {string} content
 * @returns {string}
 */
export function rewriteSupersededGuideLinks(content) {
  return content.replace(LINK_TARGET, (match, path) => {
    const target = SUPERSEDED_GUIDE_PAGES[path]
    return target ? `](${target})` : match
  })
}

/**
 * Send redirects that end on a superseded guide page straight to its landing
 * page, so an old URL never goes through two meta refresh stubs.
 * @param {Record<string, string>} redirects
 * @returns {Record<string, string>}
 */
export function collapseSupersededRedirects(redirects) {
  return Object.fromEntries(
    Object.entries(redirects).map(([source, target]) => [source, SUPERSEDED_GUIDE_PAGES[target] ?? target]),
  )
}
