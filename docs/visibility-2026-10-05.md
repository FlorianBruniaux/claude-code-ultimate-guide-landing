# Visibility follow-up, 2026-10-05

## Evidence and boundaries

Search Console property: `sc-domain:cc.bruniaux.com`, web search, final data, September 5 through October 2, 2026. Property totals are summed from daily rows: **459 clicks, 55,790 impressions, 0.823% CTR**. Page/query tables are partial and are not the denominator for property totals. GA4 property `523714092`, hostname `cc.bruniaux.com`, same dates: 6,169 page views, 2,934 session_start events, 1,981 first_visit events. These events are not interchangeable with Google clicks or people.

The June 19 peak is confirmed: **36,072 impressions, 10 clicks**, weighted position 32.10. June totals are 160,178 impressions and 408 clicks. The June 19 page/query/country/device table exposes only 211 impressions and 3 clicks, **0.585% impression coverage**. This does not identify the cause of the peak. Calling it a ranking success, bot traffic or a specific keyword effect would exceed the evidence.

## Corrections in this change

- Render the examples catalog in initial HTML: 277 source links, 50 local detail pages, 21 categories. A single route-selection function drives both the catalog and static detail pages. Correct folder-source URLs and add links to related guide concepts.
- Remove the stale hook-event count from title and description. Keep existing October title corrections until comparable post-change evidence exists.
- Track successful command/query copies and source/npm clicks on the MCP page. Event payload contains only client, package_version and cta_position. A copied command is intention, not proof of installation. A copied query is not proof of execution. Tests cover clipboard refusal and analytics failure. GA4 receipt remains unverified.
- Add a public IndexNow ownership file. Submission is a separate post-deployment action; acceptance does not prove indexing.
- Install a daily GitHub traffic archive workflow and preserve the first real observation. It remains dormant pending the dedicated credential described in [github-traffic.md](github-traffic.md). Rolling unique counts must not be added.

## Highest-impression pages

The coverage column measures impressions exposed by the page/query/country/device table divided by the page table. It is incomplete search-query evidence, not a sampling correction. Average position and aggregate CTR mix countries, devices and search intents.

| Page | Clicks | Impressions | CTR | Position | Query coverage |
| --- | ---: | ---: | ---: | ---: | ---: |
| [/releases/](https://cc.bruniaux.com/releases/) | 17 | 13186 | 0.13% | 7.1 | 22.5% |
| [/guide/third-party-tools/](https://cc.bruniaux.com/guide/third-party-tools/) | 8 | 7378 | 0.11% | 6.6 | 2.4% |
| [/guide/architecture/](https://cc.bruniaux.com/guide/architecture/) | 8 | 5251 | 0.15% | 6.2 | 5.4% |
| [/guide/security-hardening/](https://cc.bruniaux.com/guide/security-hardening/) | 3 | 2702 | 0.11% | 6.3 | 6.4% |
| [/quiz/](https://cc.bruniaux.com/quiz/) | 139 | 2279 | 6.10% | 6.3 | 37.0% |
| [/guide/local-vs-cloud-inference/](https://cc.bruniaux.com/guide/local-vs-cloud-inference/) | 3 | 2059 | 0.15% | 6.3 | 0.9% |
| [/glossary/stopreason/](https://cc.bruniaux.com/glossary/stopreason/) | 6 | 1974 | 0.30% | 8.4 | 62.2% |
| [/glossary/](https://cc.bruniaux.com/glossary/) | 17 | 1219 | 1.39% | 7.6 | 17.6% |
| [/guide/workflows/github-actions/](https://cc.bruniaux.com/guide/workflows/github-actions/) | 1 | 1079 | 0.09% | 11.8 | 12.4% |
| [/guide/agent-harness/](https://cc.bruniaux.com/guide/agent-harness/) | 0 | 1055 | 0.00% | 7.9 | 10.3% |
| [/guide/observability/](https://cc.bruniaux.com/guide/observability/) | 2 | 900 | 0.22% | 10.4 | 16.3% |
| [/](https://cc.bruniaux.com/) | 22 | 832 | 2.64% | 5.3 | 55.5% |
| [/guide/ultimate-guide/05-skills/](https://cc.bruniaux.com/guide/ultimate-guide/05-skills/) | 0 | 829 | 0.00% | 6.4 | 1.3% |
| [/whitepapers/](https://cc.bruniaux.com/whitepapers/) | 46 | 736 | 6.25% | 11.4 | 19.7% |
| [/guide/ultimate-guide/06-commands/](https://cc.bruniaux.com/guide/ultimate-guide/06-commands/) | 1 | 717 | 0.14% | 6.7 | 7.3% |
| [/guide/data-privacy/](https://cc.bruniaux.com/guide/data-privacy/) | 1 | 575 | 0.17% | 6.9 | 5.0% |
| [/guide/learning-with-ai/](https://cc.bruniaux.com/guide/learning-with-ai/) | 1 | 569 | 0.18% | 7.0 | 9.0% |
| [/ecosystem/](https://cc.bruniaux.com/ecosystem/) | 2 | 514 | 0.39% | 6.9 | 4.5% |
| [/guide/workflows/iterative-refinement/](https://cc.bruniaux.com/guide/workflows/iterative-refinement/) | 9 | 497 | 1.81% | 7.1 | 2.6% |
| [/glossary/fewerpermissionprompts/](https://cc.bruniaux.com/glossary/fewerpermissionprompts/) | 8 | 465 | 1.72% | 8.2 | 59.4% |

## Next actions and acceptance criteria

1. **Verify delivery:** deploy the changed HTML, verify all 50 examples detail links, the MCP copy interaction and the public ownership file. Run the built SEO and link checks. Delivery success does not prove Google recrawl.
2. **Measure usage:** observe mcp_install_copy, mcp_first_query_copy, mcp_npm_click and mcp_source_open in GA4 on this hostname after a controlled test. Register client/package_version/cta_position as event-scoped custom dimensions if segmentation is needed. Do not mark intention events as installation conversions.
3. **Complete Bing ownership:** sign in to Bing Webmaster Tools, inspect the existing property or verify only cc.bruniaux.com, submit sitemap-index.xml. Google import may require a distinct OAuth approval. A search referral already exists; ownership is not yet verified.
4. **Activate archives:** supply GUIDE_TRAFFIC_READ_TOKEN restricted to the guide, run Archive GitHub Traffic once, then enable GUIDE_TRAFFIC_ARCHIVE_ENABLED. Acceptance: a complete dated archive from the workflow. No token has been created or copied.
5. **Evaluate CTR by intent:** releases, third-party-tools, architecture and security-hardening are candidate reviews. Their query coverage differs sharply; review visible queries and country/device cohorts before replacing titles. Compare equal-length final windows after publication and label overlapping releases/other changes. No universal CTR target is assumed.
6. **Resolve true HTTP redirects:** GitHub Pages serves the three documented legacy routes as HTML redirects. They are excluded from the sitemap and noindex. A real 301/308 requires an edge/hosting change, followed by status and destination checks. Preserve distinct Team Metrics summary and full framework routes.
7. **Publish for discovery:** use one concrete MCP installation example for the next announcement and link to /mcp/. The public profile already has six complementary pins; a shorter README opening is prepared in github-traffic.md. External posts and profile edits have not been sent or applied.

Private raw Google observations and query strings remain in the ignored .audit directory. The committed table contains page totals only. No improvement in search traffic or conversion has yet been measured.
