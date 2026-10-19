// Head adjustments for generated guide pages, applied by the Starlight route
// middleware (src/starlightRouteData.ts). Kept framework-free for testing.

const SITE = 'https://cc.bruniaux.com'
const SOCIAL_IMAGE = `${SITE}/og-image.png`

// The French full guide is generated from guide/ultimate-guide.fr.md, whose
// frontmatter title is English. Its translation registry lives in the guide
// repo, so the page language and title are corrected here.
const FRENCH_PAGES = {
  '/guide/ultimate-guidefr/': 'Le guide ultime de Claude Code',
}

const findMeta = (head, key) => head.find((entry) => entry.tag === 'meta' && (entry.attrs?.property === key || entry.attrs?.name === key))

function setMeta(head, attr, key, content) {
  const existing = findMeta(head, key)
  if (existing) existing.attrs.content = content
  else head.push({ tag: 'meta', attrs: { [attr]: key, content } })
}

export function adjustGuideRoute(route, pathname) {
  if (!findMeta(route.head, 'og:image')) {
    setMeta(route.head, 'property', 'og:image', SOCIAL_IMAGE)
    setMeta(route.head, 'property', 'og:image:width', '1200')
    setMeta(route.head, 'property', 'og:image:height', '630')
  }
  if (!findMeta(route.head, 'twitter:image')) setMeta(route.head, 'name', 'twitter:image', SOCIAL_IMAGE)

  const frenchTitle = FRENCH_PAGES[pathname]
  if (!frenchTitle) return

  route.lang = 'fr'
  // PageTitle (H1) and Head (JSON-LD headline) read the entry title.
  if (route.entry?.data) route.entry.data.title = frenchTitle
  setMeta(route.head, 'property', 'og:locale', 'fr_FR')
  setMeta(route.head, 'property', 'og:title', frenchTitle)
  const titleTag = route.head.find((entry) => entry.tag === 'title')
  if (titleTag) titleTag.content = titleTag.content.replace(/^.*?( \| [^|]+)$/, `${frenchTitle}$1`)
}
