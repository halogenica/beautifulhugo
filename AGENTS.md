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

- **Minimum Hugo version**: `0.146.2`, declared in `hugo.toml` (`[module.hugoVersion]`) and in `theme.toml` (`min_version`, for the themes gallery).
- Hugo only writes a **warning** if `[module.hugoVersion]` is not satisfied, for modules and for classic `themes/` use. `layouts/baseof.html` keeps an `errorf` to stop the build.
- **CI matrix** tests against `0.146.2`, `0.155.2`, and `0.163.0`. `--panicOnWarning` makes the module warning a CI failure.
- The deploy workflow pins `0.163.0`.
- The theme declares `extended = false`: it has no SCSS and no WebP encoding, so the **standard** Hugo edition is sufficient. CI still uses the extended binary.

## Theme Configuration (`hugo.toml`)

Hugo merges only some sections of a theme configuration into the site configuration. `params` merge deeply and site values win. Sections such as `[markup]` are **not** merged, so Chroma and goldmark settings must stay in the site configuration (`exampleSite/hugo.toml`).

## Architecture

The theme uses the Hugo 0.146 template layout: `baseof.html`, `page.html`, `list.html`, `taxonomy.html`, and `home.json` at the root of `layouts/`, plus `_partials/`, `_shortcodes/`, and `_markup/`. Site overrides in the legacy `partials/` and `shortcodes/` directories still work.

- `layouts/` — Go HTML templates, partials, shortcodes, and default page layouts.
- `assets/` — Theme-owned CSS and JS (`main.css`, `dark.css`, `main.js`, and similar). Loaded through the `css.html` and `js.html` partials (backed by `asset.html`), which concatenate into one CSS and one JS bundle, minify in production only (`hugo.IsProduction`), fingerprint, and emit SRI `integrity` attributes. Do not hand-minify these files. Theme JS runs after all vendored libraries, so it must not be needed by inline scripts earlier in the page.
- `static/` — Vendored assets that ship web fonts (Font Awesome, KaTeX CSS + fonts, Google Fonts). `mermaid.js` lives in `assets/js/` so upgrades bust the cache, and is passed through `js.html` with `minify false`.
- `data/beautifulhugo/vendor.toml` — Pinned CDN URL and SRI hash for every other third-party file (Bootstrap, KaTeX JS, Highlight.js, PhotoSwipe, Fuse.js). `layouts/_partials/vendor.html` emits the tag: a CDN link by default, or with `selfHosted` a `resources.GetRemote` fetch that is checked against the hash, fingerprinted, and published under `vendor/`.
- `exampleSite/` — Demo content (`content/`, `hugo.toml`, and custom `layouts/_partials/head_custom.html` / `footer_custom.html`).
- `i18n/` — Translation strings in YAML.
- `data/beautifulhugo/social.toml` — Social icon registry consumed by `layouts/_partials/footer.html`.
- `.agents/skills/upgrade-beautiful-hugo/` — Skill that upgrades a downstream site between theme versions. One guide per version step in `resources/`; add a new one with every release that needs action from site owners.

## Agent Gotchas

- **`[Params.author]` is required; `[author]` is deprecated.** `layouts/_partials/footer.html` emits an explicit `errorf` if the old top-level `[author]` key is still present.
- **Asset loading is conditional on `selfHosted`.** When `Params.selfHosted = true`, the theme fetches the files listed in `data/beautifulhugo/vendor.toml` at build time and serves the font-bearing CSS from `static/`. When `false` (default), it loads them from CDNs. To bump a version, change the URL and hash together in `vendor.toml`; KaTeX CSS and Font Awesome also need their `static/` copies and the CDN tags in `layouts/_partials/head.html` updated. The self-hosted build needs network access once; CI caches `HUGO_CACHEDIR` and builds the example site a second time with `HUGO_PARAMS_SELFHOSTED=true`.
- **Per-page assets go through `templates.Defer`.** Shortcodes set `beautifulhugoFigure`, `beautifulhugoMermaid`, or `beautifulhugoTabsSync` on `Page.Store`; the deferred block in `head.html` reads them via `func/page-features.html` and emits the gallery CSS, mermaid scripts, or `tabs-sync.js` once. List pages merge the flags of the pages in the current pager.
- **Math loading is conditional on content.** `layouts/_markup/render-passthrough.html` emits the math unchanged and sets `.Page.Store.Set "hasMath" true`. `layouts/_partials/func/load-math.html` reads that flag and returns whether `head.html` and `scripts.html` must load KaTeX or MathJax; it calls `.WordCount` first, because the head is written before the content is rendered. The Goldmark passthrough extension is a **site** setting (Hugo does not merge `[markup]` from a theme), so `layouts/_partials/func/has-passthrough.html` probes for it and the theme falls back to loading the math files on every page.
- **Syntax highlighting is also conditional.** `useHLJS = true` switches to client-side Highlight.js (from `vendor.toml`). Otherwise it relies on Hugo's built-in Chroma and `assets/css/syntax.css`.
- **Render hooks:** `layouts/_markup/render-image.html` sends Markdown images through the same image helpers as `beautifulfigure`. It emits a plain `<img>` (no `<figure>`, no PhotoSwipe). Markdown attributes (`{width=300}` on the line after the image) reach the hook only when the site sets `wrapStandAloneImageWithinParagraph = false`; a numeric `width` or `height` also caps the resized variants.
- **Shortcodes provided:** `details`, `columns` / `column` / `endcolumns`, `beautifulfigure` (backwards-compatible `figure` alias), `gallery`, `mermaid`, `video` (self-hosted `<video>` in a figure; paths resolve through `layouts/_partials/func/media-url.html`), `icon`.
- **`disableFigureOverride` flag.** Set `Params.disableFigureOverride = true` to restore Hugo's native `<figure>` shortcode (the PhotoSwipe-enhanced version remains available as `beautifulfigure`).
- **Image processing only applies to resources.** `layouts/_partials/func/image-resource.html` resolves a path to a page-bundle or `assets/` image; `static/` paths and URLs return `""` and callers must keep a plain-URL fallback. `Params.imageProcessing = false` disables it.
- **Multilingual** is supported via the standard Hugo `languages` config with per-language `contentDir`.
- **No unit tests exist.** The CI only confirms the example site builds cleanly across the Hugo version matrix. Run the build command above before opening a PR.
- **Use `relURL` instead of `absURL` for all asset and page URLs in templates.** `absURL` produces absolute URLs that break when the site is deployed under a subpath (e.g. `example.com/blog/`). `relURL` generates relative URLs that work correctly regardless of the `baseURL` configuration. Similarly, prefer `relLangURL` over `absLangURL`. Note: `absURL` is still acceptable in structured-data JSON-LD and Open Graph / Twitter meta tags where absolute URLs are required by the spec.
- **Features must be documented in the example site.** When adding or changing a feature, update the relevant page under `exampleSite/content/page/` (especially `configuration.md` and `pages-and-layouts.md`).
