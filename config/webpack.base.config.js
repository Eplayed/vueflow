const { resolve } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config')

module.exports = {
  entry: resolve(__dirname, '..', config.srcRoot, 'main.js'),

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, '..', config.srcRoot)
    },
    extensions: ['.js', '.vue', '.json']
  },

  plugins: [
    new VueLoaderPlugin()
  ]
}
