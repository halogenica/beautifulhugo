---
title: SEO & i18n
subtitle: Structured data, Open Graph, Twitter cards, and multilingual support
comments: false
---

Beautiful Hugo includes comprehensive SEO support (schema.org, Open Graph, Twitter Cards) and full multilingual capabilities via Hugo's i18n system.

## Schema.org Structured Data

The theme automatically generates JSON-LD structured data for every page:

| Type | Where Used | What It Contains |
|------|-----------|-----------------|
| `WebSite` | All pages | Site name, URL, search action |
| `Organization` | All pages | Organization name, logo, URL |
| `WebPage` | All pages | Page name, description, breadcrumb |
| `Article` | Blog posts | Headline, author, datePublished, dateModified, publisher, wordCount, timeRequired |
| `BreadcrumbList` | All pages | Navigation hierarchy |

No configuration is required — the structured data is generated from your existing `hugo.toml` settings and page front matter.

## Open Graph

Open Graph meta tags are generated automatically via Hugo's built-in internal template:

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="article" />
<meta property="og:image" content="..." />
```

The image is resolved from a cascade: `share_img` → `image` → `logo`.

## Twitter Cards

Twitter Card meta tags use the `summary_large_image` card type:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@username" />
<meta name="twitter:creator" content="@username" />
```

The `@site` and `@creator` values come from `Params.author.twitter`.

## Robots Meta Tags

Beautiful Hugo can generate `<meta name="robots">` tags from three configuration layers:

1. **`hugo.toml`** — site-wide defaults (only applied to pages in `mainSections`)
2. **`_index.md`** — section-level overrides
3. **Page front matter** — per-page overrides (highest priority)

Each layer overrides matching keys from the previous one.

### Boolean Tags

The following tags are supported (set to `true` to include them):

| Tag | Effect |
|-----|--------|
| `noindex` | Do not index this page |
| `nofollow` | Do not follow links on this page |
| `none` | Equivalent to `noindex, nofollow` |
| `nosnippet` | Do not show a text snippet or video preview |
| `notranslate` | Do not offer translation of this page in search results |
| `noimageindex` | Do not index images on this page |
| `noarchive` | Do not show a cached link in search results |
| `nocache` | Similar to `noarchive` (Bing-specific) |
| `noai` | Do not use content for AI training (per `dev.ai` proposal) |
| `noimageai` | Do not use images for AI training |

### AI Summary Limits

The `ai-summary-limit` key controls how much of your page content search engines may use for AI-generated summaries:

| Value | Effect |
|-------|--------|
| `none` | No limit (no meta tag emitted) |
| `nosnippet` | Block all snippets / AI summaries |
| `0` | Same as `nosnippet` |
| `50`, `150`, `300` | Character limit for snippets |

### Site-Wide Configuration

```toml
[Params.seo.robots]
  ai-summary-limit = "nosnippet"
  noindex = true
  nofollow = true

[Params.seo.GoogleBot]
  noindex = true
  ai-summary-limit = 50
```

This produces:

```html
<meta name="robots" content="nosnippet, noindex, nofollow">
<meta name="googlebot" content="noindex, max-snippet:50">
```

You can add entries for other bots (e.g. `Bingbot`, `DuckDuckBot`) the same way.

### Per-Page Overrides

Override or supplement site-wide settings in any page's front matter:

```yaml
seo:
  robots:
    ai-summary-limit: none
  GoogleBot:
    noindex: false
```

### ExpiryDate

Set `ExpiryDate` in front matter to add an `unavailable_after` directive:

```yaml
---
title: Event Post
expiryDate: 2026-12-31
---
```

This generates:

```html
<meta name="robots" content="unavailable_after: 2026-12-31T00:00:00+00:00" />
```

## Description Cascade

The page description (used in meta tags and structured data) follows this cascade:

1. `.Description` (explicit front matter `description` field)
2. `.Params.subtitle` (the subtitle)
3. `.Summary` (auto-generated from content)

## Multilingual Support

Beautiful Hugo supports Hugo's standard multilingual configuration with per-language content directories.

### Configuration

```toml
DefaultContentLanguage = "en"

[languages]
  [languages.en]
    title = "My Site"
    weight = 1
    contentDir = "content/en"

  [languages.fr]
    title = "Mon Site"
    weight = 2
    contentDir = "content/fr"
```

### Language Switcher

A language switcher appears in the navbar:

- **2 languages**: Inline links next to each other
- **3+ languages**: Dropdown menu

### Supported Languages

Beautiful Hugo ships with translations for 20 languages:

| Code | Language |
|------|----------|
| `en` | English |
| `br` | Breton |
| `de` | German |
| `dk` | Danish |
| `eo` | Esperanto |
| `es` | Spanish |
| `fr` | French |
| `hr` | Croatian |
| `it` | Italian |
| `ja` | Japanese |
| `ko` | Korean |
| `lmo` | Lombard |
| `nb` | Norwegian Bokmål |
| `nl` | Dutch |
| `pl` | Polish |
| `pt` | Portuguese |
| `pt-br` | Portuguese (Brazil) |
| `ru` | Russian |
| `tr` | Turkish |
| `zh-CN` | Chinese (Simplified) |
| `zh-TW` | Chinese (Traditional) |

### Translation Keys

The i18n files provide translations for common UI strings:

| Key | Purpose |
|-----|---------|
| `postedOnDate` | "Posted on January 2, 2006" |
| `lastModified` | "Last modified on ..." |
| `readMore` | "Read more" link text |
| `readingTime` | "3 min read" |
| `olderPosts` / `newerPosts` | Pagination labels |
| `previousPost` / `nextPost` | Post navigation |
| `pageNotFound` | 404 page text |
| `themeToggleLabel` | Theme toggle accessibility label |
| `comments` | "Comments" heading |
| `seeAlso` | "See also" related posts heading |

To add a new language, create a new file in `i18n/` (e.g. `i18n/pt.yaml` for Portuguese) with translations for these keys.

### Navbar Menu Translations

Navbar menu items are automatically translated when the menu entry has an `identifier` that matches an i18n key with the `menu_` prefix. If no matching translation key exists, the menu `name` from `hugo.toml` is used as a fallback.

For example, given this menu config:

```toml
[[menu.main]]
    identifier = "blog"
    name = "Blog"
    weight = 1

[[menu.main]]
    parent = "blog"
    name = "Posts"
    identifier = "post"
    url = "post/"
    weight = 1
```

The theme looks up `menu_blog` and `menu_post` in the current language's i18n file. In French (`i18n/fr.yaml`):

```yaml
- id: menu_blog
  translation: "Blog"
- id: menu_post
  translation: "Articles"
```

The theme ships with pre-built translations for common menu items (blog, posts, tags, categories, archives, about, and the example-site section names). You can add your own `menu_*` keys to your site's i18n overrides to translate custom menu items.

## RSS

When `rss = true`, an RSS icon appears in the footer and alternate feed links are included in `<head>`:

```toml
[Params]
  rss = true
```

Hugo auto-generates RSS feeds at `/index.xml` (site-wide) and `/post/index.xml` (section-specific).
