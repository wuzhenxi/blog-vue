const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const port = process.env.port || process.env.npm_config_port || 8088 

module.exports = {

    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    baseUrl: "/", // 构建好的文件输出到哪里
  
    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    transpileDependencies: [
      /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?
  
    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack(config) {
      // set svg-sprite-loader
      config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
          alias: {
            '@': resolve('src')
          }
        },
        plugins: [
          // Ignore all locale files of moment.js
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          }),
          // 配置compression-webpack-plugin压缩
          new CompressionWebpackPlugin({
              algorithm: 'gzip',
              test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
              threshold: 10240,
              minRatio: 0.8
          }),
          new webpack.optimize.LimitChunkCountPlugin({
              maxChunks: 5,
              minChunkSize: 100
          })
        ]
    }, // CSS 相关选项
    css: {
      // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
      // 也可以是传递给 extract-text-webpack-plugin 的选项对象
      extract: true, // 允许生成 CSS source maps?
      sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
      loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
      modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
  
    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  
    pwa: {}, // configure webpack-dev-server behavior
    devServer: {
      open: true,
      // disableHostCheck: false,
      // host: "0.0.0.0",
      port: port,
      // https: false,
      // hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
      // proxy: null // string | Object
      // before: app => {}
    }, // 第三方插件配置
  
    pluginOptions: {
      // ...
      pwa: {
        iconPaths: {
          favicon32: './favicon.ico',
          favicon16: './favicon.ico',
          appleTouchIcon: './favicon.ico',
          maskIcon: './favicon.ico',
          msTileImage: './favicon.ico'
        }
      }
    }
  };