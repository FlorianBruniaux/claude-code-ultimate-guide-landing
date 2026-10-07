# Audit des diagrammes MCP, workflows, multi-agents et sécurité

Date : 7 octobre 2026. Périmètre : 19 diagrammes des thèmes 05 à 08, descriptions, Mermaid, ASCII et liens Source. Lecture intégrale des quatre fichiers du guide. Aucun fichier du guide modifié. Les corrections ci-dessous sont proposées, leur exécution reste à faire.

Les défauts prioritaires concernent les garanties de sécurité, l'ordre de configuration MCP, les chiffres de l'AI Fluency Index et la commande CI. Les patterns de travail restent utilisables, mais leurs descriptions doivent distinguer recommandations, fonctions natives et résultats mesurés.

## Couverture complète

Chaque ligne couvre la description, le Mermaid et l'ASCII. « Confirmé » valide le mécanisme cité, pas une garantie de performance ou de sécurité. « Réfuté » signale une contradiction observable avec une source primaire. « Non vérifié » conserve une limite de preuve.

| Fichier / diagramme | Verdict | Gravité | Résultat et action |
|---|---|---|---|
| 05 / MCP server ecosystem map | Réfuté en partie | P2 | Mélange serveurs de référence et serveurs officiels de fournisseurs. `git-mcp` ne nomme pas précisément le serveur de référence `mcp-server-git`. GitHub figure deux fois sans distinguer le serveur actuel et l'ancien serveur archivé. Semgrep a migré vers son binaire officiel. Refaire les catégories par mainteneur. |
| 05 / MCP architecture: Client-Server protocol | Réfuté en partie | P1 | SSE historique présenté sans Streamable HTTP. Requête `{tool, params}` inexacte si comprise comme format réseau. `CC2` ne participe à aucun flux. F1. |
| 05 / MCP rug pull attack chain | Mécanisme possible confirmé ; superlatif non vérifié | P2 | Injection par serveur non fiable possible. Le scénario dessine une injection initiale, pas un changement après établissement de confiance. Exfiltration dessinée dans la mauvaise direction et sans échec des permissions. F2. |
| 05 / MCP config hierarchy | Réfuté | P1 | Local précède project, contrairement au schéma. `--mcp-config` ne signifie pas ignorer toute autre configuration. Plugins et connecteurs absents. Tooltips de B/C décalés. F3. |
| 06 / TDD red-green-refactor with Claude | Pattern confirmé ; garantie non vérifiée | P2 | Cycle RED/GREEN/REFACTOR cohérent. « ensures tests actually verify behavior » dépasse ce que le cycle prouve. Échec inattendu et fonctionnalité déjà existante ne signifient pas automatiquement test trop faible. F4. |
| 06 / Spec-First development pipeline | Confirmé comme pattern proposé | P3 | Le playbook décrit bien déclencheur, `intent.md` et triage par owner/on-call. Prévenir la dérive n'est pas une garantie ; l'automatisation exige un déclencheur configuré. Les citations courtes correspondent à la source. |
| 06 / Plan-Driven workflow with annotation | Confirmé en partie | P2 | Séparation exploration/plan/implémentation valide. Le nombre fixe de pressions `Shift+Tab × 2` dépend du mode initial. Dire « jusqu'à Plan » et vérifier ensuite. F5. |
| 06 / Iterative refinement loop | Confirmé comme méthode | P3 | Feedback ciblé et comparaison avant/après cohérents. La qualité « good enough » reste un jugement, pas une vérification automatique. Aucun chiffre ni modèle daté à corriger. |
| 06 / AI Fluency: High vs low fluency paths | Réfuté | P1 | 30/70 utilisateurs inventé ; 5.6× concerne questionner le raisonnement, pas défauts trouvés ; corrélation transformée en causalité. F6. |
| 07 / Agent teams: 3 orchestration topologies | Pattern conceptuel ; qualification native trompeuse | P2 | Orchestrateur, pipeline et routeur sont des patterns. Le titre ne doit pas suggérer trois modes natifs garantis d'Agent Teams. Indiquer expérimental, désactivé par défaut et coût de coordination. F7. |
| 07 / Git worktree multi-instance pattern | Isolation confirmée ; « No conflicts » réfuté | P2 | Arbres de travail séparés, références partagées. Les merges peuvent entrer en conflit. Les chemins créés et chemins montrés ne correspondent pas. F8. |
| 07 / Dual-Instance planning pattern (Jon Williams) | Pattern possible ; attribution et garantie non vérifiées | P2 | Planner sans outils possible si la restriction est effectivement configurée. Deux sessions seules ne la garantissent pas. Fournir documents en entrée et définir l'allowlist ; « full context » dépend du transfert réel. F9. |
| 07 / Boris Cherny horizontal scaling pattern | Pattern confirmé ; ~10× non vérifié | P2 | Paralléliser tâches indépendantes possible. Aucune mesure primaire consultée n'établit le gain ~10× illustré. Coût et coordination réduisent le gain. Retirer le chiffre. F10. |
| 07 / Multi-Instance decision matrix | Obsolète en partie | P2 | `Task` renommé `Agent` depuis v2.1.63, alias historique compatible. Seuil 4+ arbitraire. Choisir selon isolation/communication/dépendances, puis taille. F11. |
| 07 / Cross-Session messaging: Discovery & delivery | Mécanisme confirmé ; branche hold réfutée | P2 | Transport local versus intermachine correct. `hold` explicite ne nécessite pas cliquer Approve : une valeur `accept` ultérieure libère les messages. Le dialogue existe pour certains défauts de modes. F12. |
| 08 / Security 3-layer defense model | Réfuté en partie | P1 | CLAUDE.md n'est pas une frontière de sécurité ; `.claudeignore` non établi comme fonctionnalité native ; bypass lié à isolation et non à l'étiquette CI. Journal « complete » et confinement final garantis non vérifiés. F13. |
| 08 / Sandbox decision tree | Réfuté en partie | P1 | Sandbox natif aussi disponible sur Linux/WSL2 ; sandbox Bash ne contient pas MCP/hooks. `acceptEdits` réduit les prompts d'édition. Windows natif absent. F14. |
| 08 / The verification paradox | Conseil confirmé ; absolus non vérifiés | P2 | Demander une opinion n'est pas une preuve. Claude peut toutefois exécuter des checks déterministes. Tests/review/static analysis verts n'établissent pas à eux seuls « Safe to deploy ». F15. |
| 08 / CI/CD integration pipeline | Commande non établie ; pattern confirmé | P1 | `--print` documenté ; `--headless` absent de la référence CLI actuelle. Un prompt ne garantit ni parallélisme ni code de sortie fiable de chaque outil. Faire porter les gates par CI. F16. |

## Corrections précises à appliquer aux deux rendus

### F1. Transport et requête MCP

La spécification actuelle définit stdio et Streamable HTTP ; SSE peut être utilisé pour les réponses Streamable HTTP, ce qui diffère du transport SSE historique. [Spécification transports 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports). Claude Code conserve SSE mais le marque déprécié. [Installation des serveurs MCP](https://code.claude.com/docs/en/mcp#option-2-add-a-remote-sse-server).

Mermaid : remplacer P2 par `Transport: stdio / Streamable HTTP (legacy SSE deprecated)`, connecter `CC1 --> CC2 --> P1`, et remplacer P1 par `JSON-RPC tools/call: params.name + params.arguments`. ASCII : inclure `Match server` avant requête et remplacer `(stdio or SSE)` par `(stdio / Streamable HTTP ; legacy SSE)`. La forme exacte de `tools/call` est publiée dans la [spécification des outils](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#calling-tools).

### F2. Injection et rug pull

Les protections réduisent les risques sans les supprimer ; un fournisseur « officiel » n'est pas audité par Anthropic. [Sécurité MCP](https://code.claude.com/docs/en/security#mcp-security).

Mermaid et ASCII : soit renommer le scénario `Tool-description prompt injection`, soit ajouter « outil initialement bénin → confiance → description modifiée ». Remplacer l'étape d'exfiltration par `Claude lit un secret si accès autorisé → appel MCP avec secret en arguments → serveur attaquant reçoit les données`. Ajouter une branche permissions/isolation qui bloque l'action. Retirer « The most dangerous » faute de comparaison mesurée ; revue source, versions figées et droits minimaux sont des réductions de risque, pas des garanties.

### F3. Priorité MCP

Ordre documenté : local, project, user, plugins, connecteurs claude.ai. Le serveur gagnant est choisi sans fusion des champs. [Précédence MCP](https://code.claude.com/docs/en/mcp#scope-hierarchy-and-precedence). Seul `--strict-mcp-config` exprime l'exclusion des autres configurations, avec les règles managed qui s'appliquent. [Référence CLI](https://code.claude.com/docs/en/cli-reference).

Mermaid : séparer une branche `managed policy` de la sélection de serveurs ; chaîne `local (~/.claude.json) → project (.mcp.json) → user (~/.claude.json) → plugin → connector`. CLI devient un apport de configuration, accompagné de l'option strict, pas « overrides all ». ASCII : même ordre et même réserve managed. Corriger le tooltip B `.mcp.json` et C `local scope`. Deux emplacements de stockage dans les scopes normaux, pas « 3 actual files » ; le chemin CLI est fourni par l'utilisateur.

### F4. TDD

Le mécanisme RED/GREEN/REFACTOR reste utile, mais les critères et le résultat effectif du check déterminent la preuve. [Critères de vérification](https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work).

Mermaid : branche `No` de D vers `Confirm behavior already exists or strengthen test`, plus branche `Unexpected failure → repair setup`. ASCII : mêmes alternatives. Description : « helps expose regressions when assertions cover the requested behavior ». « Tests pass » prouve seulement les assertions exécutées.

### F5. Plan mode

La doc demande de cycler jusqu'à l'affichage Plan ou d'utiliser `--permission-mode plan`, et propose `Ctrl+G` pour éditer le plan. [Exploration puis plan puis code](https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code).

Mermaid B : `Enter Plan Mode: Shift+Tab until Plan, or --permission-mode plan`. ASCII : même instruction. Ne pas présenter une sortie de mode comme une garantie permanente d'exécution limitée au plan : conserver review et vérification des écarts.

### F6. AI Fluency Index

L'étude porte sur 9 830 conversations, pas une segmentation de tous les utilisateurs. 85,7 % des conversations présentent une itération. 30 % désigne le comportement de définition du mode d'interaction. Le facteur 5,6 concerne la probabilité de questionner le raisonnement ; 2,67 contre 1,33 compte d'autres comportements observés, pas la qualité ou les bugs trouvés. Les écarts −5,2/−3,7/−3,1 points comparent conversations avec et sans artifacts. Le rapport n'établit pas la causalité « polished output → cognitive bias » ni un résultat « verified ». [AI Fluency Index](https://academy.claude.com/tutorials/the-ai-fluency-index).

Mermaid : supprimer branches `70%/30%`, « Silent defects » et « 5.6x more issue catches ». Dessiner deux comparaisons observées séparées : `Iteration observed vs absent → behaviors associated` et `Artifact vs non-artifact → evaluative behaviors less frequent`. Mettre `Independent checks required` comme recommandation explicite hors statistiques. ASCII : même séparation. Conserver les valeurs authentiques avec leurs dénominateurs et écrire `association`, sans causalité ou promesse de correction.

### F7. Topologies et Agent Teams

Agent Teams est expérimental et désactivé par défaut. Les teammates peuvent communiquer et partager des tâches ; pour du travail séquentiel ou des mêmes fichiers, la doc préfère session unique ou subagents. [Agent Teams](https://code.claude.com/docs/en/agent-teams#when-to-use-agent-teams).

Mermaid/ASCII : titre `Conceptual orchestration patterns`. Ajouter à l'orchestrateur `native teams: lead + teammates, experimental` et à pipeline/routeur `workflow pattern, not a dedicated native mode`. Le pattern est cohérent sans affirmer « proven » pour tous les workloads.

### F8. Worktrees

Git sépare working trees et HEAD mais partage une partie des références. [git-worktree](https://git-scm.com/docs/git-worktree). L'isolation du checkout ne résout pas automatiquement les divergences de branches.

Mermaid : remplacer les commandes par `git worktree add -b feature-A ../worktrees/feature-A`, puis chemins `../worktrees/feature-A` cohérents. Ajouter `integration checks → resolve merge conflicts if present → merge`. ASCII : remplacer « No conflicts » par « Concurrent edits isolated; merge conflicts remain possible ». Les commandes actuelles `git worktree add feature-A` sont valides comme chemins, mais n'établissent pas `/worktrees/feature-A` affiché.

### F9. Planner sans outils

Mermaid : `Planner: supplied docs, no execution tools configured` ; executor avec `approved tools + transferred plan`. ASCII : remplacer `full context` par `plan + required context supplied`. Lire des docs sans outils exige que leur contenu soit fourni. Attribution « Jon Williams » : source communautaire d'origine non consultée dans cet audit, donc non vérifiée ; conserver seulement si son article est accessible et supporte le scénario précis. Une autre solution native consiste à utiliser le [Plan mode](https://code.claude.com/docs/en/permissions#permission-modes), qui n'est pas un agent entièrement sans outils.

### F10. Gain de parallélisme

Mermaid REV : `Integration review + validation`. ASCII : supprimer `~10x faster`. Description : `Elapsed benefit depends on independent work, coordination and integration; measure per workload`. La doc confirme coordination, coûts supplémentaires et rendements décroissants ; elle ne fournit pas une garantie ~10× pour ce refactor. [Dimensionner Agent Teams](https://code.claude.com/docs/en/agent-teams#choose-an-appropriate-team-size). Attribution historique « Boris Cherny » et mesure du gain : non vérifiées ici.

### F11. Matrice de décision

`Task` est devenu `Agent` en v2.1.63 ; les anciennes références restent des alias. [Restreindre les subagents](https://code.claude.com/docs/en/sub-agents#restrict-which-subagents-can-be-spawned).

Mermaid et ASCII : remplacer `Task tool` par `Agent tool (formerly Task)` puis retirer le seuil 4+ comme précondition de subagents. Premier choix : « Focused workers returning results → subagents ; peers discussing/shared tasks → experimental teams ; concurrent edits needing isolation → worktrees ». La taille est une décision secondaire, pas une fonction imposée.

### F12. Messages intersessions

`crossSessionInbound: hold` retient sans livraison et libère quand `accept` s'applique. Le dialogue d'approbation appartient au défaut de permission-mode dans un terminal capable de le montrer. Transmission locale sur socket/named pipe et permissions du destinataire sont confirmées. [Contrôles inbound](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages).

Mermaid GATE : ajouter `setting explicit?` ; branche explicite hold vers `Undelivered; later accept releases`. Branche défaut vers `permission-mode classes → deliver or approval hold`. ASCII : mêmes branches. Noter les prérequis de version/provider pour que toutes les sessions ne paraissent pas systématiquement présentes.

### F13. Défense en profondeur

CLAUDE.md est suivi au mieux, sans garantie stricte. [Limites de CLAUDE.md](https://code.claude.com/docs/en/memory#claude-isnt-following-my-claude-md). `.claudeignore` n'est pas établi dans la documentation actuelle comme mécanisme d'interdiction. Les règles permissions et les restrictions OS doivent porter les contrôles ; bypass est réservé à un environnement isolé. [Permissions](https://code.claude.com/docs/en/permissions#permission-modes).

Mermaid P2 : `permissions deny/ask + managed policy`. P3 : `Sensitive files: file-tool denies + OS read restrictions`. P4 : `Minimal permissions; bypass only in isolation`. D2 : `Configured audit/log collection` sans « complete ». Mettre sandbox et permissions en prévention, pas seulement après détection. Remplacer final « Threat contained » par « Risk reduced; investigate residual exposure ». ASCII : même changement, sans présenter CLAUDE.md ou ignore comme barrière.

### F14. Sandbox et modes

Sandbox Bash : macOS Seatbelt ; Linux/WSL2 bubblewrap+socat ; pas de sandbox native Windows. File tools, MCP et hooks sont hors du sandbox shell. Une isolation de tout le processus exige container/VM ou runtime dédié. [Sandbox Bash](https://code.claude.com/docs/en/sandboxing#what-runs-outside-the-sandbox). `acceptEdits` auto-accepte des modifications, ce qui ne renforce pas le contrôle avant écriture. [Modes de permissions](https://code.claude.com/docs/en/permissions#permission-modes).

Mermaid : distinguer `Untrusted shell commands` et `Untrusted MCP/hooks`. Premier cas : `/sandbox` par plateforme ; second : isolation du processus entier. Branches Linux et WSL2 native sandbox, Windows natif WSL2/container. Remplacer la branche `uncomfortable with default → acceptEdits` par `manual permissions + restricted allowlist + review`. ASCII : mêmes cas. Retirer « Cost: low. Risk without it: high » comme constante : aucune mesure universelle et sandbox minimal ne cache pas tous les secrets par défaut.

### F15. Vérifier un résultat

La doc encourage Claude à exécuter des checks et à montrer les résultats, avec revue adversariale séparée si utile. [Vérification et preuves](https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work).

Mermaid BAD : `Opinion only, no independent evidence → defects may remain`. GOOD final : `Checks pass for tested scope → release decision + runtime monitoring`. ASCII : remplacer « Deploy ✓ » par « release decision; deploy/runtime still need validation ». Description : opinion du générateur seule insuffisante, pas « toutes les vérifications exécutées par Claude sont circulaires ». Les tests écrits par le même agent peuvent partager des lacunes ; reviewer humain et autre outil ne suffisent pas automatiquement.

### F16. CI

`claude --print` ou `claude -p` est documenté. `--headless` n'apparaît pas dans la référence CLI consultée ; acceptation par un binaire local non exécutée, donc UNKNOWN. [Référence CLI](https://code.claude.com/docs/en/cli-reference).

Mermaid CC : `claude -p 'Review quality-check evidence'`. Lint/tests/scan deviennent des jobs CI exécutés directement et fournissent résultats/code de sortie au gate CI ; l'agent lit les résultats et rédige le rapport. ASCII : mêmes responsabilités. Ajouter un gate `CI result != agent opinion`. La parallélisation exige jobs/configuration explicites. La syntaxe `CC --> subgraph TASKS` demande un contrôle du rendu Mermaid avant publication ; cet audit ne l'a pas exécutée.

## Carte MCP : catégories et maintenance

Remplacer « Official Servers » par catégories de provenance :

| Catégorie proposée | Éléments établis | Source primaire |
|---|---|---|
| Référence MCP, pédagogique | `sequential-thinking`, `mcp-server-git` ; non présentés comme solutions production garanties | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |
| Fournisseur | Context7 par Upstash | [upstash/context7](https://github.com/upstash/context7) |
| Fournisseur | GitHub MCP actuel ; distinguer l'ancien serveur de référence archivé | [github/github-mcp-server](https://github.com/github/github-mcp-server), [références archivées](https://github.com/modelcontextprotocol/servers#archived) |
| Fournisseur | AWS MCP par AWS Labs, pas seulement community | [awslabs/mcp](https://github.com/awslabs/mcp) |
| Fournisseur | Semgrep via binaire officiel ; ancien dépôt déprécié | [avis de migration Semgrep](https://github.com/semgrep/mcp) |
| Communauté ou custom | `grepai`, `filesystem-enhanced`, `kubernetes`, `docker` nécessitent un identifiant de dépôt/package précis | Non vérifié : noms ambigus sans URL fournisseur |

Appliquer les mêmes catégories Mermaid et ASCII. Mainteneur officiel ne signifie pas audit de sécurité Anthropic. Playwright peut être gardé avec une source Microsoft précise ; ce dépôt n'a pas été inspecté dans ce sous-audit.

## Liens Source

Les 19 liens Source relatifs pointent vers des fichiers existants. Huit fragments ne correspondent à aucun titre ou ancre explicite trouvé dans leur cible. Cela prouve une incohérence de navigation dans les sources consultées ; pas un HTTP 404 du fichier. Les numéros « line ~ » sont également anciens et ne doivent pas servir d'identifiant stable.

| Source actuelle | Remplacement à confirmer avec le validateur d'ancres du site |
|---|---|
| `core/architecture.md#mcp-architecture` | `core/architecture.md#mcp-architecture-overview` |
| `security/security-hardening.md#mcp-threats` | `security/security-hardening.md#attack-mcp-rug-pull` |
| `ultimate-guide.md#mcp-configuration` | `ultimate-guide.md#mcp-configuration-location` ou section `#83-configuration` |
| `ultimate-guide.md#common-pitfalls--best-practices` | `ultimate-guide.md#911-common-pitfalls--best-practices` |
| `ultimate-guide.md#git-worktrees` | `ultimate-guide.md#912-git-best-practices--workflows` |
| `ultimate-guide.md#horizontal-scaling` | `ultimate-guide.md#917-scaling-patterns-multi-instance-workflows` |
| `ultimate-guide.md#multi-instance-patterns` | `ultimate-guide.md#917-scaling-patterns-multi-instance-workflows` |
| `ultimate-guide.md#cicd-integration` | `ultimate-guide.md#93-cicd-integration` |

Liens externes effectivement ouverts : la source AI Fluency redirige vers Claude Academy et reste accessible ; le playbook redirige vers `/resources/articles/the-ai-native-sdlc-playbook` et reste accessible. Les URLs fournisseurs ci-dessus ont été ouvertes. Les autres liens click et comportements de navigation publics sont pris en charge par l'audit global de liens, pas établis par cette lecture seule.

## Limites et acceptation

Cet audit vérifie les sources et contrats documentés, pas une installation de chaque serveur MCP, une exécution CI, un sandbox réel ou un benchmark de parallélisme. Les deux attributions communautaires historiques restent non vérifiées. Aucun identifiant de modèle obsolète n'apparaît dans ces 19 diagrammes ; les problèmes portent sur mécanismes et garanties.

Correction acceptée quand Mermaid, ASCII et descriptions ne se contredisent plus, les huit fragments sont remplacés et validés, `--headless` est retiré ou prouvé sur une version explicitement ciblée, et aucun résultat de sécurité/performance n'est présenté comme garanti sans preuve. Générer puis inspecter les diagrammes après les changements, puis contrôler les liens sur le site produit.
