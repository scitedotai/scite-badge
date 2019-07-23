#!/bin/bash
ACCOUNT=sciteproductionassets
CONTAINER=badge
CACHE_CONTROL='max-age=31557600'
VERSION=$(git describe --always)

# Uploads file from ./dist to blob storage
# $1 = filename
function upload_blob() {
    az storage blob upload \
       --account-name $ACCOUNT \
       -c $CONTAINER \
       --name $1 \
       -f dist/$1 \
       --content-cache-control $CACHE_CONTROL
}

upload_blob "scite-badge-$VERSION.min.js"
upload_blob "scite-badge-$VERSION.min.css"
