---
title: Commandes Essentielles
subtitle: Raccourcis clavier & commandes slash indispensables
cardNumber: T01
category: Technique
difficulty: beginner
guideVersion: 3.32.1
order: 1
---

## Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+J` / `Cmd+J` | Ouvrir Claude Code |
| `Shift+Tab` | Basculer mode auto-accept |
| `Ctrl+C` | Interrompre la génération |
| `Esc` | Annuler l'action en cours |
| `↑` / `↓` | Historique des messages |
| `Tab` | Complétion de chemin |

## Commandes Slash Core

```
/help           Aide et commandes disponibles
/clear          Vider le contexte (reset)
/compact        Compresser l'historique
/model          Changer de modèle
/cost           Voir les coûts de session
/status         Statut du contexte
```

## Modes de Permission

```
claude                    Mode interactif (défaut)
claude --dangerously-skip-permissions
                          Bypass total (CI/CD)
claude --allowedTools "Edit,Read,Bash"
                          Whitelist d'outils
```

## Démarrage Rapide

```bash
# Lancer Claude Code
claude

# Avec fichier de contexte
claude --context CLAUDE.md

# Mode non-interactif (scripts)
claude -p "Analyse ce fichier" < input.txt

# Continuer la dernière session
claude --continue
```

## Commandes de Session

```
/new            Nouvelle session
/resume         Reprendre session précédente
/sessions       Lister les sessions
```

## Navigation Contexte

| Commande | Effet |
|----------|-------|
| `/compact` | Résume et libère de l'espace |
| `/clear` | Réinitialise complètement |
| `#fichier` | Ajouter fichier au contexte |

## Slash Commands Personnalisées

```
# Invoquer une commande personnalisée
/nom-commande [args]

# Définies dans :
.claude/commands/nom-commande.md
```

## Tips Essentiels

**Contrôle de verbosité** — Utiliser `--no-stream` pour voir la réponse complète d'un coup.

**Multiline** — `Shift+Enter` dans le terminal pour sauter une ligne sans valider.

**Vim mode** — Ajouter `{"vim": true}` dans `~/.claude/settings.json` pour les raccourcis Vim.
