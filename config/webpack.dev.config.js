const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const config = require('./config')
const getModuleRules = require('./getModuleRules')

webpackBaseConfig.plugins = webpackBaseConfig.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: resolve(__dirname, '..', config.srcRoot, 'templates/index.pug')
  })
])

module.exports = merge(
  webpackBaseConfig,
  {
    output: {
      filename: '[name].js'
    },

    module: {
      rules: getModuleRules()
    },

    devServer: {
      hot: true,
      host: config.devServer.host,
      port: config.devServer.port,
      inline: true,
      compress: true,
      historyApiFallback: true,
      contentBase: resolve(__dirname, '..', config.srcRoot)
    },

    // 开发模式禁用性能提示
    performance: false,

    mode: 'development'
  }
)
