import { guideSections } from './guide-navigation.mjs'
import {
  allPagesLink,
  guideNavigationLink,
  navigationSections,
  type HeaderNavigationLink,
  type HeaderNavigationSectionId,
} from './header-navigation.ts'

/**
 * The "All pages" map (/sitemap/) follows the header menu: the same five
 * sections in the same order, Essentials first, then everything else the
 * panel lists. The guide chapters and the card collections come after.
 * One source keeps the map and the menu from drifting apart again.
 */
export interface SitemapLink {
  href: string
  label: string
  description?: string
  external?: boolean
}

export interface SitemapSection {
  id: string
  label: string
  description?: string
  overview?: SitemapLink
  essentials: SitemapLink[]
  links: SitemapLink[]
}

function toSitemapLink(link: HeaderNavigationLink): SitemapLink {
  return { href: link.href, label: link.label, description: link.description, external: link.external }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Anchor of a menu section on the All pages map, e.g. /sitemap/#security. */
export function sitemapSectionHref(id: HeaderNavigationSectionId | string) {
  return `${allPagesLink.href}#${id}`
}

export function getMenuSitemapSections(): SitemapSection[] {
  return navigationSections.map((section) => {
    const essentials = section.essentials.map(toSitemapLink)
    const seen = new Set(essentials.map((link) => link.href))
    if (section.overview) seen.add(section.overview.href)
    const links = section.groups
      .flatMap((group) => group.links)
      .filter((link) => {
        if (seen.has(link.href)) return false
        seen.add(link.href)
        return true
      })
      .map(toSitemapLink)

    return {
      id: section.id,
      label: section.label,
      description: section.description,
      overview: section.overview ? { href: section.overview.href, label: section.overview.label } : undefined,
      essentials,
      links,
    }
  })
}

export function getGuideSitemapSections(): SitemapSection[] {
  return guideSections.map((section) => ({
    id: `guide-${slugify(section.title)}`,
    label: section.title,
    essentials: [],
    links: section.links.map((link) => ({ href: link.href, label: link.title, description: link.desc })),
  }))
}

export const guidePortalLink: SitemapLink = {
  href: guideNavigationLink.href,
  label: 'Guide portal',
  description: guideNavigationLink.description,
}

export function countSitemapPages(sections: SitemapSection[], extra: SitemapLink[] = []) {
  const hrefs = new Set(extra.map((link) => link.href))
  for (const section of sections) {
    if (section.overview) hrefs.add(section.overview.href)
    for (const link of [...section.essentials, ...section.links]) hrefs.add(link.href)
  }
  return hrefs.size
}
