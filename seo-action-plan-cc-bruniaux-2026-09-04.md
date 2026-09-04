# Plan d'action SEO de cc.bruniaux.com

**Baseline:** audit du 4 septembre 2026
**Mode d'exécution de l'audit:** lecture seule
**Règle:** corriger, déployer, vérifier le comportement public, puis observer une fenêtre comparable. Ne demander une nouvelle exploration qu'après validation technique.

## P0

### 1. Remplacer le soft redirect releases par une redirection HTTP

**Constat:** `/guide/claude-code-releases/` répond HTTP 200 avec 9 mots, `noindex` et canonical vers `/releases/`. Le redirect déclaré dans Astro produit une page HTML statique, pas une redirection HTTP sur l'hébergement actuel.

**Action:**

- ajouter une règle de redirection permanente au niveau de l'hébergement pour `/guide/claude-code-releases/` vers `/releases/`;
- conserver `/releases/` comme canonical unique;
- supprimer les liens internes et les entrées de recherche qui ciblent encore l'ancienne route;
- vérifier que l'ancienne route ne figure pas dans le sitemap.

**Critères d'acceptation:**

- `curl -I https://cc.bruniaux.com/guide/claude-code-releases/` retourne 301 ou 308;
- l'en-tête `Location` pointe directement vers `https://cc.bruniaux.com/releases/`;
- aucune réponse HTML 200 intermédiaire;
- le sitemap contient `/releases/` et exclut l'ancienne route;
- une recherche dans le dépôt ne trouve plus de lien public vers l'ancienne URL, hors tests ou table de redirection;
- après recrawl, GSC choisit `/releases/` comme canonical.

**Rollback:** retirer la règle d'hébergement si elle crée une boucle ou détourne une route encore nécessaire.

### 2. Diagnostiquer les deux pages utiles non indexées

**Constat:** `/guide/hooks-events-reference/` et `/guide/data-privacy/` autorisent le crawl, répondent 200 et déclarent leur propre canonical. GSC les classe pourtant non indexées. Elles totalisent 2 737 impressions sur 90 jours.

**Action:**

- confirmer leur présence dans le sitemap public;
- comparer leur contenu avec les pages proches afin d'identifier un doublon ou une intention déjà couverte;
- ajouter au moins un lien contextuel depuis un hub sémantiquement pertinent;
- corriger le double H1 et les métadonnées trop longues avant toute nouvelle inspection;
- inspecter à nouveau les deux URL dans GSC après déploiement.

**Critères d'acceptation:**

- réponse HTTP 200, indexation autorisée et canonical propre;
- exactement un H1 dans le HTML public;
- au moins un lien de corps pertinent depuis une page indexée;
- URL présente une seule fois dans le sitemap;
- inspection GSC en `PASS`, ou motif précis et reproductible qui justifie une fusion, un `noindex` ou une suppression.

**Stop rule:** si GSC conserve un état non indexé après un recrawl complet et que la page chevauche une page canonique mieux établie, arrêter les retouches de snippet et décider explicitement entre fusion et différenciation.

### 3. Rétablir une mesure GA4 exploitable

**Constat:** GA4 enregistre zéro conversion sur 28 et 90 jours malgré 93 et 359 événements `file_download`, ainsi que 36 et 90 `form_start`. Le trafic tous canaux contient 1 126 sessions depuis Singapour sur 28 jours avec 0,9 % d'engagement.

**Action:**

- écrire la table des objectifs métier et des événements qui doivent compter comme key events;
- valider chaque déclencheur dans DebugView ou le rapport temps réel;
- ventiler le trafic Singapour par source, medium, landing page, heure et campagne;
- recouper avec les logs serveur ou les protections anti-bot avant de filtrer;
- documenter toute règle de filtrage et sa date d'activation.

**Critères d'acceptation:**

- chaque objectif métier possède un événement, un déclencheur et une preuve de test;
- les événements attendus remontent comme key events, ou la décision de ne pas mesurer de conversion est documentée;
- la cause du trafic Singapour est prouvée, ou reste `UNKNOWN` sans filtre destructif;
- les rapports conservent `hostname = cc.bruniaux.com`.

**Rollback:** désactiver toute règle de filtre qui exclut du trafic humain confirmé ou qui modifie les historiques sans journal de changement.

## P1

### 4. Réaligner la page releases sur l'intention SERP

**Constat:** `/releases/` reçoit 7 208 impressions sur 28 jours à la position 8,2 pour 7 clics, soit 0,10 % de CTR. Les requêtes visibles portent sur la version actuelle, l'historique et le changelog.

**Action:**

- distinguer dans le title et l'introduction la version actuelle, l'historique et l'analyse des changements;
- afficher la version courante et la date de mise à jour au-dessus de la ligne de flottaison;
- conserver un angle différent de la documentation officielle;
- tester un seul changement de title et de description à la fois;
- éviter toute projection basée sur le benchmark CTR de l'outil.

**Critères d'acceptation:**

- title de 30 à 60 caractères comme règle de tri, avec la requête principale lisible;
- description de 50 à 160 caractères comme règle de tri;
- version actuelle et date présentes dans le HTML initial;
- aucune duplication avec l'ancienne route;
- comparaison GSC sur deux fenêtres complètes de 28 jours, avec clics, impressions, CTR et position.

**Stop rule:** arrêter ou annuler la variante si le CTR ne progresse pas et que la position se dégrade de plus d'une position moyenne sur une fenêtre comparable.

### 5. Corriger les cinq canonicals Google restés en HTTP

**Constat:** les huit URL HTTP historiques redirigent en 301, mais Google conserve encore cinq canonicals HTTP.

**Action:**

- rechercher les liens absolus `http://cc.bruniaux.com` dans le dépôt, le sitemap, les flux, les données structurées et les documents publics;
- confirmer que chaque chaîne de redirection ne comporte qu'un saut;
- vérifier que les équivalents HTTPS répondent 200 avec un canonical HTTPS;
- retirer toute référence interne HTTP;
- relancer une inspection après correction.

**Population de contrôle:**

- `/cheatsheets/m03-sessions-continuite/`
- `/guide/context-engineering-tools/`
- `/guide/learning-path/01-installation/`
- `/guide/learning-path/04-agents/`
- `/cheatsheets/m06-task-management-system/`

**Critères d'acceptation:**

- les cinq URL HTTP répondent 301 ou 308 en un seul saut;
- les cinq pages HTTPS répondent 200;
- canonical utilisateur et canonical Google sont HTTPS;
- aucun lien interne, sitemap ou JSON-LD ne contient la variante HTTP.

### 6. Supprimer le double H1 sur cinq pages guide

**Constat:** le HTML public présente deux H1 identiques sur cinq pages. Le build local confirme au moins le cas `/guide/architecture/`.

**Pages:**

- `/guide/agent-harness/`
- `/guide/architecture/`
- `/guide/data-privacy/`
- `/guide/hooks-events-reference/`
- `/guide/third-party-tools/`

**Action:**

- identifier la duplication entre le composant Starlight `PageTitle` et le H1 du contenu;
- corriger le gabarit ou les sources concernées;
- ajouter un test qui compte les H1 dans le HTML généré.

**Critères d'acceptation:**

- exactement un H1 par URL dans `dist` et sur le site public;
- le H1 reste identique au sujet principal;
- aucun changement de structure H2 à H6 non intentionnel;
- le build et le test de structure passent.

### 7. Tester un maillage contextuel vers les pages proches de la page 1

**Constat:** 27 pages en position moyenne 11 à 20 ne reçoivent aucun lien de corps depuis les 50 pages sources crawlées. Cette conclusion est limitée à 50 pages sur 410.

**Premier lot:**

| Cible | Impressions 90 j | Position | Source suggérée |
| --- | ---: | ---: | --- |
| `/guide/workflows/code-review/` | 524 | 15,4 | `/guide/` ou un guide de workflow |
| `/compare/claude-code-vs-windsurf/` | 376 | 19,6 | hub `/compare/` ou article comparatif |
| `/compare/claude-code-vs-aider/` | 210 | 18,5 | hub `/compare/` ou article comparatif |
| `/cheatsheets/t04-permissions-glob-patterns/` | 135 | 13,1 | page sécurité ou permissions |
| `/cheatsheets/t06-settings-json/` | 135 | 11,4 | guide configuration |
| `/cheatsheets/m11-hooks-evenements-systeme/` | 91 | 12,5 | référence hooks |

**Action:**

- ajouter un ou deux liens éditoriaux par cible depuis des pages sémantiquement proches;
- employer une ancre descriptive propre au contexte;
- ne pas concentrer tous les liens dans un seul hub;
- recrawler le même panel après déploiement.

**Critères d'acceptation:**

- au moins un `body_inbound` observé par cible;
- aucun lien ajouté uniquement dans le footer ou la navigation;
- aucune ancre identique répétée mécaniquement;
- évolution suivie sur une fenêtre GSC de 28 jours avec position, impressions et clics.

**Stop rule:** ne pas étendre le test aux 27 pages si le premier lot n'obtient ni crawl plus récent, ni amélioration de visibilité, ni signal d'usage.

### 8. Revoir les snippets des pages à fortes impressions

**Cibles initiales:**

- `/guide/third-party-tools/`: 3 130 impressions sur 28 jours, CTR 0,13 %, position 11,9;
- `/guide/architecture/`: 1 155 impressions, CTR 0,43 %, position 21,0;
- `/glossary/`: 1 786 impressions, CTR 1,01 %, position 9,3;
- `/guide/agent-harness/`: 5 959 impressions sur 90 jours, CTR 0,07 %, position 17,7;
- `/guide/hooks-events-reference/`: 2 424 impressions sur 90 jours, zéro clic, position 6,6.

**Action:**

- mapper les requêtes visibles à l'intention de chaque page;
- vérifier le title rendu et le snippet réellement affiché dans les SERP cibles;
- raccourcir title et description quand leur longueur masque le sujet;
- modifier une variable éditoriale par test.

**Critères d'acceptation:**

- requête cible et intention documentées par page;
- title et description uniques;
- aucun changement de position causé par une fusion ou redirection non documentée;
- mesure sur fenêtres comparables avec couverture des requêtes visible explicitée.

## P2

### 9. Ajouter les en-têtes de sécurité

**Constat:** les 12 pages auditées n'exposent ni `X-Frame-Options`, ni `X-Content-Type-Options`, ni `Referrer-Policy`.

**Action:** configurer ces en-têtes au niveau de l'hébergement, après revue de compatibilité avec les embeds, téléchargements et analytics.

**Critères d'acceptation:**

- `X-Content-Type-Options: nosniff` sur les réponses HTML et assets pertinents;
- politique de framing explicite via `X-Frame-Options` ou `Content-Security-Policy frame-ancestors`;
- `Referrer-Policy` documentée;
- vérification sur les 12 URL et sur une ressource statique;
- aucun embed autorisé cassé.

### 10. Rendre les Core Web Vitals mesurables

**Constat:** CrUX et PageSpeed sont `UNKNOWN` faute de `CRUX_API_KEY` et `GOOGLE_API_KEY`. Aucun Lighthouse local n'est installé.

**Action:**

- configurer les clés API en lecture seule dans l'environnement MCP;
- activer les API Chrome UX Report et PageSpeed Insights dans le projet GCP approprié;
- tester `/`, `/quiz/` et `/releases/` sur mobile et desktop;
- conserver séparément les données terrain CrUX et les mesures de laboratoire.

**Critères d'acceptation:**

- chaque page retourne LCP, INP et CLS terrain, ou `not_enough_data`;
- PageSpeed retourne un score et ses opportunités sur mobile et desktop;
- le rapport nomme la date, la stratégie et la source;
- aucun score laboratoire n'est présenté comme donnée terrain.

### 11. Traiter les surfaces secondaires sans surinvestir

**Constat:** Discover et Google News ont zéro impression sur 90 jours. Google Images a 669 impressions et zéro clic. L'impact AI Overviews est `UNKNOWN`.

**Action:**

- ne pas prioriser Discover ou News sans changement éditorial qui justifie ces surfaces;
- vérifier les images des pages déjà prioritaires avant de lancer un chantier image global;
- corriger ou mettre à jour l'outil AI Overviews avant de tirer une conclusion.

**Critères d'acceptation:**

- toute action image est reliée à une page et une requête existantes;
- aucune conclusion AI Overviews sans réponse API valide;
- aucun projet de contenu News ou Discover sans objectif éditorial explicite.

## Ordre de validation

1. Appliquer une seule famille de changements par déploiement.
2. Vérifier le build, les statuts HTTP, les canonicals, le sitemap et le nombre de H1.
3. Refaire les inspections GSC ciblées après que Google a recrawlé les pages.
4. Comparer les performances sur des fenêtres GSC complètes et de même longueur.
5. Consigner le SHA déployé, la date, les URL modifiées et les métriques avant/après.
6. Conserver `UNKNOWN` pour CrUX, AI Overviews et les deltas de juin tant qu'une preuve comparable manque.

## Hors périmètre de cet audit

- aucune modification du contenu ou du code;
- aucune soumission d'URL ou de sitemap;
- aucune suppression de page;
- aucune prédiction de gain de trafic;
- aucun filtrage GA4 appliqué;
- aucune conclusion sur l'indexation des 457 URL à partir du seul échantillon de 41.
