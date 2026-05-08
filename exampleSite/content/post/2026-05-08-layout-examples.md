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

This post demonstrates the page-level changes introduced here:

- `navShort` keeps the navigation bar compact.
- `showAvatar: false` hides the avatar in the nav.
- `fullWidth: true` expands the main content container.
- The new utility classes style centered content and simple callout boxes.

<!--more-->

## Utility classes

<div class="box-note">
This is a note box using the new content utility styles.
</div>

<div class="box-warning">
This is a warning box to show the shared box styling.
</div>

<div class="box-error">
This is an error box to show the shared box styling.
</div>

<div class="box-success">
This is a success box to show the shared box styling.
</div>

<img class="center" src="/img/triangle.jpg" alt="Triangle sample image" width="360">
<div class="caption">A centered image with a caption beneath it.</div>

## Example front matter

```yaml
---
navShort: true
showAvatar: false
fullWidth: true
---
```
