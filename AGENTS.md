# Agent Notes: Beautiful Hugo Theme

This is a **Hugo theme**, not a standalone site. All changes are template-level (Go templates, HTML, CSS/JS, YAML i18n). There is no package manager, build tool, or test suite beyond Hugo's own build.

## Quick Build / Verify

To preview changes locally, build the example site with the parent directory as the themes root:

```bash
hugo --minify -s exampleSite
```

If you want to see the site served, you can start a live server with:

```bash
hugo serve -s exampleSite --disableFastRender
```

## Hugo Version

- **Minimum Hugo version**: `0.146.2` (enforced at runtime in `layouts/_default/baseof.html`).
- **CI matrix** tests against `0.146.2`, `0.147.2`, and `0.155.2`.
- The deploy workflow pins `0.146.2`.
- CI uses the **extended** Hugo binary.

## Architecture

- `layouts/` — Go HTML templates, partials, shortcodes, and default page layouts.
- `static/` — Vendored third-party assets (Bootstrap 5.3.5, jQuery 4.0.0, Font Awesome, KaTeX, PhotoSwipe, Highlight.js, Mermaid) plus `main.css` and `codeblock.css`.
- `exampleSite/` — Demo content (`content/`, `hugo.toml`, and custom `layouts/partials/head_custom.html` / `footer_custom.html`).
- `i18n/` — Translation strings in YAML.
- `data/beautifulhugo/social.toml` — Social icon registry consumed by `layouts/partials/footer.html`.

## Agent Gotchas

- **`[Params.author]` is required; `[author]` is deprecated.** `layouts/partials/footer.html` emits an explicit `errorf` if the old top-level `[author]` key is still present.
- **Asset loading is conditional on `selfHosted`.** When `Params.selfHosted = true`, the theme serves Bootstrap, Font Awesome, KaTeX, Google Fonts, and PhotoSwipe from `static/`. When `false` (default), it loads them from CDNs. If you add or bump a vendored asset, update both the `static/` copy and the CDN conditional in `layouts/partials/head.html` and `layouts/partials/footer.html`.
- **Syntax highlighting is also conditional.** `useHLJS = true` switches to client-side Highlight.js (`static/js/highlight.min.js` + `static/css/highlight.min.css`). Otherwise it relies on Hugo's built-in Chroma and `static/css/syntax.css`.
- **Shortcodes provided:** `details`, `columns` / `column` / `endcolumns`, `beautifulfigure` (backwards-compatible `figure` alias), `gallery`, `mermaid`.
- **`disableFigureOverride` flag.** Set `Params.disableFigureOverride = true` to restore Hugo's native `<figure>` shortcode (the PhotoSwipe-enhanced version remains available as `beautifulfigure`).
- **Multilingual** is supported via the standard Hugo `languages` config with per-language `contentDir`.
- **No unit tests exist.** The CI only confirms the example site builds cleanly across the Hugo version matrix. Run the build command above before opening a PR.
- **Features must be documented in the example site.** When adding or changing a feature, update the relevant page under `exampleSite/content/page/` (especially `configuration.md` and `layout-options.md`).
