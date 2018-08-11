const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const config = require('./config')
const getModuleRules = require('./getModuleRules')

webpackBaseConfig.plugins = webpackBaseConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new MiniCssExtractPlugin({
    filename: 'stylesheets/[chunkhash].css'
  }),
  new HtmlWebpackPlugin({
    template: resolve(__dirname, '..', config.srcRoot, 'templates/index.pug'),
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeComments: true,
      useShortDoctype: true
    }
  }),
  new CopyWebpackPlugin([
    {
      from: resolve(__dirname, '..', config.srcRoot, 'fav.ico')
    }
  ])
])

module.exports = merge(
  webpackBaseConfig,
  {
    output: {
      path: resolve(__dirname, '..', config.distRoot),
      filename: 'scripts/[chunkhash].js',
      hashDigestLength: 8
    },

    mode: 'production',

    module: {
      rules: getModuleRules(true)
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin()
      ],
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: 'manifest',
      }
    }
  }
)
