# GitHub traffic evidence and profile changes

The first successful observation was collected on 2026-10-05 at 13:16 UTC for `FlorianBruniaux/claude-code-ultimate-guide`. The raw API responses are preserved in `data/github-traffic/2026-10-05.json`. The repository had 6,107 stars, 802 forks and 74 subscribers at collection time. GitHub returned 15,112 views (6,902 unique visitors) and 2,741 clones (943 unique cloners), with daily buckets from September 21 through October 4.

The top returned referrers included Google (5,393 views), Bing (370), github.com (326), search.brave.com (137), and DuckDuckGo (136). Referrers are GitHub's top-10 list for its rolling window; they are not a complete attribution model, Google impressions, or website sessions.

## Collection and activation

`python3 scripts/github-traffic.py` collects repository counters, views, clones, referral sources and popular paths through the authenticated GitHub CLI. No token is printed or stored. Run `python3 scripts/github-traffic-test.py` to validate failed access, malformed payloads, preservation of unique totals, and concurrent-write protection.

Scheduled collection requires both of the following in the landing repository:

- Secret `GUIDE_TRAFFIC_READ_TOKEN`: an existing credential restricted to the guide repository with `Administration: read`, as required by [GitHub's traffic API](https://docs.github.com/en/rest/metrics/traffic).
- Repository variable `GUIDE_TRAFFIC_ARCHIVE_ENABLED` set to `true`.

No suitable secret existed in the landing repository when its secret names were checked on 2026-10-05. Local CLI authentication can read the guide's traffic; the landing workflow's built-in `GITHUB_TOKEN` does not inherit that access. No token was created or copied during this change. A manual workflow run without the dedicated secret fails with an explicit UNKNOWN state and writes no archive.

On 2026-10-06, the dedicated secret was configured by the owner. The [first manual collection](https://github.com/FlorianBruniaux/claude-code-ultimate-guide-landing/actions/runs/37441673377) succeeded and committed the [complete archive](../data/github-traffic/2026-10-06.json). The activation variable is now configured as `true`; the first scheduled execution has not yet been observed.

Once the secret is provided, manually run **Archive GitHub Traffic** and inspect the resulting daily archive before enabling its schedule. The workflow uses its own landing `GITHUB_TOKEN` only for the scoped archive commit. The daily archive records observation time, raw responses and the first/last returned buckets. A second run preserves an existing daily file, and atomic file publication prevents concurrent overwrites.

## Comparing observations

GitHub traffic endpoints expose a rolling 14-day window. Store each observation, but do not add overlapping window totals. To compare monthly views or clones after enough archives exist, select one observation per date bucket and account for subsequent revisions of recent buckets. Document the selection rule before calculating a monthly total.

Keep GitHub's reported window unique counts intact. Adding daily unique counts or overlapping window uniques does not produce monthly unique visitors. First and last returned buckets describe the response; missing buckets do not prove zero traffic. Stars and forks are cumulative snapshots, so compare differences between dated observations rather than summing counters.

## Profile review

The public profile was read on 2026-10-05. Its bio already states AI practice since 2017, context/harness engineering, RTK core-team work and the return from CTO to hands-on engineering. Its six pinned repositories already cover complementary uses: the Claude Code guide, Claude Cowork guide, ccboard, cc-copilot-bridge, StarMapper and Claude Code plugins. Preserve these pins unless usage evidence supports a different choice.

The README is 268 lines long and repeats project descriptions and fast-changing counts across its opening, focus, project list and generated ecosystem. A shorter opening should help readers select a first action. This is a proposed readability change, with no measured conversion effect. The existing profile has not been edited.

### Proposed replacement for the opening

The block below replaces only the introduction and first navigation sections. Keep the existing generated ecosystem and detailed background below it, inside a collapsed section if desired. The actual profile edit needs its own review against the current README.

```markdown
# Florian Bruniaux

AI practitioner since 2017, focused on context and harness engineering. Ex-CTO and VP Engineering, now building hands-on as AI Founding Engineer at Méthode Aristote and contributing to the RTK core team.

## Start with the outcome you need

| Your goal | Resource |
| --- | --- |
| Learn and configure Claude Code | [Claude Code Ultimate Guide](https://cc.bruniaux.com/) |
| Search the guide from your coding session | [Guide MCP installation](https://cc.bruniaux.com/mcp/) |
| Monitor Claude Code sessions and costs | [ccboard](https://github.com/FlorianBruniaux/ccboard) |
| Route Claude Code across providers | [CC-Copilot Bridge](https://github.com/FlorianBruniaux/cc-copilot-bridge) |
| Use Claude Cowork for knowledge work | [Claude Cowork Guide](https://github.com/FlorianBruniaux/claude-cowork-guide) |
| Understand AI costs and productivity | [The Real Cost of AI](https://www.florian.bruniaux.com/blog/series/the-real-cost-of-ai/) |

For guide updates, use the repository's **Watch → Custom → Releases** setting. Star the repository if the guide helps you.

[Articles on AI-assisted engineering](https://www.florian.bruniaux.com/blog/) · [Talks and podcasts](https://www.florian.bruniaux.com/media/) · [Portfolio and contact](https://www.florian.bruniaux.com/)
```

Remove manually maintained version numbers and star counts from this opening. Keep dated metrics in the archives, and let repository pages display their current counters. This prevents a profile refresh from becoming a prerequisite for every release.
