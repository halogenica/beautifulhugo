---
title: Manage robot meta tags an limit AI Overview from using page contents
date: 2026-04-14
description: "This feature adds the ability to apply robot meta data on page
through using custom page paramaters."
tags: ["example", "summary", "limits", "search", "robots", "meta tags"]
---

## Purpose

This feature provides two main improvements.
  
- Allows the management of `<meta name="robots"....>` tags using front matter.
- Allows the management of the meta tags related to SEO AI Summary creation.

## Considerations when enabling this feature for AI Summary control

Enabling this features may impact how your site or pages are indexed. This will
depend on how the various search engines react to having the AI Overview denied
access to page content. I would suggest you read some of the references at the
end of this post.

## Configuration

There are three areas where configuration is obtained.

- hugo.toml  
  Only loaded if the page is part of the `mainSection`
- The page's parent if there is a `_index.md`
- The page it self

The loading order is hugo.toml -> _index.md -> page. This means that:

- _index.md overrides hugo.toml if different values exist for the same key
- page overrides _index.md if values exist the same key

### hugo.toml

```toml
[Params.seo.robots]
ai-summary-limit = "nosnippet"
noindex = true
nofollow = true

[Params.seo.GoogleBot]
noindex = true
ai-summary-limit = 50
```

When the above configuration is used, pages that are part of `mainSection` will
have the following meta tag inserted witin their `<head></head>`.

```html
<meta name="robots" content="nosnippet">
<meta name="googlebot" content="noindex, max-snippet:50">
```

Pages that are not part of `mainSection` will not have any tags, but you can
set these tags or override them by setting the required params in the page's own
front matter.

**NOTE:** Additional search engine bots can be added. e.g. *DuckDuckbot*

#### Options for summaryLimit

- none # No Limit: max-snippet will not be added to the robot tag
- nosnippet # No snippet permitted equivalent to 0
- Any positive numerical value, 0, 50, 150, 300 and more

### Page Overrides

The tag defaults that you define in *hugo.toml* can be overridden on
a page by page bases. Within the *Front Matter* add the following.

```yaml
seo:
  robots:
    ai-summary-limit: none
  GoogleBot:
    noindex: false
```

With the above settings:

- robots will not be added as `no limit` is the default
- GoogleBot will only contain the max-snippet value

```html
<meta name="googlebot" content="max-snippet:50">

```

#### List of supported meta tags

- noindex
- nofollow
- none
- nosnippet
- notranslate
- noimageinde
- noarchive
- nocache
- noai
- noimageai
- ai-summary-limit  
  Values: none, nosnippet, 0~300

### Selective application of nosnippet around selected test

There is also a defined standard way to tell search engines not to use a portion
of a page when generating a summary.

{{< no-ai-summary >}}
This portion of the page is not to be used as part of the summary creation.
{{< /no-ai-summary >}}

This is done by calling the *shortcode* of the same name. This wraps the text in
a *div* pair.

## References

- [PlayWire: How to block Google AI Overview from using your Content](https://www.playwire.com/blog/how-to-block-google-ai-overview-from-using-your-content)
- [ASP Events: How to Stop Google's AI from Using Certain Content on Your Event Website](https://www.asp.events/blog/stop-googles-ai-using-certain-content-event-website)
