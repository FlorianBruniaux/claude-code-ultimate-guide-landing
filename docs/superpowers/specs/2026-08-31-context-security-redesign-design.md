# Context and Security Redesign

## Decision

Refactor `/context/` as one guided journey and replace the monolithic `/security/` page with a concise hub plus four focused routes:

- `/security/threats/`
- `/security/cves/`
- `/security/sandbox/`
- `/security/hardening/`

The redesign preserves the current information and interactive functions. It changes where readers find them, removes duplication, and makes each route answer one primary question.

## Goals

- Make `/context/` feel like the redesigned `/roles/` page: one promise, one interactive journey, a local navigation bar, and visual explanations.
- Reduce the reading and interaction load on `/security/`, especially on mobile.
- Give each Security route a distinct human task and search intent.
- Preserve the current AgentSec, CVE, threat, command, and checklist material.
- Keep security dates, versions, counts, and sources traceable to their canonical data modules.
- Preserve light mode, dark mode, keyboard access, small-screen layouts, and no-JavaScript access to essential content.

## Non-goals

- Do not add a remote repository scanning service.
- Do not fetch live security data in the browser.
- Do not invent security findings, safe versions, dates, or source attribution.
- Do not create a separate `/security/tools/` route. Tools belong to the hardening task.
- Do not split Context into additional routes.
- Do not redesign the global header, announcement banner, or unrelated pages.

## Context route

### Route contract

`/context/` helps a reader generate a starter context configuration, understand the system behind it, identify a maturity level, and choose the next improvement.

The route retains the existing three-question configurator and generated outputs:

- personalized `CLAUDE.md`;
- context maturity level;
- concrete next steps;
- optional team profile template.

### Page structure

1. **Two-column hero**
   - The left column states the outcome and links to the full guide.
   - The right column contains the configurator.
   - The configurator advances through three compact steps inside one card.
   - The result replaces the questions in the same card without a page reload.

2. **Local navigation**
   - Configure
   - Understand
   - Maturity
   - Full guide

3. **Context system flow**
   - `CLAUDE.md`
   - modular rules
   - role profiles
   - CI feedback

   The four current concept cards become a connected visual sequence. Each item keeps a short explanation and links to the relevant guide section.

4. **Maturity ladder**
   - L1 Starter
   - L2 Modular
   - L3 Team-ready
   - L4 Measured
   - L5 Adaptive

   The result calculated by the configurator highlights the matching level. The ladder remains readable before the reader runs the configurator.

5. **Next action**
   - Improve the calculated level.
   - Read the full Context Engineering guide.

The route uses the compact footer.

### Context data and state

`src/data/context-data.ts` remains the source for options, maturity levels, generated content, and maturity calculation. Components receive these values through props. The page must not duplicate option literals or maturity rules.

Configurator state stays in the browser and does not leave the page. Generated text can be copied. Copy failure produces a visible message and leaves the text selectable.

## Security information architecture

### Hub contract

`/security/` helps a reader choose a security action. It does not reproduce the complete catalogues from the child routes.

The hub contains:

1. A two-column hero with the security promise, data freshness, key counts, and an AgentSec action card.
2. A local navigation bar for Overview, Check a repository, Latest threats, Quick checklist, and Deep dives.
3. Four task cards that link to Threats, CVEs, Sandbox, and Hardening.
4. A concise set of sourced metrics.
5. The three most recent reviewed threat items.
6. A five-minute checklist.
7. Essential sources and related routes.

The AgentSec card explains how to run the checker locally and links to the official installation and repository destinations already provided by the feed. It must not imply that the landing site scans a repository.

The hub retains historical fragment targets, including the current CVE, threat, sandbox, defense, command, checklist, and source anchors. A fragment target becomes the corresponding hub teaser when its full content moves to another route.

### Threats route

`/security/threats/` answers: what is attacking AI coding agents now, and how does the attack work?

It contains:

- current threat counts and dated trends;
- attack techniques;
- known malicious skills and authors;
- reviewed AgentSec intelligence events;
- active campaigns;
- the complete threat database browser;
- source and methodology notes.

Filters update the visible collection without hiding the unfiltered source content from the rendered document. Empty filters show a clear zero-result state and a reset action.

### CVE route

`/security/cves/` answers: is this Claude Code or ecosystem version affected, and what should the reader do?

It contains:

- search by CVE identifier, component, or version text;
- severity and status filters;
- affected version information;
- the first known safe version when the source data provides one;
- a concise vulnerability explanation;
- the primary source for each record;
- a specific remediation block for each result.

Missing safe-version data is displayed as unknown. The interface must not infer a safe version from ordering or publication dates.

### Sandbox route

`/security/sandbox/` answers: which isolation mode fits this use case, and how should it be configured?

It contains:

- the sandbox protection boundary;
- what the sandbox does not protect;
- the three current configuration failures;
- a comparison of supported isolation approaches;
- recommendations by use case;
- copyable configuration examples;
- a final configuration verification list.

Code examples remain visible and selectable when JavaScript is disabled. Copy controls report success or failure without changing the example.

### Hardening route

`/security/hardening/` answers: how can a reader reduce risk now and establish a team baseline?

It contains three progressive paths:

- five-minute baseline;
- thirty-minute workstation hardening;
- team controls and automated checks.

The current defense tools, built-in security commands, permission guidance, secret handling, hooks, and complete checklist move here. Links to Sandbox, CVEs, and Threats appear only where those routes provide the next required step.

Checklist progress may persist in local storage. The checklist remains usable when storage is unavailable and must not require an account.

## Shared components

The implementation should keep route files focused on composition. Expected boundaries are:

### Context

- `ContextHero`
- `ContextConfigurator`
- `ContextSystemFlow`
- `ContextMaturityLadder`
- `ContextNextStep`

### Security

- `SecurityHero`
- `SecuritySubnav`
- `SecurityPathCard`
- `SecurityStats`
- `SecurityChecklist`
- `SecurityRelatedPages`
- focused CVE, threat, sandbox, and hardening components

Shared visual primitives should be used only when two routes have the same semantics and interaction. Similar-looking blocks with different behavior remain separate components.

Page-specific CSS moves out of the Astro route files. Context and Security may share design tokens, but each owns its layout rules. Client scripts should be limited to configurator state, filtering, copying, checklist progress, and small navigation enhancements.

## Data ownership

The pages render a build-time snapshot. They do not depend on a runtime API.

- `src/data/context-data.ts` owns Context options, generation, and maturity rules.
- `src/data/agentsec-security-feed.ts` owns parsed AgentSec versions, dates, counts, events, detectors, and source references.
- `src/data/security-data.ts` owns the static security collections not supplied by the AgentSec feed.

Derived summaries use selectors or helper functions in the data layer. A page cannot hard-code a count that can be derived from a collection.

Every time-sensitive security block displays its effective date. If a field is absent, the interface displays `Unknown` or omits the claim. It does not substitute the build date.

## SEO and discoverability

Each route receives a unique title, description, canonical URL, H1, and opening summary. Proposed title subjects are:

- Context Engineering for Claude Code
- AI Agent Security for Claude Code
- AI Agent Threat Intelligence
- Claude Code CVE Database
- Claude Code Sandbox Security
- Claude Code Security Hardening

The final copy may change, but one route must not target another route's primary task.

The Security hub links to every child route with descriptive anchor text. Child routes link back to the hub and to adjacent routes only when the transition helps complete the task. Visible breadcrumbs and `BreadcrumbList` structured data describe the hierarchy.

All five Security URLs remain canonical and indexable. They are added to the generated sitemap. The hub includes summaries, not duplicated full sections. Existing fragment links continue to resolve to a meaningful teaser on `/security/`.

## Accessibility and responsive behavior

- One H1 per route with a logical heading hierarchy.
- All interactions work with a keyboard and show a visible focus state.
- Tap targets are at least 44 CSS pixels on small screens.
- Filter and configurator state is announced when it changes.
- Color is not the only maturity, severity, status, or progress signal.
- Code and generated output have programmatic labels.
- The layouts do not overflow at a 390 CSS pixel viewport.
- Light and dark themes preserve readable text, controls, borders, and status colors.
- Reduced-motion preferences disable non-essential transitions.

On mobile, the interactive hero card follows the hero copy. Local navigation scrolls horizontally without clipping labels. Tables use a card or controlled horizontal-scroll presentation rather than shrinking text below the site's readable size.

## Failure behavior

- Invalid build-time security data fails validation rather than rendering an unsupported claim.
- The last embedded AgentSec snapshot remains available without network access and displays its actual date.
- Filter states with no match show a reset action.
- Clipboard failure shows an inline error and leaves the source text selectable.
- Local-storage failure keeps the checklist interactive for the current session.
- JavaScript failure leaves core explanations, records, commands, and links readable.

## Content migration map

| Current Security section | Destination |
| --- | --- |
| Hero and By the Numbers | `/security/` |
| Verify Your Repository with AgentSec | `/security/` |
| Attack Techniques | `/security/threats/` |
| CVE Database | `/security/cves/` |
| AgentSec Intelligence | `/security/threats/` |
| Active Campaigns | `/security/threats/` |
| Threat Database Browser | `/security/threats/` |
| The Sandbox | `/security/sandbox/` |
| Defense Tools | `/security/hardening/` |
| Built-in Security Commands | `/security/hardening/` |
| 5-Minute Security Checklist | concise version on `/security/`, full version on `/security/hardening/` |
| Sources & References | concise set on the hub, relevant full sources on each route |

Every current section must have a destination before the original monolith is replaced.

## Verification

### Automated checks

- Unit tests cover context generation, maturity calculation, security selectors, derived counts, filter behavior, and missing-data handling.
- Route tests require all five Security URLs and `/context/`.
- Metadata tests require unique titles, descriptions, canonicals, and one H1 per page.
- Sitemap tests require the four new Security child routes.
- Link tests reject broken internal destinations and non-descriptive generic labels.
- The Astro production build completes.

### Browser checks

Test `/context/` and all five Security routes at desktop and 390-pixel mobile widths in light and dark mode.

Record:

- page height;
- horizontal overflow;
- interactive element count;
- undersized tap targets;
- keyboard navigation;
- focus visibility;
- console errors and warnings;
- configurator, filters, copy controls, and checklist behavior.

### Content parity

A migration inventory maps every current Context and Security heading, interactive control, source, and outbound link to its destination. Completion requires no unexplained loss. Intentional consolidation must be listed in the implementation report.

## Delivery order

1. Extract and test shared data selectors without changing rendered routes.
2. Refactor Context into components and validate behavior parity.
3. Create the four Security child routes from the existing sections.
4. Replace the Security monolith with the hub after content parity passes.
5. Add metadata, breadcrumbs, internal links, fragment targets, and sitemap coverage.
6. Run automated, browser, accessibility, theme, and content-parity checks.

The Security hub replacement is the final structural step so the current content remains reachable while the child routes are built.
