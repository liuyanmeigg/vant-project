const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,
  // 用于开发环境的配置
  devServer: {
    // 默认自动打开浏览器
    open: true,
    // 设置主机和端口号
    host: 'localhost',
    port: 8081,
    // 解决跨域问题
    proxy: {
      // 请求以  /bmda   开头的路径时就启动跨域
      '^/bmda': {
        target: 'http://127.0.0.1:8080',
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  }
})
