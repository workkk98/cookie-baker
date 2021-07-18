const path = require('path');
module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'baker'
    },
    devTool: {
      entry: 'devtool/main.ts',
      template: 'public/index.html',
      filename: 'devtool.html',
      title: 'baker'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('less')
      .use('less-loader')
      .loader('less-loader')
      .end();

    config.resolve.alias
      .set('src', path.resolve(__dirname, 'src'))
  },
  outputDir: path.resolve(__dirname, '../cookie-baker-extension/dist'),
  publicPath: process.env.NODE_ENV === 'production'
    ? './' :
    '/'
};