---
title: Figure Sample
subtitle: Standard and PhotoSwipe-enhanced figures
date: 2026-05-08
tags: ["example", "figure", "photoswipe"]
---

Beautiful Hugo enhances the built-in `figure` shortcode with PhotoSwipe gallery support. By default, the `{{</* figure */>}}` shortcode is overridden to provide the PhotoSwipe experience.

<!--more-->

## Restoring the standard figure shortcode

You can restore Hugo's native `figure` behavior by setting `disableFigureOverride = true` in your `hugo.toml`:

```toml
[params]
  disableFigureOverride = true
```

When this is set, the built-in `figure` shortcode returns to Hugo's standard
output. The PhotoSwipe-enhanced version remains available as `beautifulfigure`.

This requires us to reimplement the built-in figure, since you can't access a
built-in if you override it. This backward-compatiblity setting will eventually
be removed, so please rename `figure` -> `beautifulfigure` and set this to
`true` to be prepared.
{.box-warning}

## Standard figure

With `disableFigureOverride = true`, `{{</* figure */>}}` produces plain HTML `<figure>` elements:

{{< figure src="/img/hexagon.jpg" alt="Hexagon image" caption="A standard Hugo figure with no lightbox." >}}

Source:

```markdown
{{</* figure src="/img/hexagon.jpg" alt="Hexagon image" caption="A standard Hugo figure with no lightbox." */>}}
```

If the override is not set, this is the same as `beautifulfigure` for backward compatibilty.

## Beautiful figure (PhotoSwipe)

Use `beautifulfigure` for the PhotoSwipe-enhanced experience with lightbox support:

{{< beautifulfigure src="/img/triangle.jpg" alt="Triangle image" caption="A beautifulfigure with PhotoSwipe lightbox." >}}

Source:

```markdown
{{</* beautifulfigure src="/img/triangle.jpg" alt="Triangle image" caption="A beautifulfigure with PhotoSwipe lightbox." */>}}
```

## Gallery of beautiful figures

You can also group multiple beautiful figures in a gallery:

{{< gallery >}}
  {{< beautifulfigure thumb="-thumb" link="/img/hexagon.jpg" caption="Hexagon" >}}
  {{< beautifulfigure thumb="-thumb" link="/img/sphere.jpg" caption="Sphere" >}}
  {{< beautifulfigure thumb="-thumb" link="/img/triangle.jpg" caption="Triangle" >}}
{{< /gallery >}}

Source:

```markdown
{{</* gallery */>}}
  {{</* beautifulfigure thumb="-thumb" link="/img/hexagon.jpg" caption="Hexagon" */>}}
  {{</* beautifulfigure thumb="-thumb" link="/img/sphere.jpg" caption="Sphere" */>}}
  {{</* beautifulfigure thumb="-thumb" link="/img/triangle.jpg" caption="Triangle" */>}}
{{</* /gallery */>}}
```

