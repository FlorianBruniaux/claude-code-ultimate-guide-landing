# Audit des diagrammes 01 à 04, 7 octobre 2026

16 diagrammes examinés intégralement, avec leurs descriptions, variantes Mermaid et ASCII, notes de version et liens `Source`. L'audit relève quatre erreurs à traiter en priorité: garanties d'isolation des sous-agents, priorité de configuration, partage du cache et recommandation de stocker des clés API dans les instructions. Aucun fichier du guide amont n'a été modifié.

`Confirmé` signifie documenté dans une source officielle consultée. `Réfuté` signifie contredit par cette source ou par la structure des documents ciblés. `Non vérifié` conserve les détails internes, seuils et dates sans preuve primaire accessible. Un contrôle documentaire ne prouve pas le comportement d'une installation précise ni de la production.

## Couverture complète

| Fichier | Diagramme | Verdict sur le contenu | Constat et correction |
|---|---|---|---|
| `01-foundations.md` | 4-layer model | Modèle conceptuel à qualifier | Les catégories de contexte sont utiles; l'ordre fixe en quatre étapes et leur injection complète à chaque appel sont non vérifiés. F1. |
| `01-foundations.md` | 9-step workflow pipeline | Modèle conceptuel à qualifier | Le cycle outils/résultats est cohérent; neuf étapes obligatoires pour chaque requête sont non vérifiées. F2. |
| `01-foundations.md` | Should I use Claude Code? | Conseil éditorial | L'arbre est une recommandation, pas une limite produit. Le seuil `>30 min` ne constitue pas une mesure. F3. |
| `01-foundations.md` | Permission modes comparison | Réfuté | Comparaison incomplète et comportements Plan/dontAsk incorrects. F4. |
| `02-context-and-sessions.md` | Context management zones | Non vérifié; contradiction interne | Seuils présentés comme des états du produit, sans preuve. Auto-compact à 80% dans zone 85-100%. F5. |
| `02-context-and-sessions.md` | Memory hierarchy (6 types) | Taxonomie éditoriale; conseil risqué | Mélange instructions, historique et état externe; recommandation clés API à supprimer. F6. |
| `02-context-and-sessions.md` | Saving and resuming state | Réfuté dans sa généralité | Omet la reprise native de l'historique et présente CLAUDE.md comme seul moyen persistant. F7. |
| `02-context-and-sessions.md` | Fresh context anti-pattern | Conseil partiellement confirmé | Sessions ciblées utiles; perte totale au redémarrage et seuil fixe 75% à corriger. F5/F7. |
| `03-configuration-system.md` | Configuration precedence | Réfuté | Managed absent, env en niveau universel, local et partagé confondus, instructions mélangées aux réglages. F8. |
| `03-configuration-system.md` | Skills vs commands vs agents | Réfuté en partie | Commands et skills sont unifiés; périmètres présentés trop rigides. F9. |
| `03-configuration-system.md` | Agent lifecycle & isolation | Réfuté | Contexte distinct ne signifie pas absence d'effets sur les fichiers/services. F10. |
| `03-configuration-system.md` | Hooks event pipeline | Réfuté en partie | Événements de session et de tour confondus, PermissionRequest inconditionnel, retour exit 2 erroné. F11. |
| `04-architecture-internals.md` | The master loop | Concept général confirmé; détails non vérifiés | Boucle outils/résultats utile; noms internes, concurrence 10 et dix raisons terminales sans source primaire accessible. F2. |
| `04-architecture-internals.md` | Tool categories & selection | Inventaire ancien | `Task`, `LS`, `MultiEdit` et `TodoWrite` demandent un traitement actualisé. F12. |
| `04-architecture-internals.md` | System prompt assembly | Non vérifié; cache partagé réfuté pour l'API publique | Instructions privées montrées dans zone globale cross-org; ordre et marqueur interne non vérifiés. F13. |
| `04-architecture-internals.md` | Sub-Agent context isolation | Réfuté | Forks et effets partagés absents; « completely isolated » est une garantie excessive. F10. |

## Constats et corrections proposées

### F1, P2: quatre couches présentées comme un contrat interne

La description affirme une augmentation fixe à chaque requête; Mermaid et ASCII rangent CLAUDE.md dans le prompt système et impliquent le chargement de tous les outils. La documentation distingue les composants du contexte, avec instructions et rappels dans la conversation; les définitions MCP sont différées par défaut. L'assemblage exact n'est pas démontré. [Fonctionnement de Claude Code](https://code.claude.com/docs/en/how-claude-code-works#context-claude-code-adds-on-its-own).

Correction: renommer « Simplified context model », remplacer la chaîne ordonnée par des entrées convergeant vers la requête, préciser « relevant context / available or deferred tools ». Appliquer au schéma ASCII et à la description. `Task` peut devenir `Agent` dans l'exemple d'outils.

### F2, P2: pipeline et boucle présentés avec une précision non démontrée

Le cycle modèle/outils/résultats est documenté; les neuf étapes, `queryLoop()`, `StreamingToolExecutor`, dix exécutions simultanées et dix raisons de fin ne disposent ici d'aucune preuve primaire versionnée. L'étiquette « source-confirmed (2026-03-31) » ne fournit pas le fichier source inspectable. [Boucle agentique documentée](https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop).

Correction Mermaid/ASCII: « Simplified workflow »; outil disponible puis résultats réinjectés, permissions avant exécution, parallélisme seulement lorsque applicable. Retirer les chiffres et noms internes des notes, ou les rattacher à une preuve publique versionnée avec limitation historique.

### F3, P3: décision éditoriale trop absolue

`>30 min` et « Best choice » ne sont pas des propriétés produit validées. L'arbre ne nomme pas le coût, les accès ou les critères de réussite. Correction des deux variantes: « author heuristic », « Claude Code can be suitable », remplacer le seuil arbitraire par besoin d'accès au dépôt et d'itérations outils. Aucun diagramme 01-04 ne cite un modèle Claude précis à déprécier.

### F4, P2: modes incomplets et règles de permission incorrectes

Les six modes actuels comprennent `auto`. Plan autorise des commandes shell de lecture; `dontAsk` refuse les appels nécessitant une demande, tandis que les lectures autorisées continuent. `acceptEdits` permet aussi des opérations de fichiers courantes. `bypassPermissions` conserve des exceptions. [Modes de permission officiels](https://code.claude.com/docs/en/permissions#permission-modes).

Correction Mermaid/ASCII: ajouter `auto` avec contrôle par classificateur; remplacer « shell blocked » par « read-only exploration », « ALL auto-denied » par « calls requiring a prompt denied », « ALL auto-approved » par « permission prompts skipped; documented exceptions apply ». Borner les lectures aux répertoires autorisés. Retirer « #1 safety mistake », classement non sourcé. Mettre à jour description et source vers `#14-permission-modes`.

### F5, P2: zones de contexte présentées comme limitations natives

La perte de qualité à contexte chargé et la gestion proactive sont documentées; les zones 0/50/75/85, « essential ops only », réduction automatique des capacités et compaction universelle à 80% ne sont pas établies. Le dessin contredit son propre seuil. [Gestion du contexte](https://code.claude.com/docs/en/best-practices#manage-context-aggressively).

Correction Mermaid/ASCII: qualifier toutes les zones de recommandations de l'auteur, ou remplacer les pourcentages par observer `/context`, terminer une tâche, compacter ou changer de session selon le contenu. Retirer « all tools active » contre « essential ops only ». Ne pas inventer un nouveau seuil universel.

### F6, P1: clés API dans CLAUDE.md et hiérarchie trompeuse

Le nœud global recommande « API keys » dans un fichier chargé au contexte. Les credentials disposent de mécanismes de stockage distincts; CLAUDE.md et auto memory sont des instructions/notes, pas des coffres de secrets. [Stockage des credentials](https://code.claude.com/docs/en/security#additional-safeguards), [mémoire et instructions](https://code.claude.com/docs/en/memory#claudemd-vs-auto-memory).

Correction Mermaid: « Global preferences, no secrets »; ASCII: même limite explicite. Présenter les scopes des instructions séparément de l'historique et de l'état externe, sans priorité linéaire prétendue. Ajouter scopes managed et rules si le diagramme prétend couvrir les instructions. Auto memory est confirmé; sa date d'introduction `v2.1.59+` reste non vérifiée ici. L'état MCP ne peut pas être déclaré universellement session-only: la persistance dépend du serveur.

### F7, P2: historique de session prétendument perdu

Un lancement neuf a un contexte neuf, mais Claude Code conserve les conversations et propose `claude --continue`, `claude --resume` et `/resume`. « Only CLAUDE.md content persists » et « restart loses all context » induisent une perte inexistante comme règle générale. [Reprise des conversations](https://code.claude.com/docs/en/common-workflows#resume-previous-conversations).

Correction Mermaid/ASCII: créer deux branches: reprendre une session avec historique sauvegardé; démarrer une nouvelle session avec instructions et mémoire persistantes. Remplacer l'écriture de l'état temporaire dans CLAUDE.md par un fichier de passage ou la reprise native. Un fichier de passage résume un état, il ne garantit pas la restauration complète.

### F8, P1: CLI prétendument supérieur aux politiques managed

Le diagramme dit « overrides everything », omet les politiques organisationnelles et fusionne settings.local/shared. L'ordre documenté est managed, arguments CLI, local projet, partagé projet, utilisateur. Les variables d'environnement se résolvent par clé, pas comme un étage universel; CLAUDE.md relève des instructions. [Priorité des réglages](https://code.claude.com/docs/en/settings#settings-precedence).

Correction Mermaid/ASCII: cinq niveaux documentés, defaults en fallback hors pile, CLAUDE.md dans un schéma séparé. Remplacer `CLAUDE_MODEL` par `ANTHROPIC_MODEL`; `CLAUDE_CONFIG` n'est pas documenté, le nom pour le répertoire est `CLAUDE_CONFIG_DIR`. Ajouter un renvoi aux exceptions plutôt qu'une garantie universelle. [Variables officielles](https://code.claude.com/docs/en/env-vars#precedence).

### F9, P2: distinction commands/skills devenue historique

`.claude/commands/name.md` et `.claude/skills/name/SKILL.md` créent le même slash command; les fichiers de commands restent compatibles. Leur scope peut être utilisateur ou projet, et les skills peuvent aussi être déclenchées par Claude. [Skills et compatibilité commands](https://code.claude.com/docs/en/skills).

Correction Mermaid/ASCII: montrer deux formats compatibles d'une capability plutôt que deux scopes exclusifs. Subagents: outil `Agent`, prompt propre et outils configurables; ne pas présenter « own CLAUDE.md » comme obligatoire. Les projets peuvent partager des skills et commands, sans rendre toute installation locale automatiquement portable.

### F10, P1: isolement du contexte confondu avec isolement des effets

Les sous-agents ordinaires démarrent avec un contexte distinct; les forks héritent de la conversation. Les agents peuvent agir sur les mêmes fichiers/services; `isolation: worktree` fournit un checkout séparé pour les fichiers, sans isoler toute API externe. `Task` a été renommé `Agent` en v2.1.63, avec alias compatibles dans les réglages. [Sous-agents, forks et isolation](https://code.claude.com/docs/en/sub-agents#how-forks-differ-from-other-subagents).

Correction des deux diagrammes Mermaid et ASCII: distinguer « separate context window » de « shared filesystem and external effects ». Montrer la branche fork/context inherited et l'option worktree. Supprimer « fully isolated execution », « no side-effects leaked back » et « no state sharing ». Garder le résumé final qui retourne au parent sans prétendre annuler les opérations réalisées. Harmoniser la description de `03` qui parle à la fois de copie du contexte et d'absence d'historique.

### F11, P2: cycle hooks incorrect

`Stop` termine une réponse; `SessionEnd` termine une session. `PermissionRequest` intervient seulement lorsqu'une demande est nécessaire. Un exit 2 à `UserPromptSubmit` bloque le prompt et affiche l'erreur à l'utilisateur. `InstructionsLoaded` peut aussi survenir pendant la session. Les cinq types cités existent. [Cycle et contrats des hooks](https://code.claude.com/docs/en/hooks#hook-lifecycle).

Correction Mermaid/ASCII: séparer tours et session, rendre PermissionRequest conditionnel, remplacer « feedback to Claude » par refus utilisateur, séparer InstructionsLoaded asynchrone. Ajouter branche tool failure si la vue prétend être complète. HTTP `v2.1.63+`, InstructionsLoaded `v2.1.69+` et date d'ajout « 2026-06-03 » restent historiques non vérifiés ici; une date d'édition ne prouve pas une date d'introduction produit.

### F12, P2: ancien inventaire d'outils présenté comme actuel

`Agent` est le nom actuel. `LS` et `MultiEdit` ne figurent pas dans l'inventaire officiel consulté; l'absence ne prouve pas leur date de suppression. `TodoWrite` est désactivé par défaut dans les sessions qui utilisent les nouveaux outils Task. La disponibilité varie avec le modèle et la configuration. [Inventaire officiel des outils](https://code.claude.com/docs/en/tools-reference).

Correction Mermaid/ASCII: retirer LS/MultiEdit, renommer Task/Agent, qualifier les catégories de choix pédagogique; TaskCreate/TaskUpdate et outils récents ne sont pas un inventaire exhaustif. Pointer vers la référence officielle plutôt que figer un total « six catégories » comme taxonomie native.

### F13, P1: partage cross-org affirmé sans contrat applicable

Mermaid place CLAUDE.md privé dans une zone partagée entre utilisateurs; ASCII dit « cross-org ». Le contrat public de prompt caching isole les organisations et, selon le provider, les workspaces. Aucune preuve consultée n'établit que les instructions privées de Claude Code bénéficient d'une exception. Le marqueur interne cité ne démontre ni portée, ni ordre, ni règles de confidentialité. [Isolation du cache Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#cache-storage-and-sharing).

Correction Mermaid/ASCII: retirer shared/global/cross-org et la garantie de zones exactes. Dessiner « stable prefix / changing context, conceptual » et pointer vers le contrat du provider. Garder les détails `SYSTEM_PROMPT_DYNAMIC_BOUNDARY`, `cacheScope` et recomposition à chaque tour uniquement avec preuve primaire versionnée, comme observation historique, jamais comme garantie de confidentialité actuelle.

## Contrôle des liens Source

16 liens principaux contrôlés contre les titres et ancres des documents amont présents. Les fichiers existent. Trois fragments correspondent: `#quick-start`, `#context-management`, `#71-the-event-system`. Treize fragments sont absents. Ce contrôle structurel ne valide pas l'état HTTP ni le DOM de production; l'audit central des liens du site couvre cette couche.

| Fichier / diagramme | Fragment actuel | Fragment proposé dans le même document |
|---|---|---|
| 01 / 4-layer model | `#how-claude-code-works` | `#the-master-loop`, puis référence officielle F1 |
| 01 / pipeline | `#getting-started` | `#12-first-workflow` |
| 01 / decision tree | `#quick-start` | Correspondance trouvée; conserver |
| 01 / permissions | `#permission-system` | `#14-permission-modes` |
| 02 / zones | `#context-management` | Correspondance trouvée; `#22-context-management` plus précis |
| 02 / memory | `#memory-system` | `#31-memory-files-claudemd` |
| 02 / continuity | `#session-management` | `#session-continuation-and-resume` |
| 02 / fresh context | `#context-best-practices` | `#22-context-management` |
| 03 / precedence | `#configuration` | `#34-precedence-rules`, avec référence officielle F8 |
| 03 / extensibility | `#extensibility` | `#51-understanding-skills`, avec référence officielle F9 |
| 03 / agent lifecycle | `#sub-agents` | `#41-what-are-agents` |
| 03 / hooks | `#71-the-event-system` | Correspondance trouvée; conserver |
| 04 / master loop | `#master-loop` | `#1-the-master-loop` |
| 04 / tools | `#tools` | `#2-the-tool-arsenal` |
| 04 / system prompt | `#system-prompt` | `#system-prompt-contents` |
| 04 / subagents | `#sub-agents` | `#4-sub-agent-architecture` |

Les références `(line ~...)` sont devenues impropres à la navigation et doivent être supprimées après correction des fragments. `04` cite aussi `#tools` dans son second renvoi, donc les treize liens principaux absents ne représentent pas tous les liens défectueux. Les liens `click` intégrés aux nœuds sont examinés dans l'audit central.

## Ordre des corrections amont

1. Corriger F6/F8/F10/F13 dans les descriptions, Mermaid et ASCII, puis aligner les sources pédagogiques concernées.
2. Corriger F4/F5/F7/F9/F11/F12, avec libellés conceptuels explicites pour F1/F2/F3.
3. Remplacer les fragments Source et retirer les numéros de ligne approximatifs; maintenir les URL officielles près des comportements dépendants du produit.
4. Régénérer les données landing depuis le guide, contrôler la parité Mermaid/ASCII et vérifier la navigation réelle.

Skills used: flow-lean
