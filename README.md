# Scite Badge #

Thin wrapper around [scite browser extension](https://github.com/scitedotai/scite-extension) to allow embedding on pages.

## Example Usage ##

To use simply include the Javascript and CSS styles on your page. All elements with the class `scite-badge` will have a badge injected into them, with the target DOI selected by the `data-doi` attribute.

```
<link rel="stylesheet" type="text/css" href="https://cdn.scite.ai/badge/scite-badge-latest.min.css">
<script type="application/javascript" src="https://cdn.scite.ai/badge/scite-badge-latest.min.js"></script>
<div class="scite-badge" data-doi="10.1016/j.biopsych.2005.08.012"></div>
```

## Settings ##

`doi`: Target DOI

`show-zero`: Whether to show the badge even if we have no cites (0 0 0 0) (default: `false`)

`layout`: Either 'vertical' or 'horizontal' (default: `vertical`)

`tooltip-placement`: Preferred tooltip placement (`left`, `right`, `top` or `bottom`) (default: `top`)

`show-labels`: Whether to show tally labels (supporting, contradicting, mentioning) (default: `false`)

## API ##

By default the badges will load in after the page has loaded. To manually reload the badges run the function `insertBadges` is exposed:

```
window.__SCITE.insertBadges()
```

## Release ##

Releases are uploaded to Azure. To do a release run something like:

```
$ git tag v1.2.0 -m "My cool new version"
$ git push origin v1.2.0
$ npm run build && npm run upload
```
