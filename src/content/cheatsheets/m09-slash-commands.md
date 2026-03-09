---
title: Slash Commands
subtitle: Créer des commandes personnalisées réutilisables
cardNumber: M09
category: Méthodologie
difficulty: intermediate
guideVersion: 3.32.1
order: 109
---

## Principe

Une slash command est un fichier Markdown qui définit un workflow. Claude l'exécute comme s'il avait reçu ce texte en prompt, avec la possibilité de passer des arguments dynamiques.

## Emplacement des fichiers

```
.claude/commands/          # Commandes projet (équipe)
├── commit.md              → /commit
├── review-pr.md           → /review-pr
└── tech/
    └── deploy.md          → /tech:deploy

~/.claude/commands/        # Commandes globales (perso)
├── release.md             → /release
└── sync.md                → /sync
```

Les commandes globales sont disponibles dans toutes les sessions, quel que soit le projet.

## Invocation et arguments

```
/commit                    # Aucun argument
/tech:deploy production    # Argument positionnel
/release minor             # Bump de version
```

Dans le fichier Markdown, les arguments sont accessibles via des variables :

```markdown
Déployer en environment : $ARGUMENTS[0]
Avec la stratégie : $ARGUMENTS[1]

Si aucun argument fourni : utiliser "staging" par défaut.
```

La syntaxe `$0`, `$1` est équivalente à `$ARGUMENTS[0]`, `$ARGUMENTS[1]`. L'ancienne notation avec point (`$ARGUMENTS.0`) est dépréciée depuis v2.1.19.

## Structure recommandée

```markdown
# Nom de la Commande

## Objectif
Ce que fait cette commande en une phrase.

## Processus
1. **Étape 1** — instructions détaillées
2. **Étape 2** — instructions détaillées
3. **Étape 3** — instructions détaillées

## Arguments
- $0 : environnement cible (défaut: staging)

## Format de sortie
Description du résultat attendu.
```

## Commandes utiles à créer

| Commande | Usage |
|----------|-------|
| `/commit` | Commit conventionnel automatique |
| `/review-pr` | Revue de PR selon critères projet |
| `/release [patch|minor|major]` | Bump version + changelog |
| `/sync` | Vérification cohérence multi-fichiers |
| `/security-check` | Scan rapide de la config |

## Command vs Skill vs Agent

| Mécanisme | Quand l'utiliser |
|-----------|-----------------|
| **Command** | Workflow ponctuel, procédure à suivre |
| **Skill** | Connaissance réutilisable + ressources embarquées |
| **Agent** | Spécialiste récurrent avec mémoire propre |

Une command ne peut pas embarquer des fichiers de référence supplémentaires — pour ça, utiliser un skill. Une command n'a pas de mémoire persistante — pour ça, utiliser un agent.

## Conseils pratiques

Une commande, une responsabilité. Dès qu'une commande fait deux choses distinctes, la découper. Nommer avec un verbe d'action en premier (`commit`, `release`, `sync`) pour que l'intention soit immédiatement lisible dans la liste des commandes disponibles.
