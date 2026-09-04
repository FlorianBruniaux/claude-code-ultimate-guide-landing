# Audit SEO complet de cc.bruniaux.com

**Date:** 4 septembre 2026
**Site:** https://cc.bruniaux.com
**Propriété GSC:** `sc-domain:cc.bruniaux.com`
**Mode:** lecture seule
**Référence méthodologique:** [full audit de google-search-console-mcp](https://github.com/FlorianBruniaux/google-search-console-mcp/blob/main/examples/full-audit.md)

## Verdict

La visibilité organique a fortement progressé sur 90 jours, mais le site transforme moins bien cette exposition en clics. Du 4 juin au 1er septembre, GSC mesure 1 246 clics et 233 834 impressions. Par rapport aux 90 jours précédents, les clics augmentent de 126,5 % et les impressions de 220,7 %, tandis que le CTR passe de 0,75 % à 0,53 % et la position moyenne pondérée de 8,6 à 18,2.

La fenêtre récente est stable à légèrement négative. Du 5 août au 1er septembre, le site obtient 380 clics et 31 222 impressions, soit -4,5 % de clics et -2,4 % d'impressions par rapport aux 28 jours précédents. Le CTR passe de 1,24 % à 1,22 % et la position moyenne de 8,8 à 10,8.

Quatre problèmes concentrent l'action:

1. `/releases/` reçoit 7 208 impressions sur 28 jours à la position 8,2 pour 7 clics, soit 0,10 % de CTR.
2. L'ancienne route `/guide/claude-code-releases/` renvoie une page HTTP 200 de 9 mots avec `noindex` et canonical vers `/releases/`, au lieu d'une redirection HTTP permanente.
3. `/guide/data-privacy/` et `/guide/hooks-events-reference/` sont actuellement non indexées malgré un crawl réussi, une indexation autorisée et un canonical propre.
4. Cinq des huit variantes HTTP signalées en juin gardent encore un canonical Google en HTTP, même si le serveur renvoie bien un 301 vers HTTPS.

Le suivi GA4 est correctement filtré sur `cc.bruniaux.com`. Le ratio sessions organiques GA4 sur clics GSC est classé sain par l'outil: 0,963 sur 28 jours et 1,094 sur 90 jours. Deux problèmes de mesure subsistent: aucune conversion n'est enregistrée malgré des événements actifs, et 1 126 sessions sont attribuées à Singapour sur 28 jours avec 0,9 % d'engagement. La cause de ce trafic reste `UNKNOWN`.

## Périmètre et niveau de preuve

| Source | Période ou population | Couverture | Statut |
| --- | --- | ---: | --- |
| GSC, agrégat exact | 28 jours, 2026-08-05 au 2026-09-01 | 1 ligne sans dimension | PROUVÉ |
| GSC, agrégat exact | 90 jours, 2026-06-04 au 2026-09-01 | 1 ligne sans dimension | PROUVÉ |
| GSC, pages | 90 jours | 410 pages | PROUVÉ avec écarts d'agrégation mineurs |
| GSC, requêtes | 28 jours | 879 requêtes, 25,3 % des clics exacts | PARTIEL |
| Sitemap public | état au 2026-09-04 | 457 URL | PROUVÉ |
| URL Inspection | échantillon | 41 URL sur 410 pages GSC | PARTIEL |
| Audits de page | panel prioritaire | 12 pages, 72 contrôles | PARTIEL |
| Maillage | pages les plus visibles | 50 pages crawlées sur 410, 0 échec | PARTIEL |
| GA4 | 28 et 90 jours | hostname `cc.bruniaux.com` sur 14 réponses | PROUVÉ |
| CrUX et PageSpeed | pages prioritaires | aucune clé API disponible | UNKNOWN |
| AI Overviews | 90 jours | requête API refusée | UNKNOWN |

Les totaux basés sur la dimension `query` sous-comptent fortement les requêtes anonymisées. Les totaux de référence proviennent donc d'une requête GSC sans dimension. Les regroupements par page dépassent l'agrégat exact de 7 clics sur 28 jours et de 9 clics sur 90 jours. La cause technique exacte de cet écart est `UNKNOWN`.

## Performance organique

### Totaux comparables

| Fenêtre | Clics | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| 28 jours récents | 380 | 31 222 | 1,22 % | 10,8 |
| 28 jours précédents | 398 | 31 977 | 1,24 % | 8,8 |
| Delta | -4,5 % | -2,4 % | -0,03 point | +2,0 positions |
| 90 jours récents | 1 246 | 233 834 | 0,53 % | 18,2 |
| 90 jours précédents | 550 | 72 921 | 0,75 % | 8,6 |
| Delta | +126,5 % | +220,7 % | -0,22 point | +9,6 positions |

La croissance à 90 jours vient d'un élargissement massif de l'exposition, surtout aux États-Unis, sans rendement proportionnel en clics. Cette relation est observée. Les données ne prouvent pas si la cause vient des requêtes, des snippets, du rang ou de la qualité du trafic.

### Pages principales sur 28 jours

| Page | Clics | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/quiz/` | 189 | 3 193 | 5,92 % | 6,6 |
| `/` | 28 | 1 116 | 2,51 % | 8,2 |
| `/cheatsheet/` | 25 | 471 | 5,31 % | 10,5 |
| `/glossary/` | 18 | 1 786 | 1,01 % | 9,3 |
| `/whitepapers/` | 14 | 280 | 5,00 % | 11,1 |
| `/releases/` | 7 | 7 208 | 0,10 % | 8,2 |
| `/guide/third-party-tools/` | 4 | 3 130 | 0,13 % | 11,9 |
| `/guide/architecture/` | 5 | 1 155 | 0,43 % | 21,0 |

`/quiz/` représente 49,7 % des 380 clics exacts. Les cinq premières pages par clic en représentent 72,1 %. La concentration est donc prouvée au niveau des pages.

### Requêtes et dépendance à Claude

Parmi les 96 clics associés à une requête visible sur 28 jours, 90 contiennent `claude`, `anthropic` ou un identifiant du site, soit 93,8 %. Cette proportion ne porte que sur 25,3 % des clics exacts. La dépendance au vocabulaire Claude est `PARTIELLE`, pas démontrée sur tous les clics.

Les requêtes en position 8 à 15 avec le plus d'impressions incluent:

| Requête visible | Impressions | Position | Clics |
| --- | ---: | ---: | ---: |
| `"code as agent harness" arxiv 2605.18747` | 297 | 8,7 | 0 |
| `claude code version` | 284 | 9,9 | 0 |
| `docs.anthropic.com messages api stop_reason explanation` | 278 | 8,3 | 0 |
| `claude 101 certificate of completion quiz` | 264 | 8,6 | 2 |
| `claude code releases` | 203 | 11,1 | 0 |

Les outils détectent 35 baisses de requêtes sur leur fenêtre propre. `claude code quiz` passe de 7 à 0 clic avec une position qui s'améliore, tandis que `claude code v2.1.220` passe de 5 à 0 clic avec une position dégradée de 3,1 à 9,0. Ces résultats sont `PARTIELS`, car ils excluent les requêtes anonymisées et utilisent une fin de période différente de l'agrégat principal.

### Appareils et pays

Sur 28 jours, le desktop produit 270 clics sur 380, soit 71,1 %, avec un CTR de 1,04 %. Le mobile produit 109 clics, soit 28,7 %, avec un CTR de 2,05 %. L'écart est mesuré, mais sa cause reste `UNKNOWN`.

L'Inde fournit 114 clics sur 28 jours, soit 30,0 %. Les États-Unis fournissent 44 clics, mais 13 438 impressions et un CTR de 0,33 %. Sur 90 jours, les États-Unis portent 72,6 % des impressions pour 15,2 % des clics. Cette exposition américaine à faible CTR pèse fortement sur l'agrégat.

## Sitemap et indexation

### Sitemap

Le build local termine avec le code 0 et génère 459 pages. Le sitemap local et le sitemap public contiennent chacun 457 URL.

GSC connaît `https://cc.bruniaux.com/sitemap-index.xml` comme unique sitemap déclaré. Il a été soumis le 25 juin 2026, téléchargé le 2 septembre 2026, et ne présente ni erreur ni avertissement. Le problème de soumission signalé en juin est `RESOLVED`.

L'audit du sitemap trouve 351 URL avec une ligne de performance GSC sur 90 jours et 106 sans ligne. Une absence de performance ne prouve pas une absence d'indexation. Le champ GSC `indexed=0` contredit les inspections individuelles et ne peut pas servir de dénominateur.

### Échantillon URL Inspection

| Catégorie | Nombre | Part des 41 URL |
| --- | ---: | ---: |
| Indexée | 19 | 46,3 % |
| Non indexée | 10 | 24,4 % |
| URL sans état exploitable ou fetch error | 7 | 17,1 % |
| Canonical Google différent | 5 | 12,2 % |
| Bloquée par robots.txt | 0 | 0 % |

Les catégories sont prouvées seulement pour les 41 URL inspectées. Le nombre total d'URL indexées sur les 457 URL du sitemap reste `UNKNOWN`.

Deux pages à fort potentiel sont non indexées malgré un crawl réussi et un canonical propre:

| Page | Dernier crawl GSC | Impressions 90 j | Position | État |
| --- | --- | ---: | ---: | --- |
| `/guide/hooks-events-reference/` | 2026-06-24 | 2 424 | 6,6 | not_indexed |
| `/guide/data-privacy/` | 2026-05-06 | 313 | 9,9 | not_indexed |

Parmi les quatre anciens slugs en `FETCH_ERROR`, `/guide/workflows/` est maintenant indexée. `/guide/hooks/`, `/guide/agents/` et `/guide/mcp-servers/` restent sans crawl ni canonical. Ces trois chemins peuvent être des routes inexistantes et ne prouvent pas une panne de leurs remplaçants.

### Canonicals HTTP

Les huit variantes HTTP historiques répondent toutes en 301 vers HTTPS. Google conserve néanmoins un canonical HTTP pour cinq d'entre elles:

- `/cheatsheets/m03-sessions-continuite/`
- `/guide/context-engineering-tools/`
- `/guide/learning-path/01-installation/`
- `/guide/learning-path/04-agents/`
- `/cheatsheets/m06-task-management-system/`

Les variantes HTTP de `/guide/workflows/iterative-refinement/`, `/guide/third-party-tools/` et `/guide/claude-code-releases/` sont maintenant non indexées et rattachées à un canonical HTTPS.

## Pages prioritaires

### Le cluster releases

`/releases/` totalise 57 452 impressions et 33 clics sur 90 jours. Les requêtes visibles `claude code version`, `claude code release date`, `claude code releases` et `current claude code version` se situent entre les positions 7,7 et 9,5 avec zéro clic dans la jointure page-requête.

L'ancienne route `/guide/claude-code-releases/` renvoie HTTP 200. Son contenu fait 9 mots, avec `noindex`, sans H1 ni description, et un canonical vers `/releases/`. La route devrait répondre directement en 301 ou 308.

Le détecteur de cannibalisation trouve encore huit requêtes releases ou version réparties sur plusieurs URL au cours des 90 jours. Les inspections actuelles et l'absence de l'ancienne route dans les lignes 28 jours indiquent une consolidation en cours. Le conflit est `PROUVÉ` sur 90 jours et `PARTIEL` à la date de l'audit.

### Titles, descriptions et H1

Cinq pages guide exposent deux H1 identiques:

- `/guide/agent-harness/`
- `/guide/architecture/`
- `/guide/data-privacy/`
- `/guide/hooks-events-reference/`
- `/guide/third-party-tools/`

Sept titles dépassent 60 caractères et sept descriptions dépassent 160 caractères dans le panel. Ces seuils servent au tri et ne garantissent pas la longueur d'affichage dans Google. Les pages à traiter en premier sont `/releases/`, `/guide/third-party-tools/`, `/guide/hooks-events-reference/`, `/guide/architecture/`, `/guide/agent-harness/` et `/glossary/`, car elles combinent exposition et faible CTR.

### Maillage interne

La cartographie a crawlé les 50 pages les plus visibles sur 90 jours, sans échec. Elle trouve 27 pages en position moyenne 11 à 20 sans lien entrant depuis le corps de ces 50 pages. Le mot « orpheline » reste limité à cet échantillon de sources.

Cibles prioritaires:

| Cible | Impressions | Position | Liens de corps entrants | Liens structurels |
| --- | ---: | ---: | ---: | ---: |
| `/guide/workflows/code-review/` | 524 | 15,4 | 0 | 22 |
| `/compare/claude-code-vs-windsurf/` | 376 | 19,6 | 0 | 0 |
| `/compare/claude-code-vs-aider/` | 210 | 18,5 | 0 | 0 |
| `/cheatsheets/t04-permissions-glob-patterns/` | 135 | 13,1 | 0 | 0 |
| `/cheatsheets/t06-settings-json/` | 135 | 11,4 | 0 | 0 |
| `/cheatsheets/m11-hooks-evenements-systeme/` | 91 | 12,5 | 0 | 0 |

Les hubs éditoriaux mesurés sont `/glossary/` avec 182 liens de corps sortants, `/guide/` avec 65, `/roles/` avec 27, puis `/guide/agent-harness/` et `/guide/third-party-tools/` avec 19 chacun.

## GA4 filtré

| Mesure | 28 jours | 90 jours |
| --- | ---: | ---: |
| Sessions organiques par landing page | 366 | 1 363 |
| Clics GSC alignés | 380 | 1 246 |
| Ratio GA4/GSC | 0,963 | 1,094 |
| Part organique de `/quiz/` | 45,6 % | 46,3 % |
| Conversions enregistrées | 0 | 0 |
| `file_download` | 93 | 359 |
| `form_start` | 36 | 90 |

Les trois premières landing pages, `/quiz/`, `/` et `/cheatsheet/`, concentrent 63,7 % des sessions organiques sur 28 jours et 71,8 % sur 90 jours.

`/releases/` a 365 vues et 9,0 % d'engagement sur 90 jours, tous canaux. `/glossary/` a 69 sessions organiques et 15,9 % d'engagement. Ces taux signalent des pages à examiner. Ils ne prouvent ni une mauvaise qualité éditoriale ni une inadéquation d'intention.

L'attribution tous canaux contient 1 126 sessions depuis Singapour sur 28 jours avec 0,9 % d'engagement. La cause, humaine, automatisée, technique ou liée à l'attribution, reste `UNKNOWN`.

## Core Web Vitals et surfaces secondaires

`CRUX_API_KEY` et `GOOGLE_API_KEY` ne sont pas configurées. Les données terrain CrUX et les audits PageSpeed restent `UNKNOWN`. Aucun runtime Lighthouse n'est installé dans le projet, donc aucun score de laboratoire de remplacement n'a été produit.

Discover et Google News ne renvoient aucune impression sur 90 jours. Google Images renvoie 669 impressions et zéro clic. L'outil AI Overviews échoue sur une combinaison de dimensions refusée par l'API, donc l'impact des AI Overviews reste `UNKNOWN`.

## Priorités

| Priorité | Action | Preuve |
| --- | --- | --- |
| P0 | Remplacer le soft redirect `/guide/claude-code-releases/` par un 301 ou 308 | HTTP 200, 9 mots, noindex, canonical vers `/releases/` |
| P0 | Diagnostiquer et corriger l'état non indexé de data privacy et hooks reference | Crawl réussi, canonical propre, 2 737 impressions cumulées sur 90 jours |
| P0 | Qualifier le trafic Singapour et configurer les key events attendus | 1 126 sessions à 0,9 % d'engagement; 0 conversion malgré des événements |
| P1 | Vérifier les cinq canonicals Google encore en HTTP | 5 cas persistants sur 8 URL historiques |
| P1 | Réaligner `/releases/` sur les requêtes version et changelog | 7 208 impressions, position 8,2, CTR 0,10 % sur 28 jours |
| P1 | Supprimer le double H1 sur cinq pages guide | 5 cas reproduits dans le panel |
| P1 | Tester un maillage contextuel vers les pages en position 11 à 20 | 27 cibles sans lien de corps dans 50 pages sources |
| P2 | Raccourcir les titles et descriptions après revue de l'intention | 7 titles et 7 descriptions au-delà des seuils de tri |
| P2 | Ajouter les en-têtes de sécurité manquants au niveau de l'hébergement | 12 pages sur 12 sans les trois en-têtes testés |
| P2 | Configurer CrUX et PageSpeed pour mesurer le terrain | Statut actuel UNKNOWN |

Le détail des critères d'acceptation est dans `seo-action-plan-cc-bruniaux-2026-09-04.md`.

## Limites

- URL Inspection couvre 41 URL sur 410 pages présentes dans les données GSC 90 jours.
- Le maillage couvre 50 pages sources sur 410 et ne voit pas les liens des 360 autres.
- Les requêtes visibles couvrent 25,3 % des clics exacts sur 28 jours.
- Les fenêtres GSC se terminent le 1er septembre en raison du décalage de trois jours.
- Les fenêtres GA4 directes se terminent à `yesterday`; seules les comparaisons GSC/GA4 ont été alignées.
- Les anciens chiffres du rapport de juin sont arithmétiquement incohérents. Les deltas concernés restent `UNKNOWN`.
- Les heuristiques de longueur, contenu et maillage ne sont pas des verdicts de Google.
- Aucun outil de soumission, suppression, génération de schema ou création de baseline n'a été appelé.

## Preuves locales

Les données brutes sont conservées sous `.audit/seo/2026-09-04-cc-bruniaux/raw/`. Les synthèses intermédiaires sont sous `.audit/seo/2026-09-04-cc-bruniaux/analysis/`. Le manifeste enregistre le SHA du site, le SHA du serveur MCP, les versions, les fenêtres et les dépendances disponibles.
