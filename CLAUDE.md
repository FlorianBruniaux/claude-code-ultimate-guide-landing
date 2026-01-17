# Landing Site - Claude Code Ultimate Guide

## Source de vérité

**Ce site est SECONDAIRE**. La source de vérité est le guide principal:
`/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/`

**Workflow obligatoire**:
1. Modifier d'abord le guide principal
2. Puis synchroniser ici

Ne JAMAIS modifier les stats ou le contenu ici sans avoir d'abord mis à jour le guide principal.

## Éléments synchronisés depuis le guide

| Élément | Source (guide) | Fichiers landing |
|---------|----------------|------------------|
| Version | `VERSION` | index.html (footer + FAQ) |
| Templates count | `find examples/ -type f` | index.html (title, meta, badges, section), examples.html |
| Quiz questions | questions.json count | quiz.html, index.html |
| Guide lines | `wc -l guide/ultimate-guide.md` | index.html badges |
| Golden Rules | README.md | index.html section |
| FAQ | README.md | index.html (schema + HTML) |

## Valeurs actuelles (à maintenir synchronisées)

| Métrique | Valeur | Source |
|----------|--------|--------|
| Version | `3.8.2` | VERSION file |
| Templates | `49` | Count of examples/ files |
| Quiz questions | `159` | questions.json |
| Guide lines | `9,600+` | ultimate-guide.md |

## Fichiers critiques

- **index.html**: Hero, badges, meta tags, FAQ, Golden Rules, footer version
- **examples.html**: Template count et liste
- **quiz.html**: Question count
- **styles.css**: Partagé (ne pas modifier sans raison)

## Vérification avant modification

```bash
# Depuis le guide principal
./scripts/check-landing-sync.sh
```

## Emplacements des stats dans index.html

### Version (3.8.1)
- Ligne ~837: FAQ text "Current version: X.X.X"
- Ligne ~892: Footer `<p class="version">vX.X.X</p>`

### Templates count (49)
- Ligne ~6: `<title>` tag
- Ligne ~9: meta description
- Ligne ~18-19: og:title, og:description
- Ligne ~27: twitter:description
- Ligne ~188: hero-stats
- Ligne ~204: badge image
- Ligne ~455: section heading
- Ligne ~478: section title (déjà correct)
- Ligne ~722: CTA button (déjà correct)

### Dans examples.html
- Ligne ~6: `<title>` tag
- Ligne ~29: section title