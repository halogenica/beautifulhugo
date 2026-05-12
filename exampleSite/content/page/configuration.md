---
title: Configuration
subtitle: Every setting Beautiful Hugo supports
comments: false
---

This page is a complete reference for every configuration option in Beautiful Hugo. All settings go in your site's `hugo.toml` (or `config.toml`/`config.yaml`).

## Core Settings

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `homeTitle` | string | site title | Separate title for the home page header |
| `subtitle` | string | `""` | Site subtitle shown under the home page title |
| `mainSections` | list | `["post", "posts"]` | Content sections treated as "posts" on the home page and archive page |
| `logo` | string | — | Path to a square avatar/logo image |
| `favicon` | string | — | Path to favicon |
| `dateFormat` | string | i18n default | Date format string. Accepts Hugo locale tokens (e.g. `":date_long"`, `":date_medium"`, `":date_short"`) for automatic localization, or a Go time layout string based on the reference time `Mon Jan 2 15:04:05 MST 2006` (e.g. `"January 2, 2006"` or `"2006-01-02"`). **Do not use an example date** like `"2023-10-15"` — the year must be `2006`, month `01`, and day `02`. Locale tokens are recommended for multilingual sites. |
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

## Author

`[Params.author]` is **required** for the footer copyright line and social icons. The old top-level `[author]` key is deprecated and will produce a build error.

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

### Multi-Author Support

For sites with multiple authors, you can define author profiles in `data/authors/` and reference them in post front matter. This enables clickable author names, author profile pages with bios and social links, and proper structured data for multi-author posts.

#### 1. Define author data files

Create one TOML file per author in `data/authors/`. The filename (without extension) is the author key used in front matter:

```toml
# data/authors/alice-smith.toml
name = "Alice Smith"
bio = "Cloud infrastructure lead and open-source contributor."
avatar = "/img/alice.jpg"
website = "https://alice.dev"
github = "alicesmith"
twitter = "alicesmith"
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name (required) |
| `bio` | string | Short biography shown on author profile page |
| `avatar` | string | Path to author avatar image |
| `website` | string | Author website URL |
| `email` | string | Email address |
| Any social key | string | Same social platform keys as `[Params.author]` |

#### 2. Add the authors taxonomy

Add to your `hugo.toml`:

```toml
[taxonomies]
  authors = "authors"
```

#### 3. Reference authors in front matter

Use the `authors` front matter key (matching the filenames in `data/authors/`):

```yaml
---
title: Multi-Author Post
authors: ["alice-smith", "bob-jones"]
---
```

Or a single author:

```yaml
---
title: Single Author Post
authors: ["alice-smith"]
---
```

Author names in post meta become clickable links to `/authors/alice-smith/`, which shows the author's profile card (avatar, bio, social links) followed by their posts.

The existing `author` front matter key (plain string or list of strings) still works for backward compatibility — those names render as plain text without links. To get the full author profile experience, use `authors` with data file keys instead.

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
| `toc` | bool | `true` | Show a floating table-of-contents button on pages with headings |
| `showSource` | bool | `false` | Show a "View source" button linking to the page's source file in the repository |
| `sourceRepo` | string | — | Base URL for the repository source browser (e.g. `https://github.com/user/repo/blob/main/`). The page's `.File.Path` is appended automatically. When `enableGitInfo = true` is set, the branch in the URL is replaced with the current commit hash, so the link always points to the exact version of the file |

```toml
[Params]
  readingTime = true
  wordCount = true
  socialShare = true
  showRelatedPosts = true
  disableFigureOverride = true
  showSource = true
  sourceRepo = "https://github.com/user/repo/blob/main/"
```

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

| Key | Type | Description |
|-----|------|-------------|
| `src` | string | Image path (absolute or relative) |
| `desc` | string | Image description (supports Markdown links) |
| `position` | string | CSS `background-position` value (e.g. `"center top"`) |

| `headerImgStyle` | string | `"big"` | Header image height: `"big"` (default, 100–150px padding) or `"narrow"` (25px padding, crops image top and bottom) |

```toml
[Params]
  headerImgStyle = "narrow"
```

See [Layout Options](../layout-options/) for per-page big image headers.

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

## Comment Systems

Beautiful Hugo supports five comment systems. Each is enabled per-page with `comments: true` in front matter.

{{< details "Disqus" >}}
Standard Hugo Disqus integration. Set the shortname in your config:

```toml
[Services]
  [Services.Disqus]
    Shortname = "your-disqus-shortname"

[Params]
  delayDisqus = true
```

`delayDisqus = true` shows a "Show comments" button instead of loading Disqus immediately.
{{< /details >}}

{{< details "Giscus" >}}
Giscus uses GitHub Discussions as a comment backend.

```toml
[Params.giscus]
  repo = "owner/repo"
  repoId = "R_kgDO..."
  category = "Announcements"
  categoryId = "DIC_kwDO..."
  mapping = "pathname"
  strict = "0"
  reactionsEnabled = "1"
  emitMetadata = "0"
  inputPosition = "top"
  theme = "preferred_color_scheme"
  lang = "en"
  lazyLoading = true
```

Get your values from [giscus.app](https://giscus.app).
{{< /details >}}

{{< details "Utterances" >}}
Utterances uses GitHub Issues as a comment backend.

```toml
[Params.utterances]
  repo = "owner/repo"
  issueTerm = "pathname"
  theme = "preferred-color-scheme"
  label = "comment"
```

Get your values from [utteranc.es](https://utteranc.es).
{{< /details >}}

{{< details "Cusdis" >}}
Cusdis is a lightweight, privacy-friendly comment system.

```toml
[Params]
  cusdisID = "your-app-id"
```

Get your App ID from [cusdis.com](https://cusdis.com).
{{< /details >}}

{{< details "Staticman" >}}
Staticman adds comments as static data files via pull requests, with optional reCAPTCHA.

```toml
[Params.staticman]
  api = "https://staticman-url.herokuapp.com/v3/entry/github/owner/repo/main/comments"

  [Params.staticman.recaptcha]
    sitekey = "your-site-key"
    secret = "your-secret"
```
{{< /details >}}

## Analytics & Search

| Param | Type | Description |
|-------|------|-------------|
| `[Services.googleAnalytics] id` | string | Google Analytics tracking ID (loaded only in production) |
| `piwik.server` | string | Piwik/Matomo server hostname |
| `piwik.id` | string | Piwik/Matomo site ID |
| `gcse` | string | Google Custom Search Engine code (adds search modal to navbar) |

```toml
[Services]
  [Services.googleAnalytics]
    id = "G-XXXXXXXXXX"

[Params]
  gcse = "012345678901234567890:abcdefghijk"
```

When `gcse` is set, a search icon appears in the navbar that opens a search modal.

## SEO Robot Meta Tags

Control `<meta name="robots">` tags from `hugo.toml`. These settings only apply to pages in `mainSections`; other pages can set tags via front matter.

```toml
[Params.seo.robots]
  ai-summary-limit = "nosnippet"
  noindex = true
  nofollow = true

[Params.seo.GoogleBot]
  noindex = true
  ai-summary-limit = 50
```

Supported boolean tags: `noindex`, `nofollow`, `none`, `nosnippet`, `notranslate`, `noimageindex`, `noarchive`, `nocache`, `noai`, `noimageai`.

Supported `ai-summary-limit` values: `none` (no limit), `nosnippet` (block all), or a positive integer (character limit, e.g. `50`, `150`, `300`).

See [SEO & i18n](../seo-and-i18n/) for the full reference including per-page overrides.

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

```text
your-site/
├── layouts/
│   └── partials/
│       ├── head_custom.html      ← your override
│       ├── nav_custom.html       ← your override
│       ├── header_custom.html    ← your override
│       ├── before_content.html   ← your override
│       ├── after_content.html    ← your override
│       └── footer_custom.html    ← your override
```

## Miscellaneous

| Param | Type | Description |
|-------|------|-------------|
| `disclaimerText` | string | Disclaimer text shown in footer with a yellow-bordered box |
| `commit` | string | Base URL for Git commit links (appended with `.GitInfo.Hash`) |

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
| `author` | string/list | Per-page author(s) (string or list of strings, rendered as plain text) |
| `authors` | list | Per-page author keys referencing `data/authors/` files (renders as clickable links with profile pages) |
| `tags` | list | Tags for categorization |
| `categories` | list | Categories for grouping posts |
| `share_img` | string | Social sharing image (falls back to `image` then `logo`) |
| `ExpiryDate` | date | Adds `<meta name="robots" content="unavailable_after: ...">` |
| `seo` | map | Per-page robot meta tag overrides (see [SEO & i18n](../seo-and-i18n/)) |
| `ghRepo` | string | GitHub repo for buttons (`"user/repo"`) |
| `ghBadge` | list | Which badges to show: `["star","watch","fork","follow"]` |
| `ghCount` | bool | Show count on GitHub buttons (default: `true`) |
| `showPageDates` | bool | Show dates on page-type pages |
| `navShort` | bool | Make navbar short on this page |
| `toc` | bool | Show/hide table of contents for this page (overrides site-level `toc`) |
| `showSource` | bool | Override site-level `showSource` for this page |

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
- **Page behavior**: Recipe pages behave like blog posts (showing post meta, pager, and comments) since they are not `type: page`.

### ISO 8601 duration format

Time values use the ISO 8601 duration format:

| Example | Meaning |
|---------|---------|
| `PT15M` | 15 minutes |
| `PT1H30M` | 1 hour 30 minutes |
| `PT2H` | 2 hours |

`P` marks the start, `T` separates date from time components, and `H`/`M`/`S` are hours, minutes, seconds.
