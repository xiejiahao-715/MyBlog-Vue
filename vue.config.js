// ElementPlus自动导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// gzip压缩插件
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: '/blog',
  productionSourceMap: false,
  devServer:{
    port: 8000,
    // 代理静态资源
    proxy: {
      '/resource': {
        target: 'http://47.95.207.40:80/resource',
        ws: true,
        changeOrigin: true,
        pathRewrite : {
          '^/resource': ''
        }
      }
    }
  },
  configureWebpack:{
    externals:{
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      // 'element-plus': 'ElementPlus',
      // 'zh-cn': 'ElementPlusLocaleZhCn',
      // 'axios': 'axios',
      // 'gsap':'gsap',
      // 'ScrollTrigger': 'ScrollTrigger',
      // 'marked': 'marked',
      // 'highlight.js': 'hljs',
      // 'jump': 'Jump',
      // 'viewerjs': 'Viewer'
    },

    // ElementPlus的自动导入
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/, // 需要压缩的文件类
        threshold: 1024 * 5, // 归档需要进行压缩的文件大小最小值，我这个是5K以上的进行压缩
        deleteOriginalAssets: false, // 是否删除原文件
      })
    ],
  }
}