---
title: Theming
subtitle: Customizing colors, dark mode overrides, and appearance
comments: false
---

Beautiful Hugo uses CSS custom properties for dark mode and provides several hooks for customizing the appearance without modifying theme files directly.

## Custom Stylesheets

The theme provides two partials for adding custom CSS:

- **`layouts/partials/head_custom.html`** — loaded in `<head>`, use for `<style>` blocks or `<link>` tags
- **`layouts/partials/footer_custom.html`** — loaded before `</body>`, use for late-loading styles or scripts

Create these files in your site's `layouts/` directory (not the theme's) to override them.

## Dark Mode Color Variables

Dark mode colors are defined as CSS custom properties on `[data-theme="dark"]` in `static/css/dark.css`:

| Variable | Default | Controls |
|----------|---------|----------|
| `--dark-bg` | `black` | Page background |
| `--dark-fg` | `white` | Body text |
| `--dark-link` | `#66bfff` | Links |
| `--dark-navbar-bg` | `#505050` | Navbar background |
| `--dark-navbar-border` | `#AAA` | Navbar border |
| `--dark-navbar-text` | `#b0b0b0` | Navbar text |
| `--dark-navbar-hover` | `#b0e0ff` | Navbar hover/focus |
| `--dark-surface` | `#444` | Card/panel backgrounds |
| `--dark-surface-hover` | `#666` | Surface hover state |
| `--dark-surface-active` | `#555` | Active/selected surface |
| `--dark-muted` | `#AAA` | Secondary/muted text |
| `--dark-accent` | `#0085a1` | Accent highlights |
| `--dark-code-bg` | `#222` | Inline code background |
| `--dark-code-fg` | `#fbb` | Inline code text |
| `--dark-code-block-bg` | `#0d1117` | Code block background |
| `--dark-code-block-fg` | `#e6edf3` | Code block text |
| `--dark-card-bg` | `#222` | Card backgrounds |
| `--dark-list-bg` | `#333` | List group backgrounds |
| `--dark-table-odd` | `#181818` | Odd table rows |
| `--dark-table-even` | `#303030` | Even table rows |

To override these, add rules in `layouts/partials/head_custom.html`:

```html
<style>
[data-theme="dark"] {
  --dark-bg: #1a1b26;
  --dark-fg: #c0caf5;
  --dark-link: #7aa2f7;
  --dark-code-bg: #24283b;
  --dark-code-fg: #f7768e;
}
</style>
```

The custom properties cascade normally — you only need to override the ones you want to change.

## Theme-Dependent Content

Use the `.theme-light` and `.theme-dark` classes to show elements only in a specific color scheme. Try toggling the theme with the button in the navbar — the blocks below will swap.

<div class="theme-light">
This text is visible only in <strong>light mode</strong>.
</div>

<div class="theme-dark">
This text is visible only in <strong>dark mode</strong>.
</div>

```html
<div class="theme-light">
  Visible only in light mode.
</div>

<div class="theme-dark">
  Visible only in dark mode.
</div>
```

With Hugo's Markdown attribute syntax:

```markdown
Visible only in light mode.
{.theme-light}

Visible only in dark mode.
{.theme-dark}
```

This is particularly useful for images or diagrams that need different versions for light and dark backgrounds. Mermaid diagrams use this mechanism internally for dual-rendering.

## Images with Transparent Backgrounds

Transparent images can look poor on a dark background. Add the `white` class to give them a white background in dark mode:

```markdown
![Diagram](/img/diagram.png)
{.white}
```

Or in HTML:

```html
<figure class="white">
  <img src="/img/diagram.png" alt="Diagram" />
</figure>
```

## Mermaid Diagrams in Dark Mode

In auto mode, Mermaid diagrams are dual-rendered — both a light and dark version are generated, and the CSS visibility rules swap them when the theme changes. In fixed light or dark mode, only the matching version is rendered.

See [Math & Diagrams](../math-and-diagrams/) for Mermaid setup.

## Overriding Theme CSS

For more extensive customization, you can override any of the theme's stylesheets. The load order in `<head>` is:

1. Bootstrap CSS
2. Font Awesome CSS
3. KaTeX CSS
4. `main.css` — core layout and typography
5. `dark.css` — dark mode overrides (only loaded when `colorScheme` is not `"light"`)
6. Syntax highlighting CSS
7. `codeblock.css` — code block styling
8. `toc.css` — table of contents panel
9. PhotoSwipe CSS
10. `head_custom.html` — your customizations

Because your custom partial loads last, its rules win on equal specificity. For higher-specificity theme rules, increase your selector specificity or use `!important`.

### Overriding dark.css entirely

If you want complete control over dark mode styles, you can copy `static/css/dark.css` into your site's `static/` directory and modify it. Hugo will use your version instead of the theme's.
