# Production SEO host gate

The current GitHub Pages deployment cannot satisfy the production HTTP contract. Do not call this gate complete until an external host change passes the read-only smoke check.

## Evidence baseline, 2026-09-04

| Status | Fact | Boundary |
| --- | --- | --- |
| PROUVÉ | Astro produces static output and GitHub Actions deploys it with `actions/deploy-pages`. | The repository has no response-rule or global-header control for the GitHub Pages origin. |
| PROUVÉ | `cc.bruniaux.com` is a CNAME to `florianbruniaux.github.io`. | DNS evidence captured on 2026-09-04. |
| PROUVÉ | The authoritative nameservers are OVH. | They are not Cloudflare nameservers. |
| PROUVÉ | GitHub Pages static output cannot provide a real 301 or 308 rule or global response headers for this site. | HTML can imitate a redirect, but it does not change the HTTP status. |
| PARTIEL | `pnpm check:public-seo -- https://cc.bruniaux.com` checks the target contract with GET requests only. | It is a client observation, not proof that DNS, hosting, GA4, or GSC was changed. |
| UNKNOWN | A host or proxy now enforces the contract in production. | No production reconfiguration is part of this repository task. |

The static build check validates rendered HTML. It does not prove an edge response status or header.

## Supported hosting decisions

Choose one recorded decision before changing production:

1. Put an edge proxy in front of GitHub Pages. The proxy owns the redirect and response-header rules while GitHub Pages remains the static origin.
2. Move the static site to a host that supports redirect and response-header rules.

The external approver, implementation record, and rollback target are UNKNOWN until the hosting decision is made. The DNS evidence above does not authorize a DNS change.

## Required HTTP contract

The selected edge or host must return the following values:

| Request or response | Required value |
| --- | --- |
| `GET /guide/claude-code-releases/` | A single, direct `301` or `308` redirect to `/releases/`. A `200` HTML redirect stub fails. |
| `/`, `/releases/`, and `/favicon.svg` | `X-Content-Type-Options: nosniff` |
| `/`, `/releases/`, and `/favicon.svg` | `Referrer-Policy: strict-origin-when-cross-origin` |
| `/`, `/releases/`, and `/favicon.svg` | `Content-Security-Policy` containing `frame-ancestors 'none'`, or `X-Frame-Options: DENY` |

`X-Frame-Options: SAMEORIGIN` is accepted by the smoke checker for compatibility, but the deployment decision should record why it replaces `DENY`.

Before a routing or header change, test analytics collection, PDF downloads including `/cheatsheet/cheatsheet.pdf`, external links, and every authorized embed. `frame-ancestors 'none'` blocks all framing, so an authorized embed requires an explicit documented exception and a repeat of the smoke check against the chosen policy.

## Validation and rollback

Run this read-only command against the candidate public hostname after the external deployment:

```bash
pnpm check:public-seo -- https://cc.bruniaux.com
```

The command performs GET requests only. It does not write to DNS, hosting, GA4, GSC, or any other external service.

Rollback when the command reports a failed redirect, missing required header, a response other than `200` for a protected page or asset, an analytics regression, a broken PDF download, a broken external link, or a failed authorized embed. Restore the recorded prior origin or proxy configuration, preserve the failure output and deployment identifier, then rerun the command before declaring the rollback complete.

## Search and performance observation after a passing smoke check

Inspect these five canonical HTTPS URLs in Google Search Console URL Inspection. Record the inspection time, last crawl, user-declared canonical, Google-selected canonical, indexing state, and any fetch error for each URL:

1. `https://cc.bruniaux.com/`
2. `https://cc.bruniaux.com/releases/`
3. `https://cc.bruniaux.com/glossary/`
4. `https://cc.bruniaux.com/context-engineering/`
5. `https://cc.bruniaux.com/guide/agent-harness/`

Inspect `https://cc.bruniaux.com/guide/claude-code-releases/` separately to verify the redirect. Do not treat an inspection request, a submitted URL, or a local build as proof that Google recrawled or selected the intended canonical.

For performance, keep the environment names in every record: CrUX field data for the `https://cc.bruniaux.com` origin, then PageSpeed Insights lab data for each canonical URL under both `Mobile` and `Desktop`. Field and lab results answer different questions. Core Web Vitals remain UNKNOWN until those records exist.

AI Overviews remain UNKNOWN. This runbook supplies no valid AI Overviews source and does not infer their presence or absence from Search Console, CrUX, or PageSpeed.
