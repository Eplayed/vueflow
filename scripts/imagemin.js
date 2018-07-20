const { resolve, dirname } = require('path')
const fs = require('fs')
const tinify = require('tinify')
const imagemin = require('imagemin')
const glob = require('glob')
const imageminOptipng = require('imagemin-optipng')
const config = require('../config/config')

function validateKeys (keys, callback) {
  const key = keys.shift()

  if (key) {
    tinify.key = key

    tinify.validate(err => {
      if (err) {
        throw err
      }

      if (tinify.compressionCount > 500) {
        // 使用下一个 key
        validateKeys(keys)
      } else {
        callback(key)
      }
    })
  } else {
    callback(null)
  }
}

glob(
  resolve(__dirname, '..', config.distRoot, '**/*.png'),
  {},
  (err, files) => {
    if (!err) {
      files.forEach(file => {
        validateKeys(config.tinifyKeys, key => {
          if (key) {
            // 有 key 的情况使用 tinify 压缩
            fs.readFile(file, (err, sourceData) => {
              if (err) {
                throw err
              }

              tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
                if (err) {
                  throw err
                }

                fs.writeFile(file, resultData, err => {
                  if (err) {
                    throw err
                  }
                })
              })
            })
          } else {
            const dir = dirname(file)

            // key 用完了回退到 imagemin 压缩
            imagemin(
              [
                file
              ],
              dir,
              {
                plugins: [
                  imageminOptipng({
                    optimizationLevel: 7
                  })
                ]
              }
            )
              .then(() => {})
              .catch(err => {
                // eslint-disable-next-line no-console
                console.log(err)
              })
          }
        })
      })
    }
  }
)
