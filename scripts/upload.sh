#!/bin/bash
ACCOUNT=sciteproductionassets
CONTAINER=badge
CACHE_CONTROL='max-age=86400'
VERSION=$(git describe --always)

# Uploads file from ./dist to blob storage
# $1 = filename
function upload_blob() {
    if [ $# -eq 1 ]
    then
        az storage blob upload \
           --account-name $ACCOUNT \
           -c $CONTAINER \
           --name $1 \
           -f dist/$1 \
           --content-cache-control $CACHE_CONTROL
    elif [ $# -eq 2 ]
    then
        az storage blob upload \
           --account-name $ACCOUNT \
           -c $CONTAINER \
           --name $2\
           -f dist/$1 \
           --content-cache-control $CACHE_CONTROL

    fi
}

upload_blob "scite-badge-$VERSION.min.js"
upload_blob "scite-badge-$VERSION.min.css"

upload_blob "scite-badge-$VERSION.min.js" "scite-badge-latest.min.js"
upload_blob "scite-badge-$VERSION.min.css" "scite-badge-latest.min.css"
