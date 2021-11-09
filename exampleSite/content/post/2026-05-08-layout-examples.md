---
title: Layout Examples
subtitle: Showing the new page params and utilities
date: 2026-05-08
tags: ["example", "layout"]
navShort: true
showAvatar: false
fullWidth: true
comments: false
---

This post demonstrates several new features:

- `navShort` keeps the navigation bar compact.
- `showAvatar: false` hides the avatar in the nav.
- `fullWidth: true` expands the main content container.
- The new utility classes style centered content and simple callout boxes.

<!--more-->

## Utility classes

This is a `.box-note` using the new content utility styles.
{.box-note}

This is a `.box-warning` to show the shared box styling.
{.box-warning}

This is a `.box-error` to show the shared box styling.
{.box-error}

This is a `.box-success` to show the shared box styling.
{.box-success}

This is what it looks like:

```md
This is a `.box-note` using the new content utility styles.
{.box-note}
```

Remember to enable block attribuites in markdown:

```yaml
[markup.goldmark.parser.attribute]
  block = true
```

You also might need to disable formatting if you use a tool (like prittier)
that moves the attributes around.


## Image example

The `center` and `caption` classes.

<img class="center" src="/img/triangle.jpg" alt="Triangle sample image" width="360">
<div class="caption">A centered image with a caption beneath it.</div>

(You might need to turn on unsafe rendering if you want to put these in as raw HTML tags)

```toml
[markup.goldmark.renderer]
  unsafe = true
```

## Example front matter

```yaml
---
navShort: true
showAvatar: false
fullWidth: true
---
```

## Hidden posts

You can hide a post from the homepage and list pages by setting `hidden: true` in the page front matter. The page will still be built and accessible by direct URL, but it will not appear in any paginated view. Useful for a "draft" post that you also want to share via link.

```yaml
---
title: Draft notes
hidden: true
---
```

That's not set on this page so you can find it. :)
