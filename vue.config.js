module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  // chainWebpack: config => {
  //   config.plugins.delete('prefetch')
  // },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        moment: 'moment',
        lodash: '_'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  // productionSourceMap: false,
  devServer: {
    // host: 'localhost',
    // port: 8080
    // proxy: {
    //   '/API': {
    //     target: 'https://crmreport.sakura.com.tw/API',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/API': ''
    //     }
    //   },
    //   '/Portal': {
    //     target: 'https://service.sakura.com.tw/API',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/Portal': ''
    //     }
    //   }
    // }
    host: "localhost", //指定使用一个 host。默认是 localhost，这里默认值即可
    port: 8080, //指定端口
    proxy: {
      // 请求代理服务器
      "/Portal": {
        //带上api前缀的
        target: "https://service.sakura.com.tw/API", //代理目标地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          // 在发出请求后将/api替换为''空值，这样不影响接口请求
          "^/Portal": ""
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
}
