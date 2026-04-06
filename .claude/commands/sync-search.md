---
name: sync-search
description: Rebuild the Cmd+K search index from reference.yaml
---

<!-- Configure: set GUIDE_REPO_PATH to your local guide repository path -->
<!-- Default: /Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide -->
<!-- Override with: GUIDE_REPO_PATH=/path/to/your/guide node scripts/build-guide-index.mjs -->

Rebuild the global search index by running the build script that parses the guide's `reference.yaml` and regenerates `src/data/guide-search-entries.ts`.

## Steps

1. Run the build script:
```bash
node scripts/build-guide-index.mjs
```

2. Show a summary of what was generated (entries count, any warnings).

3. If entries count changed significantly (±20%), flag it and ask whether to proceed.

4. Verify the file was updated:
```bash
head -5 src/data/guide-search-entries.ts
wc -l src/data/guide-search-entries.ts
```

5. Run a quick sanity build to confirm no TypeScript errors:
```bash
pnpm build
```

6. Report the result: total entries in the index (landing + guide), build status.

## Context

- **Source**: `$GUIDE_REPO_PATH/machine-readable/reference.yaml` (default: `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide`)
- **Output**: `src/data/guide-search-entries.ts` (auto-generated, do not edit manually)
- **Total index**: `src/data/search-index.ts` aggregates landing entries + guide entries
- Run this after pulling updates from the guide repo or when `reference.yaml` changes