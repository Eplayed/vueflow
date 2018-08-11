const MiniCssExtractPlugin = require("mini-css-extract-plugin")

function getModuleRules(extract) {
  return [
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
        !extract ? 'vue-style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader',
        'postcss-loader',
        'stylus-loader'
      ],
    },
    {
      test: /.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[sha512:hash:base64:8].[ext]'
          }
        }
      ]
    }
  ]
}

module.exports = getModuleRules
