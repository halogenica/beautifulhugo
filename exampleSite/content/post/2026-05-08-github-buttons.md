---
title: GitHub Buttons
subtitle: Demonstrating the GitHub button shortcode
ghRepo: "halogenica/beautifulhugo"
ghBadge: ["star", "watch", "fork"]
date: 2026-05-08
tags: ["example", "github"]
---

This post demonstrates the GitHub buttons feature. When `ghRepo` and `ghBadge` are set in the front matter, the post will display GitHub buttons (star, watch, fork, follow) from [ghbtns.com](https://ghbtns.com/).

<!--more-->

## Front matter example

```yaml
---
ghRepo: "halogenica/beautifulhugo"
ghBadge: ["star", "watch", "fork"]
---
```

## Available badges

- `star` — Star the repository.
- `watch` — Watch the repository.
- `fork` — Fork the repository.
- `follow` — Follow the repository owner.

## Showing counts

By default, the buttons show their GitHub counts. To hide them on a single page, set `ghCount: false` in the front matter:

```yaml
---
ghRepo: "halogenica/beautifulhugo"
ghBadge: ["star", "watch"]
ghCount: false
---
```

You can also set both `ghBadge` and `ghCount` in your site config under `[Params]` to apply them globally. Per-page values override the global defaults.
