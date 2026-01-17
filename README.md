# Claude Code Guide - Landing Page

Landing page for the [Claude Code Ultimate Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide).

## Live Site

**URL**: [florianbruniaux.github.io/claude-code-ultimate-guide-landing](https://florianbruniaux.github.io/claude-code-ultimate-guide-landing)

## Setup GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** (left sidebar)
3. Under **Source**, select `Deploy from a branch`
4. Select `main` branch and `/ (root)` folder
5. Click **Save**

The site will be live at `https://florianbruniaux.github.io/claude-code-ultimate-guide-landing` within a few minutes.

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS at your registrar:
   - For apex domain: A records pointing to GitHub Pages IPs
   - For subdomain: CNAME record pointing to `florianbruniaux.github.io`

See [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Structure

```
claude-code-ultimate-guide-landing/
├── index.html    # Single-page site
├── styles.css    # Dark mode styles
├── favicon.svg   # Terminal icon
└── README.md     # This file
```

## Content Updates

The landing page pulls stats and links from the main repository. When updating:

1. **Version**: Update in `index.html` footer (currently v3.8.0)
2. **Stats**: Update badge numbers if main repo changes significantly
3. **Links**: All links point to the main `claude-code-ultimate-guide` repository

## Development

No build step required. Open `index.html` in a browser or use a local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve
```

## License

CC BY-SA 4.0 - Same as the main guide.
