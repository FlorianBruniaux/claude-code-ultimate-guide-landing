# Corrections appliquées, 13/11/2026

Plan suivi : `critique-backlog-v2.md`. Rien n'est commité. Preuves : `pnpm test` 497/497, `pnpm astro check` 0 erreur, `pnpm build` (53 diagrammes rendus), `pnpm check:built-seo` vert, `outils/after.cjs` sur `pnpm astro preview` (31 critères sur 33, détail dans `apres.json`), puis `outils/axe-one.cjs` sur `/cheatsheet/`. Garde-fous : `src/components/global/ux-audit-fixes.test.ts` (22 tests, tous rouges avant correction).

| Constat | Correction | Fichiers | Vérification |
| --- | --- | --- | --- |
| UX-01 | pied de page au-dessus de la barre latérale, desktop seulement | `src/styles/starlight-overrides.css` | marque du pied de page visible à 1440 ; tiroir mobile intact en bas de page à 390 |
| UX-02 | page 404 du site, `noindex`, recherche et liens de sortie | `src/pages/404.astro` | 404 à 1440 et 390, header présent, recherche ouvrable, absente du sitemap |
| UX-03 | `flex-shrink: 0` retiré du bloc d'actions du CTA conseil | `src/components/global/ConsultingCta.astro` | 0 px de 600 à 1000 px (Chrome), 0 px à 720 et 768 (WebKit) |
| UX-04 | menu Feedback `inert` quand il est fermé | `src/components/global/FeedbackFab.astro` | 0 arrêt de focus invisible sur 300 tabulations |
| UX-05 | pagination Starlight rendue ; chaque H1 numéroté du guide ouvre son chapitre | `src/components/starlight/Footer.astro`, `scripts/prepare-guide-content.mjs` | chapitre 7 : « Previous 6. Slash Commands », « Next 8. MCP Servers », plus d'amorce ; chapitre 8 commence par son ancre et son temps de lecture |
| UX-07 | bouton « Guide » masqué tant que la recherche est ouverte | `src/styles/starlight-overrides.css` | la recherche couvre le bouton à 390 |
| UX-08 | seuil du sommaire mobile mesuré sur le bas réel des barres | `src/components/starlight/MobileTableOfContents.astro` | barre = « 7.4 Security Hooks » après l'ancre |
| UX-09 | boutons flottants en icônes sous 600 px de haut ; plus de soulèvement au survol | `src/components/global/GuidePageFab.astro`, `src/styles/components.css` | libellés masqués à 720×450 |
| UX-10 | descriptions de cartes en `--text-secondary` ; texte encre sur les zones ; liens soulignés dans `.tip` ; `.dont` assombri en clair | `src/styles/starlight-overrides.css`, `src/pages/cheatsheet/index.astro` | axe 0 sur `/guide/` et `/cheatsheet/`, clair et sombre |
| UX-11 | saut immédiat au chargement d'une ancre, défilement doux rétabli ensuite | `src/styles/global.css`, `src/components/global/Header.astro` | titre à 88 px à 300 ms et à 3 s ; `scroll-behavior: smooth` après chargement |
| UX-12 | tableaux et `pre` qui débordent rendus focusables, contour au focus | `src/components/starlight/Header.astro`, `src/layouts/Layout.astro`, `src/styles/starlight-overrides.css` | axe `scrollable-region-focusable` 0 sur Hooks, `/cheatsheet/`, `/security/` |
| UX-13 | `code` dans un bloc hérite de la taille du bloc (13 px mobile, 14 px desktop) | `src/styles/starlight-overrides.css` | plus petit texte de code ≥ 12,5 px à 390 |
| UX-15 | bouton de copie visible au repos (0,6) | `src/styles/starlight-overrides.css` | opacité ≥ 0,5 à 1440 |
| UX-16 | recherche insensible aux accents | `src/scripts/search-model.ts` | « securite » renvoie des résultats |
| UX-17 | échec d'index : bouton « Retry » et lien « Browse all pages » | `src/scripts/search.ts` | reprise après échec sans fermer la fenêtre |
| UX-18 | cases des listes de tâches masquées aux technologies d'assistance | `src/components/starlight/Header.astro` | axe `label` 0 sur le Quick Start |
| UX-19 | bouton de fermeture du bandeau à 44 px, hauteur du bandeau inchangée | `src/components/global/AnnouncementBanner.astro` | cible ≥ 44 px |
| UX-20 | portail `/guide/` dans le conteneur du site | `src/styles/starlight-overrides.css` | h1 aligné sur le logo (0 px) |
| AM-06 | indice ⌘K masqué sur écran tactile | `src/components/global/Header.astro` | `display: none` à 390 tactile |
| ES-02 | séparateurs du bloc auteur qui ne pendent plus en fin de ligne | `src/components/landing/AuthorProfile.astro` | capture `apres-home-1440-light-defaut.png` |

Plafond du garde-fou design system : `translateY(-` abaissé de 21 à 20 (`src/styles/design-system-guard.test.ts`).

## Non traité

- UX-14 : l'alignement du menu en haut du header est une décision verrouillée par `header-layout.test.ts` ; à arbitrer.
- UX-06, UX-21, AM-01 à AM-05 : décisions éditoriales ou d'architecture en attente.
- UX-22 : reclassé, comportement voulu (version des éditions PDF).
- Constats `CX-*` de `rapport.md` (audit parallèle d'un autre agent) : non traités, à fusionner.

## Signalé pendant la correction

- Le cache puppeteer local (`~/.cache/puppeteer/chrome`) est vide : `pnpm build` échoue au rendu Mermaid. Build passé avec un `.puppeteerrc.cjs` temporaire pointant sur le Chrome du Mac, supprimé ensuite.
- Quand les diagrammes se rendent en local, `src/data/guide-content-entries.ts` absorbe le balisage SVG dans les mots-clés de recherche. Les fichiers générés suivis (`guide-content-entries.ts`, `diagrams-data.ts`) ont été restaurés à `HEAD` ; le défaut du générateur reste à corriger.
