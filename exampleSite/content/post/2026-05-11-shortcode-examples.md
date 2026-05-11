---
title: Shortcode Examples
subtitle: Demonstrating built-in shortcodes and Mermaid diagrams
date: 2026-05-11
tags: ["example", "shortcodes"]
---

This page shows off a few of the built-in shortcodes provided by Beautiful Hugo:

- `mermaid` — render diagrams directly in your posts.
- `details` — create expandable sections.
- `columns` and `column` / `endcolumns` — responsive multi-column layouts.

<!--more-->

## Mermaid diagrams

A simple flowchart rendered with the `mermaid` shortcode:

{{< mermaid >}}
graph TD
  A[Start] --> B{Is it working?}
  B -->|Yes| C[Great!]
  B -->|No| D[Debug]
  D --> B
{{< /mermaid >}}

A sequence diagram:

{{< mermaid >}}
sequenceDiagram
  participant Alice
  participant Bob
  Alice->>Bob: Hi Bob
  Bob-->>Alice: Hi Alice
{{< /mermaid >}}

These diagrams automatically switch to a dark theme when the site is in dark mode.

## Expandable sections

The `details` shortcode works like native HTML `<details>`

{{< details "Show me the code" >}}
Here is some hidden content that can be toggled open and closed.

```python
def hello():
    return "world"
```
{{< /details >}}

## Multi-column layout

The `columns` shortcode lets you create responsive columns.

{{< columns >}}
Column one

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{{< column >}}
Column two

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{{< column >}}
Column three

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
{{< endcolumns >}}
