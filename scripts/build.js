const { spawn } = require('child_process')
const webpack = require('webpack')
const { resolve } = require('path')
const rimraf = require('rimraf')
const webpackProdConfig = require('../config/webpack.prod.config')
const config = require('../config/config')

// 构建开始时间
const startDate = new Date()

// 删除目录
rimraf.sync(resolve(__dirname, '..', config.distRoot))

function queue(funcs, callback) {
  let count = 0

  funcs.forEach(func => {
    func(next)
  })

  function next() {
    count += 1

    if (count === funcs.length) {
      callback(count)
    }
  }
}

function genQueueFuncs() {
  const funcs = [
    // webpack 打包
    function(next) {
      webpack(webpackProdConfig, (err, stats) => {
        if (err || stats.hasErrors()) {

          // eslint-disable-next-line no-console
          console.log(stats.toString())
        } else {

          next()
        }
      })
    }
  ]

  // 雪碧图合并
  if (config.cssSprite) {
    funcs.push(function (next) {
      spawn('node', [ resolve(__dirname, '.', 'sprites.js') ], { stdio: 'inherit' })
        .on('close', code => {
          code === 0 && next(code)
        })
    })
  }

  return funcs
}


queue(genQueueFuncs(), count => {

  // eslint-disable-next-line no-console
  console.log('-----\n构建成功！\n用时：', ((new Date() - startDate) / 1000).toFixed(2) + '秒\n-----\n')
})
