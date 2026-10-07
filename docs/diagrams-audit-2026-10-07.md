# Audit des diagrammes, 7 octobre 2026

Les 49 diagrammes des 12 thèmes ont été corrigés dans le guide amont, avec leurs descriptions, Mermaid, variantes ASCII et liens Source. Trois sous-agents ont examiné les 49 entrées et identifié 41 groupes de corrections. Le contraste du tooltip, les métadonnées et la génération de la landing sont corrigés. Le rendu final comporte 49 SVG, 49 variantes ASCII et 49 destinations HTTPS ; la publication de la landing reste à vérifier après son push.

## Corrections appliquées

- Permissions, précédence managed et MCP, hooks, transports, chargement des instructions et couverture du sandbox alignés sur les références primaires actuelles.
- Sous-agents et forks distingués du partage des effets sur les fichiers ; topologies conceptuelles et politiques proposées clairement qualifiées.
- Modèles, efforts, prix API et contraintes des abonnements explicitement contextualisés ; statistiques d'adhérence et garanties de productivité non démontrées retirées.
- Sources et ancres réparées ; passages contradictoires corrigés dans le guide complet, architecture, context engineering et gouvernance. Les six exemples JSON de gouvernance sont valides.
- Index, miroirs et contrats MCP synchronisés. La traduction française conserve sa provenance et porte maintenant le statut décalé ; elle n'a pas été retraduite dans cette correction.
- Destination de chaque entrée extraite de son lien Source, sans mapping parallèle par position. Les 49 entrées ont une destination, y compris les séquences et variantes ASCII.
- Clic SVG corrigé pour les ancres `xlink:href` : la navigation native est empêchée pour garder le tooltip visible. Le test de page construite vérifie ce scénario en CI.
- Compteurs, titre et FAQ dérivés des données. Promesses zéro JavaScript, CLS=0 et affichage instantané retirées.
- Extraction des fences ASCII `text` réparée. Une omission de bloc, un ASCII absent ou un SVG non rendu fait échouer la génération. Le délai du catalogue passe à 120 secondes par diagramme pour accepter les schémas complexes ; les autres appels au renderer gardent leur délai existant.

## Vérifications avant publication

- Liens des diagrammes : 89 URL du dépôt, zéro fichier ou fragment absent ; 62 URL externes sur 38 pages, réponses HTTP 200 et fragments présents. [Résultats externes](diagrams-audit-external-final-2026-10-07.json).
- Index du guide : 954 références, 952 destinations valides et deux compteurs protégés, zéro défaut. Le validateur additionnel vérifie 1 061 ancres dans 94 fichiers, zéro ancre invalide.
- Guide : versions et provenance cohérentes, 11 tests du registre de traductions, 44 tests MCP et contrat de publication MCP passent ; 865 fichiers publics, zéro chemin de poste de travail.
- Landing : contrôle Astro de 310 fichiers, zéro erreur et zéro avertissement de diagnostic, 25 hints ; 363 tests et huit tests de liens passent. Les contrôles incluent les blocs ASCII typés, le maintien des destinations après insertion et les titres dans des exemples fenced.
- Construction complète : 468 pages, 591 documents HTML ; 1 806 destinations locales vérifiées, 1 892 destinations externes hors de ce contrôle ; contrôles SEO et chemins publics passent (1 499 fichiers, zéro chemin de poste de travail).
- Navigation réelle sur la page construite : le clic sur un nœud SVG ouvre le tooltip sans navigation ; sa destination est un lien HTTPS du guide. Hover et focus clavier visible passent dans les deux thèmes.
- Tooltip : la cascade générale imposait un texte orange sur fond orange, contraste 1:1. La classe `btn` exclut désormais ce contrôle de la règle générale. Hover et focus clavier visible passent à 5,18:1 en clair et 7,06:1 en sombre. Le focus conserve le tooltip ouvert.

Les contrôles structurels des ancres ne prouvent pas la pertinence de chaque destination ou le défilement visuel GitHub. Les documents officiels établissent les contrats cités ; cet audit ne rejoue pas tous les comportements de Claude Code ou de chaque serveur MCP.

## État initial conservé pour traçabilité

Les rapports suivants décrivent l'état avant correction, leurs recommandations et leurs sources. Les indications « à corriger » qui s'y trouvent sont historiques.

| Périmètre | Rapport initial | Constats |
| --- | --- | --- |
| Fondations, contexte, configuration, internals | [Audit 01-04](diagrams-audit-core-2026-10-07.md) | 16 diagrammes, 13 groupes |
| MCP, workflows, multi-agents, sécurité | [Audit 05-08](diagrams-audit-workflows-2026-10-07.md) | 19 diagrammes, 16 groupes |
| Coût, adoption, context engineering, gouvernance | [Audit 09-12](diagrams-audit-models-2026-10-07.md) | 14 diagrammes, 12 groupes |
| Liens et SVG publics | [Audit des liens](diagrams-audit-links-2026-10-07.md), [JSON initial](diagrams-audit-links-2026-10-07.json) | 137 URL, 34 fragments absents, aucun fichier en 404 |

L'ancien mapping contenait 40 liens pour 49 diagrammes. La page publique initiale annonçait 48 diagrammes, affichait 49 entrées et 47 SVG, citait 38 SVG et 10 thèmes dans certains textes. Ces valeurs sont remplacées par les données générées.

Commits du guide : `624a6012` (contenu), `37bffc04` (provenance), `2c1674d1` (index et contrats), `cfa8fe46` (validation manuelle), `585c2030` (test de fences). Poussés sur `origin/main`. Les workflows [Index Integrity](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/actions/runs/37635318556) et [Rebuild Guide Exports](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/actions/runs/37635320084) terminent en `startup_failure`, sans job ni log disponible. L'annotation Index Integrity indique que l'événement `push` n'est pas autorisé à déclencher Actions. La politique [Owner-requested workflows only](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/settings/actions/rules/6749) autorise uniquement `workflow_dispatch`. Les workflows sont valides ; aucun test distant n'a démarré dans ces deux runs. Le contrôle manuel [Index Integrity](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/actions/runs/37639428773) passe sur `585c2030`, après réparation d'un test qui dépendait du bloc JSON mal formé. Le cas nested-fence discriminant reste vérifié dans une fixture dédiée. La politique est conservée.
