# Audit UX/UI du Claude Code Ultimate Guide, 13/11/2026

Diagnostic seulement : aucun fichier du site ni du guide n'a été modifié. Les captures sont dans `captures/`, les mesures brutes dans `sweep.json`, les scripts de reproduction dans `outils/` (Playwright déjà installé, Chrome système, axe-core déjà présent sur la machine).

## 1. Surfaces et versions

| Surface | URL ou chemin | Produite par | Version observée |
| --- | --- | --- | --- |
| Site public (landing + guide en ligne) | https://cc.bruniaux.com/ (`public/CNAME`) | dépôt landing, `.github/workflows/deploy.yml`, à chaque push sur `main` et chaque jour à 05:00 UTC | dernier déploiement réussi : commit landing `6994663` le 13/11/2026 à 07:53 UTC |
| Contenu du guide en ligne (`/guide/*`) | https://cc.bruniaux.com/guide/ | le build landing clone `claude-code-ultimate-guide` (branche par défaut) et lance `scripts/prepare-guide-content.mjs` | `main` distant : `d445ad98` (12/11/2026 14:37 UTC) ; non vérifié que ce SHA est celui du dernier build (journal du job non lu) |
| Dépôt du guide | https://github.com/FlorianBruniaux/claude-code-ultimate-guide | dépôt guide | `VERSION` = 3.45.2 |
| Téléchargements PDF/EPUB EN et FR | GitHub Releases, `releases/latest/download/guide-export*.{pdf,epub}` | dépôt guide | release `guide-export-v3.45.2` du 01/11/2026, quatre fichiers, GET 206 |
| Aperçu local landing | `http://127.0.0.1:4391` (serveur dev déjà lancé) | copie locale | `main` = `6994663` = `origin/main`. Non utilisé pour l'audit : la production a servi de référence |
| Copie locale du guide | `~/Sites/perso/claude-code-ultimate-guide` | copie locale | `main` = `47ca6d08`, sans modification, en retard sur `d445ad98` distant |

Écarts signalés, non corrigés :

- copie locale du guide en retard d'au moins un commit sur `origin/main` (`47ca6d08` contre `d445ad98`) ;
- page `/cheatsheet/` : affiche « Guide v3.44.1 · Updated October 6, 2026 » alors que le guide et sa release sont en 3.45.2 (capture `sweep-cheatsheet-390x844-light.png`) ;
- page française : « Dernière mise à jour : 6 octobre 2026 ; 24 octobre 2026 » dans le texte, « Last updated: 12 nov. 2026 » dans l'en-tête ;
- workflow « Link Check » : `startup_failure` sur les deux derniers runs (13/11, `38ac573` et `6994663`). Hors périmètre UX, signalé seulement.

Changements locaux non suivis, laissés intacts : `docs/design-system-pilot-2026-11-11/PROMPT-COWORK.md`, `link-check.*`, `rapport-trafic-*.md`, `seo-*.md`, `scripts/__pycache__/`, et ce dossier `docs/ux-audit-2026-11-13/`.

## 2. Ce qui a été couvert

Tout le rendu est émulé dans Chrome 157 headless (Playwright 1.62.1), plus un contrôle WebKit (moteur Safari) sur 4 cellules. Aucun appareil physique, aucun lecteur d'écran, pas de Firefox.

### Matrice pages × cellules

Cellules : 1440×900 clair et sombre, 768×1024 clair (tactile émulé), 390×844 clair et sombre (tactile), 320×640 clair (tactile), 720×450 clair (équivalent zoom 200 % d'un écran 1440×900).

| Page | 1440 clair | 1440 sombre | 768 | 390 clair | 390 sombre | 320 | 720×450 | axe |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/guide/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/guide/ultimate-guide/01-quick-start/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/guide/ultimate-guide/07-hooks/` | ✓ parcours | ✓ | ✓ | ✓ parcours | ✓ | ✓ | ✓ | ✓ |
| `/guide/cheatsheet/`, `/cheatsheet/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/examples/`, `/examples/adrwritermd/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/downloads/`, `/sitemap/`, `/guide/translations/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/learning/`, `/quiz/`, `/security/`, `/resources/`, `/glossary/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/guide/ultimate-guidefr/` | ✓ | thème sombre persistant | | | | | | |
| URL inexistante | ✓ | | | ✓ | | | | |

WebKit : `/` à 390 et 768, chapitre Hooks à 390, `/guide/` à 1440.

### Parcours et états exercés

| Parcours | Exercé | Script |
| --- | --- | --- |
| Accueil → « Start in 15 min » → premier contenu | 1440, 390 | `nav.cjs` |
| Accueil → « Browse the full guide » → portail | 1440, 390 | `nav.cjs` |
| Recherche : 15 requêtes réelles, partielles, accentuées, techniques, inexistante | 1440, 390 | `search.cjs` |
| Recherche : flèches + Entrée, piège du focus, Échap et retour du focus, Cmd+K, Ctrl+K, `/` | 1440, 390 | `search.cjs` |
| Recherche : index en échec puis reprise | 1440, 390 | `errors.cjs` |
| Ancre directe (3 chapitres), mouvement normal et réduit | 1440, 390 | `anchor.cjs` |
| Sommaire desktop et mobile, retour arrière | 1440, 390 | `reading.cjs` |
| Copie d'un bloc de code, « Copy for LLM », tableaux larges, fin de chapitre | 1440, 390 | `reading.cjs`, `checks.cjs` |
| Menus du header au clavier, menu mobile, « All pages » | 1440, 390 | `nav.cjs` |
| Marche complète au Tab (260 arrêts) à la recherche de focus invisible | 1440 | `verify2.cjs` |
| Thème : bascule et persistance sur 3 pages | 1440 | `theme-lang.cjs` |
| Site → dépôt, téléchargements, édition française | 1440 | `checks.cjs`, `theme-lang.cjs` |
| Page 404 | 1440, 390 | `errors.cjs` |

### Limites de couverture

- Émulation seulement : tactile, zoom 200 % (viewport 720×450, pas le zoom du navigateur), WebKit headless. Aucun iPhone, iPad ou Android réel.
- Pas de lecteur d'écran, pas de Firefox (non installé, téléchargement interrompu le 12/11).
- axe-core couvre une partie des critères WCAG ; ce rapport n'est pas une certification d'accessibilité.
- Le contenu du guide (exactitude technique) n'est pas revu.
- Pages non couvertes : la plupart des 117 pages `/guide/*`, les 180 fiches glossaire, 59 recap cards, 51 templates, 23 rôles. Les gabarits partagés sont couverts par un représentant.

## 3. Ce qui fonctionne (à conserver)

- **Recherche** : combobox avec `aria-activedescendant`, résultats groupés par section et par onglet, compteur dans une région live (« 60 pages · 153 matches »), flèches + Entrée, focus piégé dans la fenêtre, Échap qui rend le focus au bouton d'ouverture, Cmd+K et Ctrl+K. Les requêtes techniques aboutissent : `--dangerously-skip-permissions` (1 page), `/compact` (4), `settings.json` (7). « hooks » place le chapitre « 7. Hooks » en tête, avec ses sections. État vide utile : « No results for “xyzzyqq”. Browse all pages → ».
- **Menus du header** : `<details>/<summary>` atteignables au Tab, Entrée ouvre, Échap ferme et rend le focus au déclencheur, contour de focus de 2 px.
- **Menu mobile** : modal, focus posé sur le bouton de fermeture, défilement du fond bloqué, Échap qui rend le focus, cibles de 44 px.
- **Ancres** : le titre visé finit à 24 px sous le header à 1440 ; avec `prefers-reduced-motion`, le saut est immédiat.
- **Lecture desktop** : sommaire avec progression et section courante juste, date de mise à jour visible, « Copy for LLM » copie le chapitre (70 725 caractères).
- **Copie de code** : presse-papier rempli, retour « Copied! ».
- **Thème** : la bascule persiste d'une page à l'autre (`localStorage`).
- **Téléchargements** : les 4 fichiers PDF/EPUB EN et FR répondent (GET 206).
- **Débordement** : 0 px sur les 16 pages à 1440, 390 et 320, en clair et en sombre (Chrome), et en WebKit à 390.

## 4. Défauts observés

Format : sévérité, page et état, viewport, reproduction, preuve, conséquence, confiance, correction minimale, critère d'acceptation. P0 bloque une tâche, P1 la fait mal aboutir, P2 friction, P3 finition. Aucun P0 relevé.

### UX-01 · P1 · La barre latérale du guide masque le pied de page

- **Où** : toute page `/guide/*` avec barre latérale, 1440×900, clair et sombre, défilement en bas de page.
- **Reproduire** : ouvrir `/guide/ultimate-guide/07-hooks/`, aller tout en bas.
- **Preuve** : `guide-hooks-1440-light-fin.png`. La marque, le titre « Ready to master Claude Code? », le bouton du pied de page et la ligne de crédit sont coupés à gauche. Empilement mesuré : `.sidebar-pane` `position: fixed; z-index: 5` contre `.sl-footer-portal` `z-index: 1` (`src/styles/starlight-overrides.css:304-308`).
- **Conséquence** : la colonne gauche du pied de page est illisible et le bouton est à moitié caché sur chaque page du guide.
- **Confiance** : haute.
- **Correction minimale** : `.sl-footer-portal { z-index: calc(var(--sl-z-index-menu) + 1); }` **seulement au-dessus du point de bascule desktop de Starlight** (`@media (min-width: 50rem)`). Sans cette condition, le pied de page passerait au-dessus du tiroir mobile ouvert, qui utilise le même `z-index: 5` (`plan-probe.cjs`). Autre option : limiter la hauteur de `.sidebar-pane` pour qu'elle s'arrête au-dessus du pied de page.
- **Acceptation** : à 1440, en bas de page, `document.elementFromPoint` au centre de la marque du pied de page renvoie un nœud de `.sl-footer-portal`.

### UX-02 · P1 · Aucune page 404 du site

- **Où** : toute URL inexistante, 1440 et 390.
- **Reproduire** : ouvrir `https://cc.bruniaux.com/guide/ultimate-guide/13-does-not-exist/`.
- **Preuve** : `404-390-light-erreur.png`, titre « Page not found · GitHub Pages », aucun lien, aucune recherche. Cause : `disable404Route: true` (`astro.config.mjs:161`) sans `src/pages/404.astro`.
- **Conséquence** : un lien cassé ou renommé (cas déjà signalé par Search Console, commentaire `astro.config.mjs:74`) laisse le lecteur sans header, sans recherche ni retour au guide.
- **Confiance** : haute.
- **Correction minimale** : créer `src/pages/404.astro` dans le `Layout` du site, avec h1, bouton de recherche, liens vers `/`, `/guide/` et `/sitemap/`.
- **Acceptation** : `dist/404.html` existe ; une URL inexistante en production renvoie 404 avec le header du site et une recherche fonctionnelle.

### UX-03 · P1 · Débordement horizontal entre 700 et 800 px (zoom 200 %)

- **Où** : accueil, fenêtre de 700 à 800 px de large, ce qui inclut un écran 1440 zoomé à 200 %. Mesures Chrome : 150 px à 700, 130 à 720, 82 à 768, 50 à 800, 0 à 640 et à 900. WebKit : 82 px à 768.
- **Preuve** : `verify2.cjs`, `plan-probe2.cjs`, `zoom200-home-720x450-light-defaut.png`. Le débordement vaut `850 − largeur` : `div.consulting-cta-actions` et `a.consulting-cta-github` finissent à 850 px quelle que soit la fenêtre. Cause : `.consulting-cta-actions { flex-shrink: 0; }` (`src/components/global/ConsultingCta.astro:68-74`), alors que la mise en colonne ne s'applique que sous 640 px (`:94-97`). Correctif du 13/11 : la première version de ce rapport accusait le tiroir du menu (`Header.astro:307-332`) ; il dépasse bien de 20 px, mais il est dans le header fixe et n'agrandit pas la page (0 px de débordement à 640 alors qu'il dépasse aussi).
- **Conséquence** : la page glisse horizontalement, le lecteur qui zoome perd l'alignement du texte (WCAG 1.4.10, redistribution).
- **Confiance** : haute en fenêtre desktop ; en émulation tactile à 768, non reproduit. Tablette réelle non vérifiée.
- **Correction minimale** : `.consulting-cta-actions { flex-shrink: 1; min-width: 0; }`, ou mise en colonne jusqu'à 900 px.
- **Acceptation** : `scrollWidth - innerWidth = 0` de 600 à 1000 px par pas de 20, Chrome et WebKit.

### UX-04 · P1 · Quatre arrêts de focus invisibles sur chaque page

- **Où** : toutes les pages, clavier.
- **Reproduire** : tabuler sur l'accueil ; après les liens du footer, le focus passe sur « Report a bug », « Suggest content », « Quiz issue », « General feedback » alors que le menu est fermé.
- **Preuve** : `verify2.cjs`, arrêts 111 à 114 avec `opacity: 0` et `aria-hidden="true"` ; axe `aria-hidden-focus` sur les 16 pages. Cause : le menu fermé garde ses liens focusables (`src/components/global/FeedbackFab.astro:29-40`, bascule `aria-hidden` lignes 75 et 81 sans `inert`).
- **Conséquence** : l'utilisateur clavier perd la position du focus pendant 4 tabulations ; un lecteur d'écran annonce des liens masqués.
- **Confiance** : haute.
- **Correction minimale** : poser `inert` sur `#feedback-menu` fermé et l'enlever à l'ouverture, en même temps que `aria-hidden`.
- **Acceptation** : la marche au Tab ne trouve aucun élément focalisé d'opacité cumulée inférieure à 0,1 ; axe `aria-hidden-focus` = 0.

### UX-05 · P2 · Pas de chapitre suivant en fin de chapitre, et une amorce orpheline

- **Où** : chapitres `/guide/ultimate-guide/*`, 1440 et 390, fin de page.
- **Reproduire** : finir la lecture de « 7. Hooks ».
- **Preuve** : `guide-hooks-1440-light-avant-pied.png`. La page se termine par le titre « 8. MCP Servers », sa ligne « Quick jump » et « Reading time: 15 minutes » ; aucun lien précédent ou suivant. Le sommaire contient aussi « 8. MCP Servers ». Cause du lien manquant : `src/components/starlight/Footer.astro` remplace le pied de Starlight, dont le composant d'origine rend `<Pagination />` (`node_modules/@astrojs/starlight/components/Footer.astro:14`). Cause de l'amorce : découpage du fichier monolithique, non vérifiée dans `scripts/prepare-guide-content.mjs`.
- **Conséquence** : le lecteur qui suit le guide dans l'ordre doit remonter au menu latéral ; l'amorce du chapitre 8 ressemble à une coupure.
- **Confiance** : haute pour l'absence de pagination, moyenne pour la cause de l'amorce.
- **Correction minimale** : rendre `Pagination` dans l'override avant le portail du pied de page ; retirer du découpage le h2 du chapitre suivant.
- **Acceptation** : chaque chapitre 00 à 12 montre un lien « Next » vers le chapitre suivant et aucun h2 du chapitre suivant ; le sommaire ne liste plus « 8. MCP Servers » dans le chapitre 7.

### UX-06 · P2 · « Start in 15 min » ouvre un autre choix, pas le démarrage

- **Où** : accueil, 1440 et 390.
- **Reproduire** : cliquer le bouton principal.
- **Preuve** : `debutant-1440-light-etape1.png`. Le lien `#start-here` (`src/components/landing/HeroBanner.astro:23`) descend vers trois cartes ; la carte « Start using it well » mène à `/guide/learning-path/` (`src/data/homepage-content.ts:48`). Il faut 3 clics pour atteindre un module d'installation, et le portail `/guide/` propose de son côté « Start with Quick Start ».
- **Conséquence** : le bouton promet un démarrage et rend un nouveau choix ; deux entrées « débutant » concurrentes (Learning path, Quick Start).
- **Confiance** : haute pour le parcours, moyenne pour l'effet sur le lecteur.
- **Correction minimale** : **à arbitrer**. Option A : le bouton pointe vers la page de départ retenue (Quick Start ou module 01 du parcours). Option B : renommer le bouton « Choose where to start ».
- **Acceptation** : depuis l'accueil, un clic sur le bouton principal affiche une page dont le premier écran contient une commande d'installation.

### UX-07 · P2 · Le bouton « Guide » passe au-dessus de la recherche mobile

- **Où** : pages `/guide/*`, 390 et 768, recherche ouverte.
- **Preuve** : `search-390-light-xyzzyqq.png`, le bouton « ≡ Guide » couvre le titre « Search the guide ». Cause : la fenêtre de recherche est dans `header.header` (`z-index: 10`) et `.guide-menu-trigger` a `z-index: var(--sl-z-index-navbar)` = 10, plus loin dans le DOM (`src/styles/starlight-overrides.css:598-601`).
- **Conséquence** : titre masqué et bouton cliquable qui ouvre un autre tiroir derrière la recherche.
- **Confiance** : haute.
- **Correction minimale** : masquer `.guide-menu-trigger` tant que la recherche est ouverte, ou rendre la fenêtre de recherche au niveau de `<body>`.
- **Acceptation** : à 390, recherche ouverte sur un chapitre, `elementFromPoint` aux coordonnées du bouton « Guide » renvoie un nœud de `.search-modal`.

### UX-08 · P2 · Le sommaire mobile indique la section précédente après une ancre

- **Où** : chapitre, 390, chargement de `#74-security-hooks`.
- **Preuve** : `ancre-390-light-reduit-07-hooks.png`. Le titre « 7.4 Security Hooks » est en haut de l'écran, la barre « On this page » affiche « Windows Hook Templ… ». Les barres fixes mobiles occupent 138 px, le titre arrive à 136 px. À 1440, l'indicateur est juste (`ancre-1440-light-reduit-07-hooks.png`).
- **Conséquence** : le lecteur mobile qui arrive par un lien profond lit une section et en voit une autre annoncée.
- **Confiance** : haute pour le symptôme ; cause probable, non vérifiée : seuil de l'observateur qui ignore la hauteur des barres (`src/components/starlight/MobileTableOfContents.astro`).
- **Correction minimale** : décaler la marge haute de l'observateur de la hauteur des barres fixes (138 px), et poser `scroll-margin-top` égal sur les titres.
- **Acceptation** : à 390, après chargement de `#74-security-hooks`, la barre affiche « 7.4 Security Hooks ».

### UX-09 · P2 · Boutons flottants et barres fixes qui couvrent le contenu

- **Où** : chapitres, 720×450 (zoom 200 %) et 1440×900 sur un sommaire long.
- **Preuve** : `zoom200-guide-720x450-light-defile.png`, « Copy for LLM », « GitHub » et « Feedback » recouvrent la colonne de droite d'un tableau ; header et barre « Guide / On this page » prennent 138 px sur 450, soit 31 % de la hauteur. `guide-fr-1440-light-haut.png` : « Copy for LLM » recouvre « 11. Écosystème IA » dans le sommaire.
- **Conséquence** : au zoom, il reste environ la moitié de l'écran pour lire, et du texte passe sous les boutons.
- **Confiance** : haute.
- **Correction minimale** : regrouper « Copy for LLM » et « GitHub » dans la barre de page (ou un seul bouton d'actions) ; sous `@media (max-height: 600px)`, barre « Guide / On this page » non collante ; réserver un `padding-bottom` au sommaire desktop sous les boutons.
- **Acceptation** : à 720×450, au plus un bouton flottant, aucun texte de `main` recouvert ; à 1440×900, le dernier lien du sommaire du guide FR est cliquable.

### UX-10 · P2 · Contrastes insuffisants

- **Où et preuve (axe, `sweep.json`)** :
  - `/guide/`, descriptions des cartes de liens : 3,66:1 en clair (`#8a8079` sur `#fbf9f4`), 2,9:1 en sombre (`#6b6763` sur `#202020`), 17 nœuds ;
  - `/cheatsheet/`, zones de contexte : blanc sur `#22c55e` 2,27:1, blanc sur `#f59e0b` 2,14:1 (`src/pages/cheatsheet/index.astro:492-493`) ;
  - `/cheatsheet/` en sombre : 2 liens dans des paragraphes, distinguables seulement par la couleur (1,56:1 avec le texte).
- **Conséquence** : texte secondaire difficile à lire, en particulier sur le portail, première page du guide.
- **Confiance** : haute (ratios mesurés). Faux positif écarté : les 60 nœuds signalés sur les chapitres (liens de la barre latérale) sont `#ded8cd` sur `#292c30`, contraste suffisant ; axe lisait un mauvais fond.
- **Correction minimale** : descriptions de cartes en `var(--text-secondary)` ; texte des zones en `var(--action-ink)` ou fonds assombris ; liens soulignés dans `.tip`.
- **Acceptation** : axe `color-contrast` et `link-in-text-block` = 0 sur `/guide/` et `/cheatsheet/`, clair et sombre.

### UX-11 · P2 · Défilement animé de 2,5 s à l'ouverture d'un lien profond

- **Où** : toute URL avec ancre, chargement direct, mouvement non réduit.
- **Preuve** : `anchor.cjs`. Sur `07-hooks/#74-security-hooks` à 1440, le titre est à 24 338 px à 300 ms, 1 598 px à 1 s, en place à 2,5 s ; à 390, même durée. `guide-hooks-1440-light-ancre.png` montre un état intermédiaire.
- **Conséquence** : chaque résultat de recherche ouvert fait défiler tout le chapitre sous les yeux du lecteur avant d'arriver.
- **Confiance** : haute. Cause non localisée : `scroll-behavior: smooth` probable.
- **Correction minimale** : saut immédiat au chargement (`scroll-behavior: auto` sur `html`), défilement doux réservé aux clics dans la page.
- **Acceptation** : 300 ms après le chargement d'une URL avec ancre, le titre est à moins de 100 px du haut.

### UX-12 · P2 · Zones défilantes inaccessibles au clavier

- **Où** : tableaux larges du guide (`07-hooks`, tableau de 1 325 px dans une colonne de 830 px à 1440), blocs `pre` de `/cheatsheet/` et `/security/`.
- **Preuve** : axe `scrollable-region-focusable` ; `tabindex` absent mesuré (`reading.cjs`).
- **Conséquence** : sans souris, les colonnes masquées d'un tableau restent hors de portée dans les navigateurs qui ne rendent pas ces zones focusables d'office.
- **Confiance** : moyenne. Chrome récent rend ces zones focusables lui-même ; Safari non vérifié.
- **Correction minimale** : `tabindex="0"`, `role="region"` et `aria-label` sur l'enveloppe des tableaux et des `pre` défilants.
- **Acceptation** : axe `scrollable-region-focusable` = 0 sur les pages couvertes.

### UX-13 · P2 · Code à 11,4 px sur mobile et tablette

- **Où** : blocs de code du guide, 768, 390 et 320 (3 000 nœuds à 11,375 px sur `07-hooks`) ; à 1440, aucun texte sous 12 px.
- **Preuve** : `verify.cjs`, « 11.375px pre: 3000 ».
- **Conséquence** : le contenu principal d'un guide technique devient le plus petit texte de la page sur téléphone.
- **Confiance** : haute pour la mesure, cause non localisée (taille par défaut Expressive Code ou Starlight).
- **Correction minimale** : sous `50rem`, taille de code de 0,8125 rem (13 px), via la variable Expressive Code dédiée.
- **Acceptation** : à 390, aucun texte de `pre` sous 12,5 px.

### UX-14 à UX-22 · P3 · Finitions

| Id | Constat | Preuve | Correction minimale | Acceptation |
| --- | --- | --- | --- | --- |
| UX-14 | Libellés du menu 6 px au-dessus de l'axe du logo et de la recherche (centres 22 contre 28 px). **Décision existante** : la piste d'alignement en haut est verrouillée par `src/components/global/header-layout.test.ts` (« desktop Sponsor shares the primary navigation alignment track », `align-self: flex-start`, commits `ed756b1` et `2a1be5d`) | `home-1440-light-defaut.png`, `checks.cjs` | à arbitrer : garder la piste haute ou centrer les liens sur 56 px et mettre à jour le test | écart des centres ≤ 1 px si centrage retenu |
| UX-15 | Bouton de copie invisible au repos sur desktop (opacité 0), 32×32 px | `reading.cjs` | opacité 0,6 au repos, 40 px | bouton visible sans survol |
| UX-16 | Recherche sensible aux accents : « sécurité » 1 page, « securite » 0 | `search.cjs` | normaliser requête et index (NFD sans diacritiques) dans `src/scripts/search.ts` | mêmes résultats avec et sans accents |
| UX-17 | Index en échec : message « Close and reopen search to try again », sans bouton ni repli | `search-390-light-erreur-index.png`, `search.ts:365-371` | bouton « Retry » et lien « Browse all pages » | reprise sans fermer la fenêtre |
| UX-18 | 36 cases à cocher sans libellé (listes de tâches du Quick Start) | axe `label` critique | rendre les cases décoratives (`aria-hidden`) ou libellées | axe `label` = 0 |
| UX-19 | « Dismiss announcement » 23×26 px, sous le minimum de 24 px | `nav.cjs` | 44×44 px | cible ≥ 24 px, idéalement 44 |
| UX-20 | h1 du portail `/guide/` décalé de 44 px par rapport au logo à 1440, contrairement au contrat d'alignement | `sweep.json`, `portail-1440-light-haut.png` | conteneur à `var(--max-width)` et `0 1rem` | écart h1/logo = 0 à 1440 |
| UX-21 | Pied de page des pages du guide : « Read the Guide → » ouvre GitHub dans un nouvel onglet | `Footer.astro:80-91` | sur `/guide/*`, masquer le bloc ou viser la page du chapitre suivant | aucun appel « lire le guide » depuis le guide |
| UX-22 | Aide-mémoire `/cheatsheet/` : « Guide v3.44.1 » contre 3.45.2. **Reclassé le 13/11 : comportement voulu.** La ligne affiche la version des éditions PDF, copiée de `machine-readable/publications.json` du guide (`guide_version` 3.44.1, `built_at` 06/10/2026) par `scripts/prepare-guide-content.mjs:84-95` | `sweep-cheatsheet-390x844-light.png` | régénérer les éditions PDF dans le dépôt du guide si elles doivent suivre la 3.45.2 | hors landing |

## 5. Possibilités d'amélioration

| Id | Constat | Proposition | Décision |
| --- | --- | --- | --- |
| AM-01 | Lignes de 99 caractères environ à 1440 (colonne de 832 px en 17 px) | limiter la prose à 70 ch environ, garder code et tableaux en pleine largeur | à valider (lecture contre densité) |
| AM-02 | Édition française : une seule page de 165 552 mots, interface en anglais, aucun `hreflang`, aucun lien du chapitre anglais vers son équivalent français ; seul « Dev with AI (FR) » mène vers un autre site | découper par chapitre et ajouter un sélecteur de langue au niveau du chapitre | **arbitrage d'architecture** |
| AM-03 | Fiches template sans contenu sur le site (0 bloc de code) ; le bouton principal est « View on GitHub » | afficher le fichier avec bouton de copie | **arbitrage éditorial** |
| AM-04 | Le lien « GitHub » d'un chapitre ouvre le haut de `guide/ultimate-guide.md`, pas la section ; certains liens vers GitHub ouvrent un onglet, d'autres non | lien vers l'ancre de la section dans le fichier ; règle unique pour l'ouverture | à valider |
| AM-05 | Portail `/guide/` : « New and noteworthy » avant « Choose your path » | placer les parcours en premier pour le débutant | **arbitrage éditorial** |
| AM-06 | Indice « ⌘K » affiché sur téléphone tactile | masquer l'indice clavier sous `(hover: none)` | simple |

## 6. Préférences esthétiques (pas des défauts)

- ES-01 : sous 30 rem, le logo devient « Code Guide » (`Header.astro:1160-1163`), qui se lit comme un autre produit.
- ES-02 : séparateurs « · » orphelins dans le bloc auteur du hero (« Florian BRUNIAUX · », « · Blog ↗ »), `home-1440-light-defaut.png`.
- ES-03 : trois boutons flottants empilés en bas à droite sur desktop, même hors zoom.

## 7. Non vérifié

| Hypothèse | Vérification nécessaire |
| --- | --- |
| UX-03 se produit sur tablette réelle | iPad Safari à 768 px, défilement horizontal au doigt |
| UX-12 bloque réellement dans Safari | Safari macOS, Tab dans un tableau large de `07-hooks` |
| L'ordre de `Pagination` suivra celui de la barre latérale | après correction de UX-05, chapitres 06 → 07 → 08 |
| L'amorce orpheline vient de `prepare-guide-content.mjs` | lire le découpage du fichier monolithique |
| Annonces du lecteur d'écran (région live de la recherche, menus) | VoiceOver ou NVDA |
| Zoom réel du navigateur à 200 % | Chrome et Safari, Cmd + jusqu'à 200 % |
| Le dernier build de production a cloné `d445ad98` | journal du job « Clone guide repo » du run du 13/11 |
