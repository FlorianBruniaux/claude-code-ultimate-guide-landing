---
paths:
  - "src/**/*.astro"
  - "src/**/*.css"
  - "src/**/*.mdx"
  - "src/styles/**"
  - "astro.config.mjs"
  - "tailwind.config.*"
---

# Design system de la landing : système du portfolio

S'applique à toute modification visuelle du site : page, composant, style, contenu Starlight. Depuis le 12/11/2026 (commits `728198c` à `6b2e3b5`), la landing suit le système du portfolio (`florian-portfolio@376d69b7`, `branding-florian@821ad55`). L'ancien style (indigo, cartes qui se soulèvent, ombres douces, pilules) est abandonné.

## Sources qui font foi

- `docs/design-system-pilot-2026-11-11/CONTRACT.md` : jetons, bandes, cartes, actions, liens. À lire avant toute page nouvelle ou refaite.
- `docs/design-system-pilot-2026-11-11/README.md` : historique des itérations et décisions.
- `src/styles/global.css` (jetons), `src/styles/components.css`, `src/styles/portfolio-system.css`, `src/styles/starlight-overrides.css`.
- Skill `boldguy-ui` pour la charte ; agents `boldguy-ui-designer` (implémentation) et `boldguy-design-critic` (verdict sur rendu).

## Règles

- Couleurs : toujours un jeton (`--bg-*`, `--text-*`, `--accent`, `--action*`, `--border`). Pas d'indigo `#6366f1`, violet `#8b5cf6`, cyan `#06b6d4` ou bleu `#3b82f6` comme accent. Les couleurs sémantiques d'état ou de catégorie restent permises.
- Intro de page : `.page-hero`, ou `band band-ink band-hero section-wallpaper`.
- Sections : `band` + une surface (`band-base`, `band-paper section-wallpaper`, `band-ink section-wallpaper`, `band-accent section-wallpaper`). Une bande charcoal au moins par page longue, jamais deux surfaces identiques adjacentes, une seule bande orange par page.
- Chapitres : `ChapterLabel` au-dessus du h2 des 3 à 6 grands chapitres, pas des sous-sections. Une page longue se regroupe en 3 à 5 chapitres, avec un seul appel à l'action final.
- Cartes : `brand-card` (statique) ou `brand-card brand-interactive-card` (cliquable entière). Rayon `var(--border-radius-lg)`. Interdits : `translateY` au survol, `box-shadow` flou ou `--shadow-md/lg`, `transition: all`, rayon de 12 px ou plus, pilule `999px` hors compteur.
- Actions : `btn btn-primary` (une par groupe), `btn btn-secondary`, `btn btn-quiet`. Ne jamais redéfinir `.btn*` localement. `<a>` pour naviguer, `<button>` pour agir, cibles de 44 px.
- Filtres et onglets : bordure `--border`, rayon `--radius-control`, actif en fond `--text-primary` et texte `--bg-primary`, focus `outline: 2px solid var(--accent); outline-offset: 3px`.
- Liens de prose soulignés au repos ; listes de liens soulignées au survol et au focus. Jamais d'URL inventée.
- Alignement : tout conteneur de page utilise `var(--max-width)` (75 rem) avec une gouttière de `1rem`, comme le header. Une colonne de lecture étroite démarre sur le bord du logo : `margin-left: max(0px, calc((100% - var(--max-width)) / 2)); margin-right: auto; padding: 0 1rem`.

## Pièges déjà payés

- Reset de liens global en `:where(...)`, sinon il gagne sur les composants qui veulent souligner.
- Lien-bloc (carte, menu) : `text-decoration: none !important` sur le lien, soulignement porté par le titre seul.
- Starlight enveloppe les titres dans `div.sl-heading-wrapper.level-h2` : cibler `> :is(h2, .sl-heading-wrapper.level-h2)`.
- Pleine largeur dans Starlight : `box-shadow: 0 0 0 100vmax` + `clip-path: inset(0 -100vmax)`, jamais `100vw`.
- Remplissage orange des cartes au survol seulement hors bandes sombres.
- Les règles `p` d'une page restylent le `ChapterLabel` : sélecteur doublé `.chapter-label.chapter-label p`.
- Un bloc de code avec son propre `[data-copy]` ne reçoit pas le bouton du script global (`Layout.astro`, `initCopyButtons`).
- Bandeau : changer le texte impose de bumper `BANNER_ID` et de mettre à jour `src/data/landing-sync.test.ts`.

## Ne pas toucher sans le dire

Contenu, URL, ancres, `id`, ARIA, scripts, données, métadonnées SEO. Le travail visuel ne change rien d'autre.

## Vérification avant commit

1. `pnpm test` : inclut `src/styles/design-system-guard.test.ts`, qui échoue si un motif interdit augmente. Si un motif baisse, abaisser son plafond dans le test.
2. `pnpm build` puis `pnpm check:built-seo`.
3. Rendu : outils de `docs/design-system-pilot-2026-11-11/outils/` (`sweep.cjs`, `sweep-webkit.cjs`, `full.cjs`, `menu.cjs`) contre `pnpm astro dev --port 4391 --host 127.0.0.1`. Clair et sombre à 1440, clair à 390, 0 débordement horizontal, bord gauche du h1 égal à celui du logo.
4. Une commande `node outils/xxx.cjs` doit être seule sur sa ligne (bac à sable). Ne jamais lancer `npx playwright install` : les scripts utilisent le Chrome système (`CHROME_PATH`).
5. Ne jamais committer `docs/design-system-pilot-2026-11-11/captures/` ni `outils/shots/`.
