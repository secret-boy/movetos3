import * as aws from 'aws-sdk'
import * as fs from 'fs'
import * as path from 'path'
import { getFiles } from './getFiles'
import { uploadToS3 } from './uploadToS3'

export async function move(recursive, dir: string, configFile, list, upload, appendRandomString) {
  let files

  if (dir.endsWith(path.sep)) {
    dir = dir.substr(0, dir.length - 1)
  }

  files = await getFiles({ dir, recursive })

  if (list) {
    console.log('List of files:\n')
    console.log(files.join('\n'))
  }

  console.log('\nTotal files to upload: ', files.length + '\n')

  if (!upload) {
    console.log(`\nTo upload files, you can proceed with adding --upload flag.`)
    return
  } else if (!configFile) {
    console.log('\nYou must specify the config file to upload files.')
    return
  } else {
    let config
    try {
      config = require(path.join(process.cwd(), configFile))
    } catch (e) {
      console.log(e)
      return
    }

    // initialize aws with access and secret key.
    aws.config.update({
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretKey,
    })

    // create new s3 bucket object.
    const s3bucket = new aws.S3()
    const BUCKET_NAME = config.bucketName

    console.log(`\nUploading files to bucket: ${BUCKET_NAME}`)

    if (!appendRandomString) {
      console.log(
        'You have not choosen to append random string ahead of filenames. It is advisable to do so, so that the filenames do not conflict with each other',
      )
    }

    for (let file of files) {
      let stat = fs.statSync(file)
      if (stat.isDirectory()) {
        console.log(`\nSkipping ${file} as it is a directory.`)
        continue
      }

      console.log(`\nUploading ${file}`)

      // set file original name and data.
      let buffer = fs.readFileSync(path.join(process.cwd(), file))
      let originalname = path.basename(path.join(process.cwd(), file))

      // upload file to S3.
      let { fileName } = await uploadToS3({
        BUCKET_NAME,
        s3bucket,
        fileData: {
          originalname,
          buffer,
        },
        appendRandomString,
      })

      console.log(`${fileName} uploaded.`)
    }

    console.log(`\nUploading completed. Thanks for using this utility.`)
  }
}
