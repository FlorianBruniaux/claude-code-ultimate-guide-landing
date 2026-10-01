# Audit SEO de cc.bruniaux.com, suivi du 1er octobre 2026

**Site :** https://cc.bruniaux.com

**Propriété Search Console :** `sc-domain:cc.bruniaux.com`

**Mode :** lecture seule
**Méthode :** [Full SEO Audit du serveur Google Search Console MCP](https://github.com/FlorianBruniaux/google-search-console-mcp/blob/main/examples/full-audit.md), avec contrôle GA4 et comparaison au [rapport du 4 septembre](seo-audit-cc-bruniaux-2026-09-04.md).

## Verdict

Du 1er au 28 septembre, Search Console mesure **466 clics**, **53 416 impressions**, un **CTR de 0,87 %** et une **position moyenne de 7,3**. Le relevé précédent portait sur le 5 août au 1er septembre : 380 clics, 31 222 impressions, 1,22 % de CTR et une position moyenne de 10,8. Les clics sont donc plus nombreux de 22,6 % et les impressions de 71,1 %, mais le CTR perd 0,35 point. Les fenêtres ont un jour commun, le 1er septembre. Ces chiffres décrivent la progression entre deux relevés, pas une comparaison de périodes disjointes ni l'effet causal des corrections.

Deux problèmes d'indexation signalés en septembre sont résolus : `/guide/data-privacy/` et `/guide/hooks-events-reference/` sont indexées, autorisent l'indexation et ont un canonical Google égal au canonical HTTPS déclaré. Les cinq pages guide qui avaient un double H1 présentent désormais chacune un seul H1 dans le HTML public.

Le principal problème de rendement persiste. `/releases/` reçoit 13 320 impressions et 15 clics sur 28 jours, soit 0,11 % de CTR à la position moyenne 7,0. `/guide/third-party-tools/` reçoit 7 114 impressions et 7 clics, soit 0,10 % à la position 6,6. Les requêtes visibles « latest claude code version » et « claude code version » ont respectivement 463 et 328 impressions pour aucun clic attribué à `/releases/`. Les requêtes masquées par Search Console empêchent d'étendre ce constat à toutes les impressions.

## Population et qualité de mesure

| Contrôle | Période ou population | Résultat | Limite |
| --- | --- | --- | --- |
| GSC sans dimension | 1er au 28 septembre | 466 clics, 53 416 impressions | Agrégat de référence |
| GSC sans dimension | 1er juillet au 28 septembre | 1 325 clics, 130 183 impressions | La fenêtre recoupe l'audit précédent |
| GSC par page | 28 jours | 331 URL, 471 clics additionnés | Le total dépasse l'agrégat de 5 clics |
| GSC par requête | 28 jours | 1 094 requêtes, 103 clics additionnés | 22,1 % des clics agrégés; requêtes anonymisées |
| GSC par page | 90 jours | 416 URL | Mesure de performance, pas recensement des URL indexées |
| URL Inspection | 15 URL ciblées | 10 URL HTTPS prioritaires et 5 variantes HTTP historiques | Échantillon, pas couverture exhaustive |
| Sitemap | état au 1er octobre | 459 URL, 0 erreur, 0 avertissement | « indexed=0 » contredit URL Inspection |
| Données structurées | 6 pages publiques | 6 verdicts `healthy` | Validation heuristique des champs, pas test des résultats enrichis de Google |
| H1 | 5 anciennes pages en défaut | 1 H1 chacune | Panel historique seulement |
| GA4 | 1er au 28 septembre, hôte filtré | 599 sessions organiques dans le contrôle de santé | Ratio approximatif avec les clics GSC |
| CrUX et PageSpeed | accueil mobile | `not_enough_data` et `missing_key` | LCP, INP et CLS terrain restent `UNKNOWN` |

L'outil `compare_search_periods` a retourné 103 clics et 7 770 impressions pour la période récente de 28 jours, contre 466 et 53 416 pour la même fenêtre sans dimension. Ce résultat correspond au sous-ensemble des requêtes visibles et ne doit pas servir à calculer un delta global. Les outils `traffic_drops` et `seo_lost_queries` utilisent aussi une fenêtre qui va jusqu'au 1er octobre, donc inclut des jours GSC incomplets. Leurs alertes ne sont pas traitées comme des pertes confirmées.

## Trafic et pages

| Page | Clics, 28 j | Impressions, 28 j | CTR | Position | Clics au précédent relevé |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/quiz/` | 154 | 2 421 | 6,36 % | 6,3 | 189 |
| `/downloads/` | 66 | 434 | 15,21 % | 9,5 | Absente du tableau précédent |
| `/whitepapers/` | 44 | 629 | 7,00 % | 11,2 | 14 |
| `/` | 21 | 860 | 2,44 % | 5,2 | 28 |
| `/glossary/` | 20 | 1 283 | 1,56 % | 7,6 | 18 |
| `/cheatsheet/` | 18 | 262 | 6,87 % | 8,4 | 25 |
| `/releases/` | 15 | 13 320 | 0,11 % | 7,0 | 7 |
| `/guide/architecture/` | 10 | 4 119 | 0,24 % | 6,2 | 5 |
| `/guide/third-party-tools/` | 7 | 7 114 | 0,10 % | 6,6 | 4 |

`/quiz/` représente 33,0 % des clics agrégés récents, contre 49,7 % au précédent relevé. Sa baisse de 189 à 154 clics ne suffit pas à déduire une perte de classement générale : les impressions passent aussi de 3 193 à 2 421 et les périodes ne sont pas disjointes. L'arrivée de `/downloads/` avec 66 clics et la hausse de `/whitepapers/` de 14 à 44 clics diversifient les pages d'entrée.

Le trafic reste très déséquilibré par appareil et pays. Le desktop produit 336 clics et 49 589 impressions, soit 0,68 % de CTR, contre 128 clics et 3 756 impressions sur mobile, soit 3,41 %. Les États-Unis fournissent 26 117 impressions et 59 clics, soit 0,23 % de CTR. L'Inde fournit 2 620 impressions et 125 clics, soit 4,77 %. Le mélange de pays et de requêtes pèse sur le CTR global; il ne prouve pas à lui seul que les snippets sont défaillants.

Sur 90 jours, la série sans dimension donne 1 325 clics, 130 183 impressions, 1,02 % de CTR et une position moyenne de 9,1. Le rapport de septembre donnait 1 246 clics et 233 834 impressions sur une autre fenêtre de 90 jours. Les impressions de cette fenêtre mobile baissent fortement, mais les fenêtres se chevauchent et les écarts de mix empêchent d'attribuer la variation à une correction précise. Le contrôle d'anomalies quotidiennes ne signale aucun jour au seuil de 2,5 écarts types sur les 90 jours récents.

## Indexation, sitemap et canoniques

Search Console connaît un seul sitemap, `/sitemap-index.xml`, soumis le 25 juin et relu le 23 septembre. Il déclare 459 URL, sans erreur ni avertissement. L'audit de couverture rapproche 358 URL de lignes de performance GSC et en trouve 101 sans ligne. **L'absence de ligne de performance ne signifie pas que ces 101 URL ne sont pas indexées.** Le champ `indexed=0` du rapport sitemap reste incompatible avec les inspections individuelles et n'est pas utilisé comme total d'indexation.

Les dix URL HTTPS ciblées ont neuf états `indexed`. La dixième est l'ancienne route `/guide/claude-code-releases/`, volontairement `noindex`, avec canonical Google vers `/releases/`. Les deux pages anciennement non indexées sont maintenant `PASS` : dernier crawl le 14 septembre pour `/guide/data-privacy/`, le 5 septembre pour `/guide/hooks-events-reference/`. Les pages `/releases/`, `/quiz/`, `/downloads/`, `/whitepapers/`, `/guide/third-party-tools/`, `/guide/architecture/` et l'accueil sont également `PASS`.

L'ancienne route des releases sert toujours HTTP 200, avec un titre « Redirecting to: /releases/ », `noindex` et un canonical vers `/releases/`. Elle ne fait pas de redirection HTTP permanente. Le problème technique du 4 septembre persiste, même si Google a bien choisi `/releases/` comme canonical et qu'aucune ligne de cette ancienne route n'apparaît dans la jointure page-requête des 28 jours récents.

Sur les cinq variantes HTTP qui avaient encore un canonical Google en HTTP en septembre, deux sont maintenant `not_indexed` sans canonical exploitable : `/cheatsheets/m03-sessions-continuite/` et `/cheatsheets/m06-task-management-system/`. Les trois autres gardent un canonical Google HTTP : `/guide/context-engineering-tools/`, `/guide/learning-path/01-installation/` et `/guide/learning-path/04-agents/`. La variante `01-installation` a été recrawlée le 24 septembre. Sa réponse publique HTTP est bien un 301 direct vers HTTPS, mais Google continue de sélectionner l'URL HTTP. Le statut de ces trois cas est donc `PERSISTING`, la cause `UNKNOWN`.

## Pages publiques et données structurées

Les pages `/releases/`, `/guide/third-party-tools/` et `/guide/architecture/` répondent HTTP 200, déclarent leur propre canonical HTTPS et ont un title ainsi qu'une description présents. Les trois en-têtes contrôlés par l'outil (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) sont absents sur ces pages et sur l'ancienne route. Leur ajout dépend du mode d'hébergement et d'une vérification des ressources et intégrations autorisées.

Les cinq pages guide anciennement en défaut de H1, `/guide/agent-harness/`, `/guide/architecture/`, `/guide/data-privacy/`, `/guide/hooks-events-reference/` et `/guide/third-party-tools/`, ont chacune un seul H1. Le contrôle des données structurées est `healthy` sur l'accueil, `/releases/`, `/guide/third-party-tools/`, `/guide/architecture/`, `/quiz/` et `/whitepapers/`. Ce résultat valide les champs que l'outil connaît; il ne prouve ni éligibilité ni affichage enrichi dans Google.

Le détecteur de cannibalisation sur 28 jours ne remonte plus les huit requêtes « releases/version » relevées sur la fenêtre de 90 jours précédente. Il signale seulement `site:cc.bruniaux.com` et `claude cc` au seuil de 100 impressions; la première est une requête opérateur répartie sur le site. La disparition des anciennes requêtes du détecteur appuie une consolidation, sans prouver que toutes les requêtes masquées sont consolidées.

## GA4 et performance

Le contrôle GSC/GA4 filtré sur `cc.bruniaux.com` retourne 599 sessions organiques pour 466 clics GSC, ratio 1,285, classé `healthy` par l'outil mais proche de sa limite supérieure de 1,3. Une extraction par landing page donne 611 sessions sur 95 lignes, avec un écart de 12 sessions par rapport au contrôle de santé. La cause de cet écart reste `UNKNOWN`; les définitions de session et les regroupements diffèrent des clics GSC.

GA4 ne relève toujours aucune conversion sur la période malgré 200 événements `file_download` et 31 `form_start`. Le choix des événements métier à marquer comme conversions reste à documenter. `/releases/` compte 15 sessions organiques, dont une engagée, dans l'extraction par landing page : signal d'usage faible sur un petit effectif, sans preuve d'une cause éditoriale.

Singapour passe de 1 126 sessions à 0,9 % d'engagement au relevé précédent à 196 sessions à 9,7 % dans la fenêtre actuelle. Parmi ces 196 sessions, 155 sont classées `Direct`, dont sept engagées; 21 viennent du portfolio, aucune engagée; 17 viennent de GitHub, dont onze engagées. Les fenêtres sont différentes et la cause du trafic reste `UNKNOWN`. Aucun filtre ne devrait être activé sur la seule base de ce pays.

CrUX répond `not_enough_data` pour l'accueil en mobile. PageSpeed répond `missing_key` (`GOOGLE_API_KEY` absent). Aucun verdict LCP, INP ou CLS terrain n'est donc établi. Le type de recherche web concentre les clics; les outils secondaires ne remontent aucun clic Discover, Google News, image ou vidéo sur 90 jours. Le total web du contrôle par type diffère légèrement de l'agrégat sans dimension et n'est pas utilisé comme référence.

## Actions ordonnées

| Priorité | Action et critère de sortie | Preuve actuelle |
| --- | --- | --- |
| P1 | Définir les événements métier à suivre, tester leurs déclencheurs dans GA4, puis vérifier leur remontée comme conversions ou consigner la décision de ne pas en suivre. | Zéro conversion, 200 `file_download`, 31 `form_start` sur 28 jours. |
| P1 | Mettre en place une redirection HTTP 301 ou 308 de `/guide/claude-code-releases/` vers `/releases/` au niveau de l'hébergement; vérifier `Location` et l'absence de page 200 intermédiaire. | La route répond 200 `noindex`, Google choisit déjà `/releases/`. |
| P1 | Analyser les résultats affichés pour les requêtes version et outils, puis tester un changement éditorial à la fois sur `/releases/` et `/guide/third-party-tools/`. Mesurer deux fenêtres complètes et comparables de 28 jours. | Respectivement 0,11 % et 0,10 % de CTR malgré 20 434 impressions cumulées. |
| P1 | Rechercher les liens, sitemap et données structurées qui citent les trois variantes HTTP restantes; contrôler chaque équivalent HTTPS et relancer URL Inspection après correction. | Trois canoniques Google HTTP persistent sur cinq URL historiques. |
| P2 | Ventiler les sessions directes de Singapour par landing page et heure, puis recouper avec les journaux disponibles avant toute règle de filtrage. | 155 sessions directes, sept engagées, cause `UNKNOWN`. |
| P2 | Obtenir une mesure mobile vérifiable de LCP, INP et CLS si la disponibilité de données terrain ou d'un accès PageSpeed le permet. | CrUX sans assez de données, PageSpeed sans clé. |

## Ce qui a changé depuis le 4 septembre

| Constat historique | État au 1er octobre |
| --- | --- |
| Deux pages utiles non indexées | `RESOLVED` dans URL Inspection, toutes deux `PASS`. |
| Double H1 sur cinq pages guide | `RESOLVED` dans le HTML public des cinq pages. |
| Sitemap déclaré sans erreur | `PERSISTING`, 459 URL contre 457 dans le relevé précédent. |
| Ancienne route releases en soft redirect | `PERSISTING`, HTTP 200 `noindex`. |
| Cinq canoniques Google HTTP | Trois `PERSISTING`, deux désormais `not_indexed` sans canonical exploitable. |
| CTR très bas sur `/releases/` | `PERSISTING`, 0,11 % contre 0,10 %; impressions en hausse. |
| Zéro conversion GA4 | `PERSISTING` dans la fenêtre actuelle. |
| Pic de sessions Singapour | Volume et engagement changés; cause toujours `UNKNOWN`. |

**P0 : aucun blocage immédiat d'indexation n'est prouvé sur le panel contrôlé.** L'audit n'a soumis aucune URL, modifié aucun sitemap, déclenché aucune correction ni attribué un score SEO synthétique. Les mesures GSC s'arrêtent au 28 septembre à cause du décalage de publication. Le nombre total d'URL indexées, les Core Web Vitals terrain, la cause des canoniques HTTP et l'effet causal des corrections restent `UNKNOWN`.
