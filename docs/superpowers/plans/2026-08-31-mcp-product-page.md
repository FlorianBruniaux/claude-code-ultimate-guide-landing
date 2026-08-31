# MCP Product Page Implementation Plan

**Goal:** Publish a dedicated `/mcp/` product page backed by reproducible public-runtime and npm evidence, then connect it to the landing discovery surfaces.

**Evidence boundary:** The page describes the npm package that is public when the snapshot is generated. npm downloads are distribution events, not users, active installations, sessions, or tool executions. Candidate-only capabilities stay out of the public page.

## Task 1: Public runtime snapshot in the guide repository

**Files:**

- Create `machine-readable/mcp-public-runtime.json`
- Create `mcp-server/scripts/generate-public-runtime-snapshot.mjs`
- Create `mcp-server/test/public-runtime-snapshot.test.mjs`
- Modify `mcp-server/package.json`
- Modify `CHANGELOG.md` through its generated source when required

Write a failing contract test first. Generate the snapshot by starting the public npm package and calling MCP `initialize`, `tools/list`, `resources/list`, and `prompts/list`. Record package identity, npm version, server handshake identity, names or URIs, counts, and snapshot time. Never record prompts, arguments, results, local paths, or user content.

Acceptance: the generator rejects incomplete or contradictory responses, the fixture test passes, and the committed snapshot reports the currently public package only.

## Task 2: Landing data contract

**Files:**

- Create `src/utils/mcp-product-data.ts`
- Create `src/utils/mcp-product-data.test.ts`

Write failing tests for a valid snapshot, a missing file, an invalid schema, a count mismatch, and npm statistics that claim a period without explicit start and end dates. Load `machine-readable/mcp-public-runtime.json` and `mcp-server/data/mcp-stats.json` from `GUIDE_REPO_PATH`.

Acceptance: the loader returns one typed page model and fails closed with actionable errors when public evidence is missing or contradictory.

## Task 3: Dedicated `/mcp/` page

**Files:**

- Create `src/pages/mcp/index.astro`
- Create `src/components/mcp/McpTerminal.astro`
- Create `src/pages/mcp/mcp-page.test.ts`

Write the route contract test first. Render one command that matches the public npm version, a first useful query, public capabilities, compatibility, network and privacy limits, dated npm metrics, methodology, FAQ, source links, and the technical guide link. The copy button is progressive enhancement and reports success or failure through an accessible status element. Long commands must wrap or scroll safely on narrow screens.

Acceptance: the page works without client JavaScript, uses a self-canonical URL, contains visible content matching its `SoftwareApplication` and `FAQPage` JSON-LD, and does not claim active users.

## Task 4: Discovery surfaces

**Files:**

- Modify `src/components/landing/McpProof.astro`
- Modify `src/pages/resources/index.astro`
- Modify `src/data/search-index.ts`
- Modify `src/pages/sitemap/index.astro`
- Modify `src/components/global/Header.astro`
- Modify `astro.config.mjs`
- Modify the focused tests for each contract
- Modify `CHANGELOG.md`

Link the homepage MCP CTA to `/mcp/` and keep GitHub as a secondary source link. Add the product page to Resources, Cmd+K, the HTML sitemap, the header More menu, and stable page dates. Leave `/mcp-or-cli/` unchanged.

Acceptance: every discovery contract points to `/mcp/`, URLs remain unique, and no unrelated navigation semantics change.

## Task 5: Verification

Run focused tests after every red-green cycle, then `pnpm test`, `pnpm check`, `pnpm build`, and `git diff --check`. Inspect `/mcp/` in light and dark themes, at desktop and mobile widths, and with JavaScript disabled. Verify the canonical, structured data, HTML sitemap, generated XML sitemap, and Cmd+K result.

No push, deploy, npm publication, registry submission, or production analytics change belongs to this implementation without separate approval.
