---
title: Bundled big image
subtitle: A header image that lives next to the post
date: 2026-05-12
tags: ["example"]
thumbnail: forest.jpg
bigimg:
  - src: forest.jpg
    desc: "A page resource"
---

This post is a [page bundle](https://gohugo.io/content-management/page-bundles/). The `bigimg` entry `forest.jpg` is resolved as a page resource, so the image can live in the same directory as `index.md`.

Images in a bundle are also processed by Hugo. The `thumbnail` above is cropped to a square for the post list, the header image is capped at `bigimgWidth`, and the figure and gallery below get resized variants with a `srcset`:

{{< beautifulfigure src="forest.jpg" caption="A page-resource figure with automatic sizes" width="50%" class="center" >}}

{{< gallery dir="photos" caption-effect="fade" />}}
