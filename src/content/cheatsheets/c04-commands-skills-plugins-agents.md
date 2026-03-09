---
title: Commands, Skills, Plugins & Agents
subtitle: Choisir le bon mécanisme d'extension selon le besoin
cardNumber: C04
category: Conception
difficulty: intermediate
guideVersion: 3.32.1
order: 204
---

## Tableau de comparaison

| Mécanisme | Scope | Persistance | Ressources | Cas d'usage |
|-----------|-------|-------------|-----------|-------------|
| **Command** | Prompt unique | Session | Non | Tâche ponctuelle répétable |
| **Skill** | Capacité réutilisable | Cross-session | Oui | Expertise partagée |
| **Plugin** | Marketplace | Global | Oui | Écosystème tiers |
| **Agent** | Spécialiste autonome | Cross-session | Via memory | Délégation complexe |

## Commands : tâches ponctuelles

Une command est un fichier Markdown dans `.claude/commands/` que vous invoquez avec `/nom-command`. Elle est résolue à l'appel : tout son contenu est injecté dans le contexte comme instruction.

```
.claude/commands/
├── release.md        # /release
├── security-check.md # /security-check
└── sync.md           # /sync
```

**Quand choisir :** vous avez une séquence d'instructions que vous tapez à la main plusieurs fois par semaine. Une command la codifie une fois pour toutes.

## Skills : savoir-faire réutilisable

Un Skill est un module de connaissance structuré (fichier SKILL.md avec frontmatter YAML) que Claude peut invoquer quand il en a besoin. Contrairement à une command qui s'exécute explicitement, un Skill est chargé en fonction du contexte.

```yaml
# .claude/skills/pdf-generator/SKILL.md
---
name: pdf-generator
description: Génère des PDFs avec le template whitepaper-typst
allowed-tools: [Read, Write, Bash]
---
Utiliser quarto render --to whitepaper-typst...
```

**Quand choisir :** vous avez un processus technique avec des paramètres variables (build d'un PDF, déploiement d'un service) que vous voulez déléguer entièrement à Claude avec des guardrails.

**Attention au 56% warning :** les Skills sont invoqués à la demande, pas automatiquement. Si Claude n'invoque pas votre Skill, utilisez `.claude/rules/` (chargement systématique) ou une Command explicite.

## Plugins : intégrations tierces

Les Plugins proviennent du marketplace et ajoutent des capacités externes (Context7 pour la doc, Linear MCP pour les tickets, Figma MCP pour le design-to-code). Ils s'installent via `/plugin marketplace add`.

**Quand choisir :** une intégration avec un service tiers existant couvre exactement votre besoin. Ne développez pas ce qui existe déjà.

## Agents : délégation de tâches complexes

Un Agent est un Claude spécialisé avec ses propres outils, son propre scope et potentiellement sa propre mémoire. Il sert à isoler le contexte, pas à simuler un rôle humain.

```yaml
# .claude/agents/security-audit.md
---
name: security-audit
model: opus
tools: Read, Grep, Glob
---
Analyser le code pour les vulnérabilités OWASP...
```

**Quand choisir :** vous avez une tâche longue qui polluerait le contexte principal, ou un travail qui peut tourner en parallèle pendant que vous continuez ailleurs.

## Règle de décision rapide

Une instruction à répéter manuellement = **Command**. Un savoir-faire à encapsuler = **Skill**. Une intégration tierce = **Plugin**. Une tâche à déléguer entièrement avec son propre contexte = **Agent**.
