---
title: 'Multi-Agent : Topologie & Orchestration'
subtitle: Architecturer des équipes d'agents pour les tâches complexes
cardNumber: M16
category: Méthodologie
difficulty: advanced
guideVersion: 3.32.1
order: 116
---

## Quand passer en multi-agent

Un seul agent reste optimal jusqu'à environ 7 répertoires ou 50 fichiers. Au-delà, la fenêtre de contexte se remplit à 80-90% simplement pour charger les fichiers pertinents, ce qui ne laisse presque plus de place au raisonnement. Répartir le travail entre plusieurs agents maintient chacun autour de 40% d'utilisation, avec suffisamment d'espace pour analyser et décider.

| Scope | Agent unique | Équipe |
|-------|-------------|--------|
| <10 répertoires | Confortable (~30%) | Inutile |
| 50K lignes | Dégradé (80-90%) | Recommandé |
| 100K+ lignes | Context overflow | Indispensable |

## Topologie étoile (Star)

L'orchestrateur central reçoit l'objectif global, le décompose en sous-tâches, délègue à des agents spécialisés, puis synthétise leurs résultats. C'est la topologie par défaut de Claude Code Agent Teams.

```
Orchestrateur
├── Agent Sécurité  → analyse auth
├── Agent Qualité   → revue code
└── Agent Tests     → couverture
```

L'orchestrateur planifie et délègue ; il ne code pas lui-même. Son rôle est d'allouer le travail, de débloquer les dépendances, et de présenter une réponse unifiée.

## Topologie pipeline

Les agents travaillent en séquence : la sortie de l'un devient l'entrée du suivant. Utile quand les étapes sont strictement ordonnées et que chaque résultat conditionne le suivant.

```
Analyste → Architecte → Implémenteur → Relecteur
```

Avantage : chaque agent se concentre sur une phase précise, sans bruit des phases précédentes dans son contexte. Inconvénient : un blocage sur une étape arrête tout le pipeline.

## Topologie parallèle

Des agents indépendants travaillent simultanément sur des modules sans dépendance entre eux. Cas typique : refactoring frontend, backend et infra en parallèle sur des fichiers non partagés.

```
Agent Frontend   ─┐
Agent Backend    ─┼─→ merge final
Agent Infra      ─┘
```

Condition d'applicabilité : les modules doivent avoir zéro état partagé. Si les agents doivent constamment lire les sorties des autres ou modifier des fichiers communs, les conflits git et les messages de coordination annulent le gain.

## Isolation et permissions par agent

Chaque agent dispose de sa propre fenêtre de contexte (1M tokens avec Opus 4.6) et peut recevoir une whitelist d'outils distincte. Limiter un agent aux outils `Read`, `Glob`, `Grep` empêche toute modification accidentelle pendant la phase d'analyse.

| Agent | Outils autorisés |
|-------|-----------------|
| Explorateur | Read, Glob, Grep |
| Planificateur | Read, Glob, Grep, Write(plan) |
| Implémenteur | Read, Edit, Bash, Write |
| Relecteur | Read, Glob, Grep |

## Activer les Agent Teams

```bash
# Variable d'environnement (session courante)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude

# Configuration persistante ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Prérequis : Claude Code v2.1.32+, modèle Opus 4.6 (`/model opus`), dépôt git initialisé. Navigation entre agents via `Shift+Down` en mode in-process.

## Règle du >5 agents

Démarrer avec 2 à 3 agents, puis augmenter progressivement. Au-delà de 5, le coût de coordination (messages mailbox, conflits git) dépasse généralement le gain de parallélisation. L'exception : modules physiquement indépendants sur une base de code de 100K+ lignes.
