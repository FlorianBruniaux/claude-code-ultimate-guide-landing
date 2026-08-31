# Homepage Progressive Disclosure Design

## Goal

Turn the homepage into a clear front door while preserving every resource through dedicated routes.

## Homepage contract

- Keep the live GitHub star count in the hero.
- Keep offline downloads discoverable through a compact hero link and a dedicated `/downloads/` page.
- Limit the hero to one promise, two primary actions, three proof points, and the compact author signature.
- Replace persona routing, interactive onboarding, and tool comparison with one three-path `Start Here` section.
- Show four flagship resources on the homepage and move the full inventory to `/resources/`.
- Keep one compact MCP demonstration as the main product proof.
- Group Security, Memory, Diagrams, and Comparisons into a compact `Explore Deeper` section.
- Show three related projects on the homepage and keep all projects on `/projects/`.
- Move blog posts and quick guides near the bottom of the homepage.

## Canonical content

A single TypeScript module exports download links, start paths, flagship resources, deep topics, related projects, and derived resource counts.

- Whitepaper count comes from `WHITEPAPERS.length`.
- Recap card count is the sum of `RECAP_SERIES.cardCount`.
- Diagram count is the sum of `DIAGRAM_THEMES.diagrams.length`.

## Accessibility

- Light-mode links and primary fills use `#c2410c`.
- Dark-mode links keep `#f97316`.
- Dark-mode primary button text uses `#0a0a0a`.
- Actionable text is at least 13px.
- Compact links receive a minimum 24px interaction height where practical.
- The mobile announcement shows one featured item and the changelog.
- The mobile feedback control stays compact and clear of the page edge.

## Route ownership

- `/`: acquisition and orientation.
- `/resources/`: full resource catalogue.
- `/downloads/`: EN and FR PDF/EPUB downloads.
- `/projects/`: full related-project catalogue.

## Verification

- Data-model tests cover canonical counts, unique destinations, and required catalogue sizes.
- Astro build proves every route renders.
- Browser checks cover desktop and mobile in light and dark modes.
- Final measurements report page height, link count, card count, contrast, overflow, and console errors.
