const fs = require('fs')
const { execSync } = require('child_process')
const mime = require('mime-types')
const S3 = require('aws-sdk/clients/s3')

const {
  SCITE_AWS_ACCESS_KEY_ID,
  SCITE_AWS_SECRET_ACCESS_KEY
} = process.env

const BUCKET = process.argv[2] === 'prod' ? 'scitewebassets' : 'scitewebassets-stage'
const VERSION = execSync('git describe --always').toString().trim()
console.info(`Uploading ${VERSION} to ${BUCKET}`)

const upload = (s3, fromPath, toPath) => s3.upload({
  Bucket: BUCKET,
  Key: toPath,
  Body: fs.createReadStream(fromPath),
  ContentType: mime.lookup(fromPath),
  CacheControl: 'max-age=86400'
}).promise()

async function main () {
  const s3 = new S3({
    accessKeyId: SCITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: SCITE_AWS_SECRET_ACCESS_KEY
  })

  const responses = await Promise.all([
    upload(
      s3,
      `dist/scite-badge-full-${VERSION}.min.js`,
      'badge/badge.bundle.js'
    ),
    upload(
      s3,
      `dist/scite-badge-full-${VERSION}.min.js`,
      'badge/badge.bundle.js'
    )
  ])

  return responses
}

main()
  .then(() => {
    console.log('done!')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
