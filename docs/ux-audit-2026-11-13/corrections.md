# Corrections UX/UI du 13/11/2026

Branche `ux-fixes-2026-11-13`, partie de `origin/main@6994663` (landing). Guide utilisé pour le build : clone neuf de `claude-code-ultimate-guide@d445ad980c07bb06cb4f955cb2a576d68d556e31` placé à côté du worktree. Sources des constats : `rapport.md` (`CX-*`) et `rapport-ux-2026-11-13.md` (`UX-*`, `AM-*`), dans le même dossier du dépôt principal ; ces deux fichiers ne sont pas versionnés.

Rien n'a été poussé, fusionné ni déployé. Les mesures « avant » ont été prises sur l'aperçu local du build de référence (`pnpm preview`, port 4396, build de `6994663` avec le même guide), les mesures « après » sur le même aperçu reconstruit. Le script de mesure (`repro.cjs`, une clé par constat) et les outils de `outils-claude/` sont restés hors dépôt.

## Résultat par constat

Statuts : corrigé, partiel, non reproduit, sauté, hors périmètre.

| Constat | Statut | Commit | Avant | Après | Test ajouté |
| --- | --- | --- | --- | --- | --- |
| UX-02 404 du site | corrigé | `f2b8a5f` | `/13-does-not-exist/` : page « 404: Not Found » sans header ni lien | titre « Page not found », header et recherche, liens `/guide/`, `/`, `/sitemap/` | `tests/built/not-found.test.ts` |
| CX-05 / UX-03 débordement 641 à 849 px | corrigé | `9f22f90` | débordement 150 px à 700, 82 à 768, 30 à 820 ; bouton du menu à x = 834 pour 768 tactile | 0 px de 640 à 1000 ; bouton du menu à x = 752 | aucun (mesure Playwright manuelle) |
| CX-11 menu Feedback | corrigé | `83d4b0a` | 2,60:1 en clair | 5,99:1 en clair, 9,17:1 en sombre | aucun (mesure manuelle) |
| CX-12 descriptions des cartes `/guide/` | corrigé | `f5e42b0` | 3,67:1 clair, 2,91:1 sombre | 9,59:1 clair, 11,79:1 sombre | aucun (mesure manuelle) |
| CX-02 aide-mémoire sur téléphone | corrigé | `d762cad` | carte de 500 px, 361 éléments coupés à 390, bouton Copy à x = 483 | carte de 358 px, 0 élément coupé à 320, 360 et 390, bouton Copy à x = 341 | aucun (mesure manuelle) |
| UX-22 version de l'aide-mémoire | non corrigé, comportement voulu | aucun | « Guide v3.44.1 » | inchangé | la ligne affiche la version des éditions PDF, copiée de `machine-readable/publications.json` du guide (`guideVersion` 3.44.1) ; à régénérer dans le dépôt du guide |
| CX-06 amorce du chapitre suivant | corrigé | `79acbc6` | « 1. Quick start (day 1) », « 8. MCP Servers », « 11. AI Ecosystem » terminaient les chapitres 00, 07 et 10 | aucun chapitre ne contient le titre numéroté d'un autre | `tests/built/chapter-split.test.ts` |
| CX-01 ancres de la recherche | corrigé | `0862db3` | 1 046 ancres absentes sur 2 714 | 0 absente sur 1 942 (les entrées en double et les faux titres pris dans les blocs de code ont disparu) | `tests/built/search-anchors.test.ts` |
| CX-04 lien FR qui perd l'ancre | corrigé (URL et ancre) | `ea32de9` | `/guide/ultimate-guide.fr/#…` passe par une page de redirection sans fragment | les résultats visent `/guide/ultimate-guidefr/#…` ; ancres présentes | `src/data/guide-seo-overrides.test.ts`, `tests/built/search-anchors.test.ts` |
| CX-03 parcours débutant hors barre | corrigé (groupe Learning path) | `f247531` | 8 pages du parcours sans entrée courante dans la barre | groupe « Learning Path », entrée courante sur les 8 pages | `tests/built/guide-navigation.test.ts` |
| UX-05 chapitre suivant | corrigé | `9335bc3`, `ae32635` | aucun lien précédent ou suivant | liens « Previous » et « Next » sur les 12 enchaînements de chapitres et dans le parcours | `tests/built/guide-navigation.test.ts` |
| UX-01 barre latérale sur le pied de page | corrigé | `f78ed03` | 11 éléments du pied couverts à 1440 | 0 couvert ; le tiroir mobile reste au-dessus du pied | aucun (mesure manuelle) |
| UX-04 focus invisible du menu Feedback | corrigé | `a6bb102` | 4 arrêts invisibles par page (8 sur 260 Tab) | 0 | aucun (marche au Tab manuelle) |
| UX-16 accents | corrigé | `537dd5a` | « securite » 0 résultat, « memoire » 0 | mêmes résultats avec et sans accents | `src/scripts/search-model.test.ts` |
| CX-09 état vide | corrigé (partie état vide) | `a576d56` | « skils » : seulement « Browse all pages » | « Did you mean skill, skills? » en plus du lien | `src/scripts/search-model.test.ts` |
| UX-17 index en échec | corrigé | `2306355` | « Close and reopen search to try again », aucune action | bouton Retry et lien vers toutes les pages ; après Retry, 25 résultats | `src/scripts/search.test.ts` |
| CX-08 résultats sans liens | corrigé (nouvel onglet) | `56e9427` | Cmd/Ctrl+clic et clic milieu sans effet | ouverture dans un nouvel onglet, la fenêtre reste ouverte ; la sémantique listbox est gardée | `src/scripts/search.test.ts` |
| CX-07 Tab dans la recherche | partiel | `ec0ffb9` | Tab reste dans le champ, aide clavier `aria-hidden` | Tab inchangé ; le champ annonce flèches, Entrée, Tab et Échap via `aria-describedby` | aucun ; laisser Tab sortir du champ inverserait le test existant « Tab moves to the next section filter » (`search.test.ts`) |
| CX-10 recherche à 200 % | partiel | `cbdaac1` | premier résultat à y = 385 sur 450, masqué | haut du premier résultat à y = 296, visible sur 93 px ; une ligne de 186 px ne tient pas entière | aucun (mesure manuelle) |
| UX-07 bouton Guide sur la recherche | corrigé | `602d0eb` | le point du bouton « Guide » renvoie le bouton | il renvoie l'en-tête de la recherche | `src/scripts/search.test.ts` |
| UX-08 sommaire mobile | corrigé | `f38a71f`, `b39c327` | barre « Windows Hook Templates » après `#74-security-hooks` | « 7.4 Security Hooks » ; le premier commit lisait une valeur nulle, le second la corrige | aucun (mesure manuelle) |
| UX-09 boutons flottants au zoom | partiel | `2d1c3e9` | boutons libellés, 2 blocs de texte couverts à 720x450 | boutons en icône, 1 bloc couvert ; toujours deux groupes flottants | aucun (mesure manuelle) |
| UX-11 / CX-14d défilement animé | corrigé | `8828ca9` | titre à 19 403 px du haut 500 ms après le chargement | titre à 88 px | aucun (mesure manuelle) |
| UX-12 tableaux défilants | corrigé | `b37bb68` | 1 zone défilante sur 4 non focalisable (`07-hooks`, Chrome) | 0 | aucun (mesure manuelle) |
| UX-13 code à 11,4 px | corrigé | `1806c5d` | 3 000 nœuds à 11,375 px à 390 | 3 000 nœuds à 13 px ; desktop inchangé | aucun (mesure manuelle) |
| UX-10 contrastes, reste | corrigé | `c4a238a` | zones de contexte 2,15 à 2,80:1, liens de `.tip` sans soulignement | texte `--action-ink` sur les zones, liens soulignés | aucun (mesure manuelle) |
| UX-15 bouton de copie | corrigé | `bc8d89e` | opacité 0 au repos, 32x32 | visible au repos (atténué par `.copy`), 40x40 | aucun (mesure manuelle) |
| UX-18 cases à cocher sans libellé | corrigé | `aa2ebaf` | 36 cases sans libellé sur le Quick Start | 0 | `src/utils/task-list-labels.test.ts` |
| UX-19 bouton de fermeture du bandeau | corrigé | `6cdf85e` | 23x26 | 44x44 | aucun (mesure manuelle) |
| UX-20 portail `/guide/` décalé | corrigé | `78952e0` | h1 à 180 px, logo à 136 px | 136 et 136 | aucun (mesure manuelle) |
| UX-21 « Read the Guide » dans le guide | corrigé | `e7e5d75` | lien GitHub en nouvel onglet en pied de chaque page du guide | bloc absent des pages du guide, inchangé ailleurs | aucun (mesure manuelle) |
| CX-14b bouton de thème | corrigé | `91e9bc5` | 38x38 à 390 | 44x44 | aucun (mesure manuelle) |
| AM-06 indice ⌘K sur tactile | corrigé | `0bff11a` | visible à 390 tactile | masqué | aucun (mesure manuelle) |
| UX-14 libellés du menu décalés | sauté | aucun | centres 22 contre 28 px | inchangé | alignement verrouillé par `src/components/global/header-layout.test.ts` ; arbitrage existant |
| CX-14c lien d'évitement avant le bandeau | sauté | aucun | premier Tab après évitement dans le bandeau | inchangé | demande de déplacer le bandeau hors de `main` ou de créer une nouvelle cible : choix de structure non couvert par les décisions |
| UX-06, AM-01 à AM-05, ES-01 à ES-03, P-01, PA-01 à PA-03, CX-14a | hors périmètre | aucun | | | décisions U00 ; CX-14a se corrige dans le dépôt du guide |

## Changement de CI

`863ab6d` ajoute l'étape « Test the built site » (`pnpm test:built`) dans `.github/workflows/deploy.yml`, après `pnpm astro build` et le contrôle SEO. Le script `test:built` (`node --test 'tests/built/*.test.ts'`) est ajouté par `f2b8a5f`. L'étape CI arrive au sixième commit : la consigne de la placer en tête de série est arrivée après les cinq premiers, et je n'ai pas réécrit l'historique. Les tests de `tests/built/` échouent sur les commits intermédiaires dont le correctif est plus loin dans la série ; ils passent tous au dernier commit. Les tests de `plugins/*.test.ts` ne sont pas lancés par la CI (motif `src/**/*.test.ts`) ; le test du nouveau plugin est donc placé dans `src/utils/`.

## Arbitrages pris par défaut

- A1 : seul le parcours débutant entre dans la barre latérale. Les 35 autres URL `/guide/*` du sitemap restent hors barre : `/guide/`, `agent-harness`, `ai-concept-boundaries`, `ai-design-patterns`, `ai-executive-agents`, `ai-finops`, `ai-unit-economics`, `api-gateway`, `claude-code-guide-mcp`, `community-patterns`, `computer-use`, `context-engineering-tools`, `cowork`, `credits`, `enterprise-governance`, `for-cio-ceo`, `for-cto`, `for-product-managers`, `for-tech-leads`, `glossary`, `hooks-events-reference`, `llm-market-snapshot`, `local-vs-cloud-inference`, `loop-graph-engineering`, `mcp-vs-cli`, `memory-systems`, `mistral-large-4`, `plugin-distribution`, `practitioner-insights`, `settings-reference`, `skill-design-patterns`, `subscription-strategy`, `team-knowledge-base`, `team-metrics`, `tools-reference`.
- A2 : l'URL et l'ancre FR sont corrigées, l'édition FR reste une page unique.
- A3 : les deux aide-mémoire sont gardés.
- A4 : le moteur de recherche est gardé (pas de Pagefind) ; ancres, accents et état vide sont corrigés.
- A5 : menu Resources inchangé.

## Exceptions aux règles du dépôt

- Fichiers que `CONTRACT.md` réserve à la session principale, modifiés pour un constat précis : `src/styles/components.css` (CX-11, UX-09), `src/styles/starlight-overrides.css` (CX-12, UX-01, UX-07, UX-13, UX-15, UX-20), `src/styles/global.css` (UX-11), `src/styles/portfolio-system.css` (CX-10), `src/components/global/Header.astro` (AM-06), `src/components/global/Footer.astro` (UX-21).
- `id` ajoutés sur des cartes existantes de `/cheatsheet/` (CX-01) : `essential-commands`, `keyboard-shortcuts`, `permission-modes`, `memory-settings`, `context-management`, `mcp-servers`, `cost-optimization`, `quick-fixes`, `golden-rules`, `prompting-formula`.
- `id` déplacés par CX-06 : `1-quick-start-day-1` passe de `00-introduction` à `01-quick-start`, `8-mcp-servers` de `07-hooks` à `08-mcp`, `11-ai-ecosystem-complementary-tools` de `10-reference` à `11-ai-ecosystem`. Effet plus large que prévu : les H1 des chapitres 2 à 6, 9 et 10 étaient eux aussi rangés dans le chapitre précédent, puis supprimés comme premier H1 de la page, si bien que leurs `id` n'existaient nulle part. Chaque chapitre porte maintenant l'`id` de son H1 (`2-core-concepts`, `3-memory-settings`, `4-agents`, `5-skills`, `6-commands-user-invocable-skills`, `9-advanced-patterns`, `10-reference`, et `appendix-templates-collection` dans `10-reference`). Les liens internes construits par la table d'ancres suivent : `03-memory-files/#4-agents` devient `04-agents/#4-agents`, etc. Aucune redirection créée.
- URL de recherche changées (CX-01) : 7 entrées de l'aide-mémoire sans section correspondante pointent sur `/cheatsheet/` sans fragment ; « Golden Rules » et « Prompt Formula » vers les cartes de `/cheatsheet/`, « Tool Comparison Table » vers `/compare/`, « Features Overview » vers `/` ; menaces et durcissement vers `/security/threats/`, `/security/hardening/` et `#active-campaigns` ; « Ultraplan » vers `10-reference` (la commande y est notée retirée ; le libellé de l'entrée reste à revoir) ; deux entrées de l'écosystème vers `/ecosystem/`.
- Test existant modifié : `src/data/landing-sync.test.ts` affirmait l'ancre `#tl-dr`, que la page ne rend pas (`id="tldr"` dans le build). L'assertion vise désormais `#tldr`.
- Fichiers générés versionnés régénérés et commités par CX-01 et CX-04, parce que `pnpm test` les lit avant que la CI ne les reconstruise : `src/data/guide-content-entries.ts`, `src/data/guide-search-entries.ts`. `src/data/diagrams-data.ts` n'est pas commité (voir ci-dessous).
- Texte ajouté : la page 404 (titre, phrase, quatre libellés d'actions), les suggestions « Did you mean », le bouton « Retry », l'aide clavier lue par les lecteurs d'écran, les libellés « Learning Path » dans la barre.

## Écart de données constaté, non corrigé

Avec le guide `d445ad9`, `build-diagrams-data.mjs` produit 53 diagrammes alors que `src/data/homepage-content.test.ts` attend 50 : `pnpm test` échoue après un `pnpm build` local tant que `src/data/diagrams-data.ts` régénéré n'est pas restauré. En CI, `pnpm test` passe avant la régénération. Synchronisation de contenu, hors périmètre.

## Content-diff (`dist-before` contre le build final)

- Pages : 1 nouvelle (`404.html`), aucune supprimée, 475 pages construites des deux côtés.
- 350 pages ne diffèrent que par l'aide clavier de la recherche (`id="search-help"`, `aria-describedby`, texte lu par les lecteurs d'écran).
- Texte retiré : le bloc « Ready to master Claude Code? … Read the Guide → » sur 118 pages du guide (UX-21), avec son lien vers le dépôt GitHub. Aucun autre texte retiré, hors réorganisation des amorces de chapitre (CX-06).
- Texte et liens ajoutés : groupe « Learning Path » dans la barre latérale, liens « Previous » et « Next », page 404.
- `id` retirés : `1-quick-start-day-1` (00), `8-mcp-servers` (07), `11-ai-ecosystem-complementary-tools` (10), tous réapparus dans le chapitre suivant. `id` ajoutés : ceux des H1 de chapitre et des 10 cartes de `/cheatsheet/`.
- Liens internes à fragment dont la cible n'existe pas : 95 avant, 63 après (sur 22 431). Les 63 restants viennent du contenu du guide (ancres GitHub comme `#25-model-selection--thinking-guide`), hors périmètre.

## Vérifications finales

Build final complet (`pnpm build`, guide `d445ad9`) : 475 pages, sortie 0. Puis :

- `pnpm test` : 483 tests, 483 réussis, avec les fichiers générés versionnés restaurés ; 482 sur 483 si `diagrams-data.ts` régénéré est laissé en place (écart de données ci-dessus).
- `pnpm test:built` : 5 tests, 5 réussis.
- `pnpm check` : 0 erreur, 0 avertissement, 28 indications (une erreur introduite par UX-05 a été corrigée par `ae32635`).
- `pnpm check:built-seo` : « Built SEO contracts passed. »
- `pnpm check:links` : 603 documents, 4 157 cibles, 1 881 `local-ok`, 2 276 non vérifiées, aucune en erreur.

Écart de méthode : un `pnpm build` complet a été lancé après les phases 1, 2, 3 et 4 regroupées, et à la fin ; entre deux, les vérifications ont utilisé `pnpm astro build` sur les données déjà générées, ce que fait aussi l'étape de build de la CI. Le rendu des diagrammes Mermaid en local passe par un `.puppeteerrc.cjs` non suivi qui pointe sur le Chrome système, et le `node_modules` du worktree est une copie APFS (`cp -Rc`) de celui du dépôt principal, sans réseau.

Non vérifié : appareils réels, lecteurs d'écran (VoiceOver pour CX-07), Safari pour UX-12, Firefox, et le comportement en production (rien n'est déployé).

## Fusion avec la série parallèle (`origin/main@440b0f9`)

Une autre session a corrigé les constats `UX-*` en parallèle (`5aec813`, déjà en production) ; son rapport est `corrections-2026-11-13.md`. Fusion de `origin/main` dans cette branche : un seul mécanisme par constat. Là où les deux séries corrigeaient le même constat, la version de `origin/main` est gardée (en production et verrouillée par `src/components/global/ux-audit-fixes.test.ts`), sauf quand la mienne couvrait davantage.

| Constat | Mécanisme gardé | Retiré |
| --- | --- | --- |
| UX-01 | règle `z-index` commune (identique) | doublon de commentaire |
| UX-02 | `404.astro` de `origin/main` (`noIndex={true}`, mêmes liens) | ma page 404 ; `tests/built/not-found.test.ts` passe sur la version gardée |
| UX-03 / CX-05 | `min-width: 0` de `origin/main` | mon `flex: 0 1 auto` |
| UX-04 | `menu.inert` de `origin/main`, plus mon retour du focus sur le bouton | `setAttribute('inert')` |
| UX-05 / CX-06 | découpage par H1 numéroté de `origin/main` ; ma pagination stylée en carte, avant le portail | ma fonction `numberedChapterHeading` |
| UX-07 | `body:has(.search-modal:not([hidden]))` de `origin/main` | mon attribut `data-search-open`, sa règle et son test dans `search.test.ts` |
| UX-08 | mesure par `getBoundingClientRect().bottom` de `origin/main` | ma lecture de `scroll-padding-top` |
| UX-09 | règles de `origin/main` | mon doublon dans `components.css` |
| UX-10 / CX-12 | règles de `origin/main` (`#0a0a0a` sur les zones, `.dont`, liens de `.tip`) | mes doublons |
| UX-11 / CX-14d | classe `is-anchor-loading` de `origin/main` | mon `html:focus-within` |
| UX-12 | script de `starlight/Header.astro` et `Layout.astro` de `origin/main` | mon script dans `starlight/Footer.astro` |
| UX-13, UX-15, UX-20 | règles de `origin/main` | mes règles équivalentes |
| UX-16 | `foldText` de `origin/main` | ma fonction `fold` ; `suggestQueries` (CX-09) utilise `foldText` |
| UX-17 | `retryButton()` de `origin/main` | ma fonction `unavailable` ; mon test Retry passe sur la version gardée |
| UX-18 | mon plugin `rehype-task-list-labels` (la case garde son état et reçoit le texte de l'item) | le masquage `aria-hidden` de `origin/main` |
| UX-19, AM-06 | règles de `origin/main` | mes doublons |

Corrections propres à cette branche, gardées telles quelles : CX-01, CX-02, CX-03, CX-04, CX-07, CX-08, CX-09, CX-10, CX-11, UX-21, CX-14b, la page 404 testée dans `tests/built/`, et l'étape CI `pnpm test:built`.

Tests adaptés à la fusion :

- `src/components/global/ux-audit-fixes.test.ts`, test UX-18 : il vérifiait le masquage `aria-hidden`. Il vérifie maintenant que le plugin d'étiquetage est branché et que le masquage n'existe plus. Le comportement est testé dans `src/utils/task-list-labels.test.ts`.
- `src/scripts/search.test.ts` : le test de l'attribut `data-search-open` est retiré avec ce mécanisme.

Tous les fichiers de `docs/ux-audit-2026-11-13/` des deux séries sont présents.
