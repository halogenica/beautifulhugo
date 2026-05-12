---
title: Pages & Layouts
subtitle: Page kinds, templates, and how to create each type of page
comments: false
---

Beautiful Hugo uses Hugo's standard template resolution, with a few custom layout options. This page explains every kind of page the theme can produce and how to create each one.

## Page Kinds

Hugo assigns a **kind** to every page based on where it lives in the content directory. The kind determines which template renders the page.

| Kind | URL example | Template | Description |
|------|-------------|----------|-------------|
| `home` | `/` | `layouts/index.html` | Site home page |
| `page` | `/page/about/` | `layouts/_default/single.html` | Standalone content page |
| `section` | `/post/` | `layouts/_default/list.html` | Section listing (paginated post previews) |
| `taxonomy` | `/tags/`, `/categories/` | `layouts/_default/terms.html` | All terms in a taxonomy |
| `term` | `/tags/tutorial/` | `layouts/_default/list.html` | Pages belonging to one term (paginated) |
| `404` | (any invalid URL) | `layouts/404.html` | Error page |

Additionally, the **`archive`** layout is available via front matter for any content page.

## Home Page

The home page is defined by `content/_index.md` and rendered by `layouts/index.html`. It shows the site content at the top, followed by a paginated list of posts from `mainSections`.

Title comes from `homeTitle` (or the site title). Subtitle comes from `Params.subtitle`. Big images from `[[Params.bigimg]]` cycle in the header.

```toml
[Params]
  homeTitle = "My Site"
  subtitle = "Welcome"
  mainSections = ["post", "posts"]

[[Params.bigimg]]
  src = "/img/triangle.jpg"
  desc = "Triangle"
```

## Blog Posts

Blog posts live under `content/post/` (or any directory listed in `mainSections`). They use `layouts/_default/single.html` with type `post`, which enables:

- Post metadata in the header (date, reading time, word count, author)
- Subtitle rendered as an `<h2>`
- Previous/next post pager
- Comments (if `comments: true`)
- Social sharing buttons
- Related posts section
- Tag links

```yaml
---
title: "My Blog Post"
subtitle: "A short description"
date: 2026-05-11
categories: ["tutorial"]
tags: ["hugo", "theme"]
comments: true
---
```

## Regular Pages

Pages under `content/page/` have type `page`. They use the same `single.html` template but with several features disabled by default:

- No post metadata in the header
- Subtitle rendered as a `<span>` (not a heading)
- No previous/next pager
- No comments (even if `comments: true`, unless the type is not `page`)
- Dates hidden unless `showPageDates: true`

```yaml
---
title: "About"
subtitle: "About this site"
comments: false
---
```

## Section Listings

A section listing page (e.g. `/post/`) shows a paginated list of post previews. It uses `layouts/_default/list.html`. To add content above the post list, create a `_index.md` in the section directory:

```yaml
---
title: "Blog"
---
Welcome to the blog. Below are all posts in chronological order.
```

## Taxonomy Pages

Taxonomies group content by terms. Beautiful Hugo includes two by default:

| Taxonomy | Front matter key | URL |
|----------|-----------------|-----|
| Tags | `tags` | `/tags/` |
| Categories | `categories` | `/categories/` |

These are configured in `hugo.toml`:

```toml
[taxonomies]
  category = "categories"
  tag = "tags"
```

### Taxonomy listing (`/tags/`, `/categories/`)

The `terms.html` template renders an alphabetical list of all terms, each with a page count and links to the pages belonging to that term.

### Term listing (`/tags/tutorial/`)

Individual term pages use `list.html` and show a paginated list of posts with that term.

### Adding a custom taxonomy

Add it to both `[taxonomies]` and your posts' front matter:

```toml
[taxonomies]
  category = "categories"
  tag = "tags"
  series = "series"
```

```yaml
---
title: "Part 2"
tags: ["tutorial"]
series: ["getting-started"]
---
```

This creates `/series/` (taxonomy listing) and `/series/getting-started/` (term listing).

## Archive Page

The archive layout shows a chronological list of **all** regular pages (newest first) with title, optional subtitle, and date. It is not paginated. Hidden pages are excluded.

Create a content page with `layout: archive`:

```yaml
---
title: Archives
layout: archive
description: All posts in chronological order
---
```

The `layout` front matter key tells Hugo to use `layouts/_default/archive.html` instead of the default `single.html`.

## 404 Page

The 404 page uses `layouts/404.html` and displays a random kaomoji with the localized "page not found" message. No configuration needed — Hugo uses it automatically for invalid URLs.

## Choosing a Layout with Front Matter

The `layout` key in front matter selects an alternative template from `layouts/_default/`:

| `layout` value | Template used |
|----------------|---------------|
| *(not set)* | `single.html` (for pages) or `list.html` (for sections) |
| `archive` | `archive.html` — chronological list of all posts |
| `list` | `list.html` — force the list template on a page |
| `terms` | `terms.html` — force the taxonomy terms template |

## Layout Options

Several front matter options affect how a page looks regardless of its kind. See [Layout Options](../layout-options/) for the full reference.

| Option | Type | Effect |
|--------|------|--------|
| `fullWidth` | bool | Full container width (no offset) |
| `navShort` | bool | Permanently compact navbar |
| `bigimg` | list | Full-width header image(s) |
| `headerImgStyle` | string | `"big"` or `"narrow"` header crop |
| `hidden` | bool | Exclude from post listings |
| `showAvatar` | bool | Show/hide navbar avatar |
| `showPageDates` | bool | Show dates on `page` type |
