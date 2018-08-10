const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const config = require('./config')

module.exports = merge(
  webpackBaseConfig,
  {
    output: {
      filename: '[name].js'
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

    mode: 'development',

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '..', config.srcRoot, 'templates/index.pug')
      })
    ]
  }
)
