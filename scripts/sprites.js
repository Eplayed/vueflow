const fs = require('fs')
const { join, resolve } = require('path')
const del = require('del')
const crypto = require('crypto')
const postcss = require('postcss')
const sprites = require('postcss-sprites')
const glob = require('glob')

const buildRoot = resolve(__dirname, '../build')

glob(resolve(buildRoot, 'stylesheets/*.css'), {}, (err, files) => {
  files.forEach(file => {
    const css = fs.readFileSync(file, 'utf8')
    const spritesOpt = {
      stylesheetPath: resolve(buildRoot, 'stylesheets'),
      spritePath: resolve(buildRoot, 'images'),
      retina: true,
      verbose: true,
      hooks: {
        onSaveSpritesheet: (opts, spritesheet) => {
          const sourceImages = Object.keys(spritesheet.coordinates)
          const filename = crypto.createHash('sha512').digest('base64').slice(0, 8)

          del(sourceImages)

          return join(opts.spritePath, filename + '.' + spritesheet.extension)
        }
      }
    }

    postcss([ sprites(spritesOpt) ])
      .process(css, { from: file, to: file })
      .then(result => {
        fs.writeFileSync(file, result.css)
      })
  })
})
