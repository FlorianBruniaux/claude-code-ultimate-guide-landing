# Backlog Impeccable, audit UX du 13/11/2026

> [!WARNING]
> Version 1, remplacée par `critique-backlog-v2.md`. Le lot 3 visait un mauvais fichier (la vraie cause est `ConsultingCta.astro`), et le lot 1 casserait le tiroir mobile sans condition `min-width: 50rem`. Lancer Impeccable sur le plan v2.

Source des constats : `rapport-ux-2026-11-13.md` (même dossier). Ordre : impact sur le lecteur, puis coût. Taille : S = un fichier et une règle, M = deux à quatre fichiers ou un composant, L = changement de structure ou de contenu.

Chaque lot se traite seul, dans le dépôt landing, sans modifier le contenu, les URL, les ancres, les `id` ni les données. Le contrat visuel reste `.claude/rules/design-system.md`. Après chaque lot : `pnpm test` (inclut `src/styles/design-system-guard.test.ts`), `pnpm build`, puis le script de reproduction cité, relancé contre `pnpm astro dev --port 4391 --host 127.0.0.1` (variable `BASE=http://127.0.0.1:4391`).

## Prêt à corriger

| # | Constat | Sélecteur | Intervention | Fichiers | Taille | Vérification après correction |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | UX-01 pied de page sous la barre latérale | `$impeccable polish` | passer `.sl-footer-portal` au-dessus de `--sl-z-index-menu` | `src/styles/starlight-overrides.css:304-308` | S | `reading.cjs` : capture `guide-hooks-1440-light-fin` sans coupure ; `elementFromPoint` sur la marque dans le pied de page |
| 2 | UX-04 focus invisible du menu Feedback | `$impeccable harden` | `inert` sur le menu fermé, retiré à l'ouverture | `src/components/global/FeedbackFab.astro:29-81` | S | `verify2.cjs` : 0 arrêt invisible ; axe `aria-hidden-focus` = 0 ; ouverture, Tab dans le menu, Échap |
| 3 | UX-03 débordement 700 à 800 px | `$impeccable adapt` | tiroir fermé contenu dans la fenêtre (`inset-inline-end: 0`, `transform: none`) ou `display: none` après transition | `src/components/global/Header.astro:307-332` | S | `verify2.cjs` : 0 px de 600 à 1000 ; ouverture et fermeture du tiroir à 390 et 900, focus rendu |
| 4 | UX-02 page 404 | `$impeccable harden` | `src/pages/404.astro` dans le `Layout` du site : h1, recherche, liens `/`, `/guide/`, `/sitemap/` | `src/pages/404.astro` (nouveau) | M | `pnpm build` produit `dist/404.html` ; `errors.cjs` en local sur `/nope/` : header, recherche ouvrable, liens |
| 5 | UX-05 précédent/suivant en fin de chapitre | `$impeccable clarify` | rendre `<Pagination />` de Starlight dans l'override, avant le portail | `src/components/starlight/Footer.astro` | S | chapitres 06, 07, 08 : liens « Previous » et « Next » corrects, focus clavier, 390 sans débordement |
| 6 | UX-07 bouton « Guide » sur la recherche | `$impeccable polish` | masquer `.guide-menu-trigger` quand la recherche est ouverte (attribut d'état sur `body`) | `src/styles/starlight-overrides.css:598-601`, `src/scripts/search.ts` (ouverture et fermeture) | S | `search.cjs` à 390 sur un chapitre : titre de la recherche visible ; le bouton revient à la fermeture |
| 7 | UX-08 section courante du sommaire mobile | `$impeccable harden` | marge haute de l'observateur = hauteur des barres fixes (138 px) | `src/components/starlight/MobileTableOfContents.astro` | S | `anchor.cjs` à 390 : la barre affiche la section de l'ancre, pour 3 chapitres |
| 8 | UX-10 contrastes | `$impeccable polish` | descriptions des cartes du portail en `--text-secondary` ; texte des zones de l'aide-mémoire en `--action-ink` ou fonds assombris ; liens de `.tip` soulignés | styles des cartes de `/guide/` (sélecteur `.sl-link-card`), `src/pages/cheatsheet/index.astro:492-493` | S | `sweep.cjs` : axe `color-contrast` et `link-in-text-block` = 0 sur `/guide/` et `/cheatsheet/`, clair et sombre |
| 9 | UX-11 défilement animé au chargement d'une ancre | `$impeccable polish` | saut immédiat au chargement, défilement doux réservé aux clics internes | règle `scroll-behavior` globale (à localiser dans `src/styles/`) | S | `anchor.cjs` : titre à moins de 100 px du haut à 300 ms ; clic dans le sommaire toujours fluide ; mouvement réduit inchangé |
| 10 | UX-09 boutons flottants et barres fixes | `$impeccable adapt` | regrouper « Copy for LLM » et « GitHub » hors du flottant ; barre « Guide / On this page » non collante sous `max-height: 600px` ; marge basse du sommaire desktop | `src/components/global/GuidePageFab.astro`, `src/styles/starlight-overrides.css` | M | captures 720×450 et 1440×900 du chapitre 07 et du guide FR : aucun texte de `main` ni lien du sommaire recouvert |
| 11 | UX-13 code à 11,4 px sur mobile | `$impeccable adapt` | taille de code de 13 px sous `50rem` | configuration Expressive Code ou `starlight-overrides.css` | S | `verify.cjs` : aucun `pre` sous 12,5 px à 390 ; pas de débordement nouveau |
| 12 | UX-12 zones défilantes au clavier | `$impeccable harden` | `tabindex="0"`, `role="region"`, `aria-label` sur l'enveloppe des tableaux larges et des `pre` défilants | plugin rehype ou script de page (à choisir) | M | axe `scrollable-region-focusable` = 0 ; Tab puis flèches font défiler le tableau large de `07-hooks` |
| 13 | UX-16, UX-17 recherche | `$impeccable harden` | requête et index normalisés sans accents ; bouton « Retry » et lien « Browse all pages » en cas d'échec d'index | `src/scripts/search.ts` (`message`, `ensurePayload`) et ses tests | S | `search.cjs` : « securite » = « sécurité » ; `errors.cjs` : reprise sans fermer la fenêtre ; `pnpm test` |
| 14 | UX-14, UX-15, UX-19, UX-20, ES-02 finitions | `$impeccable polish` | aligner les libellés du menu sur l'axe du header ; copie visible au repos ; cible de fermeture du bandeau à 44 px ; conteneur du portail à `var(--max-width)` ; séparateurs du bloc auteur | `Header.astro`, `starlight-overrides.css:1032-1040`, `AnnouncementBanner.astro`, page portail, hero | S | `checks.cjs` : centres à ± 1 px ; `sweep.cjs` : `h1dx` = 0 sur `/guide/` à 1440 ; cible ≥ 44 px |
| 15 | UX-18 cases des listes de tâches | `$impeccable harden` | cases décoratives masquées aux technologies d'assistance, ou libellées | rendu Markdown du guide | S | axe `label` = 0 sur le Quick Start |
| 16 | UX-21, AM-06 libellés | `$impeccable clarify` | sur `/guide/*`, retirer « Read the Guide → » du pied de page ; masquer « ⌘K » sous `(hover: none)` | `src/components/global/Footer.astro:80-91`, `Header.astro` | S | capture fin de chapitre ; capture header à 390 |

## Demande ton arbitrage avant correction

| Constat | Question | Options |
| --- | --- | --- |
| UX-06 « Start in 15 min » | Quelle est la porte d'entrée unique du débutant ? | A : bouton vers Quick Start (chapitre 01). B : bouton vers le module 01 du Learning Path. C : garder l'ancre et renommer le bouton « Choose where to start ». |
| AM-05 portail `/guide/` | Les nouveautés passent-elles après les parcours ? | A : « Choose your path » en premier. B : ordre actuel. |
| AM-02 édition française | Faut-il découper la page FR de 165 552 mots par chapitre, avec passage EN ↔ FR au niveau du chapitre ? | A : découper et ajouter `hreflang` et sélecteur (L, pipeline `prepare-guide-content.mjs`). B : garder une page, ajouter seulement un lien vers la FR depuis chaque chapitre (S). |
| AM-03 fiches template | Le site doit-il afficher le contenu du template avec un bouton de copie ? | A : oui, rendu depuis le dépôt du guide au build (M). B : non, GitHub reste la source. |
| AM-01 longueur de ligne | Limiter la prose à 70 ch environ ? | A : oui, code et tableaux en pleine largeur. B : largeur actuelle. |
| UX-05 amorce orpheline | Le découpage du guide doit-il couper avant le h2 du chapitre suivant ? Changement dans le pipeline de contenu, pas seulement visuel. | A : corriger `prepare-guide-content.mjs`. B : laisser l'amorce. |
| UX-22 version de l'aide-mémoire | Corriger la source dans le dépôt du guide, puis resynchroniser (règle du `CLAUDE.md` landing) ? | A : oui, côté guide. B : corriger la landing seule. |
