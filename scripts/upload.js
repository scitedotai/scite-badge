const fs = require('fs')
const { execSync } = require('child_process')
const mime = require('mime-types')
const S3 = require('aws-sdk/clients/s3')
const CloudFront = require('aws-sdk/clients/cloudfront')

const BUCKET = process.argv[2] === 'prod' ? 'scitewebassets' : 'scitewebassets-stage'
const CLOUDFRONT_DISTRIBUTION = process.argv[2] === 'prod' ? 'ERIXC9NB9NEX7' : 'EE31527A00YNS'
const VERSION = execSync('git describe --abbrev=0').toString().trim().split('-')[0]

console.info(`Uploading ${VERSION} to ${BUCKET}`)

const upload = (s3, fromPath, toPath) => s3.upload({
  Bucket: BUCKET,
  Key: toPath,
  Body: fs.createReadStream(fromPath),
  ContentType: mime.lookup(fromPath),
  CacheControl: 'max-age=86400'
}).promise()

async function main () {
  const s3 = new S3()
  const cloudfront = new CloudFront()

  await Promise.all([
    upload(
      s3,
      'dist/badge.bundle.js',
      'badge/scite-badge-latest.min.js'
    ),
    upload(
      s3,
      'dist/badge.bundle.js',
      `badge/scite-badge-${VERSION}.min.js`
    )
  ])

  console.info('Creating cloudfront invalidation')
  const { Invalidation: cfInvalidation } = await cloudfront.createInvalidation({
    DistributionId: CLOUDFRONT_DISTRIBUTION,
    InvalidationBatch: {
      CallerReference: Number(new Date()).toString(),
      Paths: {
        Quantity: 1,
        Items: [
          '/badge/scite-badge-latest.min.js'
        ]
      }
    }
  }).promise()
  console.info(`Waiting for cloudfront invalidation ${cfInvalidation.Id}...`)
  await cloudfront.waitFor('invalidationCompleted', {
    DistributionId: CLOUDFRONT_DISTRIBUTION,
    Id: cfInvalidation.Id
  }).promise()
}

main()
  .then(() => {
    console.log('done!')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
