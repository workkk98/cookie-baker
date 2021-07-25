const path = require('path');
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('less')
      .use('less-loader')
      .loader('less-loader')
      .end();

    config.resolve.alias
      .set('src', path.resolve(__dirname, 'src'))
  },
  outputDir: path.resolve(__dirname, '../extension-config/devtool'),
  publicPath: process.env.NODE_ENV === 'production'
    ? './' :
    '/'
};