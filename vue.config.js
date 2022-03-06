const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    open: true,
    // hot: true,
    proxy: {
      '/api': {
        target: 'https://music-zlq.vercel.app', // 目标接口域名
        changeOrigin: true, // 是否跨域
        secure: true, // 是否https接口
        pathRewrite: { // 路径重置
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    config.resolve.alias = {
      '@': resolve('src'),
      _c: resolve('src/components')
    }
  }
}
