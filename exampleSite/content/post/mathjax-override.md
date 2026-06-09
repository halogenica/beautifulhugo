---
title: "MathJax per-page override"
date: 2026-05-12T10:00:00+02:00
type: post
mathEngine: "mathjax"
tags: ["math", "demo"]
summary: "Demonstrates overriding the site-level math engine to use MathJax on a single post."
---

This post overrides the site-level `mathEngine` setting via front matter to use **MathJax** instead of the default KaTeX:

```yaml
---
mathEngine: "mathjax"
---
```

## Inline math

Euler's identity is $e^{i\pi} + 1 = 0$, and the golden ratio is $\varphi = \frac{1+\sqrt{5}}{2} \approx 1.618$.

## Display math

The Gaussian integral:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

The Einstein field equations:

$$
G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}
$$

A matrix example:

$$
\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}, \quad
\det(\mathbf{A}) = a_{11}a_{22} - a_{12}a_{21}
$$

### Long equation test (mobile scroll behavior)

This very long equation tests horizontal scrolling on mobile devices:

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f^{(3)}(a)}{3!}(x-a)^3 + \cdots = \int_a^x \int_a^{t_1} \int_a^{t_2} \cdots \int_a^{t_n} f^{(n+1)}(t_{n+1}) \, dt_{n+1} \, dt_n \cdots \, dt_2 \, dt_1 + \text{remainder terms}
$$


---

**Verify**: open the browser's developer tools and inspect the loaded scripts — you should see `mathjax@3.2.2/es5/tex-chtml.min.js` (and *not* `katex.min.js`).
