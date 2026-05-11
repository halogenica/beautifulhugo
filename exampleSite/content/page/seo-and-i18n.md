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

## Robots Meta

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

Beautiful Hugo ships with translations for 19 languages:

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

## RSS

When `rss = true`, an RSS icon appears in the footer and alternate feed links are included in `<head>`:

```toml
[Params]
  rss = true
```

Hugo auto-generates RSS feeds at `/index.xml` (site-wide) and `/post/index.xml` (section-specific).
