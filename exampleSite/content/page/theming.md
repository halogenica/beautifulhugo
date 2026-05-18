---
title: Theming
subtitle: Customizing colors, dark mode overrides, and appearance
comments: false
---

Beautiful Hugo uses CSS custom properties for dark mode and provides several hooks for customizing the appearance without modifying theme files directly.

## Custom Stylesheets

The theme provides three extension points for custom HTML, CSS, and scripts:

- **`layouts/partials/head_custom.html`** — loaded in `<head>`, use for `<style>` blocks or `<link>` tags
- **`layouts/partials/footer_custom.html`** — loaded after the `<footer>` element and before page scripts, use for additional markup or late-loading styles
- **`layouts/partials/footer.html`** — can be overridden to customize the footer content (links, copyright, etc.)

Create these files in your site's `layouts/` directory (not the theme's) to override them.

### Overriding the footer

The theme separates footer **content** from page **scripts**. The render order in the `footer` block of `baseof.html` is:

1. `footer.html` — the `<footer>` HTML block (social icons, copyright, credits)
2. `footer_custom.html` — your custom additions
3. `scripts.html` — jQuery, Bootstrap, `main.js`, KaTeX, PhotoSwipe, and other JS

Because scripts are in a separate `scripts.html` partial, overriding `footer.html` in your site **will not break** bigimg, syntax highlighting, or any other JavaScript feature. Simply create `layouts/partials/footer.html` with your custom footer markup.

For advanced use, a content template can `{{ define "footer" }}` to replace the entire footer section (content + scripts).

### Adding scripts without touching the footer

If you only need to add extra scripts (analytics, custom widgets, etc.) and are happy with the default footer, use `footer_custom.html` — your code runs after the footer content but before the theme scripts.

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

Use the `.theme-light` and `.theme-dark` CSS classes to show elements only in a specific color scheme. Mermaid diagrams use this mechanism internally for dual-rendering.

For usage examples with both raw HTML and Markdown block-attribute syntax, see [Markdown Extensions — Theme-Dependent Content](../markdown-extensions/#theme-dependent-content).

## Images with Transparent Backgrounds

Add the `white` class to give transparent images a white background in dark mode. For usage with both raw HTML and Markdown block-attribute syntax, see [Markdown Extensions — White Background for Dark Mode](../markdown-extensions/#white-background-for-dark-mode).

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

## Print Stylesheet

Beautiful Hugo includes a print stylesheet (`static/css/print.css`) that is automatically applied when a user prints a page (or uses the browser's "Save as PDF" feature). It provides a clean, printer-friendly layout:

- **Hidden elements**: navbar, TOC panel, comments, social share buttons, GitHub buttons, copy-code buttons, search modal, theme toggle, and big image transition animations are all hidden.
- **Link URLs shown inline**: non-anchor, non-JavaScript links display their URL in parentheses after the link text (e.g. "Visit Hugo \[https://gohugo.io\]").
- **Full-width layout**: container and column constraints are removed so content uses the full page width.
- **Typography**: body text is set to 12pt with 1.5 line height; headings and paragraphs respect orphans/widows rules.
- **Page breaks**: images, blockquotes, code blocks, and headings avoid being split across pages.
- **Code blocks**: overflow is made visible and text wraps to avoid clipping.
- **Dark mode reset**: dark mode backgrounds and colors are overridden to black-on-white for printing.
- **Tab content**: tab navigation is hidden; all tab panes are displayed in sequence.

No configuration is needed — the print stylesheet is loaded automatically.

## Accessibility: Reduced Motion

Beautiful Hugo respects the `prefers-reduced-motion` media query. When a user has enabled "Reduce motion" in their operating system settings:

- **Big image cycling** is disabled — the first header image is shown without animation.
- **CSS transitions** (fade effects, hover transitions, slide animations) are disabled.
- **Hover effects** that rely on motion are suppressed.

This behavior is automatic and requires no configuration. The theme checks `prefers-reduced-motion: reduce` in both CSS and JavaScript to provide a comfortable experience for users who are sensitive to motion.

## Bootstrap Tooltips

Beautiful Hugo initializes Bootstrap 5 tooltips on any element with the `data-bs-toggle="tooltip"` attribute. The theme uses tooltips internally on the navbar TOC toggle and theme toggle buttons. You can add tooltips to your own custom HTML in content or partials:

```html
<button data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip text">
  Hover me
</button>
```

Supported `data-bs-placement` values: `top`, `bottom`, `left`, `right`.
