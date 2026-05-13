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

---

**Verify**: open the browser's developer tools and inspect the loaded scripts — you should see `mathjax@3.2.2/es5/tex-chtml.min.js` (and *not* `katex.min.js`).
