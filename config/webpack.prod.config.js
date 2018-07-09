const { resolve } = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config')

module.exports = {
  entry: resolve(__dirname, '../src/main.js'),
  output: {
    path: resolve(__dirname, '../build'),
    filename: 'scripts/[chunkhash].js',
    hashDigestLength: 8
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, '../src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  mode: 'production',
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
        use: [ 'babel-loader' ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
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
        test: /.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[md5:hash:hex:8].[ext]'
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
              name: '[md5:hash:hex:8].[ext]',
              limit: 2000
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'manifest',
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/templates/index.pug'),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../src/fav.ico')
      }
    ])
  ]
}
