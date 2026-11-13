# Critique du backlog Impeccable et plan consolidé v2, 13/11/2026

Plan critiqué : `backlog-impeccable.md` (même dossier). Les hypothèses ont été testées en production avec `outils/plan-probe.cjs` et `outils/plan-probe2.cjs`, et par lecture du code.

## Plan Critique : backlog Impeccable v1

### Readiness

**Score** : 55 % : 🟠 à retravailler avant de lancer Impeccable.

### What's Solid

- Chaque lot cite un constat, des fichiers et une vérification observable.
- Les décisions éditoriales majeures (porte d'entrée débutant, édition FR, templates) sont déjà isolées dans un tableau d'arbitrage.
- Les lots 2, 5 et 6 ont une cause prouvée par mesure ou par le code de Starlight.

### Blockers 🔴

1. **Lot 3 corrige le mauvais fichier.** Le débordement vaut `850 − largeur` (150 px à 700, 82 à 768, 50 à 800), alors que le tiroir du menu dépasse de 20 px seulement, à toutes les largeurs, et ne crée aucun débordement à 640. Le vrai coupable est `div.consulting-cta-actions` (bord droit fixe à 850 px), à cause de `flex-shrink: 0` (`src/components/global/ConsultingCta.astro:68-74`). Le tiroir est dans le header fixe et n'agrandit pas la page.
   - Fix : viser `ConsultingCta.astro`. Rapport corrigé le 13/11.
2. **Lot 1 casse le tiroir mobile.** Le tiroir du guide ouvert sous 50 rem utilise le même `z-index: 5` que la barre latérale desktop (mesure : `.sidebar-pane` fixe, z 5, 343×844 px, au-dessus d'un pied de page en z 1). Monter le pied de page à 6 sans condition le ferait passer au-dessus du tiroir ouvert en bas de page.
   - Fix : appliquer la règle sous `@media (min-width: 50rem)` uniquement ; tester le tiroir ouvert en bas de page à 390.
3. **Aucune vérification n'est exécutable par Impeccable.** Les scripts chargent Playwright depuis un autre dépôt (`~/Sites/perso/html-pres/node_modules`) et le Chrome du Mac ; le skill Impeccable interdit d'installer un outil manquant. Dans une session Codex sans ces chemins, chaque critère « script X » reste « non vérifié ». Aucun lot ne prévoit de test qui échoue d'abord (RED) dans `pnpm test`.
   - Fix : chaque lot commence par un test statique ou happy-dom qui échoue, quand le défaut se prête à une preuve hors navigateur ; la preuve de rendu reste une porte passée par la session Claude qui dispose des scripts.

### Major Concerns 🟠

1. **Vérifier contre `pnpm astro dev` est faux pour plusieurs lots.** La 404 n'existe qu'au build, le portail du pied de page est un script inline, et le contenu du guide en dev vient de la copie locale, en retard sur `origin/main` (`47ca6d08` contre `d445ad98`).
   - Suggestion : `pnpm build` puis `pnpm preview`, après une mise à jour de la copie locale du guide décidée par Florian.
2. **Lot 5 et l'amorce orpheline sont couplés.** Ajouter « Next » sans retirer l'amorce donne en fin de chapitre 7 : titre « 8. MCP Servers », « Quick jump », puis un lien « Next : 8. MCP Servers ».
   - Suggestion : livrer la pagination et le découpage ensemble, après arbitrage.
3. **Lot 9 : passer `scroll-behavior` à `auto` supprime aussi le défilement doux du sommaire.** La règle est globale (`src/styles/global.css:172-176`). De plus, un saut immédiat peut tomber à côté si des diagrammes ou des polices changent la hauteur après le saut ; le critère « titre à moins de 100 px à 300 ms » ne le voit pas.
   - Suggestion : désactiver le défilement doux le temps du chargement seulement (script inline qui pose `scroll-behavior: auto`, puis le retire après `load`) ; critère vérifié à 300 ms **et** à 3 s.
4. **Lot 7 vise un observateur qui n'existe pas.** Le sommaire mobile calcule un seuil, `hauteur header (56) + hauteur du summary (44) + 32 = 132 px` (`src/components/starlight/MobileTableOfContents.astro:166-168`), alors que la barre collante finit à 138 px et que le titre arrive à 136 px.
   - Suggestion : seuil = bord bas réel de la barre (`getBoundingClientRect().bottom`) + 8 px, cohérent avec le `scroll-margin-top` des titres.
5. **Lots 10 et 16 sont des décisions produit, pas des corrections.** Déplacer « Copy for LLM » et retirer « Read the Guide → » changent des fonctions et du contenu, ce que les contraintes interdisent sans accord.
   - Suggestion : les passer en arbitrage.
6. **Lot 4 ignore pourquoi la 404 a été coupée.** `disable404Route: true` vient du commit SEO `2ec6ee2` (19/02/2026), sans raison écrite. Une 404 indexable ou présente dans le sitemap créerait un problème SEO.
   - Suggestion : `noindex`, exclusion du sitemap, `pnpm check:built-seo` vert.
7. **Livraison directe en production sans retour arrière écrit.** Chaque push sur `main` déploie la production ; aucun aperçu, aucun lot de livraison, aucune procédure de retour.
   - Suggestion : un lot de livraison final, avec accord explicite, `git revert` comme retour arrière et balayage de production après déploiement.

### Missing Elements ❌

- [ ] Test RED par lot quand le défaut est prouvable hors navigateur (pagination rendue, 404 présente et `noindex`, `inert` sur le menu fermé, seuil du sommaire, normalisation des accents).
- [ ] Contrôle de non-régression de UX-01 sur le tiroir mobile ouvert en bas de page.
- [ ] Cause de UX-13 (code à 11,375 px = 0,875 × 13 px ?) et de UX-14 (menu décalé de 6 px) : non localisées, donc correctifs « TBD ».
- [ ] Choix entre plugin rehype et script pour le lot 12 (« à choisir »).
- [ ] Ordre de passage des lots qui touchent le même fichier (`Header.astro` : lots 3 v1 et 14 ; `search.ts` : lots 6 et 13 ; `starlight-overrides.css` : lots 1, 6, 10, 14).
- [ ] Balayage final complet (`sweep.cjs`) comparé à `sweep.json` de l'audit.

### Delivery Graph

| Unit | Delivers | Blocked by | Validation |
|------|----------|------------|------------|
| U00 | Arbitrages : porte d'entrée débutant, amorce orpheline, place des boutons flottants, CTA du pied de page | None | réponses écrites dans le backlog |
| U01 | Aperçu fiable : copie du guide à jour, `pnpm build`, `pnpm preview`, balayage de référence | None | `sweep.cjs` sur l'aperçu reproduit les mesures de production de l'audit |
| U02 | UX-04 focus invisible supprimé | U01 | test happy-dom RED puis vert ; 0 arrêt invisible au Tab |
| U03 | UX-03 page sans débordement | U01 | 0 px de 600 à 1000 px, Chrome et WebKit |
| U04 | UX-01 pied de page lisible, tiroir mobile intact | U01 | marque du pied de page visible à 1440 ; tiroir ouvert en bas de page à 390 au-dessus du pied |
| U05 | UX-02 page 404 utile, non indexée | U01 | `dist/404.html`, `noindex`, absent du sitemap, `check:built-seo` vert |
| U06 | UX-07 recherche mobile non recouverte | U01 | titre de la recherche visible à 390 sur un chapitre |
| U07 | UX-08 section courante juste sur mobile | U01 | barre = « 7.4 Security Hooks » après l'ancre |
| U08 | UX-11 arrivée immédiate sur une ancre | U07 | titre en place à 300 ms et toujours en place à 3 s ; sommaire encore fluide au clic |
| U09 | UX-05 chapitre suivant, sans amorce | U00, U04 | chapitres 06 à 08 : « Next » juste, aucun h2 du chapitre suivant |
| U10 | UX-10 contrastes | U01 | axe `color-contrast` et `link-in-text-block` = 0 sur `/guide/` et `/cheatsheet/` |
| U11 | UX-13 code lisible sur mobile | U01 | aucun `pre` sous 12,5 px à 390 |
| U12 | UX-12 zones défilantes au clavier | U01 | axe `scrollable-region-focusable` = 0 |
| U13 | UX-16 et UX-17 recherche plus tolérante | None | tests `search.ts` RED puis verts : accents, bouton « Retry » |
| U14 | Finitions séparées : fermeture du bandeau, bouton de copie, alignement du portail, alignement du menu | U01 | une mesure par finition (cible ≥ 44 px, opacité, `h1dx` = 0, centres ± 1 px) |
| U15 | UX-09 boutons flottants, UX-06, UX-21 selon arbitrage | U00, U01 | captures 720×450 et 1440 sans texte recouvert ; un clic de l'accueil au contenu choisi |
| U16 | Livraison : lot de commits validé, déploiement, contrôle de production | U02 à U15 retenus | balayage de production ≤ mesures de l'aperçu ; aucun nouveau défaut |

**Frontier :** U00, U01, U13.

### Scope Creep Check

- **Essentiel** : U02, U03, U04, U05 (les quatre P1), puis U06, U07, U09, U10.
- **À déférer, avec déclencheur** :
  - U12 (rehype) : quand un lecteur clavier ou Safari est signalé, ou après U02 à U10 ;
  - U14, alignement du menu : après une mesure de cause ;
  - AM-01 à AM-05 : après arbitrage seulement.

### Top 3 Actions Before Starting

1. Recibler le lot 3 sur `ConsultingCta.astro` et restreindre le lot 1 au desktop (fait dans le rapport).
2. Monter l'aperçu `build` + `preview` sur un guide à jour, et ajouter un test RED par lot prouvable hors navigateur.
3. Obtenir les arbitrages U00 avant de toucher à la pagination, aux boutons flottants et aux appels à l'action.

---

## Plan consolidé : backlog Impeccable v2

### Ce qui change vs v1

- Lot 3 (cause fausse) → U03 vise `ConsultingCta.astro:68-74`.
- Lot 1 (régression mobile) → U04 limité à `min-width: 50rem`, avec contrôle du tiroir.
- Vérification contre `astro dev` → aperçu `build` + `preview` (U01).
- Aucun test RED → test statique ou happy-dom en tête de U02, U05, U07, U09, U13.
- Lot 9 → U08 désactive le défilement doux pendant le chargement seulement, critère à 300 ms et 3 s.
- Lot 7 → U07 corrige le seuil réel (`MobileTableOfContents.astro:166-168`).
- Lots 10 et 16 → passés en arbitrage (U00, puis U15).
- Lot 14 → découpé en quatre finitions indépendantes.
- Livraison → U16 avec accord, retour arrière et contrôle de production.

### Phases

**Phase 0 : Prérequis**

- [ ] U00 : arbitrages de Florian.
- [ ] U01 : copie locale du guide mise à jour (après accord), `pnpm build`, `pnpm preview`, balayage de référence.

Decision gate : si le balayage de l'aperçu reproduit UX-01 à UX-04, continuer. Sinon, comprendre l'écart avant toute correction.

**Phase 1 : MVP**

- [ ] U03 : une règle CSS dans `ConsultingCta.astro`.
- Validation : `scrollWidth − innerWidth = 0` de 600 à 1000 px, Chrome et WebKit, sur l'aperçu.

**Phase 2 : Extension**

- [ ] U02, U04, U05 (P1 restants), puis U06, U07, U08, U10, U11, U13.
- [ ] U09 et U15 après U00.
- [ ] U12 et U14 selon leurs déclencheurs.
- [ ] U16 : livraison.

### Delivery Units

#### U00 : Arbitrages

- **Delivers :** décisions sur la porte d'entrée débutant, l'amorce orpheline, la place de « Copy for LLM » et « GitHub », le CTA « Read the Guide » des pages du guide.
- **Blocked by :** None
- **Validation :** chaque décision écrite dans `backlog-impeccable.md`, avec son option.

#### U01 : Aperçu fiable

- **Delivers :** un site local construit comme la production, sur un guide à jour.
- **Blocked by :** None
- **Validation :** `sweep.cjs` lancé avec `BASE=http://127.0.0.1:4321` retrouve les débordements, contrastes et arrêts de focus mesurés en production.

#### U02 : Menu Feedback hors du parcours clavier quand il est fermé

- **Delivers :** plus de focus invisible sur aucune page.
- **Blocked by :** U01
- **Validation :** test happy-dom qui échoue tant que `#feedback-menu` fermé n'a pas `inert` ; `verify2.cjs` : 0 arrêt invisible.

#### U03 : Accueil sans débordement entre 641 et 850 px

- **Delivers :** page stable au zoom 200 % et en fenêtre étroite.
- **Blocked by :** U01
- **Validation :** 0 px de 600 à 1000 px par pas de 20, Chrome et WebKit.

#### U04 : Pied de page au-dessus de la barre latérale, desktop seulement

- **Delivers :** pied de page lisible sur les pages du guide.
- **Blocked by :** U01
- **Validation :** à 1440, `elementFromPoint` sur la marque renvoie le pied de page ; à 390, tiroir ouvert en bas de page entièrement visible.

#### U05 : Page 404 du site

- **Delivers :** sortie de secours avec header, recherche et liens.
- **Blocked by :** U01
- **Validation :** test statique RED (fichier `src/pages/404.astro` présent, `noindex`) ; `dist/404.html` ; absent de `sitemap-0.xml` ; `pnpm check:built-seo` vert.

#### U06 : Recherche mobile au premier plan

- **Delivers :** titre et champ de recherche jamais recouverts.
- **Blocked by :** U01
- **Validation :** règle CSS sans JS (`body:has(.search-modal:not([hidden])) .guide-menu-trigger { visibility: hidden; }`) ; capture à 390 sur un chapitre.

#### U07 : Seuil du sommaire mobile

- **Delivers :** la barre « On this page » nomme la section lue.
- **Blocked by :** U01
- **Validation :** test du calcul RED (seuil < bord bas de la barre) ; `anchor.cjs` à 390 sur trois chapitres.

#### U08 : Arrivée immédiate sur une ancre

- **Delivers :** un lien profond s'ouvre sur sa section sans défilement de plusieurs secondes.
- **Blocked by :** U07
- **Validation :** titre en place à 300 ms et à 3 s ; clic dans le sommaire toujours fluide ; mouvement réduit inchangé.

#### U09 : Chapitre suivant

- **Delivers :** lien « Previous / Next » et fin de chapitre propre.
- **Blocked by :** U00, U04
- **Validation :** test statique RED (l'override de `Footer.astro` rend `Pagination` hors du portail) ; chapitres 06, 07, 08 sans h2 du chapitre suivant.

#### U10 : Contrastes

- **Delivers :** textes secondaires du portail et zones de l'aide-mémoire lisibles.
- **Blocked by :** U01
- **Validation :** axe à 0 sur `/guide/` et `/cheatsheet/`, clair et sombre.

#### U11 : Code mobile

- **Delivers :** code à 13 px sous 50 rem.
- **Blocked by :** U01
- **Validation :** cause localisée d'abord ; puis aucun `pre` sous 12,5 px à 390, aucun débordement nouveau.

#### U12 : Zones défilantes au clavier

- **Delivers :** tableaux larges et blocs défilants atteignables au Tab.
- **Blocked by :** U01
- **Validation :** plugin rehype pour les tableaux Markdown, `tabindex` posé à la main dans `/cheatsheet/` et `/security/` ; axe `scrollable-region-focusable` = 0.

#### U13 : Recherche tolérante

- **Delivers :** accents ignorés, reprise après un échec d'index.
- **Blocked by :** None
- **Validation :** tests de `search.ts` RED puis verts ; `errors.cjs` : bouton « Retry » qui recharge l'index.

#### U14 : Finitions

- **Delivers :** quatre corrections indépendantes, une par commit.
- **Blocked by :** U01
- **Validation :** cible de fermeture du bandeau ≥ 44 px ; bouton de copie visible au repos ; `h1dx` = 0 sur `/guide/` à 1440 ; menu aligné à ± 1 px après mesure de la cause.

#### U15 : Décisions appliquées

- **Delivers :** boutons flottants, porte d'entrée débutant et CTA du pied de page selon U00.
- **Blocked by :** U00, U01
- **Validation :** à 720×450, aucun texte recouvert ; depuis l'accueil, un clic mène au contenu choisi.

#### U16 : Livraison

- **Delivers :** corrections en production, après accord.
- **Blocked by :** U02 à U15 retenus
- **Validation :** `pnpm test`, `pnpm build`, `pnpm check:built-seo` verts ; après déploiement, `sweep.cjs` en production sans nouveau défaut.

**Frontier at plan start :** U00, U01, U13.

**Out of scope** (déféré avec déclencheur)

- AM-01 longueur de ligne : après arbitrage.
- AM-02 édition FR découpée : décision d'architecture, chantier séparé.
- AM-03 contenu des templates : décision éditoriale.
- AM-04 liens GitHub vers la section : après U09.
- AM-05 ordre du portail : avec U00.
- UX-22 version de l'aide-mémoire : à corriger dans le dépôt du guide, puis synchroniser.

### Rollback

- Si ça casse : `git revert <sha>` du commit fautif, puis push sur `main` (redéploiement automatique).
- Preuve de restauration : le script du lot, relancé en production, retrouve la mesure d'avant.

### Critère de succès (mesurable)

- [ ] 0 px de débordement de 320 à 1440 px sur les 16 pages couvertes, Chrome et WebKit.
- [ ] 0 arrêt de focus invisible ; axe `aria-hidden-focus`, `color-contrast` et `scrollable-region-focusable` = 0 sur les pages couvertes.
- [ ] Pied de page lisible à 1440 et tiroir mobile intact à 390.
- [ ] Une URL inexistante affiche la 404 du site, non indexée.
- [ ] Chaque chapitre 00 à 12 se termine par « Next » sans amorce du chapitre suivant.
