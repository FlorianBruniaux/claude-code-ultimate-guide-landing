# Audit des diagrammes 09 à 12, 7 octobre 2026

14 diagrammes examinés intégralement, y compris descriptions, Mermaid, ASCII et liens « Source ». Les constats les plus graves portent sur le chargement des instructions, les garanties de sécurité et la configuration MCP. Aucun fichier du guide ni donnée générée du site n'a été modifié par cet audit.

Les sources officielles ont été consultées pendant cette session. « Réfuté » signifie contradiction explicite avec une source ou divergence entre les représentations inspectées. « Non vérifié » signifie absence de preuve suffisante, pas preuve de fausseté. Les recommandations d'organisation propres au guide restent des propositions, pas des fonctionnalités Anthropic. Les comportements n'ont pas été rejoués dans Claude Code.

## Couverture complète

| Thème | Diagramme | Verdict et gravité | Résultat |
|---|---|---|---|
| 09 | Model selection decision flow | Réfuté partiellement, P2 | Sonnet 5 reste documenté mais appartient aux modèles legacy. L'alias `sonnet` actuel dépend du fournisseur. Ratios de prix confirmés pour les tarifs standard directs. Max n'est pas illimité. F1. |
| 09 | Cost optimization decision tree | Confirmé pour les leviers; réfuté pour les niveaux d'effort, P2 | Levier de compaction pertinent; résultat « baseline acceptable » sans mesure insuffisant. L'encadré `xlow/low/default/high/xhigh` est obsolète. F2. |
| 09 | Subscription tiers: What each unlocks | Réfuté partiellement, P2 | CLI sur les plans payants et Max 5x/20x confirmés. L'exclusion des sessions parallèles de Pro n'est pas une limitation CLI documentée. Team et Enterprise mélangent des droits distincts. F3. |
| 09 | Token reduction strategies pipeline | Confirmé pour la prudence; non vérifié pour RTK | Le diagramme demande une mesure et ne multiplie plus des gains théoriques. `/usage` et alias `/cost` confirmés. Compression RTK réelle non mesurée ici. |
| 10 | Onboarding adaptive learning paths | Proposition; délais non vérifiés, P2 | Parcours raisonnables, aucune preuve locale des délais de productivité ou adoption. F4. |
| 10 | UVAL learning protocol | Réfuté contre le guide inspecté, P2 | Le guide actuel définit Understand First / Verify / Apply / Learn. Le diagramme conserve Use It / Adapt et promet une compétence durable. F5. |
| 10 | Trust calibration matrix | Non vérifié; limitation logique confirmée, P1 | Tests verts ou changement Git réversible conduisent à la confiance avant le filtre sécurité. L'ASCII donne « trust with care » là où Mermaid renvoie au filet Git. F6. |
| 11 | The 3-layer context system | Réfuté partiellement, P1 | `@imports` conditionnels et ordre d'override garanti erronés; `/add` n'est pas le nom actuel. F7. |
| 11 | Context budget & adherence degradation | Non vérifié, P2 | Aucun protocole ni jeu de données permettant d'établir les taux 95/88/75/60/45% ou le gain universel 40-50%. F8. |
| 11 | Monolithic vs. modular architecture | Réfuté et non vérifié, P1 | Noms `CLAUDE-api.md` présentés comme automatiquement découverts et imports root conditionnels incorrects. Attention 95/30% et gain 40-50% non établis. F7-F8. |
| 11 | Rule placement decision tree | Réfuté pour le mécanisme; dérive ASCII, P1 | Même faux exemple de module; ASCII a perdu la branche contrôles déterministes et garde l'ancienne règle de promotion. Le clic du nœud hook pointe vers Skills. F7, F9. |
| 12 | Governance risk tiers: What to control and when | Réfuté partiellement, P1 | « CANNOT control personal settings/model choice » omet les politiques gérées. Durées de configuration non étayées. Tiers proposés, pas certification réglementaire. F10. |
| 12 | MCP governance workflow | Réfuté pour le déploiement; politique non vérifiée, P1 | Serveurs projet configurés dans `.mcp.json`, pas simplement `settings.json`. Overrides locaux non empêchés par un commit. Branche de refus absente en ASCII. F11. |
| 12 | Data classification & Claude Code access rules | Proposition locale; garantie de confinement réfutée, P1 | Classification possible comme politique interne. Les absolus sont présentés sans ce cadre. Une règle Read seule ne prouve pas l'absence de fuite par shell/MCP/prompt. F12. |

P1: risque d'instruction inopérante ou de confiance sécurité injustifiée. P2: information obsolète, mesure non établie ou représentation divergente.

## F1. Modèles et budget, 09

Les tarifs standard API directs sont Haiku 4.5: $1/$5, Sonnet 5.5: $2/$10, Opus 5.5: $4/$20 par million de tokens entrée/sortie. Les ratios 2x restent corrects pour ce périmètre. Ils ne comparent ni factures totales ni plans. Sonnet 5 est encore répertorié, sa retraite n'est pas établie ici. [Tarifs API officiels](https://platform.claude.com/docs/en/about-claude/pricing), [Sonnet 5 classé legacy](https://claude.com/pricing).

L'alias `sonnet` résout Sonnet 5.5 sur API Anthropic, mais des versions différentes chez les autres fournisseurs. Préférer les familles et une note datée aux noms qui prétendent être universellement actuels. [Configuration des modèles](https://code.claude.com/docs/en/model-config#model-aliases).

Correction Mermaid: `D([Haiku<br/>Validate acceptance])`, `F([Sonnet<br/>Validate acceptance])`, `I([Opus<br/>Validate acceptance and cost])`. Correction ASCII: `Simple -> Haiku; Standard -> Sonnet; Reasoning -> Opus; validate the same task gate`. Remplacer « unconstrained Max/API » par « sufficient measured allowance; Max remains usage-limited ». Conserver les prix dans un encadré daté, séparant API standard et abonnement.

## F2. Effort et verdict de coût, 09

Les niveaux actuels sont `low`, `medium`, `high`, `xhigh`, `max`, selon le modèle. `xlow` et `default` ne figurent pas dans cette liste. [Niveaux d'effort](https://code.claude.com/docs/en/model-config#adjust-effort-level).

Remplacer l'encadré par `/effort low|medium|high|xhigh|max`, avec les limites du modèle. Dans Mermaid, remplacer `L([Baseline cost acceptable])` par `L([Measure cost per accepted task<br/>Review other causes])`; ASCII: `None identified -> measure baseline and investigate`. Un arbre de diagnostic incomplet ne conclut pas à l'acceptabilité du coût.

## F3. Plans et sessions parallèles, 09

La documentation propose plusieurs sessions CLI simultanées sans imposer Max. [Sessions parallèles](https://code.claude.com/docs/en/best-practices#run-multiple-claude-sessions). Le modèle peut être choisi indépendamment dans chaque terminal. [Choisir le modèle](https://code.claude.com/docs/en/model-config#setting-your-model).

Séparer Team et Enterprise: la page tarifaire associe notamment audit logs, SCIM et rétention personnalisée à Enterprise. Team Standard coûte $20 par siège avec facturation annuelle ou $25 mensuels. Pro $20/mo nécessite aussi de préciser le mode de facturation. La capacité partagée limite l'usage parallèle. [Plans Claude](https://claude.com/pricing).

Mermaid: `P4[Parallel CLI sessions<br/>share plan usage]`; `M3[Parallel CLI sessions<br/>larger usage allowance]`; créer deux sous-graphes Team et Enterprise. ASCII: remplacer `No parallel` par `Parallel: shared limits` et séparer les deux colonnes organisationnelles. L'exclusion CLI du plan Free concerne l'abonnement, pas un utilisateur employant des crédits API.

## F4. Onboarding et délais, 10

Les durées « ~2 days », « ~1 week », « ~2 weeks » ne sont pas calibrées par une mesure du public concerné. Retirer ces délais des deux formats. Les étapes officielles de démarrage ne garantissent pas un délai d'adoption. [Quickstart Anthropic](https://code.claude.com/docs/en/quickstart).

Mermaid: `C[Developer Path<br/>Verify first scoped task]`, `D[Non-Tech Path<br/>Practice reversible tasks]`, `E[Team Lead Path<br/>Measure a pilot before rollout]`. ASCII: conserver les trois parcours sans parenthèses temporelles. Transformer les sorties « productive/safe/adopted » en critères: changement expliqué et vérifié, limites d'accès comprises, pilote évalué avant élargissement.

## F5. UVAL a changé dans sa propre source, 10

Dans `guide/roles/learning-with-ai.md`, section `The UVAL protocol`, la pratique actuelle ne promet pas une rétention démontrée. La lecture distante de cette page n'a pas abouti ici; comparaison confirmée contre le guide inspecté, état public non vérifié. [Page publique à recontrôler](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/roles/learning-with-ai.md#the-uval-protocol).

Mermaid: remplacer les nœuds U/V/A/L par `Understand First`, `Verify against evidence`, `Apply a requirement`, `Learn and assess later recall`; sortie `Record insight; assess transfer later`. ASCII: `UNDERSTAND -> VERIFY -> APPLY -> LEARN`; même limite sur le bénéfice. Description: « A proposed comprehension practice whose retention benefit needs evaluation ». Retirer « Each cycle builds real competency that survives tool unavailability » et « Pattern internalized ».

## F6. Confiance trop tôt dans l'arbre, 10

Un test peut couvrir un scénario sans vérifier les effets externes ou le traitement de données. Un changement Git réversible ne rend pas une exposition de données réversible. Le diagramme lui-même place le filtre sécurité après les branches qui acceptent déjà la confiance. Anthropic demande une revue des actions proposées. [Responsabilité de revue](https://code.claude.com/docs/en/security#user-responsibility).

Mermaid et ASCII: placer d'abord `Sensitive data/security/external effect? -> qualified review + relevant validation`; puis le test et la possibilité de retour arrière. Remplacer les sorties confiance absolue par `Accept within verified scope`. La réponse explicative de Claude constitue une hypothèse à vérifier, pas une preuve autonome. Harmoniser le chemin « domaine familier » entre les deux formats.

## F7. Chargement et hiérarchie, 11

Les `@imports` se développent au lancement. La portée conditionnelle utilise `.claude/rules/*.md` avec `paths`; les sous-répertoires peuvent aussi contenir `CLAUDE.md`. Les noms `CLAUDE-api.md` n'ont pas de découverte native automatique. Les instructions se concatènent, les conflits n'ont pas d'override garanti. [Chargement officiel](https://code.claude.com/docs/en/memory#how-claudemd-files-load), [Imports](https://code.claude.com/docs/en/memory#import-additional-files), [Règles conditionnelles](https://code.claude.com/docs/en/memory#path-specific-rules).

Correction commune Mermaid et ASCII:

```text
Global CLAUDE.md -> Project CLAUDE.md -> Session instructions
Context concatenated; keep instructions consistent
Root @imports: expanded at launch
.claude/rules/api.md with paths: src/api/**
  -> loaded on matching Read/Write/Edit
Alternative: src/api/CLAUDE.md
  -> loads when Claude accesses that subtree
```

Dans Mermaid 3-layer, remplacer P3 par les règles conditionnelles, OVR par la concaténation sans garantie et SESSION `/add` par `/add-dir`. Cette commande ajoute un périmètre d'accès, pas une instruction temporaire. [Commande `/add-dir`](https://code.claude.com/docs/en/commands). Dans modular architecture, remplacer les noms G2/G3/G4 et le root `@import declarations` par `Shared rules; scoped rules separate`. Conserver des cibles de taille comme recommandations éditoriales, sans garantie d'adhérence.

## F8. Chiffres d'adhérence et d'attention, 11

Les taux 95/88/75/60/45%, le poids d'attention 95/30%, et le résultat universel 40-50% n'ont pas de protocole, corpus, modèle, version ni dénominateur dans les diagrammes. La mention HumanLayer « 15-25% improvement » ne fournit pas une dérivation de ces valeurs. La source du guide reprend plusieurs gains, mais cela ne les valide pas. [Contexte et budget dans le guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/context-engineering.md#2-the-context-budget).

Dans Mermaid adherence, remplacer les cinq niveaux chiffrés par `Short and consistent -> review relevance -> scope subsystem rules -> measure loaded context and violations`. ASCII: même parcours sans tableau de taux. Dans modular architecture, B3 devient `Mixed rules increase irrelevant context`; G5 devient `Measure context size and task adherence`. Retirer la promesse de « green zone ». Retenir le gain seulement après comparaison sur des tâches et contraintes explicites.

## F9. Rule placement, 11

La version Mermaid différencie contrôles garantis et procédure réutilisable. L'ASCII conserve « Procedural step-by-step -> Skill », ce qui perd cette distinction. Il dit aussi de promouvoir toute phrase répétée, alors que Mermaid demande stabilité et répétition. Le clic G intitulé hook/script pointe vers `#51-understanding-skills`.

Correction dans les deux formats: `Need enforced stop/order/retries? -> hook/script/CI/workflow`; sinon `Reusable procedure/reference/judgment? -> skill`; sinon projet ou session. Vérifier ce besoin avant la portée des fichiers si la règle doit être imposée. Utiliser la correction de mécanisme F7 pour les règles de sous-système. Clic G: [Hooks officiels](https://code.claude.com/docs/en/hooks). Ajouter le clic et le style du nouveau nœud L Skill. ASCII: `Repeated and stable -> candidate for a durable layer`.

## F10. Gouvernance et politiques gérées, 12

L'impossibilité générale de contrôler les réglages personnels est fausse pour un poste soumis aux politiques gérées. `availableModels` impose une liste; `forceLoginMethod` et `forceLoginOrgUUID` encadrent l'authentification. Le périmètre dépend de la machine, de la surface et de la politique déployée. [Politiques gérées](https://code.claude.com/docs/en/managed-settings), [Priorité des réglages](https://code.claude.com/docs/en/settings#settings-precedence).

Mermaid NOTE et ASCII: `Managed sessions: org policies constrain permissions, models, login and MCP; unmanaged personal devices/accounts remain outside that deployment`. Remplacer les durées des tiers par des livrables observables. Nommer les quatre tiers « proposed controls by risk », et ajouter `Legal/security review determines obligations and sufficient controls`. Un ensemble de hooks n'établit pas SOC2, ISO27001, HIPAA ou PCI.

## F11. Déploiement et examen MCP, 12

Les serveurs partagés sont définis dans `.mcp.json`; les restrictions sont une configuration distincte. Un registre YAML propre au guide n'est pas un mécanisme Claude Code natif. Le refus des overrides exige une politique gérée effectivement appliquée. [Portée projet MCP](https://code.claude.com/docs/en/mcp#project-scope), [Configuration MCP gérée](https://code.claude.com/docs/en/mcp#managed-mcp-configuration).

Mermaid REPO et messages: `.mcp.json + managed restrictions`; `Verify deployed policy`; ajouter un refus explicite avant le chemin medium/high. ASCII: même refus, puis vérification de politique. Remplacer `Stars >50?` par `Review source, integrity, permissions, data destinations and advisories`; supprimer les garanties « 5-min audit » et « approved stay approved ». Ancienneté, popularité et numéro patch ne suffisent pas à autoriser automatiquement une modification. Les fenêtres de révision/expiration peuvent rester si elles portent l'étiquette « example organization policy ». Écrire `All version changes: evaluate source/data/permission delta` dans les deux formats.

## F12. Politique de données et confinement, 12

« Enterprise only + ZDR » est une politique proposée, pas une règle générale pour toute propriété intellectuelle confidentielle. Le ZDR Claude Code requiert une activation spécifique et ne couvre pas les outils tiers/MCP. [Portée du ZDR](https://code.claude.com/docs/en/zero-data-retention#what-zdr-does-not-cover). Les données commerciales ne sont pas entraînement par défaut, mais cette propriété diffère de rétention. [Politique de données](https://code.claude.com/docs/en/data-usage#data-policies).

Les règles de permission et le sandbox sont complémentaires. La syntaxe `Read(.env, *.key, *.pem, secrets/**)` de l'ASCII ne constitue pas quatre règles distinctes. [Syntaxe et sandbox](https://code.claude.com/docs/en/permissions#how-permissions-interact-with-sandboxing).

Mermaid CO2: `Organization-approved route<br/>Verify contract, retention and integrations`; RE2: `Policy: prohibit restricted data<br/>Enforce and test access boundaries`. ASCII: mêmes formulations, exemples séparés `Read(./.env)`, `Read(./secrets/**)`, avec contrôles shell/sandbox et revue MCP. Retirer « no restrictions » pour PUBLIC: les permissions des actions continuent d'exister. Un contenu public peut contenir une injection malveillante. « No exceptions » peut rester une décision interne si explicitement attribuée à cette politique, sans promesse technique.

## Liens Source et limites

Les quatre fichiers et toutes leurs destinations relatives existent dans le guide inspecté. Sur 14 liens Source, quatre fragments n'ont pas de titre correspondant:

| Diagramme | Fragment absent | Remplacement proposé |
|---|---|---|
| 09 Cost optimization | `#cost-optimization` | `#913-cost-optimization-strategies` |
| 09 Subscription tiers | `#subscription-tiers` | `#subscription-plans--limits` |
| 09 Token reduction | `#token-optimization` | `#913-cost-optimization-strategies` |
| 10 Trust calibration | `#trust-verification` | `#17-trust-calibration-when-and-how-much-to-verify` |

Cette vérification inspecte les titres Markdown, pas une réponse HTTP ou l'existence d'un ID dans le DOM GitHub. Les clics Mermaid utilisent souvent déjà les titres numérotés corrects, expliquant la divergence avec les pieds Source. Retirer les références `Line ~...` non synchronisées. Le pied 10 « Next: Cost Optimization » renvoie au thème 09 déjà précédent: ordre de navigation à corriger.

Les pages officielles citées ont été lues. La page HIPAA demandée a produit une erreur de lecture; aucune conclusion juridique ne s'appuie sur cette lecture. La citation Karpathy n'a pas été revalidée. RTK, les timings de formation, les chiffres d'adhérence et les bénéfices UVAL restent non vérifiés. L'audit ne mesure ni facturation réelle, ni conformité, ni déploiement, ni comportement public du site.
