---
title: Layout Options
subtitle: Big images, full-width pages, navbar control, and more
comments: false
bigimg:
  - src: /img/sphere.jpg
    desc: "Big image header demo"
---

Beautiful Hugo provides several layout options that can be configured at the site level or per-page via front matter. This page itself uses `fullWidth: true` and a `bigimg` header to demonstrate both features.

## Big Image Headers

Big images appear as full-width background images in the page header. They can be set at the site level (for the home page) or per-page.

### Site-level (home page)

Set `[[Params.bigimg]]` in your config. Multiple images cycle with a fade transition:

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
| `src` | string | Image path |
| `desc` | string | Image description (supports Markdown links) |
| `position` | string | CSS `background-position` value |

### Per-page

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

This page uses a per-page big image — look at the header above.

## Full-Width Pages

Add `fullWidth: true` to front matter to use the full container width without the standard sidebar offset:

```yaml
---
title: My Page
fullWidth: true
---
```

This page uses `fullWidth: true`. Compare it with other feature pages (which also use it) to a page without it to see the difference.

## Navbar Short Mode

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

## Avatar Visibility

Control whether the avatar/logo appears in the navbar on a per-page basis:

```yaml
---
title: My Page
showAvatar: false
---
```

## Hidden Pages

Add `hidden: true` to front matter to create a page that exists at its URL but does not appear in post listings:

```yaml
---
title: Secret Page
hidden: true
---
```

The page is still accessible via its direct URL and appears in navigation menus if you add a menu entry, but it won't show up in list pages or RSS feeds.

## Post Preview Images

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

## Custom Summaries

Override the auto-generated summary with `summary`:

```yaml
---
title: My Post
summary: "A custom summary that appears on list pages instead of the auto-truncated text."
---
```

## Per-Page Social Sharing

Override the site-level `socialShare` setting per page:

```yaml
---
title: My Post
socialShare: false
---
```

## Per-Page Comments

Enable or disable comments on individual pages:

```yaml
---
title: My Post
comments: true
---
```

This works with all comment systems (Disqus, Giscus, Utterances, Cusdis, Staticman).

## Show Page Dates

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
