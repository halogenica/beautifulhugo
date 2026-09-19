---
name: upgrade-beautiful-hugo
description: Upgrade a Hugo site that uses the Beautiful Hugo theme to a newer theme version. Use when a site pins beautifulhugo (a Hugo module, a git submodule, or a copy in themes/) and must move to a newer release, or when a build after such a move reports missing CSS or JS, jQuery errors, lost custom styles, or an unknown configuration key.
---

# Upgrade Beautiful Hugo

Move a site from one Beautiful Hugo release to a newer one. Each version step has
its own guide in `resources/`. Read only the guides for the steps the site makes.

## 1. Find the current version

```bash
grep -rn 'beautifulhugo' hugo.toml hugo.yaml config.toml go.mod 2>/dev/null
git -C themes/beautifulhugo describe --tags 2>/dev/null
cat themes/beautifulhugo/theme.toml 2>/dev/null | grep -i version
```

A Hugo module site also shows the resolved version:

```bash
hugo mod graph | grep beautifulhugo
```

If no version is visible, compare the site's theme copy against the tags of
`github.com/halogenica/beautifulhugo`.

## 2. Read the guide for each step

| From | To | Guide |
| --- | --- | --- |
| 3.x | 5.0.1 | `resources/v3-to-v5.md` |
| 5.0.x | 5.1.0 | `resources/v5.0-to-v5.1.md` |
| 5.1.x | 5.2.0 | `resources/v5.1-to-v5.2.md` |

Steps are cumulative. A site on 5.0 that goes to 5.2 reads every guide between the
two versions, in order, oldest first. There is no v4 release; v3 goes straight to
v5.

If the step the site makes has no guide in the table, there is no known action
beyond the version bump. Read the release notes for that version and build.

## 3. Rules for every upgrade

- Commit or stash the site before the upgrade, and build once before the change to
  keep a baseline of `public/`.
- Change the theme version only. Do not mix site content edits into the same
  commit.
- Build with `hugo --minify --panicOnWarning` after the upgrade and compare
  `public/` against the baseline. Fingerprinted asset names differ; page HTML
  should not change in unexplained ways.
- Check by hand: dark mode, the table-of-contents panel, search, image galleries,
  math, and any custom partial.
