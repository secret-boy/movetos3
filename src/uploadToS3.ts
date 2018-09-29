export function uploadToS3({ s3bucket, fileData, BUCKET_NAME, appendRandomString }): Promise<{ fileName: string }> {
  return new Promise((resolve, reject) => {
    let fileName = `${fileData.originalname}`
    if (appendRandomString) {
      // generate random string and append it to file's original name.
      let random = new Date().getTime()
      fileName = `${random}_${fileName}`
    }

    // prepare params for uploading to s3.
    let params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileData.buffer,
    }

    // upload.
    s3bucket.upload(params, e => {
      if (e) {
        reject(e)
      } else {
        resolve({ fileName })
      }
    })
  })
}
