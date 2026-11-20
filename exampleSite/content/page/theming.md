---
title: Theming
subtitle: Customizing colors, dark mode overrides, and appearance
comments: false
---

Beautiful Hugo uses CSS custom properties for fonts and colors and provides several hooks for customizing the appearance without modifying theme files directly.

## Custom Stylesheets

The theme provides four extension points for custom HTML, CSS, and scripts:

- **`assets/css/custom.css`** — your own stylesheet, loaded after all theme CSS (see [Custom CSS file](#custom-css-file))
- **`layouts/_partials/head_custom.html`** — loaded in `<head>`, use for `<style>` blocks or `<link>` tags
- **`layouts/_partials/footer_custom.html`** — loaded after the `<footer>` element and before page scripts, use for additional markup or late-loading styles
- **`layouts/_partials/footer.html`** — can be overridden to customize the footer content (links, copyright, etc.)

Create these files in your site (not in the theme). The stylesheet goes in `assets/css/`, and the partials go in `layouts/_partials/`.

### Custom CSS file

If your site has an `assets/css/custom.css` file, the theme loads it automatically. No configuration is necessary. The theme skips a file that has no rules (for example, only comments). The file goes through the same pipeline as the theme CSS: it is minified in production builds, fingerprinted, and linked with an `integrity` attribute.

The file loads after all theme stylesheets, so its rules win on equal specificity. It is a separate file, not part of the theme bundle, so an `@import` at the top of the file works.

```css
/* assets/css/custom.css */
:root {
  --bh-accent: #b5460f;
  --bh-navbar-bg: #fdf6e3;
}
```

See [Font and Color Variables](#font-and-color-variables) for the full list.

Use `head_custom.html` when you need HTML tags, such as `<link rel="preconnect">` or `<meta>`.

### Fonts

The theme loads two web fonts: Lora for body text and Open Sans for headings, the navbar, and interface elements. To use other fonts, set `webFonts = false` so that the theme does not load them, then set your fonts in `assets/css/custom.css`:

```toml
[Params]
  webFonts = false
```

```css
/* assets/css/custom.css */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

:root {
  --bh-font-body: Georgia, serif;
  --bh-font-heading: "Inter", sans-serif;
}
```

### Overriding the footer

The theme separates footer **content** from page **scripts**. The render order in the `footer` block of `baseof.html` is:

1. `footer.html` — the `<footer>` HTML block (social icons, copyright, credits)
2. `footer_custom.html` — your custom additions
3. `scripts.html` — Bootstrap, `main.js`, KaTeX, PhotoSwipe, and other JS

Because scripts are in a separate `scripts.html` partial, overriding `footer.html` in your site **will not break** bigimg, syntax highlighting, or any other JavaScript feature. Simply create `layouts/_partials/footer.html` with your custom footer markup.

For advanced use, a content template can `{{ define "footer" }}` to replace the entire footer section (content + scripts).

### Adding scripts without touching the footer

If you only need to add extra scripts (analytics, custom widgets, etc.) and are happy with the default footer, use `footer_custom.html` — your code runs after the footer content but before the theme scripts.

## Font and Color Variables

The fonts and the light-mode colors are CSS custom properties on `:root` in `assets/css/main.css`:

| Variable | Default | Controls |
|----------|---------|----------|
| `--bh-font-body` | `'Lora', 'Times New Roman', serif` | Body text |
| `--bh-font-heading` | `'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif` | Headings, navbar, buttons, metadata |
| `--bh-bg` | `#fff` | Page background |
| `--bh-text` | `#404040` | Body text, navbar and footer links |
| `--bh-muted` | `#666` | Secondary text (post metadata, blockquotes) |
| `--bh-subtle` | `#888` | Tertiary text (subtitles, search excerpts) |
| `--bh-link` | `#0066cc` | Links |
| `--bh-accent` | `#0085a1` | Link hover, selection, active and hover states |
| `--bh-accent-strong` | `#006680` | Secondary text on a hovered card |
| `--bh-accent-bg` | `#f0f8fa` | Hovered card background |
| `--bh-on-accent` | `#fff` | Text on an accent background |
| `--bh-navbar-bg` | `#f5f5f5` | Navbar, footer, and search background |
| `--bh-navbar-border` | `#eaeaea` | Navbar and footer border |
| `--bh-hover-bg` | `#eee` | Hovered menu item background |
| `--bh-panel-bg` | `#f8f8f8` | Tabs, details, and even table rows |
| `--bh-card-bg` | `#fafafa` | Card backgrounds (archive, terms, see-also, recipe) |
| `--bh-card-border` | `#e8e8e8` | Card borders |
| `--bh-border` | `#e0e0e0` | Other borders |
| `--bh-border-strong` | `#ccc` | Table, archive button, and view-source borders |
| `--bh-rule` | `#eee` | Post separators, blockquote bar, disclaimer border |
| `--bh-faint` | `#aaa` | Search placeholder, header image shadow |
| `--bh-overlay-hover` | `rgba(0, 0, 0, 0.03)` | Focused side arrows |
| `--bh-shadow` | `rgba(0, 0, 0, 0.08)` | Card and details shadows |
| `--bh-shadow-strong` | `rgba(0, 0, 0, 0.8)` | Avatar shadow, text shadow on header images |
| `--bh-img-text` | `#fff` | Text on header images |
| `--bh-img-desc-bg` | `rgba(30, 30, 30, 0.6)` | Header image description background |
| `--bh-tag-hover` | `#004c99` | Hovered tag and category text |
| `--bh-tag-hover-bg` | `#ccc` | Hovered tag and category background |
| `--bh-share-bg` | `#b5c6ce` | Share button background |

To change them, set new values in `assets/css/custom.css`:

```css
:root {
  --bh-accent: #b5460f;
  --bh-link: #8a3c00;
}
```

Callouts (`alert-*` and the legacy `box-*` classes), the footer disclaimer, and `<mark>` use the Bootstrap variables `--bs-<type>-text-emphasis`, `--bs-<type>-bg-subtle`, and `--bs-<type>-border-subtle`, where `<type>` is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, or `dark`. The `note` callout uses the `secondary` set. `dark.css` sets the Bootstrap dark values on `:root[data-theme="dark"]`, so set these variables on `:root` for light mode and on `:root[data-theme="dark"]` for dark mode.

In dark mode, the theme points the `--bh-*` color variables at the `--dark-*` variables below. Set the `--dark-*` variables to change dark mode. `--dark-accent` follows `--bh-accent`, so one change to `--bh-accent` sets the accent in the two modes. The variables that have no dark counterpart, such as the shadows, header image colors, and `--bh-tag-hover`, are the same in the two modes.

## Dark Mode Color Variables

Dark mode colors are defined as CSS custom properties on `[data-theme="dark"]` in `assets/css/dark.css`:

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
| `--dark-accent` | `var(--bh-accent)` | Accent highlights |
| `--dark-code-bg` | `#222` | Inline code background |
| `--dark-code-fg` | `#fbb` | Inline code text |
| `--dark-code-block-bg` | `#0d1117` | Code block background |
| `--dark-code-block-fg` | `#e6edf3` | Code block text |
| `--dark-card-bg` | `#222` | Card backgrounds |
| `--dark-list-bg` | `#333` | List group backgrounds |
| `--dark-table-odd` | `#181818` | Odd table rows |
| `--dark-table-even` | `#303030` | Even table rows |
| `--dark-subtle` | `#888` | Footer muted text, recipe labels |
| `--dark-title` | `#eee` | TOC and recipe section titles |
| `--dark-on-accent` | `#fff` | Text on an accent background |
| `--dark-overlay-hover` | `rgba(255, 255, 255, 0.04)` | Focused side arrows |

To override these, add rules in `assets/css/custom.css`:

```css
[data-theme="dark"] {
  --dark-bg: #1a1b26;
  --dark-fg: #c0caf5;
  --dark-link: #7aa2f7;
  --dark-code-bg: #24283b;
  --dark-code-fg: #f7768e;
}
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
4. The theme bundle, one fingerprinted file that concatenates in order:
   - `main.css` — core layout and typography
   - `dark.css` — dark mode overrides (only when `colorScheme` is not `"light"`)
   - `staticman.css` — only when Staticman is enabled
   - `syntax.css` — Chroma syntax highlighting (only when `useHLJS` is off)
   - `codeblock.css` — code block styling
   - `toc.css` — table of contents panel (only when `toc` is not `false`)
   - `search.css` — search page styling (only on the search page)
5. `print.css` — print stylesheet, `media="print"`
6. Highlight.js CSS, or `syntax-dark.css` for Chroma dark mode (kept separate so JS can toggle it)
7. PhotoSwipe CSS
8. `custom.css` — your stylesheet, if `assets/css/custom.css` exists
9. `head_custom.html` — your customizations

Because your stylesheet and custom partial load last, their rules win on equal specificity. For higher-specificity theme rules, increase your selector specificity or use `!important`.

The theme's own stylesheets and scripts live in `assets/` and are processed with Hugo Pipes: the files are concatenated into one CSS bundle and one JS bundle, minified in production builds (not under `hugo serve`, so the served files stay readable), fingerprinted for cache busting, and linked with a Subresource Integrity `integrity` attribute. To replace one, put a file with the same path in your site's `assets/` directory (for example `assets/css/main.css`). Hugo uses your copy instead of the theme's and the pipeline applies unchanged.

### Overriding dark.css entirely

If you want complete control over dark mode styles, you can copy `assets/css/dark.css` into your site's `assets/css/` directory and modify it. Hugo will use your version instead of the theme's.

## Print Stylesheet

Beautiful Hugo includes a print stylesheet (`assets/css/print.css`) that is automatically applied when a user prints a page (or uses the browser's "Save as PDF" feature). It provides a clean, printer-friendly layout:

- **Hidden elements**: navbar, TOC panel, comments, social share buttons, GitHub buttons, copy-code buttons, search modal, theme toggle, and big image transition animations are all hidden.
- **Link URLs shown inline**: non-anchor, non-JavaScript links display their URL in parentheses after the link text (e.g. "Visit Hugo" followed by `[https://gohugo.io]`).
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
