const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config')

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${ config.devServer.host }:${ config.devServer.port }`,
    'webpack/hot/only-dev-server',
    resolve(__dirname, '..', config.srcRoot, 'main.js')
  ],
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, '..', config.srcRoot)
    },
    extensions: ['.js', '.vue', '.json']
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
  performance: false,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {}
          }
        ]
      },
      {
        test: /.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [ 'pug-plain-loader' ]
          },
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[local]-[hash:base64:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ],
      },
      {
        test: /.(jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[sha512:hash:base64:8].[ext]',
              limit: 2000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', config.srcRoot, 'templates/index.pug')
    })
  ]
}
