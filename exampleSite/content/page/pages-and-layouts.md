---
title: Pages & Layouts
subtitle: Page kinds, templates, layout options, and how to create each type of page
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

Title comes from `homeTitle` (or the site title); `homeTitle` also controls the navbar brand text and footer link. Subtitle comes from `Params.subtitle`. Big images from `[[Params.bigimg]]` cycle in the header.

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
- Dates are shown unless `hidePostDates: true`
- Subtitle rendered as an `<h2>`
- Previous/next post navigation (side arrows on wide screens, bottom pager on narrow screens; disable with `showPostNav = false`)
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
- No previous/next post navigation
- No comments (even if `comments: true`, unless the type is not `page`)
- Dates hidden unless `showPageDates: true`

```yaml
---
title: "About"
subtitle: "About this site"
comments: false
---
```

## Recipe Pages

Pages with `type: recipe` behave like blog posts (showing post meta, pager, and comments) but additionally emit [schema.org/Recipe](https://schema.org/Recipe) JSON-LD structured data and render a recipe card below the page body. Create them with a `recipe` front matter map:

```yaml
---
title: "Classic Chocolate Chip Cookies"
type: recipe
date: 2026-05-12
recipe:
  prepTime: "PT15M"
  cookTime: "PT12M"
  yield: "24 cookies"
  ingredients:
    - "2¼ cups all-purpose flour"
  instructions:
    - text: "Preheat oven to 375°F."
---
```

See [Configuration — Recipe Pages](../configuration/#recipe-pages) for the full `recipe` front matter reference and the archetype scaffold.

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

### Display on posts

Categories and tags are displayed below each post's content on both single post pages and post preview cards. Categories appear first with a "Categories:" label, followed by tags with a "Tags:" label. Both link to their respective taxonomy term pages.

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

A horizontal **year selector** at the top lets visitors filter posts by year. An "All" button shows every post with year heading dividers between groups. Selecting a specific year shows only that year's posts. The selected year is stored in the URL hash (e.g. `#2025`), so year views are deep-linkable. Without JavaScript, all posts remain visible.

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

## Archetypes

Beautiful Hugo ships with archetypes (content templates) that pre-fill front matter when you create new content with `hugo new`:

| Command | Archetype | Front Matter Included |
|---------|-----------|-----------------------|
| `hugo new post/my-post.md` | `post.md` | `title`, `subtitle`, `date`, `draft`, `author`, `description`, `categories`, `tags`, `bigimg`, `comments` |
| `hugo new page/my-page.md` | `page.md` | `title`, `subtitle`, `date`, `draft`, `description`, `comments`, `fullWidth` |
| `hugo new recipe/my-recipe.md` | `recipe.md` | `title`, `type: recipe`, `date`, `subtitle`, `image`, `tags`, `recipe` map |
| `hugo new <section>/foo.md` | `default.md` | `title`, `date`, `draft` |

Hugo selects the archetype based on the content section. If the section directory matches an archetype name (e.g. `post/`, `page/`, `recipe/`), that archetype is used. Otherwise the `default.md` archetype is used.

## Layout Options

Several front matter options affect how a page looks regardless of its kind.

### Big Image Headers

Big images appear as full-width background images in the page header. They can be set at the site level (for the home page) or per-page. See [Configuration — Big Image Header](../configuration/#big-image-header) for site-level config.

#### Per-page

Set `bigimg` in front matter:

```yaml
---
title: My Post
bigimg:
  - src: /img/sphere.jpg
    desc: "A sphere"
---
```

Or a single image:

```yaml
---
title: My Post
bigimg: [{src: "/img/path.jpg", desc: "A path"}]
---
```

### Full-Width Pages

Add `fullWidth: true` to front matter to use the full container width without the standard sidebar offset:

```yaml
---
title: My Page
fullWidth: true
---
```

### Navbar Short Mode

Set `navShort: true` to make the navbar permanently short (the compact style that normally appears after scrolling):

```yaml
---
title: My Page
navShort: true
---
```

Or set it globally:

```toml
[Params]
  navShort = true
```

### Avatar Visibility

Control whether the avatar/logo appears in the navbar on a per-page basis:

```yaml
---
title: My Page
showAvatar: false
---
```

### Hidden Pages

Add `hidden: true` to front matter to create a page that exists at its URL but does not appear in post listings:

```yaml
---
title: Secret Page
hidden: true
---
```

The page is still accessible via its direct URL and appears in navigation menus if you add a menu entry, but it won't show up in list pages or RSS feeds.

### Post Preview Images

On list pages, posts can show a circular preview image or video:

```yaml
---
title: My Post
image: /img/avatar-icon.png
---
```

For a video preview (loop, autoplay, muted):

```yaml
---
title: My Post
video: clip.mp4
---
```

### Custom Summaries

Override the auto-generated summary with `summary`:

```yaml
---
title: My Post
summary: "A custom summary that appears on list pages instead of the auto-truncated text."
---
```

### Per-Page Social Sharing

Override the site-level `socialShare` setting per page:

```yaml
---
title: My Post
socialShare: false
---
```

### Per-Page Comments

Enable or disable comments on individual pages:

```yaml
---
title: My Post
comments: true
---
```

This works with all comment systems (Disqus, Giscus, Utterances, Cusdis, Staticman). See [Comments & Social](../comments-and-social/) for comment system configuration.

### Show Page Dates

By default, "page" type pages don't show dates. Enable with:

```yaml
---
title: My Page
showPageDates: true
---
```

Or globally:

```toml
[Params]
  showPageDates = true
```

### Show Post Dates

By default, "post" type pages show dates. These can be disabled with:

```yaml
---
title: My Page
hidePostDates: true
---
```

Or globally:

```toml
[Params]
  hidePostDates = true
```
