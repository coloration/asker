const path = require('path')

module.exports = {
  entry: './src/asker.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd'
  }
};