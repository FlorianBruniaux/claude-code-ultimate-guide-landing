# Full SEO Audit Execution Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Refaire un audit SEO complet, reproductible et en lecture seule de `https://cc.bruniaux.com`, puis comparer chaque constat important à l’audit du 23 juin 2026.

**Architecture:** Une acquisition centrale collecte une seule fois les données GSC, GA4, sitemap, indexation et pages publiques. Les analyses travaillent ensuite sur ces artefacts figés afin d’éviter les écarts de dates, les doubles appels et les conclusions contradictoires. Chaque constat doit porter une source, une fenêtre, un dénominateur, une couverture et un niveau de preuve.

**Tech Stack:** `gsc-mcp` 1.1.2 en installation éditable, Google Search Console API, GA4 Data API optionnelle, CrUX API optionnelle, PageSpeed Insights optionnelle, Astro 5, sitemap XML public.

**Spec:** [Exemple full-audit du serveur GSC](https://github.com/FlorianBruniaux/google-search-console-mcp/blob/main/examples/full-audit.md), `seo-audit-cc-bruniaux-2026-06-23.md`, et `docs/superpowers/plans/2026-06-19-seo-fixes.md`.

## Global Constraints

- Propriété GSC cible : `sc-domain:cc.bruniaux.com`.
- Origine canonique : `https://cc.bruniaux.com`.
- Audit strictement en lecture seule. Interdiction d’appeler `submit_url`, `submit_batch`, `submit_sitemap`, `sitemaps_delete`, `schema_generate` et `indexnow_submit`.
- Fenêtres principales : 28 jours et 90 jours. Utiliser 180 jours uniquement pour la détection de pages sans trafic et la comparaison longue.
- Consigner les dates absolues retournées par les outils. Ne pas présenter « 28 jours » sans bornes de dates.
- Respecter le décalage GSC d’environ trois jours et ne pas comparer directement la journée courante GA4 aux jours GSC incomplets.
- Les lignes par requête peuvent exclure les requêtes anonymisées. Toujours indiquer leur couverture par rapport au total agrégé.
- Une URL absente des données de performance GSC n’est pas prouvée non indexée. Seule l’URL Inspection API établit son statut d’indexation.
- Le résultat `sitemap_audit.urls_missing_from_gsc` signifie « aucune donnée GSC sur 90 jours », pas « non indexée ».
- GA4 property `523714092` ne peut être utilisée qu’avec `hostname="cc.bruniaux.com"`. Sans filtre vérifié, classer les résultats `PARTIEL`.
- CrUX et PageSpeed restent `UNKNOWN` si `CRUX_API_KEY` ou `GOOGLE_API_KEY` manque. Ne pas remplacer une mesure terrain absente par une estimation.
- Le score composite `page_health_score` n’est comparable entre pages que si les mêmes composants sont disponibles pour toutes.
- Aucun gain de clics ne doit être présenté comme une prévision. Un calcul `impressions × écart de CTR` est un scénario, avec hypothèses explicites.
- Les constats de juin sont une baseline historique, pas l’état courant.
- Aucun correctif, commit, soumission de sitemap ou demande d’indexation pendant l’audit.

---

## File Map

**Créer pendant l’exécution :**

- `.audit/seo/2026-09-04-cc-bruniaux/MANIFEST.json` : versions, paramètres, fenêtres, appels, erreurs et statut des dépendances.
- `.audit/seo/2026-09-04-cc-bruniaux/raw/*.json` : réponse brute de chaque appel MCP, un fichier par appel.
- `.audit/seo/2026-09-04-cc-bruniaux/coverage.json` : dénominateurs, limites, lignes reçues, URLs inspectées et pages crawlées.
- `.audit/seo/2026-09-04-cc-bruniaux/findings.json` : constats normalisés et dédupliqués.
- `seo-audit-cc-bruniaux-2026-09-04.md` : rapport factuel complet.
- `seo-action-plan-cc-bruniaux-2026-09-04.md` : actions P0, P1, P2 avec preuve et critère d’acceptation.
- `seo-delta-cc-bruniaux-2026-06-23-to-2026-09-04.md` : résolu, persistant, régressé ou inconnu pour chaque constat de juin.

**Modifier pendant l’exécution :**

- `.gitignore` : ajouter `.audit/` pour empêcher la publication des données brutes.

## Priority Contract

| Priorité | Critère |
| --- | --- |
| P0 | Blocage d’indexation, erreur canonique ou technique étendue, chute négative significative, ou donnée structurée invalide sur une page critique. Preuve actuelle et reproductible obligatoire. |
| P1 | Opportunité ou dégradation mesurable sur un volume matériel de clics ou d’impressions, CWV « poor » sur une page prioritaire, cannibalisation confirmée, ou problème de maillage à forte exposition. |
| P2 | Optimisation éditoriale ou structurelle à signal plus faible, page longue traîne, amélioration GEO, ou constat à couverture limitée. |
| UNKNOWN | Dépendance absente, quota, échantillon insuffisant, incohérence de données ou échec d’appel. Aucun classement positif ou négatif. |

---

### Task 1: Geler le contrat et les dépendances

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/MANIFEST.json`
- Create: `.audit/seo/2026-09-04-cc-bruniaux/coverage.json`
- Modify: `.gitignore`

**Interfaces:**

- Consumes: configuration MCP locale et propriété GSC.
- Produces: paramètres immuables utilisés par toutes les tâches suivantes.

- [x] **Step 1: Enregistrer le contexte**

  Consigner date, timezone, SHA Git du site, SHA Git de `google-search-console-mcp`, version déclarée du package, chemin du binaire, propriété GSC et origine canonique.

- [x] **Step 2: Vérifier le serveur**

  Appeler `get_capabilities()`. Critère : `total == 61`.

- [x] **Step 3: Vérifier l’accès GSC**

  Appeler `get_site_details(site_url="sc-domain:cc.bruniaux.com")`. Critère : propriété présente et permission explicite.

- [x] **Step 4: Tester les dépendances optionnelles sans extrapoler**

  Vérifier séparément GA4 property `523714092` avec le filtre `hostname="cc.bruniaux.com"`, CrUX et PageSpeed. Enregistrer `AVAILABLE`, `PARTIAL` ou `UNKNOWN` avec l’erreur exacte, sans afficher de secret.

- [x] **Step 5: Verrouiller la politique de mutation**

  Écrire dans le manifeste la liste des six outils interdits et vérifier en fin d’audit qu’aucun n’apparaît dans le journal d’appels.

**Acceptance criteria:**

- Le manifeste contient des dates absolues, les versions et les dépendances.
- Aucun secret n’est écrit.
- Les tâches suivantes peuvent s’exécuter sans redécouvrir les paramètres.

---

### Task 2: Construire les inventaires local, public et GSC

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/site-inventory.json`
- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/sitemaps.json`
- Update: `.audit/seo/2026-09-04-cc-bruniaux/coverage.json`

**Interfaces:**

- Consumes: origine canonique et build Astro.
- Produces: trois dénominateurs distincts, sans les confondre.

- [x] **Step 1: Valider le build local**

  Run: `pnpm build`

  Expected: exit code 0. Extraire le nombre d’URLs produites dans le sitemap généré.

- [x] **Step 2: Capturer les directives publiques**

  Lire `https://cc.bruniaux.com/robots.txt` et `https://cc.bruniaux.com/sitemap-index.xml`. Enregistrer code HTTP, URL finale, date et nombre d’URLs.

- [x] **Step 3: Lister les sitemaps connus par GSC**

  Appeler `list_sitemaps(site="sc-domain:cc.bruniaux.com")`, puis `sitemaps_get` pour chaque sitemap déclaré.

- [x] **Step 4: Auditer le sitemap principal**

  Appeler `sitemap_audit(site="sc-domain:cc.bruniaux.com", sitemap_url="https://cc.bruniaux.com/sitemap-index.xml")`.

- [x] **Step 5: Comparer trois couvertures**

  Publier séparément :

  1. URLs du build local.
  2. URLs du sitemap public.
  3. URLs ayant des données GSC sur 90 jours.

  Ne jamais appeler la troisième population « URLs indexées ».

**Acceptance criteria:**

- Les trois populations ont chacune un nombre et une date.
- Toute différence contient un échantillon d’URLs et une explication de sa portée.
- Le statut de soumission de `sitemap-index.xml` est prouvé, pas hérité de juin.

---

### Task 3: Acquérir la performance GSC une seule fois

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/performance-*.json`
- Update: `.audit/seo/2026-09-04-cc-bruniaux/coverage.json`

**Interfaces:**

- Consumes: propriété GSC.
- Produces: dataset canonique pour tendances, opportunités et pages prioritaires.

- [x] **Step 1: Capturer les agrégats**

  Appeler :

  ```text
  get_performance_overview(site="sc-domain:cc.bruniaux.com", days=28)
  get_performance_overview(site="sc-domain:cc.bruniaux.com", days=90)
  compare_search_periods(site="sc-domain:cc.bruniaux.com", days=28)
  compare_search_periods(site="sc-domain:cc.bruniaux.com", days=90)
  ```

- [x] **Step 2: Capturer les dimensions**

  Appeler `get_search_analytics` sur 28 et 90 jours avec dimensions `["page"]`, `["query"]`, `["device"]` et `["country"]`. Utiliser un `row_limit` explicite et le consigner.

- [x] **Step 3: Capturer la jointure page-requête**

  Appeler `get_search_by_page_query(site="sc-domain:cc.bruniaux.com", days=90, row_limit=1000)`.

- [x] **Step 4: Capturer les anomalies et surfaces**

  Appeler :

  ```text
  analytics_anomalies(site="sc-domain:cc.bruniaux.com", days=90, threshold=2.0)
  search_type_breakdown(site="sc-domain:cc.bruniaux.com", days=90)
  discover_performance(site="sc-domain:cc.bruniaux.com", days=90)
  news_performance(site="sc-domain:cc.bruniaux.com", days=90)
  ai_overviews_impact(site="sc-domain:cc.bruniaux.com", days=90, limit=100)
  ```

  Un `400`, `403` ou « no data » devient `UNKNOWN` pour la surface concernée.

- [x] **Step 5: Exécuter les invariants**

  Vérifier que toutes les comparaisons utilisent les mêmes dates. La somme des pages ne doit pas dépasser le total agrégé correspondant. Documenter la couverture des requêtes anonymisées et toute troncature.

- [x] **Step 6: Auditer la baseline de juin**

  Marquer comme incohérente toute comparaison historique dont les dates ou dimensions ne sont pas prouvées. Le cas « 72 clics au total contre 123 clics pour /quiz/ » doit être signalé et exclu des calculs de delta tant qu’il n’est pas expliqué.

**Acceptance criteria:**

- Chaque tableau comporte fenêtre absolue, dimension, limite et nombre de lignes.
- Les totaux incohérents sont bloqués avant analyse.
- Aucun pourcentage de croissance n’est calculé avec un dénominateur nul ou non comparable.

---

### Task 4: Détecter les opportunités et les pertes

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/opportunities-*.json`
- Create: `.audit/seo/2026-09-04-cc-bruniaux/findings.json`

**Interfaces:**

- Consumes: dataset canonique de Task 3.
- Produces: candidats mesurés, non encore classés P0/P1/P2.

- [x] **Step 1: Identifier les gains potentiels**

  Appeler `quick_wins(site="sc-domain:cc.bruniaux.com", days=90, min_impressions=50)` et `seo_striking_distance(site="sc-domain:cc.bruniaux.com", days=90, min_impressions=50)`.

- [x] **Step 2: Diagnostiquer les pertes**

  Appeler `traffic_drops(site="sc-domain:cc.bruniaux.com", days=28)`, `seo_lost_queries(site="sc-domain:cc.bruniaux.com", days=28)` et `check_alerts(site="sc-domain:cc.bruniaux.com", days=28)`.

- [x] **Step 3: Tester la cannibalisation**

  Appeler `seo_cannibalization(site="sc-domain:cc.bruniaux.com", days=90, min_impressions=50)`. Pour chaque candidat, confirmer dans le dataset page-requête que plusieurs URLs reçoivent réellement impressions ou clics sur la même requête.

- [x] **Step 4: Classer les pages à faible signal sans proposer de suppression**

  Appeler `prune_candidates(site="sc-domain:cc.bruniaux.com", days=180, max_pages=500)`. Conserver les catégories de l’outil. Aucune URL avec clic ne peut devenir candidate à suppression.

- [x] **Step 5: Quantifier sans promettre**

  Pour chaque quick win, présenter impressions, position, CTR actuel et CTR de scénario. Étiqueter le gain calculé « scénario non causal ».

**Acceptance criteria:**

- Chaque opportunité référence une page, une requête, une fenêtre et une valeur observée.
- Les diagnostics `ranking_loss`, `ctr_collapse` et `demand_decline` restent séparés.
- Aucun scénario n’est formulé comme trafic futur garanti.

---

### Task 5: Auditer l’indexation et les anciennes anomalies

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/indexation-*.json`
- Update: `.audit/seo/2026-09-04-cc-bruniaux/coverage.json`

**Interfaces:**

- Consumes: top pages, sitemap et findings de juin.
- Produces: `inspection_urls: string[]` et `inspection_batches: string[][]`, avec couverture explicite.

- [x] **Step 1: Construire l’échantillon**

  Inclure :

  - les 10 pages avec le plus de clics ;
  - les 10 pages avec le plus d’impressions et peu ou pas de clics ;
  - les pages touchées par une chute ou une cannibalisation ;
  - `/releases/`, `/guide/data-privacy/`, `/glossary/`, `/quiz/` et `/cheatsheet/` ;
  - les quatre anciens `FETCH_ERROR` et les anciennes variantes HTTP ;
  - les principales pages publiées depuis le 23 juin.

- [x] **Step 2: Dédupliquer et plafonner**

  Convertir chaque chemin en URL absolue HTTPS sous `https://cc.bruniaux.com`, dédupliquer dans `inspection_urls`, découper en lots de 10 maximum dans `inspection_batches`, puis appeler `batch_url_inspection(urls=inspection_batches[i], site="sc-domain:cc.bruniaux.com")` pour chaque index `i`.

- [x] **Step 3: Catégoriser les échecs**

  Utiliser `check_indexing_issues` sur le même échantillon. Séparer `not_indexed`, `robots_blocked`, `fetch_error` et `canonical_issue`.

- [x] **Step 4: Revalider les constats de juin**

  Tester explicitement :

  - soumission et lecture de `sitemap-index.xml` ;
  - variantes HTTP et canonicals HTTPS ;
  - anciens slugs `/guide/hooks/`, `/guide/agents/`, `/guide/workflows/`, `/guide/mcp-servers/` ;
  - concurrence entre `/releases/` et l’ancienne page guide.

**Acceptance criteria:**

- Le rapport dit « échantillon inspecté N / population M », jamais « tout le site » sans preuve.
- Chaque P0 d’indexation contient le verdict Google, le canonical Google, le canonical utilisateur et la dernière exploration.
- Aucun outil de soumission n’est appelé.

---

### Task 6: Faire les deep dives page par page

**Files:**

- Create: un sous-dossier de `.audit/seo/2026-09-04-cc-bruniaux/raw/pages/` par URL, nommé avec les 12 premiers caractères de son SHA-256.

**Interfaces:**

- Consumes: pages prioritaires de Tasks 3 à 5.
- Produces: preuves on-page, contenu, schéma et maillage.

- [x] **Step 1: Choisir un panel borné**

  Retenir au maximum 12 pages : top clics, top impressions sans clics, anomalies persistantes de juin et nouvelles pages stratégiques.

- [x] **Step 2: Auditer chaque page**

  Pour chaque `url` absolue du panel, appeler :

  ```text
  inspect_url(url=url, site="sc-domain:cc.bruniaux.com")
  schema_validate(url=url)
  page_technical_audit(url=url)
  heading_audit(url=url)
  content_quality(url=url)
  internal_links_audit(url=url)
  ```

- [x] **Step 3: Relier requêtes et contenu**

  Extraire les requêtes de la Task 3. Utiliser `content_brief` uniquement si GA4 est disponible et correctement filtré, sinon produire la même analyse depuis GSC seul.

- [x] **Step 4: Cartographier le maillage**

  Appeler `link_equity_map(site="sc-domain:cc.bruniaux.com", days=90, max_pages=50, delay_seconds=0.2)`.

  Rapporter `pages_crawled`, `pages_failed` et la limite de 50. « Orphelin » signifie uniquement « aucun lien éditorial trouvé dans cet échantillon ».

**Acceptance criteria:**

- Chaque recommandation on-page est reliée à une requête ou une anomalie mesurée.
- Les heuristiques de contenu ne sont pas présentées comme facteurs Google prouvés.
- Les résultats de schéma distinguent invalide, absent et non pertinent.

---

### Task 7: Mesurer les Core Web Vitals

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/cwv-*.json`

**Interfaces:**

- Consumes: trois pages prioritaires et statut des clés.
- Produces: mesures terrain et laboratoire clairement séparées.

- [x] **Step 1: Sélectionner les pages**

  Utiliser la homepage, la page avec le plus de clics et la page avec le plus d’impressions parmi celles qui ont un signal GSC matériel.

- [x] **Step 2: Collecter CrUX si disponible**

  Appeler `crux_page_vitals` pour `PHONE` et `DESKTOP`, puis `crux_lcp_subparts` lorsque LCP n’est pas « good ».

- [x] **Step 3: Collecter PageSpeed si disponible**

  Appeler `pagespeed_audit` en mobile et desktop. Garder le score Lighthouse séparé des données CrUX.

- [x] **Step 4: Traiter l’absence de données**

  Une réponse CrUX insuffisante signifie « pas assez de données terrain », pas « bonne performance ». Sans clé, classer le bloc `UNKNOWN`.

**Acceptance criteria:**

- LCP, INP et CLS comportent valeur, percentile, appareil et type de source.
- Aucun diagnostic causal n’est tiré de la seule valeur CWV.
- Les P1 performance reposent sur une mesure « poor » actuelle et une page prioritaire.

---

### Task 8: Ajouter GA4 sans reproduire la contamination de juin

**Files:**

- Create: `.audit/seo/2026-09-04-cc-bruniaux/raw/ga4-*.json`

**Interfaces:**

- Consumes: property `523714092` et hostname exact.
- Produces: données comportementales filtrées ou statut `PARTIEL/UNKNOWN`.

- [x] **Step 1: Vérifier le filtre hostname**

  Exécuter un rapport GA4 avec `property_id="523714092"` et `hostname="cc.bruniaux.com"`. Rejeter tout résultat contenant des chemins ou hostnames attribuables à `florian.bruniaux.com`.

- [x] **Step 2: Collecter les vues utiles**

  Appeler avec le même filtre :

  ```text
  ga4_organic_landing_pages(start_date="28daysAgo", end_date="today", limit=1000, property_id="523714092", hostname="cc.bruniaux.com")
  ga4_traffic_sources(start_date="28daysAgo", end_date="today", property_id="523714092", hostname="cc.bruniaux.com")
  ga4_page_performance(start_date="28daysAgo", end_date="today", property_id="523714092", hostname="cc.bruniaux.com")
  ga4_user_behavior(start_date="28daysAgo", end_date="today", property_id="523714092", hostname="cc.bruniaux.com")
  ga4_conversion_funnel(start_date="28daysAgo", end_date="today", property_id="523714092", hostname="cc.bruniaux.com")
  ```

- [x] **Step 3: Exécuter les croisements**

  Appeler `traffic_health_check` et `page_analysis` avec `property_id="523714092"` et `hostname="cc.bruniaux.com"`.

- [x] **Step 4: Qualifier les conversions**

  Une valeur zéro signifie « aucun événement de conversion reçu par cette propriété et ce filtre », pas « aucune conversion métier ».

**Acceptance criteria:**

- Chaque tableau GA4 affiche le hostname filtré.
- Le ratio GSC/GA4 tient compte du décalage de dates.
- Si la contamination persiste, GA4 est exclu du score et classé `PARTIEL`.

---

### Task 9: Produire le delta contre juin

**Files:**

- Create: `seo-delta-cc-bruniaux-2026-06-23-to-2026-09-04.md`

**Interfaces:**

- Consumes: audit 2026-06-23 et résultats validés des Tasks 2 à 8.
- Produces: statut de chaque ancien constat.

- [x] **Step 1: Reprendre les huit constats de juin**

  Mapper sitemap, `/releases/`, `/guide/data-privacy/`, HTTP/HTTPS, cannibalisation releases, dépendance branded, `/glossary/` et anciens `FETCH_ERROR`.

- [x] **Step 2: Attribuer un statut**

  Utiliser exactement `RESOLVED`, `PERSISTING`, `REGRESSED` ou `UNKNOWN`.

- [x] **Step 3: Prouver chaque statut**

  Fournir ancienne valeur, nouvelle valeur, fenêtres comparables, source et raison du statut. Si l’ancienne valeur est incohérente, utiliser `UNKNOWN`.

**Acceptance criteria:**

- Aucun constat historique n’est silencieusement abandonné.
- Les deltas reposent sur des fenêtres et dimensions compatibles.
- Les corrections de code de juin ne sont pas assimilées à un résultat SEO sans données GSC actuelles.

---

### Task 10: Rédiger le rapport et le plan d’action

**Files:**

- Create: `seo-audit-cc-bruniaux-2026-09-04.md`
- Create: `seo-action-plan-cc-bruniaux-2026-09-04.md`
- Update: `.audit/seo/2026-09-04-cc-bruniaux/findings.json`

**Interfaces:**

- Consumes: toutes les preuves validées.
- Produces: décision lisible et backlog actionnable.

- [x] **Step 1: Dédupliquer les constats**

  Fusionner les symptômes qui partagent la même cause. Conserver tous les liens vers les preuves brutes.

- [x] **Step 2: Construire la scorecard**

  Présenter GSC, indexation, sitemap, CWV, schéma, contenu, maillage et GA4. Afficher pour chaque bloc `PROUVÉ`, `PARTIEL` ou `UNKNOWN`.

- [x] **Step 3: Classer P0/P1/P2**

  Appliquer le Priority Contract. Chaque action doit contenir :

  - constat et preuve ;
  - pages ou requêtes touchées ;
  - impact observé ;
  - action exacte ;
  - propriétaire recommandé : développement, contenu ou SEO ;
  - critère d’acceptation ;
  - dépendance et risque ;
  - méthode de mesure après correction.

- [x] **Step 4: Définir l’ordre d’exécution**

  Ordonner par dépendances : blocages d’indexation, intégrité canonique, mesures, opportunités CTR/contenu, maillage, améliorations secondaires.

- [x] **Step 5: Ajouter les stop rules**

  - Ne pas réécrire une page sur un seul signal ou moins de 50 impressions.
  - Ne pas demander d’indexation avant correction et nouvelle inspection.
  - Ne pas supprimer une page qui possède des clics.
  - Ne pas modifier deux pages cannibales avant d’avoir choisi une page cible.
  - Ne pas conclure sur CWV sans données terrain ou test laboratoire explicitement identifié.

**Acceptance criteria:**

- Le résumé mène avec les cinq constats les plus importants et leur niveau de preuve.
- Chaque P0 et P1 possède une métrique de départ et un critère observable de clôture.
- Les manques de données restent visibles.
- Aucun délai d’implémentation n’est inventé.

---

### Task 11: Exécuter le contrôle qualité final

**Files:**

- Update: tous les artefacts du dossier d’audit.

**Interfaces:**

- Consumes: rapport, action plan, delta et manifeste.
- Produces: audit publiable ou liste explicite de blocages.

- [x] **Step 1: Vérifier le journal d’appels**

  Confirmer qu’aucun outil de mutation n’a été appelé et que chaque réponse brute possède un horodatage et ses paramètres.

- [x] **Step 2: Vérifier les invariants**

  Rejouer les contrôles de dates, totaux, dénominateurs, troncatures, échantillons et disponibilité des dépendances.

- [x] **Step 3: Vérifier la traçabilité**

  Chaque nombre du rapport doit pointer vers un fichier brut ou un calcul documenté.

- [x] **Step 4: Vérifier les sorties**

  Run: `git diff --check`

  Expected: exit code 0.

- [x] **Step 5: Présenter les limites**

  Terminer par la liste des zones non vérifiées : pages hors échantillon URL Inspection, données CrUX absentes, GA4 partiel, quotas ou erreurs réseau.

**Acceptance criteria:**

- Zéro mutation externe.
- Zéro contradiction arithmétique connue.
- Zéro conclusion sans source, période et couverture.
- Les statuts `PARTIEL` et `UNKNOWN` restent dans le rapport final.

## Execution Strategy

1. Exécuter Tasks 1 à 5 séquentiellement pour figer les données et respecter les quotas.
2. Analyser Tasks 6 à 8 en parallèle uniquement après l’acquisition centrale, sans refaire les appels GSC.
3. Exécuter Tasks 9 à 11 séquentiellement pour produire un seul verdict cohérent.
