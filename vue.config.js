const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../shinMSBuild/public'),
  pwa: {
    iconPaths: {
      favicon32: 'img/favicon.ico',
    }
  }
};