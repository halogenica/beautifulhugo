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
| `mainSections` | list | — | Content sections treated as "posts" (e.g. `["post","posts"]`) |
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
| `selfHosted` | bool | `false` | Serve all assets from `/static/` instead of CDNs |

When `colorScheme = "auto"`, a theme toggle button appears in the navbar that cycles between auto, light, and dark. The user's choice persists via `localStorage`.

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

```toml
[Params]
  readingTime = true
  wordCount = true
  socialShare = true
  showRelatedPosts = true
  disableFigureOverride = true
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
| `author` | string/list | Per-page author(s) (string or list of strings) |
| `tags` | list | Tags for categorization |
| `share_img` | string | Social sharing image (falls back to `image` then `logo`) |
| `ExpiryDate` | date | Adds `<meta name="robots" content="unavailable_after: ...">` |
| `ghRepo` | string | GitHub repo for buttons (`"user/repo"`) |
| `ghBadge` | list | Which badges to show: `["star","watch","fork","follow"]` |
| `ghCount` | bool | Show count on GitHub buttons (default: `true`) |
| `showPageDates` | bool | Show dates on page-type pages |
| `navShort` | bool | Make navbar short on this page |
| `toc` | bool | Show/hide table of contents for this page (overrides site-level `toc`) |
