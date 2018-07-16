module.exports = {

  // 开发服务器配置
  devServer: {

    // 主机 IP
    host: '0.0.0.0',

    // 端口号
    port: '8080'
  },

  // 打包发布的根目录
  distRoot: 'build',

  // 源文件根目录
  srcRoot: 'src',

  // 是否启用 css 雪碧图
  cssSprite: true,

  // 是否启用图片压缩
  imagemin: true,

  // tinify 图片压缩 keys
  // 请自己申请 key
  // 免费账号每个月可以压 500 张图
  // https://tinypng.com/developers
  tinifyKeys: [
  ]
}
