// const webpack = require('webpack');
const path = require('path');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

const pageConfig = {
  debug: process.env.NODE_ENV === 'production' ? false : true,
  axios_config: {
    // baseClientURL: process.env.NODE_ENV === 'production' ? 'https://b-t.bsays.net' : '/api',
    baseClientURL: process.env.NODE_ENV === 'production' ? '' : '/api',
    timeout: '50000', // 超时时间
    withCredentials: true, //是否携带cookie
  },
  webpack_config: {
    // 压缩参数可以自行去vue.config.js添加
    imgMin: true, // （仅production环境）是否开启图片压缩功能。注：可能导致svg动画失效
    alias: {
      // 已存在 '@' => src
      // 该对象只允许存放src内部的文件，../会被替换为src
      components: '../components',
    },
    // 全局参数，会被作用至全局
    globalParams: {
      // 通过 process.env.VERSION 获得
      // 已存在 BASE_URL => /
      // 已存在 NODE_ENV => "production" || "development"
      VERSION: '1.3.1',
    },
  },
};

// vue inspect > config.js 生成配置到config.js 查看配置
let prodConfigureWebpack = {
  mode: 'production', //指定webpack的编译环境
  devtool: 'cheap-module-source-map', // 无法捕获错误位置，强压缩代码 prod
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        parallel: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: process.env.VUE_APP_WEB_ENV != 'test', // console
            drop_debugger: false,
            // pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
      minSize: 30000, // 最小尺寸，30000
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 5, // 最大异步请求数， 默认5
      maxInitialRequests: 3, // 最大初始化请求书，默认3
      automaticNameDelimiter: '~', // 打包分隔符
      name: true, // 根据模块和缓存组秘钥自动生成
      cacheGroups: {
        // TODO vender 细化，下面有例子
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0,
          name: 'commons',
        },
      },
    },
    // runtimeChunk: {
    //   name: (entrypoint) => `runtimechunk.${entrypoint.name}`,
    // },
    runtimeChunk: 'single',
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip', //算法
      test: new RegExp(
        '\\.(js|css|html)$' //压缩 js 与 css
      ),
      threshold: 10240, //只处理比这个值大的资源。按字节计算
      minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      deleteOriginalAssets: false, //不删除源文件
    }),
  ],
};
let devConfigureWebpack = {
  mode: 'development', //指定webpack的编译环境
  devtool: 'cheap-module-eval-source-map', // （默认）加快编译速度
  module: {},
};
const HtmlPluginConfig = {
  // cli3x中不能使用hash: 因为该方法会将app等js文件加上?[hash]
  // 但是内置 @vue/preload-webpack-plugin插件会将app等js通过link的方式提前引入页面
  // 导致同一个js和css等文件会被加载两次(一次不带hash一次带hash)
  // hash: true, //是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
  inject: true, // inject主要是设置将js和css文件插入在html的哪个位置，由于js的加载时同步进行的，所以它的位置对网页的加载速度是有影响的。inject共有四个可选项：true、body、head和false
  filename: 'index.html', //输出的文件名
  template: path.resolve(__dirname, './public/index.html'), //引入的模板
  showErrors: false, //是否将错误信息输出到html页面中
  minify: {
    //是否压缩html文件，为false则不压缩
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
};

let baseConfigureWebpack = {
  //不进行打包
  //<script>vue-router要写在vue前面，不然会报错。。。
  externals: {
    // vue: "Vue",
    // vuex: "Vuex",
    // "vue-router": "VueRouter",
  },
};
module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'commons', 'runtime', 'index'],
    },
  },
  // publicPath:'/',
  lintOnSave: false, // 关闭eslint
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  css: {
    // extract: true, //是否启用css分离
    loaderOptions: {
      // 这里的选项会传递给对应-loader
      css: {
        // dev环境下开启sourceMap方便查找元素对应文件
        sourceMap: isDev,
      },
      sass: {
        // 全局scss
        data: `@import "@/assets/css/common.scss";`,
        sourceMap: isDev,
      },
      postcss: {
        sourceMap: isDev,
      },
    },
  },
  configureWebpack: {
    ...(isDev ? devConfigureWebpack : prodConfigureWebpack),
    ...baseConfigureWebpack,
  },
  // chainWebpack: https://github.com/neutrinojs/webpack-chain#getting-started
  chainWebpack: (config) => {
    const webpackConfig = pageConfig.webpack_config;

    // css有关的loader不建议在这里修改，在loaderOptions中修改即可
    // alins配置，
    // 可以通过.get(key)获取、.set(key, value)设置、.delete(key)
    // config.resolve.alias.get('@')
    if (webpackConfig && webpackConfig.alias) {
      Object.keys(webpackConfig.alias).forEach((key) => {
        let value = webpackConfig.alias[key];
        value = path.resolve(__dirname, value.replace(/..\//, './src/'));
        config.resolve.alias.set(key, value);
      });
    }

    // if (!isDev) {
    //   // 获取 当前时间
    //   const getCurrentTime = new Date().getTime();
    //   // 清除css，js版本号
    //   config.output.filename(`js/[name].js?t=${getCurrentTime}`).end();
    //   config.output.chunkFilename(`js/[name].js?t=${getCurrentTime}`).end();
    //   // 为生产环境修改配置...
    //   config.plugin('extract-css').tap((args) => [
    //     {
    //       filename: `css/[name].css?t=${getCurrentTime}`,
    //       chunkFilename: `css/[name].css?t=${getCurrentTime}`,
    //     },
    //   ]);
    // }

    // extensions配置，
    // config.resolve.extensions.add(value).prepend(value).clear()
    config.resolve.symlinks(true);
    // 图片压缩(仅 production环境)
    if (!isDev && webpackConfig && webpackConfig.imgMin) {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap((options) => {
          options.limit = 1024; //为了减少首屏加载资源的大小 尽量设置小点
          return options;
        })
        .end()
        .use('image-webpack-loader')
        .loader('image-webpack-loader') // 图片压缩
        .tap((options) => {
          options = options || {};
          options['mozjpeg'] = {
            progressive: true,
            quality: 75,
          };
          // optipng.enabled: false will disable optipng
          options['optipng'] = {
            enabled: false,
          };
          options['gifsicle'] = {
            interlaced: true,
          };
          options['pngquant'] = {
            quality: '75-90',
            speed: 4,
          };
          options['gifsicle'] = {
            interlaced: false,
          };
          return options;
        });
    }
    // 修改全局配置
    if (webpackConfig && webpackConfig.globalParams) {
      config.plugin('define').tap((args) => {
        Object.keys(webpackConfig.globalParams).forEach((key) => {
          let value = webpackConfig.globalParams[key];
          if (value) args[0]['process.env'][`${key}`] = JSON.stringify(value);
        });
        return args;
      });
    }

    // 修改原html plugin配置
    config.plugin('html-index').tap((args) => {
      console.log('html-index', args);
      const newTp = {
        ...args[0],
        ...HtmlPluginConfig,
      };
      args[0] = newTp;
      return args;
    });
    // 移除 该插件 首屏就不会一次性加载全部路由了
    // 如果需要首屏依赖组件 可以这么写 import (/*webpackPrefetch: true */ './components')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    // 移除 preload 插件
    config.plugins.delete('preload-index');
  },
  devServer: {
    disableHostCheck: true, //禁止检查host头
    // 服务器代理，其实就是利用了服务端接口不存在跨域的原理
    stats: {
      // 去掉一些警告
      children: false,
    },
    proxy: {
      // mock 测试代理
      '/api/mock': {
        target: 'http://10.0.2.12:38080',
        changeOrigin: true,
        // ws: false,
        pathRewrite: {
          '^/api/mock': '/app/mock/16',
        },
      },
      // 本地
      '/api/urse': {
        target: 'http://b.jiayouwa.net',
        // target: 'https://b.jiayouwa.net/mp/agency', //正式
        changeOrigin: true,
        // ws: false,
        pathRewrite: {
          // 重写上方的/api地址
          '^/api/user': '',
        },
      },
    },
  },
};
