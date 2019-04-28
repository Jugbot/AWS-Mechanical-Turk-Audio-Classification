module.exports = {
  publicPath: '',
  outputDir: undefined,
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
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
