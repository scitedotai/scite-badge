# Scite Badge #

Thin wrapper around [scite browser extension](https://github.com/scitedotai/scite-extension) to allow embedding on pages.

## Release ##

Releases are uploaded to Azure. To do a release run something like:

```
$ git tag v1.2.0 -m "My cool new version"
$ git push origin v1.2.0
$ npm run build && npm run upload
```
