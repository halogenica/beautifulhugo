---
title: Markdown Extensions
subtitle: Callout boxes, utility classes, and theme-dependent content
comments: false
---

Beautiful Hugo provides several CSS classes that extend standard Markdown with callout boxes, theme-dependent visibility, and layout utilities. There are two ways to use them:

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
Use standard HTML tags with the CSS classes directly in your Markdown. This requires enabling `markup.goldmark.renderer.unsafe = true` in your site config:

```toml
[markup.goldmark.renderer]
  unsafe = true
```

Without this setting, Hugo's Goldmark renderer strips raw HTML from Markdown files.
{{< /tab >}}
{{< tab "Block Attributes" >}}
Apply CSS classes to Markdown blocks using the `{.class}` attribute syntax. This requires enabling `markup.goldmark.parser.attribute.block = true` in your site config:

```toml
[markup.goldmark.parser.attribute]
  block = true
```

The `{.class}` attribute must be on its own line immediately after the block. This only works for block-level elements.
{{< /tab >}}
{{< /tabs >}}

Both options can be enabled together. The examples below show each approach — switch tabs to see the alternative syntax.

## Callout Boxes

Four callout box styles are available. Each has a colored left border and a distinct background.

### box-note

<div class="box-note">
This is a <strong>note</strong> callout. Use it for informational asides, tips, or helpful context.
</div>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="box-note">
This is a <strong>note</strong> callout. Use it for informational asides.
</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
This is a **note** callout. Use it for informational asides.
{.box-note}
```
{{< /tab >}}
{{< /tabs >}}

### box-warning

<div class="box-warning">
This is a <strong>warning</strong> callout. Use it to flag potential issues or important caveats.
</div>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="box-warning">
This is a <strong>warning</strong> callout. Use it to flag potential issues.
</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
This is a **warning** callout. Use it to flag potential issues.
{.box-warning}
```
{{< /tab >}}
{{< /tabs >}}

### box-error

<div class="box-error">
This is an <strong>error</strong> callout. Use it for critical errors or dangerous actions.
</div>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="box-error">
This is an <strong>error</strong> callout. Use it for critical errors.
</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
This is an **error** callout. Use it for critical errors.
{.box-error}
```
{{< /tab >}}
{{< /tabs >}}

### box-success

<div class="box-success">
This is a <strong>success</strong> callout. Use it for confirmation messages or completed actions.
</div>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="box-success">
This is a <strong>success</strong> callout. Use it for confirmation messages.
</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
This is a **success** callout. Use it for confirmation messages.
{.box-success}
```
{{< /tab >}}
{{< /tabs >}}

All four boxes adapt automatically to dark mode — their backgrounds and borders shift to appropriate dark-mode colors.

## Content Section

The `.content-section` class wraps content in a rounded gray box:

<div class="content-section">
This content is wrapped in a <code>.content-section</code> div. It's useful for highlighting a block of content or separating it from the surrounding text.
</div>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="content-section">
Wrapped content goes here.
</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
Wrapped content goes here.
{.content-section}
```
{{< /tab >}}
{{< /tabs >}}

## Theme-Dependent Content

Use `.theme-light` and `.theme-dark` to show content only in a specific color scheme. Try toggling the theme with the button in the navbar — the blocks below will swap.

<div class="theme-light">
This text is visible only in <strong>light mode</strong>.
</div>

<div class="theme-dark">
This text is visible only in <strong>dark mode</strong>.
</div>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="theme-light">
  Visible only in light mode.
</div>

<div class="theme-dark">
  Visible only in dark mode.
</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
Visible only in light mode.
{.theme-light}

Visible only in dark mode.
{.theme-dark}
```
{{< /tab >}}
{{< /tabs >}}

This is particularly useful for images or diagrams that need different versions for light and dark backgrounds. Mermaid diagrams use this mechanism internally for dual-rendering.

## Centered Images

Use the `.center` class to center a block element (like an image) with `display: block; margin: 0 auto`:

<img src="/img/global-ike.png" alt="A globe" class="center" style="max-width: 400px;" />

<em class="caption">A centered image with a caption</em>

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<img src="/img/global-ike.png" alt="A globe" class="center" style="max-width: 400px;" />
<em class="caption">A centered image with a caption</em>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
Block attributes only work for block-level elements, so inline elements like `<img>` without a block wrapper still require raw HTML. You can combine both approaches:

```markdown
![A globe](/img/global-ike.png)
{.center}

*A centered image with a caption*
{.caption}
```

Note: applying `.center` to a Markdown image via block attributes centers the `<figure>` wrapper Hugo generates, not the `<img>` directly.
{{< /tab >}}
{{< /tabs >}}

## White Background for Dark Mode

Add the `.white` class to a `<figure>` or `<p>` element to give it a white background. This is useful for images with transparent backgrounds that would otherwise look odd in dark mode.

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<figure class="white">
  <img src="/img/global-ike.png" alt="Globe with transparency" />
</figure>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
![Globe with transparency](/img/global-ike.png)
{.white}
```

When block attributes are enabled, Hugo wraps Markdown images in a `<figure>`. The `.white` class is applied to that `<figure>` wrapper.
{{< /tab >}}
{{< /tabs >}}

## Hidden Elements

The `.hideme` class applies `display: none`:

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<div class="hideme">This content is hidden.</div>
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
This content is hidden.
{.hideme}
```
{{< /tab >}}
{{< /tabs >}}

## Full-Width Image

The `.img-title` class makes an image span the full width:

{{< tabs groupId="syntax" >}}
{{< tab "Raw HTML" >}}
```html
<img src="/img/global-ike.png" class="img-title" alt="Full width image" />
```
{{< /tab >}}
{{< tab "Block Attributes" >}}
```markdown
![Full width image](/img/global-ike.png)
{.img-title}
```
{{< /tab >}}
{{< /tabs >}}
