const devMode = process.env.NODE_ENV !== 'production'
const path = require("path")

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        implementation: require('dart-sass')
      }
    }
  },
  chainWebpack(config) {
    // 通用做法，删除预加载插件
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    
    config.resolve.alias
      .set("vue$", path.resolve(__dirname, "../../src/platforms/web/entry-runtime-with-compiler.js"))
      .set("compiler", path.resolve(__dirname, "../../src/compiler"))
      .set("core", path.resolve(__dirname, "../../src/core"))
      .set("shared", path.resolve(__dirname, "../../src/shared"))
      .set("web", path.resolve(__dirname, "../../src/platforms/web"))
      .set("weex", path.resolve(__dirname, "../../src/platforms/weex"))
      .set("server", path.resolve(__dirname, "../../src/server"))
      .set("entries", path.resolve(__dirname, "../../src/entries"))
      .set("sfc", path.resolve(__dirname, "../../src/sfc"))
  }
}