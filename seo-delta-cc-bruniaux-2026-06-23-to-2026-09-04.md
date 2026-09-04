# Delta SEO, 23 juin au 4 septembre 2026

## Verdict

Le delta vérifiable compte 1 constat `RESOLVED`, 3 `PERSISTING`, aucun `REGRESSED` prouvé et 4 `UNKNOWN`.

Le rapport du 23 juin contient deux contradictions arithmétiques. Il annonce 72 clics et 4 691 impressions sur 28 jours, mais attribue 123 clics à `/quiz/`, 31 401 impressions à `/releases/` et 5 943 impressions à `/glossary/`. Il annonce aussi 9 195 impressions sur 90 jours, alors que `/guide/data-privacy/` en aurait 12 919. Les deltas qui dépendent de ces valeurs ne peuvent pas être présentés comme fiables.

## Scorecard

| Constat du 23 juin | Statut | Preuve au 4 septembre | Limite |
| --- | --- | --- | --- |
| `sitemap-index.xml` absent de GSC | RESOLVED | Soumis le 25 juin, relu le 2 septembre, 457 URL, 0 erreur, 0 avertissement | Le nombre total d'URL indexées reste UNKNOWN |
| Faible rendement de `/releases/` | UNKNOWN | 7 clics, 7 208 impressions, CTR 0,10 %, position 8,2 sur 28 jours | Baseline de juin incohérente |
| `/guide/data-privacy/` à 0 clic | UNKNOWN | 0 clic, 313 impressions, position 9,9 sur 90 jours; actuellement non indexée | Baseline de juin incohérente |
| Huit variantes HTTP indexées | PERSISTING | 3 consolidées vers HTTPS; 5 gardent un canonical Google HTTP | Borné aux huit URL historiques |
| Cannibalisation releases | PERSISTING sur 90 jours | 8 requêtes version ou releases montrent plusieurs URL | Les canonicals actuels et les lignes 28 jours indiquent une consolidation en cours |
| Dépendance aux requêtes contenant Claude | UNKNOWN | 93,8 % des clics visibles sur 28 jours suivent la règle | Les requêtes visibles couvrent 25,3 % des clics exacts |
| Faible rendement de `/glossary/` | UNKNOWN | 18 clics, 1 786 impressions, CTR 1,01 %, position 9,3 sur 28 jours | Baseline de juin incohérente et ancien GA4 contaminé |
| Quatre anciens `FETCH_ERROR` | PERSISTING | `/guide/workflows/` est indexée; 3 slugs restent sans état exploitable | Les 3 slugs peuvent être des routes inexistantes |

## 1. Sitemap index

**Statut: RESOLVED, PROUVÉ.**

GSC retourne maintenant `https://cc.bruniaux.com/sitemap-index.xml` comme unique sitemap déclaré. Il a été soumis le 25 juin 2026, contient 457 URL et ne présente ni erreur ni avertissement. Le build local produit le même nombre d'URL.

Le champ `indexed=0` de l'API sitemap contredit les inspections individuelles. Le nombre total d'URL indexées reste donc `UNKNOWN`.

## 2. Releases

**Statut du delta: UNKNOWN. Problème actuel: PROUVÉ.**

Du 5 août au 1er septembre, `/releases/` reçoit 7 clics et 7 208 impressions à la position 8,2, soit 0,10 % de CTR. Sur 90 jours, la page reçoit 33 clics et 57 452 impressions.

L'ancienne route `/guide/claude-code-releases/` est maintenant `noindex` et canonicalisée vers `/releases/`, mais elle répond toujours HTTP 200. Les données 90 jours contiennent encore 36 255 impressions pour la variante HTTPS et 13 657 pour l'ancienne variante HTTP. Ces données incluent l'historique de la période et ne prouvent pas un conflit actif au 4 septembre.

## 3. Data privacy

**Statut du delta: UNKNOWN. État actuel: PROUVÉ.**

`/guide/data-privacy/` totalise 313 impressions, zéro clic et une position de 9,9 sur 90 jours. L'inspection GSC la classe non indexée malgré un crawl réussi, une indexation autorisée et des canonicals Google et utilisateur identiques. Le dernier crawl remonte au 6 mai 2026.

## 4. Variantes HTTP

**Statut: PERSISTING, PROUVÉ sur les huit URL historiques.**

Toutes les variantes répondent en 301 vers HTTPS. Trois sont maintenant consolidées vers un canonical HTTPS:

- `/guide/workflows/iterative-refinement/`
- `/guide/third-party-tools/`
- `/guide/claude-code-releases/`

Cinq gardent un canonical Google HTTP:

- `/cheatsheets/m03-sessions-continuite/`
- `/guide/context-engineering-tools/`
- `/guide/learning-path/01-installation/`
- `/guide/learning-path/04-agents/`
- `/cheatsheets/m06-task-management-system/`

Le problème passe de 8 cas historiques à 5 cas actuels dans la même population.

## 5. Cannibalisation releases

**Statut: PERSISTING sur 90 jours, PARTIEL au présent.**

Huit requêtes liées aux releases ou aux versions montrent plusieurs URL sur 90 jours. Elles cumulent 1 131 impressions visibles et aucun clic. La route historique est toutefois `noindex` avec canonical vers `/releases/`, et elle ne figure plus dans les lignes page des 28 derniers jours. Une fenêtre page-requête de 28 jours sera nécessaire pour prouver la fin du conflit.

## 6. Dépendance aux requêtes Claude

**Statut du delta: UNKNOWN. Risque actuel: PARTIEL.**

Sur 28 jours, 90 des 96 clics associés à une requête visible contiennent `claude`, `anthropic` ou un identifiant du site. Ces 96 clics ne représentent que 25,3 % des 380 clics exacts. La concentration du sous-ensemble visible est prouvée; sa part dans tous les clics ne l'est pas.

## 7. Glossary

**Statut du delta: UNKNOWN. Métriques actuelles: PROUVÉES.**

`/glossary/` reçoit 18 clics et 1 786 impressions sur 28 jours, soit 1,01 % de CTR à la position 9,3. Elle est indexée. En GA4 filtré, elle reçoit 69 sessions organiques sur 90 jours avec 15,9 % d'engagement. Les valeurs paraissent meilleures que celles publiées en juin, mais la baseline ne permet pas de déclarer le problème résolu.

## 8. Anciens FETCH_ERROR

**Statut: PERSISTING sur les quatre slugs historiques.**

| URL | Juin | 4 septembre |
| --- | --- | --- |
| `/guide/hooks/` | FETCH_ERROR | aucun crawl ni canonical |
| `/guide/agents/` | FETCH_ERROR | aucun crawl ni canonical |
| `/guide/workflows/` | FETCH_ERROR | indexée, crawl réussi, canonical propre |
| `/guide/mcp-servers/` | FETCH_ERROR | aucun crawl ni canonical |

Les trois slugs restants peuvent être inexistants. Le résultat ne prouve pas un problème sur les routes canoniques qui les remplacent.

## Frontière de preuve

- `PROUVÉ`: état actuel du sitemap, des 41 URL inspectées et des huit variantes HTTP historiques.
- `PARTIEL`: cannibalisation mesurée sur 90 jours, dépendance aux requêtes visibles, conclusions hors échantillon.
- `UNKNOWN`: deltas fondés sur les totaux incohérents de juin, nombre total d'URL indexées, cause des variations.
- Aucun `REGRESSED` n'est prouvé avec une baseline comparable.
