---
title: Figures & Galleries
subtitle: Image display with PhotoSwipe lightbox integration
comments: false
---

Beautiful Hugo provides powerful image handling through the `beautifulfigure` shortcode and `gallery` shortcode, both integrated with PhotoSwipe 5 for full-screen lightbox viewing.

## The figure / beautifulfigure Distinction

The `figure` shortcode is a router:

- **When `disableFigureOverride = false`** (default): `{{</* figure */>}}` delegates to `beautifulfigure` (PhotoSwipe-enhanced)
- **When `disableFigureOverride = true`**: `{{</* figure */>}}` uses Hugo's standard figure shortcode, and `{{</* beautifulfigure */>}}` remains available for PhotoSwipe

The example site uses `disableFigureOverride = true`, so `figure` gives a plain image and `beautifulfigure` gives the enhanced version.

## Standard Figure

With `disableFigureOverride = true`, the standard `figure` shortcode produces a basic `<figure>` element:

{{< figure src="/img/global-ike.png" width="25%" caption="A simple figure with a caption" >}}

```markdown
{{</* figure src="/img/global-ike.png "width="25%" caption="A simple figure with a caption" */>}}
```

## beautifulfigure

The `beautifulfigure` shortcode adds PhotoSwipe lightbox support — click the image to open it full-screen.

### Basic usage

{{< beautifulfigure src="/img/global-ike.png" caption="Click this image to open the lightbox" width="25%" class="center" >}}

```markdown
{{</* beautifulfigure src="/img/global-ike.png" caption="Click this image to open the lightbox" width="25%" class="center" */>}}
```

### With title and attribution

{{< beautifulfigure src="/img/global-ike.png" title="Global Ike" caption="A globe with transparency" attr="PurePNG" attrlink="https://purepng.com/photo/30733/clipart-cartoon-globe" width="25%" class="center" >}}

```markdown
{{</* beautifulfigure src="/img/global-ike.png"
  title="Global Ike"
  caption="A globe with transparency"
  attr="PurePNG"
  attrlink="https://purepng.com/photo/30733/clipart-cartoon-globe"
  width="25%"
  class="center" */>}}
```

### With caption effects

{{< beautifulfigure src="/img/global-ike.png" caption="Hover to see the caption slide in" caption-effect="slide" width="25%" class="center" >}}

```markdown
{{</* beautifulfigure src="/img/global-ike.png" caption="Hover to see the caption slide in" caption-effect="slide" width="25%" class="center" */>}}
```

{{< beautifulfigure src="/img/global-ike.png" caption="Hover to see the caption fade in" caption-effect="fade" width="25%" class="center" >}}

```markdown
{{</* beautifulfigure src="/img/global-ike.png" caption="Hover to see the caption fade in" caption-effect="fade" width="25%" class="center" */>}}
```

### With white background (for dark mode)

Add `class="white"` to give the figure a white background, which helps images with transparent backgrounds look clean in dark mode:

{{< beautifulfigure src="/img/global-ike.png" caption="White background for dark mode" class="white center" width="25%" >}}

```markdown
{{</* beautifulfigure src="/img/global-ike.png" caption="White background for dark mode" class="white center" width="25%" */>}}
```

### All parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | — | URL of the image |
| `link` | string | value of `src` | URL of the full-size image (for lightbox) |
| `thumb` | string | — | Thumbnail URL |
| `alt` | string | `caption` or `src` | Alt text for the `<img>` |
| `caption` | string | — | Caption text below the image |
| `title` | string | — | Title heading in the figcaption |
| `attr` | string | — | Attribution text |
| `attrlink` | string | — | URL for the attribution |
| `class` | string | — | CSS class on the `<figure>` element |
| `size` | string | — | PhotoSwipe dimensions: `WIDTHxHEIGHT` (e.g. `1024x768`) |
| `width` | string | — | CSS `max-width` on the wrapper div |
| `caption-position` | string | — | Position class for the caption |
| `caption-effect` | string | — | Effect class: `slide`, `fade`, `appear` |

## Gallery — Manual Mode

Place `beautifulfigure` shortcodes inside a `gallery` shortcode to create a responsive grid:

{{< gallery caption-effect="fade" hover-effect="grow" >}}
{{< beautifulfigure src="/img/gallery/sunset.jpg" caption="Sunset" >}}
{{< beautifulfigure src="/img/gallery/forest.jpg" caption="Forest" >}}
{{< beautifulfigure src="/img/gallery/mountain.jpg" caption="Mountain" >}}
{{< beautifulfigure src="/img/gallery/lake.jpg" caption="Lake" >}}
{{< /gallery >}}

```markdown
{{</* gallery caption-effect="fade" hover-effect="grow" */>}}
{{</* beautifulfigure src="/img/gallery/sunset.jpg" caption="Sunset" */>}}
{{</* beautifulfigure src="/img/gallery/forest.jpg" caption="Forest" */>}}
{{</* beautifulfigure src="/img/gallery/mountain.jpg" caption="Mountain" */>}}
{{</* /gallery */>}}
```

## Gallery — Directory Mode

Point the `gallery` shortcode at a directory under `/static/` and it will auto-populate from all images found there. Filenames are humanized into captions (e.g. `sunset.jpg` becomes "Sunset").

{{< gallery dir="/img/gallery/" caption-effect="fade" />}}

Thumbnail detection works by convention: if an image file contains the thumb suffix (default `-thumb`), it is used as the thumbnail for the matching full-size image. For example:

- `lake.jpg` → full-size image, caption "Lake"
- `lake-thumb.jpg` → thumbnail for `lake.jpg`

```markdown
{{</* gallery dir="/img/gallery/" caption-effect="fade" */>}}
```

## Gallery Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dir` | string | — | Path relative to `/static/` to auto-populate images |
| `thumb` | string | `-thumb` | Suffix that identifies thumbnail files |
| `caption-position` | string | `bottom` | `bottom`, `center`, or `none` |
| `caption-effect` | string | `slide` | `slide`, `fade`, or `appear` |
| `hover-effect` | string | `zoom` | `zoom`, `grow`, `shrink`, `slidedown`, or `slideup` |
| `hover-transition` | string | — | Set to `none` to disable hover transition |

## PhotoSwipe Lightbox

All images rendered through `beautifulfigure` or `gallery` are automatically integrated with PhotoSwipe 5. Clicking any image opens a full-screen lightbox with:

- Pinch-to-zoom on touch devices
- Swipe/keyboard navigation between images in a gallery
- Automatic image dimension detection

### Opting out

Add the `no-photoswipe` class to any `<figure>` element to exclude it from the lightbox:

```html
<figure class="no-photoswipe">
  <img src="/img/global-ike.png" alt="No lightbox" />
</figure>
```

### Specifying dimensions

For best performance, provide the `size` parameter with the image dimensions:

```markdown
{{</* beautifulfigure src="/img/global-ike.png" size="1920x1080" */>}}
```

If `size` is not provided, PhotoSwipe will attempt to auto-detect the image dimensions.
