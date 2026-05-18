---
title: Math & Diagrams
subtitle: KaTeX, MathJax, and Mermaid for math and diagrams
comments: false
---

Beautiful Hugo includes built-in support for **KaTeX**, **MathJax**, and **Mermaid** (diagrams and flowcharts). All are loaded automatically — no extra configuration needed.

## Math Rendering

Choose the math rendering engine via `mathEngine` in your config. See [Configuration — Math Engine](../configuration/#math-engine) for the full option reference and `selfHosted` behavior.

### Inline math

The golden ratio is \\(\varphi = \frac{1+\sqrt{5}}{2} \approx 1.618\\). Euler's identity states that \\(e^{i\pi} + 1 = 0\\).

### Display math

$$
\varphi = \frac{1+\sqrt{5}}{2}
$$

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x)\, e^{-2\pi i x \xi}\, dx
$$

$$
\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}, \quad \det(\mathbf{A}) = a_{11}a_{22} - a_{12}a_{21}
$$

$$
\prod_{i=1}^n x_i = \exp\left(\sum_{i=1}^n \ln x_i\right)
$$

### Long equation test (mobile scroll behavior)

This very long equation tests horizontal scrolling on mobile devices:

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f^{(3)}(a)}{3!}(x-a)^3 + \cdots = \int_a^x \int_a^{t_1} \int_a^{t_2} \cdots \int_a^{t_n} f^{(n+1)}(t_{n+1}) \, dt_{n+1} \, dt_n \cdots \, dt_2 \, dt_1 + \text{remainder terms}
$$

### Source

```markdown
The golden ratio is $\varphi = \frac{1+\sqrt{5}}{2}$.

$$
\varphi = \frac{1+\sqrt{5}}{2}
$$
```

KaTeX is loaded both from CDN and via self-hosted files (when `selfHosted = true`). MathJax is loaded from CDN even when `selfHosted = true`.

## Mermaid

Mermaid renders diagrams from a simple text syntax. Use the `mermaid` shortcode.

### Flowchart

{{< mermaid align="center" >}}
graph TD
    A[User visits site] --> B{Has session?}
    B -->|Yes| C[Load preferences]
    B -->|No| D[Show defaults]
    C --> E[Render page]
    D --> E
    E --> F{Theme preference?}
    F -->|Light| G[Light theme]
    F -->|Dark| H[Dark theme]
    F -->|Auto| I[System preference]
    G --> J[Display content]
    H --> J
    I --> J
{{< /mermaid >}}

### Sequence Diagram

{{< mermaid align="center" >}}
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    participant DB as Database
    U->>B: Navigate to page
    B->>S: GET /api/data
    S->>DB: SELECT * FROM posts
    DB-->>S: Result set
    S-->>B: JSON response
    B->>B: Render content
    B-->>U: Display page
{{< /mermaid >}}

### Gantt Chart

{{< mermaid align="center" >}}
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Setup
        Configure Hugo      :done, setup1, 2026-01-01, 3d
        Install theme       :done, setup2, after setup1, 2d
    section Content
        Write pages         :active, content1, after setup2, 7d
        Add images          :content2, after content1, 3d
    section Deploy
        Build and test      :deploy1, after content2, 2d
        Go live             :milestone, deploy2, after deploy1, 0d
{{< /mermaid >}}

### Source — Flowchart

```markdown
{{</* mermaid align="center" */>}}
graph TD
    A[User visits site] --> B{Has session?}
    B -->|Yes| C[Load preferences]
    B -->|No| D[Show defaults]
    C --> E[Render page]
    D --> E
{{</* /mermaid */>}}
```

### Source — Sequence Diagram

```markdown
{{</* mermaid align="center" */>}}
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    participant DB as Database
    U->>B: Navigate to page
    B->>S: GET /api/data
    S->>DB: SELECT * FROM posts
    DB-->>S: Result set
    S-->>B: JSON response
    B->>B: Render content
    B-->>U: Display page
{{</* /mermaid */>}}
```

### Source — Gantt Chart

```markdown
{{</* mermaid align="center" */>}}
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Setup
        Configure Hugo      :done, setup1, 2026-01-01, 3d
        Install theme       :done, setup2, after setup1, 2d
    section Content
        Write pages         :active, content1, after setup2, 7d
        Add images          :content2, after content1, 3d
    section Deploy
        Build and test      :deploy1, after content2, 2d
        Go live             :milestone, deploy2, after deploy1, 0d
{{</* /mermaid */>}}
```

### Alignment

Use the `align` parameter to control horizontal alignment:

- `align="center"` — centered (recommended for most diagrams)
- `align="left"` — left-aligned
- `align="right"` — right-aligned

### Dark Mode

Mermaid diagrams are dual-rendered for light and dark themes. The theme uses `.theme-light` and `.theme-dark` CSS classes internally, so the correct version displays automatically based on the user's color scheme preference. No extra configuration is needed.
