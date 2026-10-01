# Plan d'action SEO, cc.bruniaux.com

**Point de départ :** [audit du 1er octobre 2026](seo-audit-cc-bruniaux-2026-10-01.md). Les données GSC couvrent le 1er au 28 septembre. Ce plan distingue ce que le dépôt peut corriger de ce qui exige une décision sur l'hébergement ou dans GA4.

## Ordre d'exécution

| Réf. | Priorité | Action | Propriétaire | Taille relative | État au 1er octobre 2026 |
| --- | --- | --- | --- | --- | --- |
| A1 | P1 | Rétablir la remontée des événements GA4 existants | Landing | Petite | Pont local corrigé et testé; réception GA4 `UNKNOWN` |
| A2 | P1 | Tester un title releases contenant la version courante | Landing | Petite | HTML local vérifié; effet CTR `UNKNOWN` |
| A3 | P1 | Choisir un hébergement capable d'un vrai 301/308 et des en-têtes | Hébergement/DNS | Grande | Décision externe nécessaire |
| A4 | P1 | Diagnostiquer les trois canoniques Google HTTP restants | Landing, puis GSC | Moyenne | HTTPS inspecté; cause Google `UNKNOWN` |
| A5 | P1 | Contrôler la fraîcheur du contenu source des pages outils et architecture | Guide source | Moyenne à grande | Écarts relevés; correction du dépôt source en attente de périmètre |
| A6 | P1 | Choisir et vérifier les key events GA4 | Propriétaire GA4 | Petite après A1 | Décision métier et réception à vérifier |
| A7 | P2 | Qualifier le trafic Singapour | GA4 et journaux d'accès | Moyenne | Cause `UNKNOWN` |
| A8 | P2 | Établir une mesure de performance mobile | CrUX ou PageSpeed | Petite après accès aux données | Données terrain `UNKNOWN` |

L'ordre A1, A2, A3 permet de corriger les éléments directement actionnables sans attribuer le CTR à une cause inventée. A4 et A5 peuvent être étudiées en parallèle. A6 dépend de la preuve de réception des événements. A7 ne justifie aucun filtre tant que sa cause n'est pas établie.

## A1. Événements GA4 existants

**Preuve, PARTIEL :** le tag `gtag` s'exécute via Partytown, qui relaie `dataLayer.push`. Plusieurs parcours client appellent `gtag` sur le fil principal sous une condition de présence. Le dépôt prouve cette structure, pas la perte effective dans GA4. L'audit GA4 retourne zéro conversion malgré 200 `file_download` et 31 `form_start`; ce zéro ne prouve pas à lui seul la cause.

**Changement :** utiliser le chemin `dataLayer.push` déjà relayé, garder les noms et paramètres de `quiz_complete`, `recap_card_subscribe` et `ebook_subscribe`. Ne pas renommer les événements historiques.

**Critères :** test comportemental avec `gtag` du worker indisponible, parcours quiz et réponses de formulaires réussies vérifiés dans le build ou le navigateur, puis observation distincte dans GA4 DebugView avec hostname `cc.bruniaux.com`. Aucun paramètre ne contient de donnée personnelle. Si DebugView ne reçoit pas l'événement, arrêter la configuration des key events et diagnostiquer le tag, le consentement et la livraison.

**Retour arrière :** revenir uniquement sur la modification du code de diffusion des événements si elle double ou altère les événements, après comparaison avec la dernière version écrite par ce travail et test du parcours historique.

**État local :** le pont `gtag` pousse les événements dans `dataLayer`, sans refaire `gtag('config')`. Si la file refuse un événement, le parcours utilisateur continue. Les tests ciblés et la suite complète passent (322/322); le build contient le pont avant les scripts Partytown. La réception dans GA4 reste à prouver après publication.

## A2. Résultat de recherche des releases

**Preuve, PROUVÉ pour la mesure, HYPOTHÈSE pour le gain :** `/releases/` reçoit 13 320 impressions, 15 clics et une position moyenne de 7,0 sur 28 jours. Les requêtes visibles « latest claude code version » et « claude code version » ont 463 et 328 impressions, sans clic attribué à cette page. Le title actuel ne donne pas la version, alors que le HTML la présente déjà au-dessus du contenu principal.

**Changement :** dériver le title de la première entrée de releases afin d'afficher la version courante sans double saisie; conserver le nom de la page, son canonical HTTPS et les dates de publication utilisées par le sitemap et le JSON-LD. Garder une seule variante de title pour mesurer le test.

**Critères :** test sur la longueur du title, la valeur dynamique et la cohérence du HTML construit; aucune version saisie séparément dans le title. Après publication et recrawl, comparer deux fenêtres complètes et disjointes de 28 jours avec clics, impressions, CTR, position, pays et requêtes visibles. Ne pas annoncer de gain avant cette mesure. Arrêter ou annuler l'essai si le CTR ne progresse pas et que la position se dégrade de plus d'une place sur la fenêtre comparable.

**Retour arrière :** restaurer le title précédent dans la source, reconstruire, puis vérifier le HTML et la date du sitemap.

**État local :** le HTML construit donne `Claude Code Latest Version v2.1.285 | Release History` pour la version actuellement affichée. Le contrôle SEO du build passe. Ce constat ne démontre aucune amélioration du CTR.

## A3. Redirection et en-têtes HTTP

**Preuve, PROUVÉ :** `/guide/claude-code-releases/` répond 200 avec `noindex` et canonical vers `/releases/`. Le déploiement Astro statique sur GitHub Pages ne contrôle pas le statut HTTP de cette page ni les en-têtes globaux. Le [contrat d'hébergement existant](docs/operations/seo-post-deploy.md) définit les réponses attendues, le contrôle public et le retour arrière.

**Décision nécessaire :** placer un proxy HTTP devant Pages ou déplacer le site vers un hébergeur qui applique des règles de réponse. Préparer la configuration, le test de préproduction et le retour arrière pour l'option retenue avant toute bascule DNS.

**Critères :** l'ancienne route donne un 301 ou 308 direct vers `/releases/`; l'accueil, `/releases/` et `/favicon.svg` portent les en-têtes requis par le contrat; téléchargements, analytics, liens externes et embeds autorisés passent le test public. Ne pas ajouter `_redirects` ou `_headers` à Pages : cet hébergement ne les interprète pas.

**Retour arrière :** restaurer la configuration d'origine ou l'ancien chemin DNS enregistré lors de la bascule, puis relancer les mêmes contrôles publics. La destination de ce retour arrière reste `UNKNOWN` avant la décision d'hébergement.

## A4. Canoniques HTTP

**Preuve, PROUVÉ sur cinq URL historiques :** deux variantes ne sont plus indexées; Google choisit encore HTTP pour `/guide/context-engineering-tools/`, `/guide/learning-path/01-installation/` et `/guide/learning-path/04-agents/`. Une réponse HTTP a été vérifiée en 301 direct vers HTTPS. Le dépôt déclare l'origine HTTPS et le contrat du build rejette les URL internes absolues en HTTP.

**Étapes :** vérifier les trois équivalents HTTPS, les réponses 301 et les canoniques déclarés; chercher une référence HTTP dans le sitemap, les données structurées, les flux et les liens de corps du site construit; relever le dernier crawl et le canonical Google pour chaque URL. Corriger uniquement un signal HTTP effectivement trouvé dans la source canonique. Si aucun signal n'est trouvé, conserver le diagnostic `UNKNOWN` et réinspecter après un nouveau crawl.

**Critères :** trois réponses 301 directes vers HTTPS, trois pages HTTPS en 200 avec canonical propre, aucune référence interne HTTP dans les artefacts construits, puis canonical Google HTTPS après recrawl. Le dernier critère dépend de Google et ne se prouve pas au build.

**État de l'inspection :** les trois équivalents HTTPS répondent 200 et se déclarent eux-mêmes canoniques. Search Console confirme aussi le canonical HTTPS pour ces trois URL HTTPS. `/guide/learning-path/01-installation/` est indexée; les deux autres sont dans la catégorie `not_indexed`, avec sélection canonique HTTPS. Le rapport GSC des variantes HTTP reste contradictoire. Aucun changement de canonical dans le dépôt n'est justifié par ces seuls résultats.

## A5. Contenu source et intention de recherche

**Preuve, PARTIEL :** les pages outils et architecture ont respectivement 7 114 et 4 119 impressions pour 7 et 10 clics sur 28 jours. Les requêtes visibles ne couvrent qu'une petite part de leurs impressions. Le contenu est généré depuis le dépôt guide voisin; ses mentions « Last verified » sont anciennes. Un mauvais title ou un contenu obsolète n'est pas encore une cause prouvée du faible CTR.

**Étapes :** confronter les affirmations datées aux sources citées dans le guide, modifier d'abord les deux Markdown canoniques du guide, puis régénérer le contenu landing. Inspecter les résultats affichés pour un petit jeu de requêtes réellement observées avant tout test de title ou de description. Ne pas éditer les Markdown générés et ignorés par Git.

**Critères :** chaque correction de fait a une source et une date de vérification; les pages construites portent le même contenu; les métadonnées restent uniques et cohérentes. Séparer cette vérification éditoriale du test de CTR.

**État de l'inspection :** le guide source contient encore des énoncés figés sur les outils disponibles, une limite de contexte universelle à 200K et l'impossibilité pour les sous-agents de créer des sous-agents. Les documentations officielles consultées indiquent que certaines configurations atteignent 1M et que l'imbrication des sous-agents est désormais possible jusqu'à trois niveaux par défaut. La page des outils tiers mélange une promesse de vérification en juin avec des entrées vérifiées ensuite et un âge de projet devenu faux. Les corrections doivent être apportées dans le dépôt guide canonique, puis synchronisées ici.

## A6. Key events et conversion

**Preuve, PROUVÉ sur la fenêtre GA4 :** aucune conversion enregistrée, alors que les événements `file_download` et `form_start` existent. Le dépôt nomme aussi `quiz_complete`, `recap_card_subscribe` et `ebook_subscribe`, sans preuve antérieure de réception par GA4.

**Étapes :** après A1, produire un événement contrôlé pour chacun des trois parcours et lire DebugView. Le propriétaire GA4 décide lesquels représentent un objectif métier, configure seulement ceux-là comme key events, puis confirme leur remontée sur l'hôte du site. L'origine exacte de `file_download` doit être établie avant de le promouvoir.

**Critères :** décision écrite par événement, occurrence de test visible dans GA4, hostname confirmé, aucun champ personnel transmis. Si le parcours ne reçoit aucun événement, ne pas changer la configuration de conversion.

## A7 et A8. Diagnostics secondaires

**Singapour :** la période récente contient 196 sessions, dont 155 directes et seulement sept engagées dans ce canal. Ventiler par page d'entrée et heure, puis recouper avec les journaux disponibles. Garder le trafic tant qu'aucune origine automatisée n'est prouvée.

**Performance :** CrUX retourne `not_enough_data` pour l'accueil mobile et PageSpeed `missing_key`. Obtenir une mesure mobile par URL ou au niveau origine si elle est disponible. Un score de laboratoire ne remplace pas des données terrain et aucun gain Core Web Vitals ne peut être promis à ce stade.

## Vérifications de clôture

Le dépôt doit passer les tests ciblés, la suite utile, le contrôle Astro, le build de production et le contrôle du HTML construit. Après toute publication autorisée, vérifier le statut de déploiement et le comportement HTTP public. Relever ensuite GSC et GA4 selon leurs délais propres. Les modifications de code, la mise en ligne, le recrawl et l'effet sur les clics sont quatre preuves distinctes.

**Vérification locale :** 322/322 tests, `pnpm check` avec 0 erreur, 0 avertissement et 27 indications, `pnpm build` avec 466 pages et `pnpm check:built-seo` validé. La génération a signalé l'absence du navigateur Puppeteer attendu pour plusieurs diagrammes Mermaid; le build statique a néanmoins terminé. La mise en ligne et ses effets restent `UNKNOWN`.
