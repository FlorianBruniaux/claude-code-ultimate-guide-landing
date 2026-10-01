# Plan d'action SEO, cc.bruniaux.com

**Point de départ :** [audit du 1er octobre 2026](seo-audit-cc-bruniaux-2026-10-01.md). Les données GSC couvrent le 1er au 28 septembre. Ce plan distingue ce que le dépôt peut corriger de ce qui exige une décision sur l'hébergement ou dans GA4.

## Ordre d'exécution

| Réf. | Priorité | Action | Propriétaire | Taille relative | État au 1er octobre 2026 |
| --- | --- | --- | --- | --- | --- |
| A1 | P1 | Rétablir la remontée des événements GA4 existants | Landing | Petite | Pont local corrigé; parcours et paramètres GA4 en validation; réception `UNKNOWN` |
| A2 | P1 | Tester un title releases contenant la version courante | Landing | Petite | HTML local vérifié; effet CTR `UNKNOWN` |
| A3 | P1 | Choisir un hébergement capable d'un vrai 301/308 et des en-têtes | Hébergement/DNS | Grande | Décision externe nécessaire |
| A4 | P1 | Diagnostiquer les trois canoniques Google HTTP restants | Landing, puis GSC | Moyenne | Trois 301 directs et HTTPS vérifiés; cause Google `UNKNOWN` |
| A5 | P1 | Contrôler la fraîcheur du contenu source des pages outils et architecture | Guide source | Moyenne à grande | Faits corrigés sur le guide local; publication et synchronisation à vérifier |
| A6 | P1 | Choisir et vérifier les key events GA4 | Propriétaire GA4 | Petite après A1 | Décision métier et réception à vérifier |
| A7 | P2 | Qualifier le trafic Singapour | GA4 et journaux d'accès | Moyenne | Cause `UNKNOWN` |
| A8 | P2 | Établir une mesure de performance mobile | CrUX ou PageSpeed | Petite après accès aux données | Données terrain `UNKNOWN` |

L'ordre A1, A2, A3 permet de corriger les éléments directement actionnables sans attribuer le CTR à une cause inventée. A4 et A5 peuvent être étudiées en parallèle. A6 dépend de la preuve de réception des événements. A7 ne justifie aucun filtre tant que sa cause n'est pas établie.

## Porte de publication issue de la critique

Le site local est neuf commits devant son `origin/main`; son push publierait huit commits antérieurs au correctif SEO. Le build Pages clone le guide distant. La combinaison site local + guide distant du 1er octobre construit 464 pages mais échoue au contrôle de deux liens internes vers les pages FinOps absentes du guide distant. La combinaison avec le guide local intégré construit 466 pages et passe le contrôle des liens lorsque `--guide-root` désigne cette même révision. Publier le site seul n'est donc pas une unité vérifiée.

Avant chaque push, figer les SHA distants, le lot de commits, les deux révisions à construire et le retour arrière. Exécuter les contrôles du workflow sur cette combinaison, puis vérifier le déploiement et les parcours publics. Le guide local a aussi un export bilingue automatique; la traduction française marquée `STALE` bloque son rendu strict. Ne pas présenter ce workflow comme vert ni publier un export français non revu.

## A1. Événements GA4 existants

**Preuve, PARTIEL :** le tag `gtag` s'exécute via Partytown, qui relaie `dataLayer.push`. Plusieurs parcours client appellent `gtag` sur le fil principal sous une condition de présence. Le dépôt prouve cette structure, pas la perte effective dans GA4. L'audit GA4 retourne zéro conversion malgré 200 `file_download` et 31 `form_start`; ce zéro ne prouve pas à lui seul la cause.

**Changement :** utiliser le chemin `dataLayer.push` déjà relayé et garder les noms des événements historiques. Conserver les paramètres non personnels de `quiz_complete` et `recap_card_subscribe`; limiter `ebook_subscribe` à `guide` et `format`. Les valeurs libres de provenance restent destinées à l'API de souscription, pas à GA4.

**Critères :** test comportemental avec `gtag` du worker indisponible, parcours quiz et réponses de formulaires réussies vérifiés dans le build ou le navigateur, puis observation distincte dans GA4 DebugView avec hostname `cc.bruniaux.com`. Aucun paramètre ne contient de donnée personnelle. Si DebugView ne reçoit pas l'événement, arrêter la configuration des key events et diagnostiquer le tag, le consentement et la livraison.

**Retour arrière :** revenir uniquement sur la modification du code de diffusion des événements si elle double ou altère les événements, après comparaison avec la dernière version écrite par ce travail et test du parcours historique.

**État local :** le pont `gtag` pousse les événements dans `dataLayer`, sans refaire `gtag('config')`. Une exception de mesure n'interrompt pas le quiz ou la confirmation d'inscription. Le test injecte un courriel et un jeton dans les UTM; l'événement `ebook_subscribe` ne transmet que `guide` et `format`. La suite complète passe (324/324). La réception dans GA4 reste à prouver après publication.

## A2. Résultat de recherche des releases

**Preuve, PROUVÉ pour la mesure, HYPOTHÈSE pour le gain :** `/releases/` reçoit 13 320 impressions, 15 clics et une position moyenne de 7,0 sur 28 jours. Les requêtes visibles « latest claude code version » et « claude code version » ont 463 et 328 impressions, sans clic attribué à cette page. Le title avant le correctif ne donnait pas la version, alors que le HTML la présentait déjà au-dessus du contenu principal.

**Changement :** dériver le title de la première entrée de releases afin d'afficher la version courante sans double saisie; conserver le nom de la page, son canonical HTTPS et les dates de publication utilisées par le sitemap et le JSON-LD. Garder une seule variante de title pour mesurer le test.

**Critères :** test sur la longueur du title, la valeur dynamique et la cohérence du HTML construit; aucune version saisie séparément dans le title. Après publication et recrawl constaté, enregistrer les changements de version puis comparer deux fenêtres complètes et disjointes de 28 jours avec clics, impressions, CTR et position par requête visible, pays et appareil. Avec seulement 15 clics dans la référence, ne pas attribuer mécaniquement une variation au title ni appliquer un seuil de rollback arbitraire.

**Retour arrière :** restaurer le title précédent dans la source, reconstruire, puis vérifier le HTML et la date du sitemap.

**État local :** le HTML construit donne `Claude Code Latest Version v2.1.285 | Release History` pour la version actuellement affichée. Le contrôle SEO du build passe. Ce constat ne démontre aucune amélioration du CTR.

## A3. Redirection et en-têtes HTTP

**Preuve, PROUVÉ :** `/guide/claude-code-releases/` répond 200 avec `noindex` et canonical vers `/releases/`. Le déploiement Astro statique sur GitHub Pages ne contrôle pas le statut HTTP de cette page ni les en-têtes globaux. Le [contrat d'hébergement existant](docs/operations/seo-post-deploy.md) définit les réponses attendues, le contrôle public et le retour arrière.

**Décision nécessaire :** placer un proxy HTTP devant Pages ou déplacer le site vers un hébergeur qui applique des règles de réponse. Préparer la configuration, le test de préproduction et le retour arrière pour l'option retenue avant toute bascule DNS.

**Critères :** l'ancienne route donne un 301 ou 308 direct vers `/releases/`; l'accueil, `/releases/` et `/favicon.svg` portent les en-têtes requis par le contrat. Exécuter le contrôle HTTP automatisé, puis vérifier séparément téléchargements, analytics, liens externes et embeds autorisés. Ne pas ajouter `_redirects` ou `_headers` à Pages : cet hébergement ne les interprète pas.

**Retour arrière :** restaurer la configuration d'origine ou l'ancien chemin DNS enregistré lors de la bascule, puis relancer les mêmes contrôles publics. La destination de ce retour arrière reste `UNKNOWN` avant la décision d'hébergement.

## A4. Canoniques HTTP

**Preuve, PROUVÉ sur cinq URL historiques :** deux variantes ne sont plus indexées; Google choisit encore HTTP pour `/guide/context-engineering-tools/`, `/guide/learning-path/01-installation/` et `/guide/learning-path/04-agents/`. Une réponse HTTP a été vérifiée en 301 direct vers HTTPS. Le dépôt déclare l'origine HTTPS et le contrat du build rejette les URL internes absolues en HTTP.

**Étapes :** vérifier les trois équivalents HTTPS, les réponses 301 et les canoniques déclarés; chercher une référence HTTP dans le sitemap, les données structurées, les flux et les liens de corps du site construit; relever le dernier crawl et le canonical Google pour chaque URL. Corriger uniquement un signal HTTP effectivement trouvé dans la source canonique. Si aucun signal n'est trouvé, conserver le diagnostic `UNKNOWN` et réinspecter après un nouveau crawl.

**Critères :** trois réponses 301 directes vers HTTPS, trois pages HTTPS en 200 avec canonical propre, aucune référence interne HTTP dans les artefacts construits, puis canonical Google HTTPS après recrawl. Le dernier critère dépend de Google et ne se prouve pas au build.

**État de l'inspection :** les trois variantes HTTP répondent désormais 301 directement vers leur équivalent HTTPS. Les trois équivalents HTTPS répondent 200 et se déclarent eux-mêmes canoniques. Search Console confirme aussi le canonical HTTPS pour ces trois URL HTTPS. `/guide/learning-path/01-installation/` est indexée; les deux autres sont dans la catégorie `not_indexed`, avec sélection canonique HTTPS. Le rapport GSC des variantes HTTP reste contradictoire. Aucun changement de canonical dans le dépôt n'est justifié par ces seuls résultats.

## A5. Contenu source et intention de recherche

**Preuve, PARTIEL :** les pages outils et architecture ont respectivement 7 114 et 4 119 impressions pour 7 et 10 clics sur 28 jours. Les requêtes visibles ne couvrent qu'une petite part de leurs impressions. Le contenu est généré depuis le dépôt guide voisin; ses mentions « Last verified » sont anciennes. Un mauvais title ou un contenu obsolète n'est pas encore une cause prouvée du faible CTR.

**Étapes :** confronter les affirmations datées aux sources citées dans le guide, modifier d'abord les deux Markdown canoniques du guide, puis régénérer le contenu landing. Inspecter les résultats affichés pour un petit jeu de requêtes réellement observées avant tout test de title ou de description. Ne pas éditer les Markdown générés et ignorés par Git.

**Critères :** chaque correction de fait a une source et une date de vérification; les pages construites portent le même contenu; les métadonnées restent uniques et cohérentes. Séparer cette vérification éditoriale du test de CTR.

**État local :** les énoncés figés sur les outils disponibles, le contexte universel à 200K et l'impossibilité de délégation imbriquée ont été corrigés dans le dépôt guide canonique. La page des outils tiers distingue désormais les dates de vérification et n'affirme plus une ancienneté relative devenue fausse. Le guide local est intégré avec son historique distant; le build apparié produit les pages attendues. La publication du guide et l'effet sur les résultats de recherche restent à vérifier.

## A6. Key events et conversion

**Preuve, PROUVÉ sur la fenêtre GA4 :** aucune conversion enregistrée, alors que les événements `file_download` et `form_start` existent. Le dépôt nomme aussi `quiz_complete`, `recap_card_subscribe` et `ebook_subscribe`, sans preuve antérieure de réception par GA4.

**Étapes :** après A1, produire un événement contrôlé pour chacun des trois parcours et lire DebugView. Le propriétaire GA4 décide lesquels représentent un objectif métier, configure seulement ceux-là comme key events, puis confirme leur remontée sur l'hôte du site. L'origine exacte de `file_download` doit être établie avant de le promouvoir.

**Critères :** décision écrite par événement, occurrence de test visible dans GA4, hostname confirmé, aucun champ personnel transmis. Si le parcours ne reçoit aucun événement, ne pas changer la configuration de conversion.

## A7 et A8. Diagnostics secondaires

**Singapour :** la période récente contient 196 sessions, dont 155 directes et seulement sept engagées dans ce canal. Ventiler par page d'entrée et heure, puis recouper avec les journaux disponibles. Garder le trafic tant qu'aucune origine automatisée n'est prouvée.

**Performance :** CrUX retourne `not_enough_data` pour l'accueil mobile et PageSpeed `missing_key`. Obtenir une mesure mobile par URL ou au niveau origine si elle est disponible. Un score de laboratoire ne remplace pas des données terrain et aucun gain Core Web Vitals ne peut être promis à ce stade.

## Vérifications de clôture

Le dépôt doit passer les tests ciblés, la suite utile, le contrôle Astro, le build de production et le contrôle du HTML construit. Après toute publication autorisée, vérifier le statut de déploiement et le comportement HTTP public. Relever ensuite GSC et GA4 selon leurs délais propres. Les modifications de code, la mise en ligne, le recrawl et l'effet sur les clics sont quatre preuves distinctes.

**Vérification locale :** 324/324 tests et `pnpm check` avec 0 erreur, 0 avertissement et 27 indications après correction des parcours. Le build apparié site et guide local produit 466 pages, et le contrôle SEO du HTML passe. La génération locale signale l'absence du navigateur Puppeteer attendu pour plusieurs diagrammes Mermaid; le build statique termine avec les replis prévus. La mise en ligne, la réception GA4 et les effets sur les clics restent `UNKNOWN`.
