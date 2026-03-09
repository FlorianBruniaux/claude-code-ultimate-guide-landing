---
title: 'Hooks : Événements & Système'
subtitle: Réagir automatiquement aux actions de Claude Code
cardNumber: M11
category: Méthodologie
difficulty: intermediate
guideVersion: 3.32.1
order: 111
---

## Qu'est-ce qu'un hook

Un hook est un script shell (ou toute commande) exécuté automatiquement quand Claude Code déclenche un événement. Comparable aux git hooks, mais pour l'environnement de l'agent. Le script reçoit un JSON via stdin décrivant le contexte de l'événement.

## Événements principaux

| Événement | Moment | Peut bloquer |
|-----------|--------|-------------|
| `SessionStart` | Démarrage ou reprise | Non |
| `UserPromptSubmit` | Avant traitement du prompt | Oui |
| `PreToolUse` | Avant l'appel d'un outil | Oui |
| `PostToolUse` | Après succès d'un outil | Non |
| `Notification` | Claude envoie une notification | Non |
| `Stop` | Claude finit de répondre | Oui |
| `SubagentStop` | Fin d'un sous-agent | Oui |

## Événements Agent Teams (v2.1.32+)

| Événement | Utilité |
|-----------|---------|
| `TeammateIdle` | Un membre de l'équipe va passer en idle |
| `TaskCompleted` | Une tâche est sur le point d'être marquée terminée |
| `ConfigChange` | Un fichier de config a changé pendant la session |

Ces événements permettent d'implémenter des quality gates au niveau de l'équipe d'agents : empêcher qu'une tâche soit marquée `completed` si les tests échouent, par exemple.

## Configuration dans settings.json

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/auto-format.sh",
        "timeout": 10000,
        "async": true
      }]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/security.sh"
      }]
    }]
  }
}
```

## Codes de sortie

| Code | Signification |
|------|---------------|
| `0` | Succès, continuer normalement |
| `2` | Bloquer l'action (message stderr visible par Claude) |
| Autre non-0 | Erreur remontée à Claude |

Pour les hooks `PreToolUse`, un exit 2 empêche l'outil de s'exécuter. Claude lit le message stderr et peut adapter son comportement.

## Synchrone vs Asynchrone

Hooks synchrones (défaut) : Claude attend la fin du script. Adapté à la validation et au type checking. Hooks asynchrones (`async: true`) : Claude continue immédiatement. Adapté au formatage, aux notifications et aux logs, où le feedback n'est pas nécessaire pour la suite.

## Flux des données stdin

```bash
# Exemple de JSON reçu sur stdin (PostToolUse)
{
  "tool_name": "Edit",
  "tool_input": { "file_path": "src/auth.ts" },
  "tool_response": { "success": true },
  "hook_event_name": "PostToolUse"
}
```

L'event `Stop` inclut également un champ `last_assistant_message` depuis v2.1.47, donnant accès direct à la dernière réponse de Claude sans parser les transcripts.
