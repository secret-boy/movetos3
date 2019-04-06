#### @secretboy/movetos3

v0.0.4

Move your files from folder to S3 with ease.

### Installation

```bash
$ npm i -g @secretboy/movetos3
```

### Usage

```bash
$ mts -d .
```

### Command line options

| Option                    | Description                                          | type   | required | default |
| ------------------------- | ---------------------------------------------------- | ------ | -------- | ------- |
| -d --dir                  | Directory to upload files from.                      | string | true     | none    |
| -r --recursive            | Recursively scan the dir to upload all files.        | switch | false    | off     |
| -c --config-file          | Path to config.json file.                            | string | false    | none    |
| -u --upload               | Upload files after scanning.                         | switch | false    | off     |
| -l --list                 | List files.                                          | switch | false    | off     |
| -a --append-random-string | Append random strings to filenames before uploading. | switch | false    | off     |

### config.json

config.json file is required when you enable the upload switch.

```json
{
  "accessKey": "",
  "secretKey": "",
  "bucketName": ""
}
```

### Example usage

```bash
# View help
$ mts
# or
$ mts -h
# or
$ mts --help

# check version
$ mts -V
# or
$ mts --version

# List files in current directory.
$ mts -d . -l

# List files from current directory recursively.
$ mts -d . -lr

# Upload files from current directory non-recursively.
$ mts -d . -lu -c config.json
```
