const { spawnSync } = require('child_process')
const webpack = require('webpack')
const { resolve } = require('path')
const rimraf = require('rimraf')
const webpackProdConfig = require('../config/webpack.config.prod')
const config = require('../config/config')

const startDate = new Date()

// 删除目录
rimraf.sync(resolve(__dirname, '..', config.distRoot))

// webpack 打包
webpack(webpackProdConfig, (err, stats) => {
  if (err || stats.hasErrors()) {

    // eslint-disable-next-line no-console
    console.log(err)
  } else {

    afterWebpackBuild()
  }
})

function afterWebpackBuild() {

  // 雪碧图合并
  if (config.cssSprite) {
    spawnSync('node', [ resolve(__dirname, '.', 'sprites.js') ], { stdio: 'inherit' })
  }

  if (config.imagemin) {
    spawnSync('node', [ resolve(__dirname, '.', 'imagemin.js') ], { stdio: 'inherit' })
  }

  // eslint-disable-next-line no-console
  console.log('-----\n构建成功！\n用时：', ((new Date() - startDate) / 1000).toFixed(2) + '秒\n-----\n')
}
