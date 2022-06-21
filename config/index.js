'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var proxyConfig = require('./proxyConfig')
let sysConfig = require('./sysConfig')
let xcApiUrl = sysConfig.xcApiUrl
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //proxyTable: proxyConfig.proxyList,
    proxyTable: {
      //  实际 http://127.0.0.1:9101/v1/brands
      //  转发 http://127.0.0.1:9101/api/v1/brands
      '/api/v1/brands': {
        target: 'http://127.0.0.1:9101/',
        //target: 'http://8.140.154.120:9101',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/specifications': {
        target: 'http://127.0.0.1:9102',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/templates': {
        target: 'http://127.0.0.1:9103',
        //target: 'http://8.141.61.173:9103',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/categories': {
        target: 'http://127.0.0.1:9104',
        //target: 'http://39.106.40.184:9104',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/category': {
        target: 'http://127.0.0.1:9104',
        //target: 'http://39.106.40.184:9104',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/files': {
        target: 'http://127.0.0.1:9105',
        //target:'http://8.140.154.120:9105',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/goods': {
        target: 'http://127.0.0.1:9105',
        //target: 'http://8.140.154.120:9106',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/v1/contents': {
        target: 'http://127.0.0.1:9108',
        //target: 'http://8.141.61.173:9108',
        pathRewrite: {
          '^/api': ''
        }
      },
      //    /api/v1/auth/seller
      //   http://127.0.0.1:8000/auth/v1/auth/seller
      //   http://localhost:9107/v1/auth/seller
      '/api/v1/auth': {
        target: 'http://127.0.0.1:8000/auth/',
        //target: 'http://8.141.61.173:9108',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 11000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
