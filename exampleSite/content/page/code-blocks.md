---
title: Code Blocks
subtitle: Syntax highlighting, line numbers, and the copy button
comments: false
---

Beautiful Hugo supports two syntax highlighting engines: Hugo's built-in **Chroma** (default) and client-side **Highlight.js**. This page demonstrates Chroma, which is fast and built when the page renders.

## Required Config

{{< tabs >}} {{< tab "Chroma" >}}

```toml
[markup.highlight]
  noClasses = false
```

`noClasses = false` tells Chroma to avoid injecting inline styles, giving us (and you) full control over colors.

If you want code language guessing on, you can:

```toml
[markup.highlight]
  guessSyntax = true
```

In general, though, Chroma doesn't guess very many languages, so it's better to always include the language in the code blocks.

{{< /tab >}} {{< tab "Highlight.js" >}}


```toml
[Params]
  useHLJS = true
[markup.highlight]
  codeFences = false
```

This loads Highlight.js from CDN (or `static/js/highlight.min.js` if `selfHosted = true`) with a default light theme and a dark theme that activates automatically. When using HLJS, you do not need chroma highlighting code fences — Highlight.js applies styles via JavaScript. Note that the code language guesser for Highlight.js is much smarter than the Chroma one.


{{< /tab >}} {{< /tabs >}}


## Fenced Code Blocks

Use triple backticks with a language identifier, like this:

{{< columns >}}

````
```json
{
  "example": "code"
}
```
````

{{< column >}}

```json
{
  "example": "code"
}
```


{{< /columns >}}


```python
# python
def fibonacci(n):
    """Return the nth Fibonacci number."""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

```go
# go
package main

import "fmt"

func main() {
    ch := make(chan string)
    go func() { ch <- "hello" }()
    fmt.Println(<-ch)
}
```

```javascript
// javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

greet("World");
```

```toml
# toml
[Params]
  subtitle = "My Site"
  colorScheme = "auto"
  selfHosted = false
```

## Line Numbers

Use Hugo's `highlight` shortcode with `linenos` to add line numbers:

```markdown
{{</* highlight python "linenos=table" */>}}
def quicksort(arr):
    ...
{{</* /highlight */>}}
```

{{< highlight python "linenos=table" >}}
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
{{< /highlight >}}

Inline line numbers:

```markdown
{{</* highlight go "linenos=inline" */>}}
func reverse(s string) string {
    ...
{{</* /highlight */>}}
```

{{< highlight go "linenos=inline" >}}
func reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}
{{< /highlight >}}

## Line Highlighting

Use `hl_lines` to emphasize specific lines:

```markdown
{{</* highlight python "linenos=table, hl_lines=3 4" */>}}
def process(data):
    result = []
    for item in data:       # highlighted
        result.append(item)  # highlighted
    return result
{{</* /highlight */>}}
```

{{< highlight python "linenos=table, hl_lines=3 4" >}}
def process(data):
    result = []
    for item in data:       # highlighted
        result.append(item)  # highlighted
    return result
{{< /highlight >}}

## Copy Button

Every code block automatically gets a **copy-to-clipboard** button in the top-right corner. Hover over any code block on this page to see it. The button strips line numbers before copying.

## Inline Code

Use backticks for inline code: `hugo serve -D` or `console.log("hello")`.

