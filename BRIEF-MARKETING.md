# Brief Marketing - Claude Code Ultimate Guide Landing Page

## Vue d'ensemble

**Produit** : Guide communautaire gratuit pour Claude Code (l'outil CLI d'Anthropic)
**URL actuelle** : https://florianbruniaux.github.io/claude-code-ultimate-guide-landing
**Repo GitHub** : https://github.com/FlorianBruniaux/claude-code-ultimate-guide
**Auteur** : Florian BRUNIAUX (Founding Engineer @ Méthode Aristote)
**Licence** : CC BY-SA 4.0 (gratuit, open source)

---

## Objectifs

1. **Acquisition** : Attirer des développeurs qui utilisent ou veulent utiliser Claude Code
2. **Conversion** : Les amener à lire le guide, utiliser les templates, faire le quiz
3. **Engagement** : Stars GitHub, contributions, partages
4. **Communauté** : Rediriger vers Dev With AI (communauté Slack francophone)

---

## Audience cible

| Persona | Description | Besoins |
|---------|-------------|---------|
| **Junior Developer** | Découvre Claude Code | Tutoriels simples, cheatsheet |
| **Senior Developer** | Veut optimiser son workflow | Hooks, agents, MCP servers |
| **Power User** | Maîtrise déjà Claude Code | Multi-agent, skills avancés |
| **Product Manager** | Non-technique | Overview architecture, privacy |

---

## Structure du site

### Pages

| Page | URL | Description |
|------|-----|-------------|
| **Landing** | `index.html` | Page principale avec overview |
| **Cheatsheet** | `cheatsheet.html` | Référence rapide 1-page (+ PDF) |
| **Quiz** | `quiz.html` | 159 questions pour tester ses connaissances |

### Sections de la Landing Page

1. **Hero**
   - Titre : "Master Claude Code"
   - Tagline : "The only comprehensive guide you need"
   - Stats : "9,600+ lines • 87 templates • 159 quiz questions"
   - CTAs : "Read the Guide" (vert) + "Cheat Sheet (5 min)" (gris)
   - Badges GitHub dynamiques (stars, lines, templates, quiz)

2. **Interactive Onboarding**
   - Badge violet : "Personalized Learning"
   - Commande à coller dans le terminal
   - 4 étapes : Language → Goal → Level → Path

3. **Quick Reference**
   - Table TL;DR avec temps de lecture
   - Template CLAUDE.md collapsible

4. **Why This Guide?** (Before/After comparison)
   - Sans le guide : ❌ Prompts génériques, config par défaut, debug trial & error
   - Avec le guide : ✅ Patterns testés, configs optimisées, méthodologies prouvées

5. **What's Inside**
   - 5 cards cliquables : Ultimate Guide, Cheat Sheet, 87 Templates, Quiz, Security

6. **Choose Your Path**
   - 4 parcours : Junior, Senior, Power User, Product Manager
   - Chaque parcours = liste d'étapes avec liens

7. **5 Golden Rules**
   - Règles numérotées 1-5 avec icônes

8. **Community & Resources**
   - Callout communauté française (Dev With AI)
   - Cards Contributing + Star on GitHub
   - Author card avec photo, bio, liens sociaux

9. **What's New**
   - Changelog dynamique (fetch depuis GitHub)
   - 3 dernières releases

10. **FAQ**
    - 4 questions accordéon

11. **Footer**
    - 3 colonnes : Documentation, Resources, Community
    - Version dynamique

---

## Textes actuels (copywriting)

### Hero
```
Title: Master Claude Code
Tagline: The only comprehensive guide you need
Stats: 9,600+ lines • 87 templates • 159 quiz questions
CTA Primary: Read the Guide
CTA Secondary: Cheat Sheet (5 min)
```

### Onboarding
```
Badge: Personalized Learning
Title: Start With Interactive Onboarding
Subtitle: Claude asks 2-4 questions about your profile, then guides you through personalized content

Steps:
1. Choose your language - English or French
2. Select your goal - Learn, audit setup, or explore
3. Pick your level - Junior, Senior, or Power User
4. Get personalized path - Curated content for you
```

### Why This Guide
```
Title: Why This Guide?
Subtitle: Stop wasting time on trial and error

WITHOUT:
✗ Generic prompts that miss context
✗ Default config leaving performance on the table
✗ Debugging by trial and error
✗ Scattered tutorials, outdated in weeks
✗ No clear learning progression

WITH:
✓ Battle-tested prompt patterns
✓ Optimized CLAUDE.md configurations
✓ Proven methodologies (TDD, SDD, BDD)
✓ 9,600+ lines of curated, maintained content
✓ Clear path from beginner to power user
```

### What's Inside
```
Title: What's Inside
Subtitle: Everything you need to become proficient

Cards:
- Ultimate Guide: Comprehensive reference covering every aspect of Claude Code (~3h reading)
- Cheat Sheet: One-page printable reference for daily use (5 min read)
- 87 Templates: Production-ready agents, commands, hooks, and skills
- 159-Question Quiz: Test your knowledge across all skill levels
- Security & Privacy: Data handling, hardening guides, and best practices
```

### 5 Golden Rules
```
1. Review diffs before accepting - Always check what Claude changes. Trust, but verify.
2. /compact at 70% context - Check with /status. Summarize before you hit the limit.
3. Be specific: WHAT + WHERE + HOW + VERIFY - Clear prompts get better results. Include success criteria.
4. Plan Mode first for complex tasks - Use Shift+Tab twice for risky or multi-step work.
5. Create CLAUDE.md for every project - Project context makes Claude significantly more effective.
```

### FAQ
```
Q: Is this guide official?
A: No, this is a community resource. It reflects personal experience after months of daily Claude Code usage, not official Anthropic documentation.

Q: What version of Claude Code is covered?
A: The guide is continuously updated. Current version: 3.8.0. Check the CHANGELOG for recent updates.

Q: Is my code sent to Anthropic?
A: Yes, Claude Code sends prompts and file contents to Anthropic servers. Default retention is 5 years (training enabled). You can opt-out to 30 days or use Enterprise for 0 retention.

Q: Can I contribute?
A: Yes! Found an error? Have a better template? Check the contributing guide.
```

### Author Bio
```
By Florian BRUNIAUX
Founding Engineer @ Méthode Aristote
11+ years in tech as CTO, VP Engineering & Founding Engineer. Fullstack developer (TypeScript, Ruby, Python) with a passion for solving problems through technology. Leadership driven by transparency, building teams with loyalty, ambition & benevolence.
```

### French Community Callout
```
🇫🇷 Communauté francophone
Tu veux parler de dev et d'IA ? Challenger des idées ? Présenter des outils ? En découvrir ?
Dev With AI rassemble près de 1500 devs sur Slack, tous niveaux et toutes technos confondus — enthousiastes comme sceptiques. Meetups à Paris, Bordeaux et Lyon.
```

---

## Design System

### Palette de couleurs (GitHub Dark Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0d1117` | Background principal |
| `--bg-secondary` | `#161b22` | Cards, sections alternées |
| `--bg-tertiary` | `#21262d` | Code blocks, inputs |
| `--text-primary` | `#c9d1d9` | Texte principal |
| `--text-secondary` | `#8b949e` | Texte secondaire |
| `--accent` | `#58a6ff` | Liens, accents bleu |
| `--accent-secondary` | `#238636` | CTA principal (vert GitHub) |
| `--border` | `#30363d` | Bordures |

### Typographie

- **Sans-serif** : `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- **Monospace** : `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas`
- **Hero title** : Gradient text (blanc → bleu)

### Composants UI

| Composant | Style |
|-----------|-------|
| **Cards** | `bg-secondary`, border 1px, border-radius 12px, hover: translateY(-4px) + shadow |
| **Buttons Primary** | Vert GitHub `#238636`, hover: `#2ea043` |
| **Buttons Secondary** | Ghost avec border, hover: border plus clair |
| **Code blocks** | Header gris + bouton Copy, contenu avec syntax highlighting |
| **Accordions** | Animation slideDown 0.2s |
| **Progress bar** | Fixed top, gradient bleu→violet |

### Animations

- **Scroll progress** : Barre en haut qui se remplit
- **Fade-in sections** : Intersection Observer, opacity + translateY
- **Hover cards** : translateY(-4px) + box-shadow
- **Copy button** : Feedback "Copied!" vert pendant 2s

### Accessibilité

- Skip link
- Focus states visibles (outline 2px)
- Contrast ratio ≥ 4.5:1
- `prefers-reduced-motion` respecté

---

## SEO actuel

### Meta Tags
```html
<title>Claude Code Guide - Master AI-Assisted Development</title>
<meta name="description" content="The only comprehensive guide you need for Claude Code. 9,600+ lines of documentation, 87 production-ready templates, and 159 quiz questions to master AI-assisted development.">
<meta name="keywords" content="Claude Code, Anthropic, AI coding, Claude CLI, AI development, programming assistant">
```

### Open Graph
```html
<meta property="og:title" content="Claude Code Guide - Master AI-Assisted Development">
<meta property="og:description" content="The only comprehensive guide you need. 9,600+ lines, 87 templates, 159 quiz questions.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://florianbruniaux.github.io/claude-code-ultimate-guide-landing">
<meta property="og:image" content="https://florianbruniaux.github.io/claude-code-ultimate-guide-landing/og-image.png">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Claude Code Guide">
<meta name="twitter:description" content="The only comprehensive guide you need. 9,600+ lines, 87 templates, 159 quiz questions.">
```

---

## Points forts à mettre en avant

1. **Quantité** : 9,600+ lignes, 87 templates, 159 questions quiz
2. **Gratuit** : Open source, CC BY-SA 4.0
3. **Maintenu** : Updates réguliers (version 3.8.0)
4. **Pratique** : Templates prêts à l'emploi, pas juste de la théorie
5. **Personnalisé** : Onboarding interactif avec parcours adaptés
6. **Crédibilité** : Auteur avec 11+ ans d'expérience (CTO, VP Engineering)

---

## Métriques actuelles

- **GitHub Stars** : Badge dynamique (à vérifier)
- **Quiz completions** : Pas de tracking actuellement
- **Temps sur page** : Pas de tracking actuellement

---

## Pistes d'amélioration SEO/Reach suggérées

### SEO On-page
- [ ] H1 unique et descriptif (actuellement "Master Claude Code")
- [ ] Alt text sur toutes les images
- [ ] Schema.org markup (Article, FAQ, HowTo)
- [ ] Sitemap XML
- [ ] robots.txt

### Content
- [ ] Blog/articles avec mots-clés longue traîne
- [ ] Tutoriels vidéo (YouTube SEO)
- [ ] Case studies / témoignages utilisateurs

### Distribution
- [ ] Reddit (r/programming, r/ClaudeAI, r/vscode)
- [ ] Hacker News
- [ ] Dev.to, Hashnode, Medium
- [ ] Twitter/X (threads techniques)
- [ ] LinkedIn (posts + articles)
- [ ] Discord/Slack dev communities
- [ ] Product Hunt launch?

### Technical SEO
- [ ] Core Web Vitals (LCP, FID, CLS)
- [ ] Mobile-first indexing check
- [ ] URL canoniques
- [ ] Hreflang (FR/EN?)

---

## Questions pour l'agent marketing

1. Comment améliorer le title/description pour le SEO ?
2. Quels mots-clés cibler (volume, difficulté) ?
3. Quelle stratégie de backlinks ?
4. Faut-il une version française du site ?
5. Quels canaux de distribution prioriser ?
6. Comment tracker les conversions (stars, quiz completions) ?
7. Le messaging actuel est-il clair / convaincant ?
8. Suggestions pour améliorer le taux de conversion ?

---

## Assets disponibles

| Asset | Format | Taille |
|-------|--------|--------|
| Logo Claude Code | `.webp` | ~15KB |
| Author photo | `.jpeg` | ~50KB |
| Favicon | `.svg` | ~1KB |
| OG Image | `.png` | À créer |
| Cheatsheet PDF | `.pdf` | 198KB |

---

## Liens utiles

- **Landing** : https://florianbruniaux.github.io/claude-code-ultimate-guide-landing
- **GitHub Repo** : https://github.com/FlorianBruniaux/claude-code-ultimate-guide
- **Guide principal** : https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md
- **Changelog** : https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/CHANGELOG.md
- **Dev With AI** : https://www.devw.ai/
- **Méthode Aristote** : https://methode-aristote.fr

---

*Document généré le 16 janvier 2026*
