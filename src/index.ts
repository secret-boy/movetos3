#! /usr/bin/env node

import * as program from 'commander'
import { move } from './move'

const { version } = require('./../package.json')

function init() {
  program
    .version(version)
    .option('-d --dir <dir>', 'Directory to upload files from.')
    .option('-r --recursive', 'Recursively scan the dir to upload all files.')
    .option('-c --config-file [config-file]', 'Path to config.json file.')
    .option('-u --upload', 'Only scan dir, but dont upload them.')
    .option('-l --list', 'List files')
    .option('-a --append-random-string', 'Append filenames with random strings or not.')
    .parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
    return
  }

  let { recursive, dir, configFile, list, upload, appendRandomString } = program

  move(recursive, dir, configFile, list, upload, appendRandomString)
}

init()

export { move } from './move'
