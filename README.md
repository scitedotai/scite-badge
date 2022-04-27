# Scite Badge #

Thin wrapper around [scite widget](https://github.com/scitedotai/scite-widget) to allow embedding on pages.

## Example Usage ##

To use simply include the Javascript bundle on your page. All elements with the class `scite-badge` will have a badge injected into them, with the target DOI selected by the `data-doi` attribute.

```
<script type="application/javascript" src="https://cdn.scite.ai/badge/scite-badge-full-latest.min.js"></script>
<div class="scite-badge" data-doi="10.1016/j.biopsych.2005.08.012"></div>
```

## Settings ##

`doi`: Target DOI (required) (Can specify to pull from meta tag rather than hard code, see below)

`show-zero`: Whether to show the badge even if we have no cites (0 0 0 0) (default: `false`)

`layout`: Either 'vertical' or 'horizontal' (default: `vertical`)

`tooltip-placement`: Preferred tooltip placement (`left`, `right`, `top`, `bottom` or `none`) (default: `top`)

`tooltip-slide`: Preferred tooltip position offset along edge in pixels (default: `0`, the center)

`show-labels`: Whether to show tally labels (supporting, contrasting, mentioning) (default: `false`)

`rewardful-id`: A rewardful affiliate ID from [https://scite.ai/affiliate](https://scite.ai/affiliate) (optional)

`show-logo`: Whether the scite logo should show up (defaults `True`)

`tally-show`: Whether you want to show the widget for Smart Citation tallies (defaults `True`)

`section-tally-show`: Whether you want to show the Section Tally widget (defaults `False`)

`section-tally-layout`: Whether you want to show the Section Tally widget in the 'vertical' or 'horizontal' configuration (default: `vertical`)

`chart-type`: What type of chart you want to show for the Section Tally widget. Must be one of `bar`, `pie`, `donut`. Defaults to `null`.

To pull the target DOI from a meta tag in the document rather than setting inline, you can use the syntax `meta:my_tag_name`. For example:

```
<meta name="article_doi" content="10.mydoi" />
<div class="scite-badge" data-doi="meta:article_doi"></div>
```

Would use the DOI `10.mydoi`.

## API ##

By default the badges will load in after the page has loaded. To manually reload the badges run the function `insertBadges` is exposed:

```
window.__SCITE.insertBadges()
```

## Advanced Usage ##

If it is more convenient to configure the badges not inline where they will be injected but elsewhere on the page, you can use elements with the class `scite-badge-config` to describe your badges. These elements are configurable the same way as `scite-badge` elements but have two extra options:

`target-el`: Selector for the element the badge should be injected into or by (see below) (required)

`insert-before`: Whether the badge should be injected before the element (default: false)

If `insert-before` is not set to `true` then the badge will be appended to the element specified as `target-el`. If `insert-before` is `true` then the badge will be inserted before the element specified by `target-el`.

## Release ##

Releases are uploaded to our CDN by Circle. The release channel is based on the tag. To release a commit to stage push the tag (e.g.):

```bash
$ git tag v1.2.0-stage -m "My cool new version"
$ git push origin v1.2.0-stage
```

To release to prod (e.g.):

```bash
$ git tag v1.2.0-prod -m "My cool new version"
$ git push origin v1.2.0-prod
```

## Local development ##

```
$ npm i
$ npm run dev
```

This will serve the application at `localhost:8001`.

Tip: Change the scite-widget branch in `./package.json` to one you are working on.
