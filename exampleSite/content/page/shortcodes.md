---
title: Shortcodes
subtitle: Built-in shortcodes with live examples
comments: false
---

Beautiful Hugo ships with several shortcodes for common patterns like collapsible sections, multi-column layouts, tabbed content, image galleries, and diagrams.

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
{.box-warning}

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
