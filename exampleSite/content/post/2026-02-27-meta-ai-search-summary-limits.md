---
title: Limit AI Overview From Using Page Contents
date: 2026-03-02
tags: ["example", "summary", "limits", "search"]
---

## Purpose

This adds the ability to limit the length of any page summary that a search
engine might attempt to create based on your page content.

## Considerations when enabling this feature

Enabling this features may impact how your site or pages are indexed. This will
depend on how the various search engines react to having the AI Overview denied
access to page content. I would suggest you read some of the references at the
end of this post.

## Configuration

This is a basic outline on how to configure this option.
**NOTE:** Only text based items are covered, and Image size has not been
implemented at this time.

### hugo.toml

```toml
#[Params.AISearchSummary.Googlebot]
#summaryLimit = 150
#[Params.AISearchSummary.robots]
#summaryLimit = 300
```

When the above lines are uncommented. All pages within the `.Site.mainSection`
will have a new meta tag inserted in to their `<head></head>`.

```html
<meta name="robots" content="max-snippet:300">
<meta name="Googlebot" content="max-snippet:150">
```

**NOTE:** Additional search engine bots can be added. e.g. *DuckDuckbot*

#### Options for summaryLimit

- none # No Limit
- nosnippet # No snippet permitted equivalent to 0
- Any numerical value, 0, 50, 150, 300 and more

### Page Overrides

The AISearchSummary defaults that you define in *hugo.toml* can be overridden on
a page by page bases. Within the *Front Matter* add the following.

```yaml
summaryLimits:
  robots:
    summaryLimit: 100
  Googlebot:
    summaryLimit: 200
```

*NOTE:* If you add a search engine such as *Googlebot* to the page, but the bot
is not listed in the *hugo.toml* configuration, it will be ignored.

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
