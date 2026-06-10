---
title: Configuration
subtitle: Every setting Beautiful Hugo supports
comments: false
---

This page is a complete reference for every configuration option in Beautiful Hugo. All settings go in your site's `hugo.toml` (or `config.toml`/`config.yaml`).

## Core Settings

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `homeTitle` | string | site title | Brand name shown in the navbar, home page header, and footer link. Falls back to the site title when unset |
| `subtitle` | string | `""` | Site subtitle shown under the home page title |
| `mainSections` | list | `["post", "posts"]` | Content sections treated as "posts" on the home page and archive page |
| `logo` | string | — | Path to a square avatar/logo image. When the file is found via Hugo's asset pipeline (`resources.Get`), it is automatically processed into WebP format (300×300, quality 100) for optimal loading. If the file is not found as a resource, the raw path is used as-is. |
| `favicon` | string | — | Path to favicon |
| `dateFormat` | string | i18n default | Date format string. Accepts Hugo locale tokens (e.g. `":date_long"`, `":date_medium"`, `":date_short"`) for automatic localization, or a Go time layout string based on the reference time `Mon Jan 2 15:04:05 MST 2006` (e.g. `"January 2, 2006"` or `"2006-01-02"`). **Do not use an example date** like `"2023-10-15"` — the year must be `2006`, month `01`, and day `02`. Locale tokens are recommended for multilingual sites. The theme validates `dateFormat` at build time and will emit a build error if it detects an invalid format (e.g. a date that doesn't use Go's reference time). |
| `since` | int | — | Start year for copyright range (e.g. `2015 - 2026`) |

```toml
[Params]
  subtitle = "Build a beautiful and simple website in minutes"
  mainSections = ["post", "posts"]
  logo = "/img/avatar-icon.png"
  favicon = "/img/favicon.ico"
  dateFormat = ":date_long"
  since = 2015
```

## Math Engine

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `mathEngine` | string | `"katex"` | `"katex"`, `"mathjax"`, or `"none"` |

- **`"katex"`** — Loads [KaTeX](https://katex.org/) (CSS + JS) for math rendering. This is the current behavior and the default for backward compatibility.
- **`"mathjax"`** — Loads [MathJax 3](https://www.mathjax.org/) from CDN instead of KaTeX. MathJax is always loaded from CDN regardless of `selfHosted` since it is much larger than KaTeX.
- **`"none"`** — Disables math rendering entirely; no math assets are loaded.

```toml
[Params]
  mathEngine = "mathjax"
```

## Author

`[Params.author]` is **required**. The old top-level `[author]` key is deprecated and will produce a build error.

| Param | Type | Description |
|-------|------|-------------|
| `name` | string | Author display name (used in meta, copyright, post meta) |
| `website` | string | Author website URL (linked from copyright) |
| `email` | string | Email (mailto: link in footer) |

You can also add any social platform key here — see [Comments & Social](../comments-and-social/) for the full list of 42 platforms.

```toml
[Params.author]
  name = "Some Person"
  website = "yourwebsite.com"
  email = "youremail@domain.com"
  github = "username"
  twitter = "username"
```

If a social value starts with `http://` or `https://`, it is used as-is. Otherwise it is interpolated into the platform's default URL pattern.

## Color Scheme

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `colorScheme` | string | `"auto"` | `"auto"`, `"dark"`, or `"light"` |

### How it works

The theme uses the `data-theme` attribute on `<html>` to control dark mode:

- **`"auto"`** — Follows the system preference (`prefers-color-scheme`). A toggle button appears in the navbar so users can override it. The toggle cycles through **auto → light → dark → auto**.
- **`"dark"`** — Always dark. No toggle button is shown.
- **`"light"`** — Always light. No toggle button is shown; dark CSS is not loaded at all.

When `colorScheme = "auto"`, the theme reacts to OS-level dark mode changes in real time via a `matchMedia` listener. If a user changes their system appearance while the site is open, the page updates immediately (unless they have explicitly chosen light or dark via the toggle).

The user's toggle preference persists across pages via `localStorage` (key: `theme`). An inline script in `<head>` restores it before the first paint to prevent a flash of the wrong theme.

For customizing dark mode colors, theme-dependent content, and other appearance overrides, see [Theming](../theming/).

### selfHosted assets

When `selfHosted = true`, the following assets are served from `static/` instead of CDNs:

| Asset | CDN Source | Local Path |
|-------|-----------|------------|
| Bootstrap 5.3.5 CSS | `cdn.jsdelivr.net` | `css/bootstrap.min.css` |
| Font Awesome 7 | `use.fontawesome.com` | `fontawesome/css/*.min.css` |
| KaTeX CSS | `cdn.jsdelivr.net` | `css/katex.min.css` |
| KaTeX JS | `cdn.jsdelivr.net` | `js/katex.min.js` + `js/auto-render.min.js` |
| Google Fonts (Lora, Open Sans) | `fonts.googleapis.com` | `css/fonts.css` + `fonts/` |
| jQuery 4.0.0 | `code.jquery.com` | `js/jquery-4.0.0.slim.min.js` |
| Bootstrap 5.3.5 JS | `cdn.jsdelivr.net` | `js/bootstrap.min.js` |
| KaTeX JS | `cdn.jsdelivr.net` | `js/katex.min.js` + `js/auto-render.min.js` |
| Highlight.js | `cdn.jsdelivr.net` | `js/highlight.min.js` + `css/highlight*.min.css` |
| PhotoSwipe 5.4.4 | `cdn.jsdelivr.net` | `js/photoswipe*.min.js` + `css/photoswipe.css` |

```toml
[Params]
  colorScheme = "auto"
  selfHosted = false
```

## Content Display

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `readingTime` | bool | `false` | Show reading time in post meta |
| `wordCount` | bool | `false` | Show word count in post meta |
| `hideAuthor` | bool | `false` | Hide author from post meta |
| `socialShare` | bool | `false` | Enable social sharing buttons on posts |
| `showRelatedPosts` | bool | `false` | Show related posts (by tag intersection) |
| `related_content_limit` | int | `5` | Max number of related posts to display |
| `rss` | bool | `false` | Show RSS icon in footer |
| `disableFigureOverride` | bool | `false` | When `true`, use Hugo's native `<figure>` shortcode; `beautifulfigure` remains available |
| `navShort` | bool | `false` | Make navbar permanently short (collapsed style) |
| `showPageDates` | bool | `false` | Show dates on "page" type pages |
| `hidePostDates` | bool | `false` | If true, hides dates on "post" type pages |
| `toc` | bool | `true` | Show a floating table-of-contents button on pages with headings |
| `showSource` | bool | `false` | Show a "View source" button linking to the page's source file in the repository |
| `showPostNav` | bool | `true` | Show previous/next post navigation (side arrows on wide screens, bottom pager on narrow screens) |
| `sourceRepo` | string | — | Base URL for the repository source browser (e.g. `https://github.com/user/repo/blob/main/`). The page's `.File.Path` is appended automatically. When `enableGitInfo = true` is set, the branch in the URL is replaced with the current commit hash, so the link always points to the exact version of the file |

```toml
[Params]
  readingTime = true
  wordCount = true
  socialShare = true
  showRelatedPosts = true
  disableFigureOverride = true
  showSource = true
  showPostNav = true
  sourceRepo = "https://github.com/user/repo/blob/main/"
```

### Table of Contents Panel

When `toc = true` (the default), a list-style button appears in the navbar on pages that have headings or list pages that have posts. Clicking it opens a slide-out panel on the left side of the viewport.

**On single pages** (posts, regular pages), the panel shows the page's heading hierarchy extracted from the Table of Contents. An `IntersectionObserver` tracks which heading is currently in view and highlights the corresponding link in the panel.

**On list and home pages**, the panel shows a list of post titles instead of headings. Scrolling through the post previews automatically highlights the currently visible post in the panel.

The panel can be closed by clicking the close button, clicking the backdrop overlay, or pressing `Escape`.

## Big Image Header

Add one or more full-width header images to the home page. Multiple images cycle automatically with a fade transition.

```toml
[[Params.bigimg]]
  src = "/img/triangle.jpg"
  desc = "Triangle"
[[Params.bigimg]]
  src = "/img/sphere.jpg"
  desc = "Sphere"
  position = "center top"
[[Params.bigimg]]
  src = "/img/hexagon.jpg"
  desc = "Hexagon"
```

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `src` | string | — | Image path (absolute or relative) |
| `desc` | string | — | Image description (supports Markdown links) |
| `position` | string | — | CSS `background-position` value (e.g. `"center top"`) |

| `headerImgStyle` | string | `"big"` | Header image height: `"big"` (default, 100–150px padding) or `"narrow"` (25px padding, crops image top and bottom) |

```toml
[Params]
  headerImgStyle = "narrow"
```

See [Pages & Layouts](../pages-and-layouts/#big-image-headers) for per-page big image headers and visual examples.

## Syntax Highlighting

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `useHLJS` | bool | `false` | Use client-side Highlight.js instead of Hugo's built-in Chroma |

{{< tabs >}} {{< tab "Chroma" >}}

```toml
[markup.highlight]
  noClasses = false

[markup.goldmark.parser.attribute]
  block = true
```

- `noClasses = false` is required for Chroma to use an external CSS file (`static/css/syntax.css`)

{{< /tab >}} {{< tab "Highlight.js" >}}

```toml
[Params]
  useHLJS = true

[markup.highlight]
  codeFences = false
```

When `useHLJS = true`, Highlight.js is loaded from CDN (or `static/js/highlight.min.js` if `selfHosted = true`) with a default light theme and a dark theme that activates automatically. You do not need Chroma code fences — Highlight.js applies styles via JavaScript.

{{< /tab >}} {{< /tabs >}}

See [Code Blocks](../code-blocks/) for details and examples.

### Including External Files

The `include-code` shortcode reads a source file from disk and renders it with syntax highlighting. See [Code Blocks](../code-blocks/#including-external-files) for the full parameter reference and live examples.

## Comment Systems

Beautiful Hugo supports five comment systems (Disqus, Giscus, Utterances, Cusdis, Staticman). Each is enabled per-page with `comments: true` in front matter. See [Comments & Social](../comments-and-social/) for configuration details.

## Analytics & Search

Google Analytics, Piwik/Matomo, and search (GCSE or built-in Fuse) are covered in [SEO & i18n](../seo-and-i18n/#analytics-and-search).

## SEO Robot Meta Tags

Site-wide `<meta name="robots">` tags can be set from `hugo.toml`. These settings only apply to pages in `mainSections`; other pages can set tags via front matter.

See [SEO & i18n](../seo-and-i18n/) for the full reference including per-page overrides, AI summary limits, and all supported tags.

## Custom HTML Hooks

Beautiful Hugo provides partial "hooks" that let you inject custom HTML at specific points in the layout without forking the theme. To use a hook, create the corresponding file in your site's `layouts/partials/` directory — the theme's own copy is an empty stub.

| Partial | Injects Near | Example Use |
|---------|-------------|-------------|
| `head_custom.html` | End of `<head>`, before `</head>` | Extra CSS, preconnect hints, meta tags |
| `nav_custom.html` | Inside the navbar, after menu items | CTA button, search box, custom nav link |
| `header_custom.html` | Inside the page header, after title/subtitle | Hero CTA button, banner |
| `before_content.html` | Before `.Content` on single pages | Affiliate disclosure, reading-time banner |
| `after_content.html` | After `.Content`, before tags/share/related | Newsletter signup, author bio, ad unit |
| `footer_custom.html` | After `</footer>`, before scripts | Custom analytics, chat widget |
| `scripts_custom.html` | After all theme JS, before `</body>` | Custom JS that depends on jQuery/Bootstrap |

See [Theming](../theming/#custom-stylesheets) for details on using these hooks for CSS and script customization.

## Miscellaneous

| Param | Type | Description |
|-------|------|-------------|
| `disclaimerText` | string | Disclaimer text shown in footer with a yellow-bordered box |
| `commit` | string | Base URL for Git commit links (appended with `.GitInfo.Hash`) |
| `disableCanonical` | bool | Suppress the `<link rel="canonical">` tag site-wide (see [SEO & i18n — Canonical URLs](../seo-and-i18n/#canonical-urls)) |

Git features (`commit`) require `enableGitInfo = true` at the top level of your config (not under `[Params]`) so Hugo populates `.GitInfo`. Example:

```toml
commit = "https://github.com/user/repo/commit/"
```

## Per-Page Front Matter

These options can be set in the front matter of any page or post:

| Param | Type | Description |
|-------|------|-------------|
| `subtitle` | string | Page/post subtitle |
| `bigimg` | list | Per-page big header images (same format as site-level) |
| `headerImgStyle` | string | Header image height: `"big"` or `"narrow"` |
| `fullWidth` | bool | Full-width content layout (no sidebar offset) |
| `socialShare` | bool | Override site-level social sharing for this page |
| `showAvatar` | bool | Show/hide navbar avatar (default: `true`) |
| `comments` | bool | Enable comments on this page |
| `hidden` | bool | Hide from list pages |
| `image` | string | Post preview image (circular, shown in list pages) |
| `video` | string | Post preview video (loop, autoplay, muted) |
| `summary` | string | Custom summary text |
| `description` | string | Page description for meta tags and structured data (see [SEO & i18n — Description Cascade](../seo-and-i18n/#description-cascade)) |
| `type` | string | Content type that determines template behavior: `"page"`, `"post"`, or `"recipe"` (see [Pages & Layouts](../pages-and-layouts/)) |
| `author` | string/list | Per-page author(s) (string or list of strings; supports Markdown links, e.g. `"[Jane Doe](https://example.com)"`) |
| `tags` | list | Tags for categorization |
| `categories` | list | Categories for grouping posts |
| `share_img` | string | Social sharing image (falls back to `image` then `logo`) |
| `ExpiryDate` | date | Adds `<meta name="robots" content="unavailable_after: ...">` |
| `seo` | map | Per-page robot meta tag overrides (see [SEO & i18n](../seo-and-i18n/)) |
| `canonicalURL` | string | Override the canonical link for this page (absolute or relative; see [SEO & i18n — Canonical URLs](../seo-and-i18n/#canonical-urls)) |
| `disableCanonical` | bool | Suppress the canonical link tag for this page |
| `ghRepo` | string | GitHub repo for buttons (`"user/repo"`) |
| `ghBadge` | list | Which badges to show: `["star","watch","fork","follow"]` |
| `ghCount` | bool | Show count on GitHub buttons (default: `true`) |
| `showPageDates` | bool | Show dates on page-type pages |
| `hidePostDates` | bool | `false` | If true, hides dates on "post" type pages |
| `navShort` | bool | Make navbar short on this page |
| `toc` | bool | Show/hide table of contents for this page (overrides site-level `toc`) |
| `showSource` | bool | Override site-level `showSource` for this page |
| `showPostNav` | bool | Override site-level `showPostNav` for this page |
| `mathEngine` | string | Override site-level `mathEngine` for this page (`"katex"`, `"mathjax"`, or `"none"`) |
| `colorScheme` | string | Override site-level `colorScheme` for this page (`"auto"`, `"dark"`, or `"light"`) |
| `useHLJS` | bool | Override site-level `useHLJS` for this page |
| `readingTime` | bool | Override site-level `readingTime` for this page |
| `wordCount` | bool | Override site-level `wordCount` for this page |
| `hideAuthor` | bool | Override site-level `hideAuthor` for this page |
| `showRelatedPosts` | bool | Override site-level `showRelatedPosts` for this page |
| `related_content_limit` | int | Override site-level `related_content_limit` for this page |

## Recipe Pages

Beautiful Hugo supports recipe content with automatic [schema.org/Recipe](https://schema.org/Recipe) structured data (JSON-LD) and a rendered recipe card below the page body. This provides SEO benefits — search engines can display rich recipe results with cook times, ingredients, and more.

### Setup

Create content files with `type: recipe` and a `recipe` front matter map:

```yaml
---
title: "Classic Chocolate Chip Cookies"
type: recipe
date: 2026-05-12
tags: ["baking", "dessert"]
recipe:
  prepTime: "PT15M"
  cookTime: "PT12M"
  totalTime: "PT27M"
  yield: "24 cookies"
  category: "Dessert"
  cuisine: "American"
  calories: "180 kcal"
  ingredients:
    - "2¼ cups all-purpose flour"
    - "1 tsp baking soda"
    - "1 cup unsalted butter, softened"
  instructions:
    - name: "Preheat oven"
      text: "Preheat oven to 375°F."
    - name: "Mix"
      text: "Combine flour, baking soda, and salt."
---
```

### Recipe front matter reference

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `recipe.ingredients` | list | **yes** | List of ingredient strings (supports Markdown) |
| `recipe.instructions` | list | **yes** | List of step strings **or** maps with `name` and `text` keys |
| `recipe.prepTime` | string | no | ISO 8601 duration (e.g. `"PT15M"` = 15 minutes) |
| `recipe.cookTime` | string | no | ISO 8601 duration |
| `recipe.totalTime` | string | no | ISO 8601 duration |
| `recipe.yield` | string | no | Recipe yield (e.g. `"4 servings"`, `"24 cookies"`) |
| `recipe.category` | string | no | Recipe category (e.g. `"Dessert"`, `"Main Course"`) |
| `recipe.cuisine` | string | no | Cuisine type (e.g. `"Italian"`, `"Japanese"`) |
| `recipe.calories` | string | no | Calories per serving (e.g. `"250 kcal"`) |

### How it works

- **Structured data**: Pages with `type: recipe` and a `recipe` param emit a combined `Article` + `Recipe` JSON-LD block (as recommended by Google for recipe blog posts). Other pages continue to emit the standard `Article` schema.
- **Visual rendering**: A recipe card is automatically rendered below the page body content, displaying metadata (prep time, cook time, yield, etc.), an ingredients list, and numbered instructions.
- **Archetype**: Use `hugo new recipe/my-recipe.md` to get a pre-filled recipe front matter scaffold.
- **Page behavior**: Recipe pages behave like blog posts (showing post meta, post navigation, and comments) since they are not `type: page`.

### ISO 8601 duration format

Time values use the ISO 8601 duration format:

| Example | Meaning |
|---------|---------|
| `PT15M` | 15 minutes |
| `PT1H30M` | 1 hour 30 minutes |
| `PT2H` | 2 hours |

`P` marks the start, `T` separates date from time components, and `H`/`M`/`S` are hours, minutes, seconds.
