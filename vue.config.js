console.log(process)
const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //生产环境的构造
  productionSourceMap: false,
  //根目录
  publicPath: "/",
  //打包输出的文件地址
  outputDir: "dist",
  // 放置生成的静态资源
  assetsDir: "assets",
  // dev环境下，webpack-dev-server的相关配置
  devServer: {
    // 开发时运行的窗口
    port: "8888",
    //开发时运行的域名
    host: "0.0.0.0",
    // 运行时是否直接打开页面
    open: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // 配置代理默认开启target方式
        changeOrigin: true,
        // 如果是http接口，需要配置该参数
        secure: false,
        target: process.env.VUE_APP_CONSOLE_URL,
        pathRewriter: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  }
})
