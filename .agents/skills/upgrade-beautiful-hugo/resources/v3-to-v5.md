# Upgrade Beautiful Hugo v3 to v5

This is the large step. v5.0 moves the theme to Bootstrap 5, adds dark mode, makes
Chroma the default highlighter, reorganizes the CSS around custom properties, and
deletes the vendored fonts and the PhotoSwipe 4 files. Expect to rework custom CSS
and any copied template.

There is no v4 release. After this guide, continue with `v5.0-to-v5.1.md` and
`v5.1-to-v5.2.md`.

Do the steps in order. Steps 1 to 3 apply to every site. The rest apply only if the
check command finds something.

## 0. Baseline

```bash
git status --short          # commit or stash first
hugo --minify               # build v3 once
cp -r public /tmp/before-v5
hugo version                # must be 0.146.2 or later
```

## 1. Point the site at v5 (required)

v3 and v5.0.0 use the module path without a suffix. v5.0.1 added the `/v5` suffix,
so use the suffixed path.

**Hugo module** — in the site configuration:

```toml
[module]
  [[module.imports]]
    path = "github.com/halogenica/beautifulhugo/v5"
```

```bash
hugo mod get github.com/halogenica/beautifulhugo/v5
hugo mod tidy
```

**Git submodule**

```bash
git -C themes/beautifulhugo fetch --tags
git -C themes/beautifulhugo checkout v5.0.1
git add themes/beautifulhugo
```

Hugo also prefers `hugo.toml` over `config.toml`. The rename is optional but
recommended.

## 2. Replace the `pygments*` keys (required)

The `pygments*` keys do nothing in v5. Chroma, which is built in to Hugo, does the
highlighting, and it needs classes, not inline styles.

```bash
grep -n 'pygments' hugo.toml config.toml 2>/dev/null
```

Delete every `pygments*` key and add:

```toml
[markup.highlight]
  noClasses = false
```

To keep client-side Highlight.js instead, set `Params.useHLJS = true`.

## 3. Check the required configuration keys (required)

```bash
grep -n '^\[author\]\|dateFormat\|dateformat' hugo.toml config.toml 2>/dev/null
```

- `[author]` at the top level is an error. Use `[Params.author]`.
- `Params.dateformat` must be a Go reference layout, such as `"January 2, 2006"` or
  `"2006-01-02"`, or a locale token such as `":date_long"`. A string like
  `"2023-10-15"` now fails the build instead of printing wrong dates.

## 4. Port custom CSS and templates to Bootstrap 5

```bash
grep -rn 'navbar-default\|navbar-fixed-top\|navbar-toggle\|data-toggle\|data-target\|col-xs-\|panel\|pull-left\|pull-right\|hidden-xs\|glyphicon\|img-responsive' layouts assets static
```

Common renames:

| Bootstrap 3 | Bootstrap 5 |
| --- | --- |
| `data-toggle`, `data-target` | `data-bs-toggle`, `data-bs-target` |
| `col-xs-*` | `col-*` |
| `navbar-default`, `navbar-fixed-top` | `navbar-expand-*`, `fixed-top` |
| `navbar-toggle` | `navbar-toggler` |
| `pull-left`, `pull-right` | `float-start`, `float-end` |
| `hidden-xs` | `d-none d-sm-block` |
| `panel` | `card` |
| `img-responsive` | `img-fluid` |
| `glyphicon *` | a Font Awesome `fas fa-*` class |

The theme's own dropdown menus are Bootstrap components now, so custom dropdown
markup and its CSS need the same treatment.

## 5. Make custom CSS work in dark mode

v5 adds automatic, light, and dark modes, controlled by `Params.colorScheme`. The
theme sets `data-theme="dark"` on the root element and defines the dark colors as
custom properties there. Custom CSS with hardcoded colors stays light in dark mode.

- Add a `[data-theme="dark"]` rule for each custom selector, and use the theme
  variables, for example `var(--dark-bg)`, `var(--dark-fg)`, and `var(--dark-link)`.
  The full list is at the top of `assets/css/dark.css` in the theme.
- To keep the site light only, set `Params.colorScheme = "light"`.

## 6. Remove links to deleted theme files

These files are gone from the theme:

```
static/css/main-minimal.css
static/css/mermaid.css, static/css/mermaid.dark.css
static/css/photoswipe.min.css, static/css/photoswipe.default-skin.min.css
static/js/photoswipe.min.js, static/js/photoswipe-ui-default.min.js
static/js/jquery-3.7.0.slim.min.js
static/js/recaptcha.js
static/fonts/lora/*, static/fonts/open-sans/*
```

```bash
grep -rn 'main-minimal\|photoswipe\|jquery-3\|recaptcha\|fonts/lora\|fonts/open-sans' layouts assets hugo.toml config.toml 2>/dev/null
```

Delete the tags. The fonts now come from Google Fonts, or from the theme's
`static/` directory when `Params.selfHosted = true`.

PhotoSwipe is at version 5. Custom gallery markup must carry `data-pswp-width` and
`data-pswp-height`; `data-size` and the `.pswp` root element are not used.

## 7. Refresh copied theme templates

Site overrides of these v3 files do nothing in v5, because the theme no longer
calls them:

```
layouts/index.html                        → layouts/_default/list.html
layouts/partials/seo/opengraph.html       → Hugo's internal opengraph template
layouts/partials/seo/structured/post.html → layouts/partials/seo/structured/article.html
layouts/partials/load-photoswipe-theme.html → deleted
```

```bash
ls layouts layouts/partials layouts/_default layouts/shortcodes 2>/dev/null
```

Diff every remaining copy against the v5 file and port the local edits. `head.html`,
`nav.html`, `footer.html`, `scripts.html`, and `post_meta.html` changed heavily.

The StumbleUpon share button is removed. Delete any custom reference to it.

## 8. Expect different page listings

v5 respects `Params.mainSections` in the templates, and pages with `hidden = true`
stay out of section and term listings.

```bash
grep -rn 'mainSections' hugo.toml config.toml 2>/dev/null
grep -rln 'hidden: true\|hidden = true' content | head
```

Set `mainSections` to the sections the home page and the RSS feed must list.

## 9. Build and compare

```bash
hugo --minify --panicOnWarning
diff -rq /tmp/before-v5 public | head -40
```

The HTML differs on every page; that is expected. Check by hand: the navbar and its
dropdowns on wide and narrow screens, the footer icons, post pages, galleries, math,
code blocks, and both color schemes.

## 10. Optional: adopt the new v5 features

`Params.search.provider = "fuse"` (client-side search), the table-of-contents panel,
callouts, `tabs`, `beautifulfigure`, the recipe page type, Utterances and giscus
comments, GitHub buttons, a print stylesheet, and the `nav-short`, `show-avatar`,
and `full-width` page parameters. See `exampleSite/hugo.toml` and the pages under
`exampleSite/content/page/`.
