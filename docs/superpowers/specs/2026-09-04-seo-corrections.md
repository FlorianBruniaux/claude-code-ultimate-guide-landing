# SEO Correction Specification

## Goal

Correct every SEO defect from the 2026-09-04 audit that can be changed and verified inside the landing repository, then package the external hosting, GA4, GSC, and performance work as explicit blocked follow-ups.

## Evidence baseline

- Production site: `https://cc.bruniaux.com`
- GSC property: `sc-domain:cc.bruniaux.com`
- GA4 property: `523714092`, filtered to `hostname = cc.bruniaux.com`
- Audit source: `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide-landing/seo-action-plan-cc-bruniaux-2026-09-04.md`
- Build platform: Astro static output deployed by GitHub Actions to GitHub Pages.
- DNS on 2026-09-04: `cc.bruniaux.com` is a CNAME to `florianbruniaux.github.io`; authoritative nameservers are OVH, not Cloudflare.

## Local deliverables

1. Generated guide pages expose one H1. The generator removes the leading document H1 after using it as a metadata fallback.
2. The five audited guide pages receive query-aligned titles of 30 to 60 characters and descriptions of 50 to 160 characters.
3. `/releases/`, `/glossary/`, and `/context-engineering/` receive shorter query-aligned metadata. `/releases/` keeps the current version and release date in initial HTML.
4. Search data and generated guide links use `/releases/`, never `/guide/claude-code-releases/`, except for the redirect declaration and tests.
5. The first six internal-link targets receive descriptive body links from semantically related pages. Links may not be placed only in global navigation or the footer.
6. A post-build contract verifies H1 cardinality, canonical HTTPS URLs, metadata length, sitemap exclusion of the legacy release URL, and absence of internal `http://cc.bruniaux.com` references.
7. GA4 objectives, current event names, candidate key-event decisions, validation steps, and the Singapore anomaly investigation are documented without claiming external configuration changed.
8. The hosting runbook states that GitHub Pages cannot produce the required edge behavior and defines a testable migration or proxy contract for the permanent redirect and security headers.

## Global constraints

- Do not edit the sibling guide repository.
- Do not hand-edit `src/content/docs/guide/**`; the generator owns it.
- Preserve source claims, dates, and uncertainty. Metadata may summarize but may not strengthen claims.
- Do not add dependencies.
- Do not deploy, push, change DNS, change GA4, submit GSC URLs, create API keys, or modify the AI Overviews MCP implementation.
- Keep `UNKNOWN` for the Singapore traffic cause, Core Web Vitals, AI Overviews, and post-recrawl indexation.
- Use `https://cc.bruniaux.com` for all canonical internal absolute URLs.
- Do not use the em dash character in prose.

## External acceptance boundary

The branch cannot prove or complete these outcomes:

- `GET /guide/claude-code-releases/` returns 301 or 308 with a direct `Location` to `/releases/`.
- Production responses include `X-Content-Type-Options`, `Referrer-Policy`, and an explicit framing policy.
- GA4 events are marked as key events or validated in DebugView.
- The Singapore anomaly has a proven cause or an approved filter.
- GSC has recrawled the changed pages and selected the intended HTTPS canonicals.
- CrUX and PageSpeed return field and lab data.
- AI Overviews data is available from a valid MCP response.

Each item remains blocked until the responsible external system is changed and tested.
