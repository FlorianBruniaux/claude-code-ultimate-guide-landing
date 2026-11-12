# Pilote design system : landing Claude Code Ultimate Guide

Livraison locale du 11 novembre 2026, branche `design-system-pilot` créée depuis `main@eeb23ef`. Rien n'est commité, poussé ni déployé.

## Itération 6 : mise en production et retours sur pages (12/11/2026)

Déployé sur https://cc.bruniaux.com/ (`main`, commits `28bffd2` à `c62e817`, déploiements GitHub Pages et contrôles de fumée réussis).

- Alignement : `.container` passe à 75rem avec 1rem de gouttière, comme le header et le footer (`max-w-content`, `px-4`). Les conteneurs propres aux pages suivent ; les colonnes de lecture étroites gardent leur largeur et démarrent sur le bord du logo. Mesure : bord gauche du h1 à 136 px à 1440 sur 31 pages, comme le logo.
- Bandeau : badge « New identity », identifiant `banner-new-identity-2026-11`, date masquée sous 640 px.
- Menu : lignes « Go further » au style du portfolio (titre noir, fond au survol, description sur deux lignes au lieu d'une ellipse).
- `/roles/<slug>/` : chiffres clés dans l'intro, profil en trois cartes, parcours de carrière tiré de `DECISION_MATRIX`, FAQ en cartes sur charcoal, rôles de la même classe de preuve.
- `/learning/` : quatre chapitres au lieu de douze sections, grille de parcours 4 + 3, UVAL en frise, plan 30 jours en cartes, un seul appel à l'action final.
- `/quiz/` : chiffres de la page dans l'intro, catégories en cartes, panneau de filtres collant, carte de question avec progression, résultats avec répartition par catégorie.
- Bloc de code doté de son propre bouton `[data-copy]` : le script global n'ajoute plus de second bouton « Copy ».

Navigateurs :

- Chrome (machine, `CHROME_PATH` par défaut dans `outils/*.cjs`) : 46 gabarits, clair et sombre 1440, clair 390, 0 débordement.
- WebKit 26.5 (Safari) : `outils/sweep-webkit.cjs`, 46 gabarits en clair 1440 et 390, 0 débordement, 0 erreur console.
- Firefox : non vérifié, le téléchargement du navigateur Playwright échoue (connexion coupée vers 90 %).
- Lecteur d'écran : non vérifié.

Couleur des liens en sombre : la valeur du portfolio (`#ffb17a`) reste appliquée, faute d'arbitrage contraire.

## Itération 4 : menu de gauche, CVE, recherche, changelog

- Menu de gauche du guide : carte charcoal à filet orange, labels mono orange, page courante avec repère orange (`starlight-overrides.css`). Même style dans le tiroir mobile.
- `/security/cves/` : catalogue sur bande charcoal, filtres de sévérité en blocs de couleur avec leur compte, liseré de sévérité sur chaque carte, version corrigée sur filet vert (ambre si inconnue). Les 127 fiches dont la source est une URL unique s'ouvrent sur l'avis de sécurité (carte entière cliquable, libellé `domaine · identifiant ↗`). Les 125 autres citent une source nommée sans URL (« NVD », « The Hacker News / PointGuard AI ») et restent en texte : aucune URL n'a été déduite.
- Recherche : bandeau charcoal (eyebrow, titre, bouton Esc), filet orange, champ simple, puces au rayon de 6 px, lignes plates. Le bouton Esc ferme la recherche et le focus revient au bouton qui l'a ouverte (`search.ts`), avec un test qui échoue si ce retour disparaît (vérifié en désactivant la ligne).
- `/changelog/` (agent `ds-ecosystem`) : barre de versions, dernière release sur bande charcoal, en-tête de version, étiquettes colorées par type de changement, nouveau composant `ReleaseEntry.astro`.

Contrôles : 469 tests passés, 474 pages construites, balayage de 41 gabarits sans débordement ni erreur console.

## Itération 3 : tout le site

Demande de Florian : « fais-moi l'intégralité du site », y compris le menu, le plan du site, les survols et les pages du guide Markdown sur le modèle des articles du portfolio.

| Zone | Responsable | Résultat |
| --- | --- | --- |
| Menu, header, footer, plan du site, pages Starlight | Session principale | Bandeau charcoal en tête des panneaux, onglet ouvert sur surface surélevée, cartes de menu avec ombre dure et remplissage orange, recherche et « All pages » encadrés. Footer : titres mono orange, liens ivoire, écosystème replié. Plan du site : cartes interactives, filtres au rayon de 6 px. Guide : bande de titre charcoal, sommaire en carte charcoal à filet orange, h2 à barre orange, citations teintées, LinkCards au contrat |
| Sécurité (5 pages, 9 composants) | Agent `ds-security` | Intro charcoal, bandes, briques, filtres au contrat |
| Apprentissage, rôles, quiz, FAQ, glossaire | Agent `ds-learning` | Fiches `/learning/` en `brand-interactive-card` (remplissage orange au survol) ; cartes FAQ laissées en liseré, car une réponse ouverte en orange serait illisible |
| Exemples, fiches mémo, diagrammes, livres blancs, téléchargements, ressources, projets | Agent `ds-catalog` | Sur `/projects/`, la flèche est devenue « View code ↗ » souligné ; le compteur « Recommended » passe du rouge à l'accent |
| Écosystème, MCP, comparatifs, releases, changelog | Agent `ds-ecosystem` | Dernière release avec filet orange ; deux oranges de catégorie gardés comme couleurs de données |
| Contexte, mémoire, méthodologies, patterns, FinOps, métriques, tokens | Agent `ds-context` | Graisses 800 ramenées à 700, interlettrage resserré corrigé |

Règles communes ajoutées dans cette itération, toutes dans `src/styles/portfolio-system.css` sauf mention :

- liens de prose soulignés aussi quand Astro leur ajoute une classe de portée, hors listes de navigation (`components.css`) ;
- libellé de chapitre protégé contre les styles de paragraphe des pages, trait de liaison réservé au rail de l'accueil ;
- remplissage orange au survol des cartes sur fond clair, hors bandes charcoal et orange ;
- footer collé à la dernière bande sur toutes les pages construites en bandes ;
- contrat des sessions : `CONTRACT.md`.

Contrôles finaux, serveur de dev local et Chromium headless 1248 :

| Contrôle | Résultat |
| --- | --- |
| `pnpm test` | 468 passés, 0 échec. `header-layout.test.ts` mis à jour : l'onglet ouvert reste distinct de la section courante, avec un fond `--bg-tertiary` au lieu de `--text-primary` |
| `pnpm astro build` | 474 pages construites |
| `pnpm check:built-seo` | Passé |
| Balayage de 41 gabarits × (clair 1440, sombre 1440, clair 390) | 123 vues réelles en 200, 0 débordement horizontal, 0 erreur console, aucun soulèvement de carte au survol. La 42ᵉ route du script, `/roles/cto/`, n'existe pas ; `/roles/ai-architect/` a été contrôlée à part |
| Boutons, clavier, recherche, copie, téléchargements | Inchangés depuis l'itération 2, tous OK |

Non vérifié : lecteur d'écran, Safari et Firefox, zoom 200 %, site publié, `pnpm build` complet (Chrome 131 absent pour `build:diagrams`). Les agents n'ont relu à l'œil qu'une partie de leurs captures sombres et mobiles ; le balayage final couvre le haut de chaque page, pas sa totalité.

Captures : `captures/sweep/` (126 vues), `captures/v4-*` (survols des fiches), `captures/v3menu-*` (menu), `captures/adopt2-*` et `adopt3-*` (page du guide), `captures/portal2-*` (portail), `captures/pfarticle-*` (référence portfolio). Le dossier pèse environ 180 Mo avec les captures des agents : ne pas le committer tel quel.

## Itération 2 : refonte structurelle

Florian a jugé la première passe trop superficielle (« ça ressemble en rien à mon portfolio »). Elle ne changeait que les couleurs, les polices et les boutons. Cette itération reprend la composition du portfolio, `florian-portfolio@376d69b7` :

| Élément du portfolio | Source portfolio | Application dans le guide |
| --- | --- | --- |
| Bandes pleine largeur ink, paper, accent | `page-bands.css` | `src/styles/portfolio-system.css` : `.band-ink`, `.band-paper`, `.band-accent` redéclarent les jetons, donc les composants suivent sans surcharge locale |
| Hachures parquet | `visual-options.css`, `section-hatching.svg` | Héros, bande MCP, bande orange, footer, sections `.section--alt` (71 usages) |
| Rail orange vertical | `agent-workshop.css` | Accueil, conteneur `.home-rail` |
| Briques de chapitre et label à tiret | `HomeSectionLabel.astro` | `src/components/global/ChapterLabel.astro`, chapitres 01 à 04 de l'accueil |
| Intro de page charcoal, filet orange 3 px | `page-bands.css` `.page-hero` | Les 29 pages qui utilisent `.page-hero` |
| Header « rail » : filet orange 2 px | `header-options.css` | `.site-header` |
| Footer charcoal | `Footer.astro` | `Footer.astro` passe sur `.site-footer-band` |
| Cartes plates, ombre dure au survol, remplissage orange en clair | `brandbook.css` `.brand-interactive-card` | Cartes de l'accueil ; ombre dure via `--shadow-card-hover` sur le reste du site |
| Carte « engagement » à ombre encre sur bande orange | `index.astro` du portfolio | Bloc conseil de l'accueil |
| Thème clair par défaut | `visual-defaults.ts` | Fallback `light` dans `Layout.astro` et `astro.config.mjs` ; un choix déjà enregistré reste prioritaire |

Pas encore repris : signature `FB.` et bouton Contact dans le header, Crew et robot de défilement, photo cadrée dans le héros, structure du footer du portfolio, pages internes au-delà de leur intro et des sections `--alt`.

Captures de l'itération 2 : `captures/v2-*`, référence `captures/portfolio-home-full.png`.

Contrôles refaits après l'itération 2 : 468 tests passés, 474 pages construites, aucun débordement à 390 px, survol à taille fixe, recherche, copie et 4 téléchargements (réponse 200). Le contraste « discret sur page » de `verifications.json` compare au fond `body`, alors que le lien se trouve maintenant dans le héros charcoal. Le couple réel, `#FFAD73` sur `#191B1D`, est à 9,44:1 (calculé). Le test d'ordre des sections de l'accueil accepte désormais le conteneur `.home-rail`, et il détecte toujours un ordre inversé.

## Références intégrées

| Référence | Version | Ce qui est repris |
| --- | --- | --- |
| Preset du portfolio | `florian-portfolio@376d69b7` (aucun écart sur `src/styles/` entre ce commit et la copie locale) | Fontes, couleurs claires de `global.css`, ton `ink` de `visual-options.css` pour le sombre, rayons, traitement des titres |
| Trois niveaux d'action | `branding-florian@821ad55`, `26-design-system.html#ds-boutons` et `assets/design-system/README.md` | `.btn-primary`, `.btn-secondary`, `.btn-quiet`, focus, survol, mouvement réduit |
| Fontes | Copie binaire de `florian-portfolio/public/fonts/brandbook/subsets/` | 8 sous-ensembles WOFF2, empreinte dans le nom de fichier, licences OFL jointes |

La version est déclarée en tête de `src/styles/brand-foundation.css` et dans le commentaire du bloc boutons de `src/styles/components.css`.

## Référence commune manquante

La page `/design-system/` prévue au lot 1 du cadrage n'existe pas dans `branding-florian` (`public/design-system/` absent). Le pilote s'appuie donc sur le catalogue V1 et sur le CSS du portfolio. Trois sources donnent encore des valeurs différentes :

| Rôle | Catalogue `tokens.json` (821ad55) | Portfolio (376d69b7) | Skill `boldguy-ui` | Retenu ici |
| --- | --- | --- | --- | --- |
| Fond sombre | `#292623` | `#141414` (ton `ink`) | `#141414` | `#141414` |
| Surface sombre | `#373330` | `#202020` | `#202020` | `#202020` |
| Lien sombre | `#FDBA74` | `#FFB17A` | `#F97316` | `#FFB17A` |
| Lien clair | `#9A3412` | `#A63F05` | `#A63F05` | `#A63F05` |
| Texte clair | `#292623` | `#0A0A0A` | `#0A0A0A` | `#0A0A0A` |
| Rayons | 3 / 6 / 8 px | 6 px contrôle, 8 px carte | non fixé | 6 / 8 px |

Pour poursuivre l'intégration sur d'autres sites, il manque : la page Design system avec un fichier de tokens réconcilié, une décision écrite sur le lien sombre et le fond sombre, et la liste des rôles de rayon.

## Écarts relevés et traitement

| Domaine | Avant | Après | Statut |
| --- | --- | --- | --- |
| Typographie | Fontes système partout | IBM Plex Sans/Mono, Barlow Condensed 700 pour h1 à h3 | Intégré |
| Thème clair | Ivoire `#F5F0EB`, accent `#C2410C`, texte `#1A1207` | Valeurs du portfolio | Intégré |
| Thème sombre | Noir `#0A0A0A`, accent `#F97316`, gris neutres | Ton `ink` du portfolio, lien `#FFB17A` | Intégré |
| Bouton principal | Accent du thème (`#C2410C` + blanc en clair), translation au survol | Orange `#F97316` + encre dans les deux thèmes, `#E9650B` au survol, taille stable | Intégré |
| Bouton secondaire | Transparent, texte orange au survol | Surface du thème, bordure visible, survol bordure lien + fond 12 % | Intégré |
| Action discrète | Absente (« Downloads ↓ » stylé à part) | `.btn-quiet`, soulignée au repos, trait 1 vers 2 px | Intégré sur l'accueil |
| Liens de prose | Non soulignés au repos | Soulignés dans `p`, `li`, `dd`, `td`, `blockquote`, `figcaption` | Intégré |
| Redéfinitions locales de `.btn` | 4 pages (`whitepapers`, `examples/[slug]`, `cheatsheets/[slug]`, `memory-systems`) avec blanc sur accent | Supprimées, héritage du socle | Intégré |
| CTA du footer | `bg-accent text-white` (2,8:1 en sombre avant) | `.btn btn-primary` | Intégré |
| Lien actif de la barre latérale | Blanc sur accent, illisible avec le nouveau lien sombre | Fond de page sur couleur de lien | Intégré |
| Titre splash Starlight | Dégradé en texte | Couleur de texte pleine | Intégré |
| Couleurs codées en dur | 48 occurrences dans 14 fichiers, surtout des valeurs de repli `var(--accent, #f97316)` | Inchangé | À reprendre |
| Interlettrage négatif | 10 fichiers avec `-0.02em` à `-0.055em`, trop serré en condensé | Corrigé sur le héros seulement | À reprendre |
| Rayons de carte | 25 règles à 12 px ou plus | Jeton global ramené à 8 px, règles locales inchangées | À reprendre |
| Boutons outils (`/examples/`, `.btn-ghost` des diagrammes, onglets, filtres) | Familles locales | Inchangé, ce ne sont pas des actions autonomes de landing | À classer |
| Signature, hachures, briques | Logo produit, aucun motif | Inchangé | Décision produit |
| Thème par défaut | Sombre | Inchangé : réglage existant du produit respecté | Décision produit |

Aucune classe utilitaire de palette Tailwind (`bg-orange-500` et similaires) n'a été trouvée. Tailwind consomme déjà les variables CSS via `tailwind.config.mjs`, ce qui a permis de changer les thèmes sans toucher aux composants.

## Adaptations propres au guide

- Le titre de page Starlight sur ordinateur reste en IBM Plex Sans 600 : il sert d'étiquette compacte au-dessus du premier h2, et le condensé devient illisible à cette taille. Sur mobile, il est grand et garde Barlow Condensed.
- Les tailles des titres Markdown augmentent (h1 2,4 rem, h2 1,9 rem, h3 1,5 rem) pour compenser l'étroitesse du condensé.
- `.btn-outline` est conservé comme alias du niveau secondaire pour ne pas réécrire le balisage existant.
- `--btn-primary-color` passe à blanc en clair pour les pastilles et puces qui gardent un fond `--accent` (blanc sur `#A63F05` : 6,30:1 calculé).
- `.on-action .btn-primary` couvre le cas « bouton principal sur bloc orange » ; aucune section orange n'existe encore sur le site.

## Captures

Avant et après, à 1440 px et 390 px, dans `captures/`. Nom : `{before|after}-{page}-{desk|mob}-{light|dark}.png`.

| Page | Fichiers |
| --- | --- |
| Accueil | `home-desk-*`, `home-mob-*` |
| Lecture longue (2. Core Workflow) | `lecture-desk-*` |
| Installation (1. Quick Start) | `install-mob-*` |
| Téléchargements | `downloads-desk-*` |
| Navigation mobile ouverte | `navmobile-mob-*` |
| États | `check-hover-{primary,secondary,quiet}-*`, `check-focus-primary-*`, `check-search-*` |

## Vérifications

Mesures brutes dans `verifications.json`, sur le serveur de dev local et Chromium headless 1248.

| Contrôle | Résultat |
| --- | --- |
| Contraste bouton principal | 7,06:1 dans les deux thèmes |
| Contraste secondaire | 18,82:1 clair, 14,32:1 sombre |
| Contraste action discrète sur page | 5,53:1 clair, 10,37:1 sombre |
| Hauteurs | Principal 48 px, secondaire et discret 44 px |
| Survol | Couleurs conformes, dimensions identiques avant et après pour les trois niveaux, dans les deux thèmes |
| Clavier | Bouton principal atteint au Tab, contour 2 px couleur de lien |
| Recherche | Cmd/Ctrl+K ouvre le modal, champ focalisé, 25 résultats pour « hooks » |
| Copie de commande | `/learning/` : presse-papiers rempli, libellé « Copied! » |
| Téléchargements | 4 liens PDF/EPUB EN et FR répondent 200 |
| Mouvement réduit | Transition des boutons ramenée à 0 |
| Débordement à 390 px | 0 px sur `/`, `/downloads/`, Quick Start, `/learning/` |
| Un seul principal par groupe | Aucun groupe en double sur 6 pages |
| `pnpm test` | 468 tests passés |
| `astro build` | 474 pages construites, `check:built-seo` passé |

Non vérifié :

- `pnpm build` complet échoue à `build:diagrams` : Puppeteer ne trouve pas Chrome 131 sur ce poste. L'étape est indépendante du CSS ; les étapes suivantes et `astro build` ont été lancées à part.
- Lecteur d'écran, Safari, Firefox, zoom texte à 200 % et site publié.
- Les pages hors du périmètre des captures n'ont été contrôlées que par le build.

## Fichiers modifiés

- `src/styles/brand-foundation.css` (nouveau)
- `public/fonts/brand/` (nouveau : 8 WOFF2 et 4 fichiers de licence)
- `src/styles/global.css`
- `src/styles/components.css`
- `src/styles/starlight-overrides.css`
- `src/components/landing/HeroBanner.astro`
- `src/components/global/Footer.astro`
- `src/pages/whitepapers/index.astro`
- `src/pages/examples/[slug].astro`
- `src/pages/cheatsheets/[slug].astro`
- `src/pages/memory-systems/index.astro`
- Itération 2 : `src/styles/portfolio-system.css` (nouveau), `src/components/global/ChapterLabel.astro` (nouveau), `public/images/brand/section-hatching.svg` (nouveau), `src/pages/index.astro`, `src/components/landing/{StartHere,Essentials,McpProof,LatestContent,BuiltAroundGuide}.astro`, `src/components/landing/built-around-guide.test.ts`, `src/components/global/ConsultingCta.astro`, `src/components/global/ThemeToggle.astro`, `src/layouts/Layout.astro`, `astro.config.mjs`

## À reprendre pour Cowork

- Copier `brand-foundation.css` et `public/fonts/brand/` tels quels, avec la même version déclarée.
- Reprendre le mapping de jetons de `global.css` : si le site Cowork a la même couche `--bg-primary`, `--accent`, `--text-*`, seules les valeurs changent.
- Reprendre le bloc boutons de `components.css` et chercher d'abord les redéfinitions locales de `.btn` par page : c'est là que le pilote a trouvé le blanc sur accent.
- Séparer le rôle « remplissage d'action » (`--action`) du rôle « lien » (`--accent`) : en clair, le lien brun ne peut pas porter un texte encre.
- Vérifier le lien actif de la barre latérale Starlight et les boutons `.sl-link-button`.
- Relancer `outils/capture.cjs` et `outils/interact.cjs` sur les mêmes quatre parcours, en adaptant `BASE` et les chemins Playwright.
- Trancher d'abord les trois écarts de tokens ci-dessus, sinon Cowork héritera du choix local de ce pilote.
