# Landing Site - Claude Code Ultimate Guide

## URLs

| Environnement | URL |
|---------------|-----|
| **Production** | https://florianbruniaux.github.io/claude-code-ultimate-guide-landing/ |
| **Custom Domain** | https://claudecode.bruniaux.com (à configurer) |
| **GitHub Repo** | https://github.com/FlorianBruniaux/claude-code-ultimate-guide-landing |

## Configuration Custom Domain

**Domaine cible**: `claudecode.bruniaux.com`

### Étapes de configuration

1. **Créer fichier CNAME** (à la racine du repo):
   ```
   claudecode.bruniaux.com
   ```

2. **Configurer DNS** (chez le registrar de bruniaux.com):
   - Type: `CNAME`
   - Host: `claudecode`
   - Value: `florianbruniaux.github.io`

3. **Activer HTTPS** dans GitHub Pages settings (après propagation DNS)

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
| **Guide search index** | `guide/*.md` headings | `guide-data.js` (45+ entrées) |
| **Claude Code Releases** | `machine-readable/claude-code-releases.yaml` | index.html (banner + #releases section) |
| **AI Ecosystem tools** | `guide/ai-ecosystem.md` | index.html (#ecosystem section) |
| **Voice-to-Text** | `guide/ai-ecosystem.md#7-voice-to-text-wispr-flow` | index.html (#ecosystem card) |

## Valeurs actuelles (à maintenir synchronisées)

| Métrique | Valeur | Source |
|----------|--------|--------|
| Version | `3.11.4` | VERSION file |
| Templates | `77` | Count of examples/ files (excl. README/index) |
| Quiz questions | `227` | questions.json |
| Guide lines | `13,800+` | ultimate-guide.md |

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

## Synchronisation guide-data.js (recherche globale)

Le fichier `guide-data.js` indexe les sections du guide pour la recherche Cmd+K.

**Quand mettre à jour :**
- Nouvelle section majeure ajoutée au guide
- Fichier .md renommé ou supprimé
- Ancre (#section) modifiée

**Ce qui n'impacte PAS :**
- Corrections de typos
- Ajouts de contenu dans sections existantes

**Workflow de mise à jour :**
```bash
# 1. Vérifier les changements dans le guide
./scripts/sync-guide-data.sh

# 2. Éditer guide-data.js manuellement pour ajouter/modifier les entrées
# Format: { id, type: 'guide', title, content (keywords), url }

# 3. Tester localement
python3 -m http.server 8080
# Cmd+K → vérifier les nouveaux résultats
```

**Structure d'une entrée guide-data.js :**
```javascript
{
    id: 'guide-unique-id',
    type: 'guide',
    title: 'Titre affiché dans les résultats',
    content: 'mots-clés séparés par espaces pour le fuzzy search',
    url: GUIDE_BASE + 'fichier.md#ancre'
}
```

## Synchronisation Claude Code Releases

Les releases Claude Code sont affichées dans deux endroits:
1. **Version banner** (après le header) - version actuelle avec lien "What's new →"
2. **Section #releases** - timeline des 5 dernières versions + breaking changes

**Source de vérité:** `machine-readable/claude-code-releases.yaml` dans le guide principal

**Quand mettre à jour :**
- Nouvelle version majeure de Claude Code publiée
- Breaking change annoncé par Anthropic
- Correction d'une date ou feature incorrecte

**Éléments à synchroniser :**

| Élément | Emplacement index.html |
|---------|------------------------|
| Version actuelle | `.cc-version-badge` (ligne ~197) |
| 5 dernières releases | `.releases-timeline` cards |
| Breaking changes | `.breaking-changes` liste |

**Workflow de mise à jour :**
```bash
# 1. Mettre à jour le YAML source dans le guide principal
vim /path/to/guide/machine-readable/claude-code-releases.yaml

# 2. Reporter les changements dans index.html
# - Mettre à jour le badge version si nouvelle release
# - Ajouter/modifier les release cards (garder les 5 plus récentes)
# - Mettre à jour les breaking changes si nouveaux

# 3. Tester localement
python3 -m http.server 8080
# Vérifier le banner et la section #releases
```

**Structure d'une release card :**
```html
<div class="release-card"><!-- ajouter "release-latest" pour la plus récente -->
    <div class="release-header">
        <span class="release-version">vX.Y.Z</span>
        <span class="release-date">Mon D, YYYY</span>
    </div>
    <ul class="release-highlights">
        <li>Feature 1</li>
        <li>Feature 2 avec <code>code</code></li>
    </ul>
</div>
```

**Structure d'un breaking change :**
```html
<li><span class="breaking-badge">Type</span> Description avec <code>code</code></li>
```

## Claude Code Releases Sync Policy

**Source de vérité:** `machine-readable/claude-code-releases.yaml` dans le guide principal

**Règle de sélection (5 releases notables):**
Inclure si AU MOINS UN critère :
1. Feature marquée ⭐ dans le YAML
2. Breaking change présent
3. ≥3 highlights dans le YAML

Exclure si :
- Bugfix-only (1 highlight sans ⭐)
- Fix/patch sans impact utilisateur visible

**Banner version:** Toujours la version actuelle (même bugfix-only)

**Breaking changes priorité:**
1. Security fixes (toujours afficher)
2. OAuth/URL changes (user-facing)
3. Behavior changes
4. Deprecations (peut différer)

**Fréquence sync:** Vérifier YAML hebdomadairement ou lors de nouvelle série (2.2.x, etc.)

## Emplacements des stats dans index.html

### Version (3.8.1)
- Ligne ~837: FAQ text "Current version: X.X.X"
- Ligne ~892: Footer `<p class="version">vX.X.X</p>`

### Templates count (55)
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