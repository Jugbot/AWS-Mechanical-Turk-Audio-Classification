module.exports = {
  publicPath: '',
  assetsDir: 'assets',
  runtimeCompiler: true,
  lintOnSave: undefined,

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.prettify = false
          return options
        })
  }
}
