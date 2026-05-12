---
title: Shortcodes
subtitle: Built-in shortcodes with live examples
comments: false
---

Beautiful Hugo ships with several shortcodes for common patterns like collapsible sections, multi-column layouts, tabbed content, image galleries, and diagrams.

## callout

The `callout` shortcode renders a Bootstrap alert-based callout box. It supports multiple paragraphs and an optional title. Five styles are available: `info` (default), `warning`, `danger`, `success`, and `note`.

| Parameter | Position | Required | Description |
|-----------|----------|----------|-------------|
| type | 1 | no | Callout style: `info` (default), `warning`, `danger`, `success`, `note` |
| title | 2 | no | Optional heading text (supports Markdown) |
| (inner) | — | yes | The body content (supports Markdown, multiple paragraphs) |

**Live examples:**

{{< callout info "Information" >}}
This is an **info** callout — the default style. Use it for helpful tips or informational asides.

You can include multiple paragraphs, **formatted text**, and even code: `console.log("hello")`.
{{< /callout >}}

{{< callout warning "Caution" >}}
This is a **warning** callout. Use it to flag potential issues or important caveats.
{{< /callout >}}

{{< callout danger "Critical" >}}
This is a **danger** callout. Use it for critical errors or destructive actions.
{{< /callout >}}

{{< callout success "All good" >}}
This is a **success** callout. Use it for confirmation messages or completed actions.
{{< /callout >}}

{{< callout note >}}
This is a **note** callout — a neutral grey style for side remarks that don't fit the other categories.
{{< /callout >}}

**Source:**

```markdown
{{</* callout info "Information" */>}}
This is an **info** callout — the default style.

You can include multiple paragraphs.
{{</* /callout */>}}

{{</* callout warning "Caution" */>}}
This is a **warning** callout.
{{</* /callout */>}}

{{</* callout danger "Critical" */>}}
This is a **danger** callout.
{{</* /callout */>}}

{{</* callout success "All good" */>}}
This is a **success** callout.
{{</* /callout */>}}

{{</* callout note */>}}
This is a **note** callout (no title).
{{</* /callout */>}}
```

The `type` parameter defaults to `info`, so `{{</* callout */>}}` is equivalent to `{{</* callout info */>}}`. The title parameter is optional — omit it for a title-less callout.

## details

The `details` shortcode renders a collapsible `<details>` element. The first positional parameter is the summary text; the inner content is the body.

| Parameter | Position | Required | Description |
|-----------|----------|----------|-------------|
| summary | 1 | yes | The clickable summary label (supports Markdown) |
| (inner) | — | yes | The expandable body content (supports Markdown) |

**Live example:**

{{< details "Click to expand this section" >}}
This content is hidden by default. You can use **Markdown** here, and even code:

```python
def hello():
    print("Hello from inside a details block!")
```
{{< /details >}}

**Source:**

```markdown
{{</* details "Click to expand this section" */>}}
This content is hidden by default. You can use **Markdown** here.
{{</* /details */>}}
```

## columns / column

The `columns` and `column` shortcodes create a two-column layout using the `splitbox` CSS class. `columns` is a paired shortcode; `column` marks the boundary between the left and right column.

| Shortcode | Purpose |
|-----------|---------|
| `{{</* columns */>}}` | Opens the two-column wrapper and starts the left column |
| `{{</* column */>}}` | Closes the left column and starts the right column |
| `{{</* /columns */>}}` | Closes the right column and the wrapper |

For historical reasons, you can also use
`{{</* columns /*/>}} ... {{</* endcolumns */>}}`
(note the required self-closing tag) as a backward compatibility shim.
{{< callout warning "Backward compatibility" >}}
The `columns`/`endcolumns` self-closing syntax is deprecated and may be removed in a future release.
{{< /callout >}}

**Live example:**

{{< columns >}}
Left column content. This is great for side-by-side comparisons, like showing a configuration option next to its effect.

- Bullet points work
- **Bold text** works
- [Links](/) work

{{< column >}}
Right column content. Each column takes roughly 48% of the available width.

```toml
[Params]
  colorScheme = "auto"
```
{{< /columns >}}

**Source:**

```markdown
{{</* columns */>}}
Left column content here.
{{</* column */>}}
Right column content here.
{{</* /columns */>}}
```

## tabs / tab

The `tabs` and `tab` shortcodes render a Bootstrap 5 tabbed interface. Tabs with the same `groupId` across different blocks will switch in sync.

| Shortcode | Parameter | Required | Description |
|-----------|-----------|----------|-------------|
| `tabs` | `groupId` | no | Group identifier for tab synchronization |
| `tab` | name (positional) | yes | Display label for the tab button |

**Live example — three tabs:**

{{< tabs groupId="config-format" >}}
{{< tab "TOML" >}}
```toml
[Params]
  subtitle = "My Site"
  colorScheme = "auto"
```
{{< /tab >}}
{{< tab "YAML" >}}
```yaml
Params:
  subtitle: "My Site"
  colorScheme: "auto"
```
{{< /tab >}}
{{< tab "JSON" >}}
```json
{
  "Params": {
    "subtitle": "My Site",
    "colorScheme": "auto"
  }
}
```
{{< /tab >}}
{{< /tabs >}}

**Synchronized tabs** — click a tab below and watch the one above switch too:

{{< tabs groupId="config-format" >}}
{{< tab "TOML" >}}
TOML is the default format for Hugo config files.
{{< /tab >}}
{{< tab "YAML" >}}
YAML is also supported by Hugo.
{{< /tab >}}
{{< tab "JSON" >}}
JSON works too, though it's less common for config.
{{< /tab >}}
{{< /tabs >}}

**Source:**

```markdown
{{</* tabs groupId="config-format" */>}}
{{</* tab "TOML" */>}}
  ... content ...
{{</* /tab */>}}
{{</* tab "YAML" */>}}
  ... content ...
{{</* /tab */>}}
{{</* tab "JSON" */>}}
  ... content ...
{{</* /tab */>}}
{{</* /tabs */>}}
```

To synchronize tabs across multiple blocks, give them the same `groupId`:

```markdown
{{</* tabs groupId="config-format" */>}}
{{</* tab "TOML" */>}} ... {{</* /tab */>}}
{{</* tab "YAML" */>}} ... {{</* /tab */>}}
{{</* /tabs */>}}

{{</* tabs groupId="config-format" */>}}
{{</* tab "TOML" */>}} ... {{</* /tab */>}}
{{</* tab "YAML" */>}} ... {{</* /tab */>}}
{{</* /tabs */>}}
```

## beautifulfigure

The `beautifulfigure` shortcode renders a PhotoSwipe-enhanced figure. Clicking the image opens a full-screen lightbox.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | — | URL of the image |
| `link` | string | value of `src` | URL of the full-size image (for lightbox) |
| `thumb` | string | — | Thumbnail URL (alternative to `src`) |
| `alt` | string | `caption` or `src` | Alt text for the `<img>` |
| `caption` | string | — | Caption text below the image |
| `title` | string | — | Title heading in the figcaption |
| `attr` | string | — | Attribution text |
| `attrlink` | string | — | URL for the attribution |
| `class` | string | — | CSS class on the `<figure>` element |
| `size` | string | — | Dimensions for PhotoSwipe: `WIDTHxHEIGHT` (e.g. `1024x768`) |
| `width` | string | — | CSS `max-width` on the wrapper div |
| `caption-position` | string | — | Position class for the caption |
| `caption-effect` | string | — | Effect class for the caption (e.g. `slide`, `fade`) |

**Live example:**

{{< beautifulfigure src="/img/global-ike.png" caption="A globe with transparency" attr="PurePNG" attrlink="https://purepng.com/photo/30733/clipart-cartoon-globe" caption-effect="slide" width="25%" class="center" >}}

**Source:**

```markdown
{{</* beautifulfigure src="/img/global-ike.png"
  caption="A globe with transparency"
  attr="PurePNG"
  attrlink="https://purepng.com/photo/30733/clipart-cartoon-globe"
  caption-effect="slide"
  width="25%"
  class="center" */>}}
```

## figure

The `figure` shortcode is a router. By default it delegates to `beautifulfigure` (PhotoSwipe-enhanced). When `disableFigureOverride = true` is set in your config, it uses Hugo's standard `<figure>` shortcode instead.

See [Figures & Galleries](../figures-and-galleries/) for details on the routing behavior and the `disableFigureOverride` flag.

## gallery

The `gallery` shortcode renders an image gallery grid with PhotoSwipe support. It has two modes: **manual** (place `beautifulfigure` shortcodes inside) and **directory** (auto-populate from a directory).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dir` | string | — | Path relative to `/static/` to auto-populate images |
| `thumb` | string | `-thumb` | Suffix that identifies thumbnail files in directory mode |
| `caption-position` | string | `bottom` | Caption position: `bottom`, `center`, `none` |
| `caption-effect` | string | `slide` | Caption animation: `slide`, `fade`, `appear` |
| `hover-effect` | string | `zoom` | Hover effect: `zoom`, `grow`, `shrink`, `slidedown`, `slideup` |
| `hover-transition` | string | — | Set to `none` to disable hover transition |

**Manual mode example:**

{{< gallery caption-effect="fade" >}}
{{< beautifulfigure src="/img/gallery/sunset.jpg" caption="Sunset" >}}
{{< beautifulfigure src="/img/gallery/forest.jpg" caption="Forest" >}}
{{< beautifulfigure src="/img/gallery/mountain.jpg" caption="Mountain" >}}
{{< /gallery >}}

**Directory mode example:**

{{< gallery dir="/img/gallery/" caption-effect="fade" />}}

In directory mode, filenames are humanized into captions. Files containing the thumb suffix (e.g. `lake-thumb.jpg`) are used as thumbnails for the matching full-size image (`lake.jpg`).

**Source (manual):**

```markdown
{{</* gallery caption-effect="fade" */>}}
{{</* beautifulfigure src="/img/gallery/sunset.jpg" caption="Sunset" */>}}
{{</* beautifulfigure src="/img/gallery/forest.jpg" caption="Forest" */>}}
{{</* /gallery */>}}
```

**Source (directory):**

```markdown
{{</* gallery dir="/img/gallery/" caption-effect="fade" */>}}
```

## mermaid

The `mermaid` shortcode renders Mermaid diagrams. It automatically handles light/dark mode by dual-rendering.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `align` | string | — | CSS text alignment: `center`, `left`, `right` |

**Flowchart example:**

{{< mermaid align="center" >}}
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
{{< /mermaid >}}

**Sequence diagram example:**

{{< mermaid align="center" >}}
sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Click link
    Browser->>Server: HTTP request
    Server-->>Browser: HTML response
    Browser-->>User: Rendered page
{{< /mermaid >}}

**Source — Flowchart:**

```markdown
{{</* mermaid align="center" */>}}
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
{{</* /mermaid */>}}
```

**Source — Sequence Diagram:**

```markdown
{{</* mermaid align="center" */>}}
sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Click link
    Browser->>Server: HTTP request
    Server-->>Browser: HTML response
    Browser-->>User: Rendered page
{{</* /mermaid */>}}
```

See [Math & Diagrams](../math-and-diagrams/) for more Mermaid and KaTeX examples.

## no-ai-summary

The `no-ai-summary` shortcode wraps content in a `<div data-nosnippet>` element, telling search engines not to use that content for AI-generated summaries or snippets.

**Live example:**

{{< no-ai-summary >}}
This text is wrapped in `data-nosnippet` and should not appear in search engine AI summaries.
{{< /no-ai-summary >}}

**Source:**

```markdown
{{</* no-ai-summary */>}}
This text is wrapped in `data-nosnippet` and should not appear in search engine AI summaries.
{{</* /no-ai-summary */>}}
```

See [SEO & i18n](../seo-and-i18n/) for the full robot meta tags and AI summary limit configuration.
