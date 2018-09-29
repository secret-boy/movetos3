import * as fs from 'fs'
import * as path from 'path'

export function getFiles({ dir, recursive }): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    let files = fs.readdirSync(dir)
    let outputFiles = []
    for (let file of files) {
      let stat = fs.statSync(dir + path.sep + file)
      if (recursive && stat.isDirectory()) {
        let files = await getFiles({ dir: dir + path.sep + file, recursive })
        outputFiles = outputFiles.concat(files)
      } else {
        outputFiles.push(dir + path.sep + file)
      }
    }
    resolve(outputFiles)
  })
}
