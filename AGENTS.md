# AGENTS.md : landing Claude Code Ultimate Guide

Instructions pour Codex et les agents qui lisent `AGENTS.md`. Claude Code lit `CLAUDE.md` et `.claude/rules/` ; ce fichier renvoie aux mêmes sources pour qu'aucune règle ne diverge.

## À lire avant d'agir

- `CLAUDE.md` : URLs, synchronisation avec le guide principal (`../claude-code-ultimate-guide/`), quiz, index de recherche, bandeau, workflow avant push. Il fait foi pour tout le projet.
- `.claude/rules/design-system.md` : à lire avant toute modification de `src/**/*.astro`, `src/**/*.css` ou `src/**/*.mdx`. Codex ne la charge pas seul.
- `docs/design-system-pilot-2026-11-11/CONTRACT.md` : contrat détaillé des jetons, bandes, cartes et actions.

## Design system (résumé, la règle ci-dessus prime)

- Système du portfolio depuis le 12/11/2026 : ivoire, charbon, orange `--action #f97316`, Barlow Condensed et IBM Plex. L'ancien style indigo est abandonné.
- Couleurs par jetons uniquement (`--bg-*`, `--text-*`, `--accent`, `--action*`, `--border`).
- Sections en `band` + surface (`band-base`, `band-paper`, `band-ink`, `band-accent`) ; une bande charcoal par page longue, une seule bande orange.
- Cartes `brand-card` ou `brand-card brand-interactive-card` ; jamais de `translateY` au survol, d'ombre floue, de `transition: all` ni de rayon de 12 px ou plus.
- Boutons `btn btn-primary` (un par groupe), `btn-secondary`, `btn-quiet` ; ne jamais redéfinir `.btn*` dans un composant.
- Conteneurs à `var(--max-width)` avec une gouttière de `1rem`, alignés sur le logo du header.
- Le travail visuel ne change ni contenu, ni URL, ni ancre, ni `id`, ni ARIA, ni script, ni donnée.

## Vérification

- `pnpm test` : inclut `src/styles/design-system-guard.test.ts`, qui plafonne les motifs de l'ancien style. Un plafond ne monte jamais.
- `pnpm build`, puis `pnpm check:built-seo`.
- Rendu : scripts de `docs/design-system-pilot-2026-11-11/outils/` contre `pnpm astro dev --port 4391 --host 127.0.0.1`. Ne pas lancer `npx playwright install`.

## Sécurité du dépôt

- Fichiers générés à ne jamais éditer : `src/data/guide-search-entries.ts`, `src/data/guide-content-entries.ts`, `src/data/agentsec-security-feed.v1.json`.
- Pathspecs explicites, jamais `git add -A`. Ne pas committer `link-check.*`, `seo-*.md`, `rapport-trafic-*.md`, `scripts/__pycache__/`, ni les captures du design system.
- Pas de commit ni de push sans accord explicite.
